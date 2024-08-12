import { connectMongoDB } from "@/libs/mongodb";
import Products from "@/models/Products";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Only get allowed" });
    return;
  }
  try {
    const { category, greater, less, page, perPage } = req.query;

    let filters: Record<string, any> = {};
    if (category) filters.category = category;
    if (greater) filters.price = { $gte: parseInt(greater as string) };
    if (less) {
      if (filters.price) {
        filters.price.$lte = parseInt(less as string);
      } else {
        filters.price = { $lte: parseInt(less as string) };
      }
    }

    const actualPage = parseInt(page as string);
    const itemsPerPage = parseInt(perPage as string);
    const skip = (actualPage - 1) * itemsPerPage;

    await connectMongoDB();
    const [items, total] = await Promise.all([
      Products.find(filters).skip(skip).limit(itemsPerPage),
      Products.countDocuments(filters),
    ]);

    const prev_page = actualPage === 1 ? null : actualPage - 1;
    const pages = Math.ceil(total / itemsPerPage);
    const next_page = actualPage + 1 > pages ? null : actualPage + 1;

    res.status(200).json({
      items,
      actual_page: actualPage,
      per_page: itemsPerPage,
      total,
      total_pages: pages,
      prev_page,
      next_page,
    });
  } catch (err) {
    res.status(400).json({ err, msg: "Something went wrong" });
  }
};

export default handler;
