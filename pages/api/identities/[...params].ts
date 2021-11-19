import { NextApiRequest, NextApiResponse } from "next";

export default async function (_: NextApiRequest, res: NextApiResponse) {
  res.status(401).end("Unauthorized");
}
