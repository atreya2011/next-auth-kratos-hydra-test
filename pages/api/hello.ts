import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const secret = process.env.SECRET as string;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const token = await getToken({ req, secret });
  console.log("hello", session);
  console.log("hello", token);
  res.status(200).json({ session: session, token: token });
};
