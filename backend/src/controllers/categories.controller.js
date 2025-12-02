import prisma from "../config/db.js";
import { SAMPLE_PRODUCTS } from "./products.controller.js";

const SLUG_MAP = {
  stationary: ["Stationary", "Textbooks"],
  furniture: ["Dorm & Living", "Furniture"],
  food: ["Food", "Kitchen"],
  clothes: ["Apparel", "Clothes"],
};

export const getProductsByCategorySlug = async (req, res) => {
  const { slug } = req.params;
  const categories = SLUG_MAP[slug] || [slug];
  try {
    const items = await prisma.item.findMany({
      where: {
        OR: [{ category: { in: categories } }, { categoryRef: { slug } }],
      },
      orderBy: { createdAt: "desc" },
    });
    if (!items || items.length === 0) {
      return res.json([
        {
          id: 10001,
          name: `${categories[0]} Sample Product`,
          description: "Sample item for demo; replace with real data.",
          price: 1299,
          images: JSON.stringify([
            "https://images.pexels.com/photos/1597111/pexels-photo-1597111.jpeg?auto=compress&cs=tinysrgb&w=800",
          ]),
          isForRent: false,
          rentPrice: null,
          averageRating: 4.5,
          reviewCount: 18,
          category: categories[0],
          owner: { name: "Demo Seller" },
        },
      ]);
    }
    return res.json(items);
  } catch (error) {
    console.warn("DB unavailable, using sample products for category", slug);
    const items = SAMPLE_PRODUCTS.filter((p) =>
      categories.includes(p.category)
    );
    return res.json(items);
  }
};
