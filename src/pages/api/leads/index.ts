import { connectMongoDB } from "@/libs/mongodb";
import Leads from "@/models/Leads";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only post allowed" });
  }
  try {
    await connectMongoDB();
    const createdLead = await Leads.create(req.body);
    return res.status(200).json(createdLead);
  } catch (err) {
    return res.status(400).json({ err, msg: "Something went wrong" });
  }
};

export default handler;
