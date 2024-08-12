import { connectMongoDB } from "@/libs/mongodb";
import Products from "@/models/Products";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Only get allowed" });
    return;
  }
  try {
    const { id } = req.query;
    await connectMongoDB();
    const data = await Products.find({ _id: id });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err, msg: "Something went wrong" });
  }
};

export default handler;
