import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import sdk from "~/services/kratos";

const secret = process.env.SECRET as string;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    console.log(session);

    if (req.method !== "POST") {
      res.status(405).end("Method not allowed");
      return;
    }

    // @ts-expect-error type not being inferred correctly
    const token = await getToken({ req, secret });
    // @ts-expect-error TODO: add type signature
    const userDetails = JSON.parse(token.sub);

    console.log("userDetails", userDetails);

    // create identity using kratos
    // no need to JSON.parse req.body
    try {
      const identity = await sdk.adminCreateIdentity({
        schema_id: req.body.schemaId,
        traits: {
          email: req.body.email,
        },
      });
      console.log(identity.data.id);
      // create recovery link using kratos
      const recoveryLink = await sdk.adminCreateSelfServiceRecoveryLink({
        identity_id: identity.data.id,
        expires_in: "1h",
      });
      console.log(recoveryLink.data.recovery_link);
      res.json({ recoveryLink: recoveryLink.data.recovery_link });
      // TODO: send recovery link as email
      return;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  res.status(401).end("Unauthorized");
}
