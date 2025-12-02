// HARDCODED DATA FOR DEMO PURPOSES
// This controller temporarily replaces database calls with static data

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Introduction to Algorithms, 4th Edition",
    description: "Like new condition. Used for one semester only. No highlights or markings inside. Essential for CS students.",
    category: "Textbooks",
    price: 1250,
    rentPrice: 299,
    isForRent: true,
    condition: "Like New",
    status: "available",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"
    ]),
    createdAt: new Date(),
    owner: {
      id: 101,
      name: "Rahul Sharma",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      reputationScore: 4.8,
      address: { collegeName: "Engineering Block A" }
    },
    reviews: [
      { id: 1, rating: 5, comment: "Great book condition!", user: { name: "Priya", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" }, createdAt: new Date() }
    ],
    _count: { reviews: 1, wishlistedBy: 5 }
  },
  {
    id: 2,
    name: "Sony WH-1000XM4 Noise Cancelling Headphones",
    description: "Barely used. Comes with original case and cables. Perfect for studying in noisy dorms.",
    category: "Electronics",
    price: 15000,
    rentPrice: 0,
    isForRent: false,
    condition: "Excellent",
    status: "available",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"
    ]),
    createdAt: new Date(),
    owner: {
      id: 102,
      name: "Sneha Gupta",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      reputationScore: 4.9,
      address: { collegeName: "Girls Hostel 2" }
    },
    reviews: [],
    _count: { reviews: 0, wishlistedBy: 12 }
  },
  {
    id: 3,
    name: "Scientific Calculator fx-991EX",
    description: "Standard engineering calculator. Works perfectly. Solar powered.",
    category: "Electronics",
    price: 800,
    rentPrice: 100,
    isForRent: true,
    condition: "Good",
    status: "available",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=800"
    ]),
    createdAt: new Date(),
    owner: {
      id: 103,
      name: "Amit Patel",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      reputationScore: 4.5,
      address: { collegeName: "Boys Hostel 1" }
    },
    reviews: [
      { id: 2, rating: 4, comment: "Good value", user: { name: "Rohan", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" }, createdAt: new Date() }
    ],
    _count: { reviews: 1, wishlistedBy: 3 }
  },
  {
    id: 4,
    name: "Dorm Room LED Strip Lights (5m)",
    description: "RGB LED strip with remote. Adds great vibe to the room. Unused in box.",
    category: "Dorm & Living",
    price: 450,
    rentPrice: 0,
    isForRent: false,
    condition: "New",
    status: "available",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    ]),
    createdAt: new Date(),
    owner: {
      id: 104,
      name: "Kavita Singh",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita",
      reputationScore: 5.0,
      address: { collegeName: "Girls Hostel 1" }
    },
    reviews: [],
    _count: { reviews: 0, wishlistedBy: 8 }
  },
  {
    id: 5,
    name: "College Hoodie - Size M",
    description: "Official campus merchandise. Never worn, size didn't fit. Navy blue.",
    category: "Apparel",
    price: 600,
    rentPrice: 0,
    isForRent: false,
    condition: "New",
    status: "available",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"
    ]),
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    owner: {
      id: 101,
      name: "Rahul Sharma",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      reputationScore: 4.8,
      address: { collegeName: "Engineering Block A" }
    },
    reviews: [],
    _count: { reviews: 0, wishlistedBy: 2 }
  },
  {
    id: 6,
    name: "Study Table Lamp",
    description: "Adjustable brightness, eye-care LED. USB rechargeable.",
    category: "Dorm & Living",
    price: 350,
    rentPrice: 0,
    isForRent: false,
    condition: "Good",
    status: "available",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&q=80&w=800"
    ]),
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    owner: {
      id: 105,
      name: "Vikram Malhotra",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
      reputationScore: 4.2,
      address: { collegeName: "Boys Hostel 3" }
    },
    reviews: [
      { id: 3, rating: 3, comment: "Battery life is okay", user: { name: "Arjun", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" }, createdAt: new Date() }
    ],
    _count: { reviews: 1, wishlistedBy: 4 }
  },
  {
    id: 7,
    name: "Psychology 101 Textbook",
    description: "Standard intro to psychology text. Some highlighting.",
    category: "Textbooks",
    price: 500,
    rentPrice: 0,
    isForRent: false,
    condition: "Fair",
    status: "available",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    ]),
    createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
    owner: {
      id: 102,
      name: "Sneha Gupta",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      reputationScore: 4.9,
      address: { collegeName: "Girls Hostel 2" }
    },
    reviews: [],
    _count: { reviews: 0, wishlistedBy: 1 }
  }
];

// Helper to calculate rating
const calculateRating = (item) => {
  const avgRating = item.reviews.length > 0
    ? item.reviews.reduce((sum, review) => sum + review.rating, 0) / item.reviews.length
    : 0;
  
  return {
    ...item,
    averageRating: avgRating,
    reviewCount: item._count.reviews,
    wishlistCount: item._count.wishlistedBy,
  };
};

// ---------------- GET NEW ARRIVALS ----------------
export const getNewArrivals = async (req, res) => {
  try {
    // Filter items from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const newItems = SAMPLE_PRODUCTS
      .filter(item => new Date(item.createdAt) >= sevenDaysAgo)
      .map(calculateRating);
      
    res.json(newItems);
  } catch (error) {
    console.error("Get new arrivals error:", error);
    res.status(500).json({ error: "Failed to fetch new arrivals" });
  }
};

// ---------------- GET PRODUCT DETAIL ----------------
export const getProductDetail = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const item = SAMPLE_PRODUCTS.find(p => p.id === productId);

    if (!item) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(calculateRating(item));
  } catch (error) {
    console.error("Get product detail error:", error);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
};

// ---------------- GET SIMILAR PRODUCTS ----------------
export const getSimilarProducts = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const currentProduct = SAMPLE_PRODUCTS.find(p => p.id === productId);

    if (!currentProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const similarItems = SAMPLE_PRODUCTS
      .filter(p => p.category === currentProduct.category && p.id !== productId)
      .map(calculateRating)
      .slice(0, 6);

    res.json(similarItems);
  } catch (error) {
    console.error("Get similar products error:", error);
    res.status(500).json({ error: "Failed to fetch similar products" });
  }
};

// ---------------- SEARCH PRODUCTS ----------------
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const searchTerm = q.toLowerCase();
    const results = SAMPLE_PRODUCTS
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      )
      .map(calculateRating);

    res.json(results);
  } catch (error) {
    console.error("Search products error:", error);
    res.status(500).json({ error: "Failed to search products" });
  }
};

// ---------------- GET PRODUCTS BY CATEGORY ----------------
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = SAMPLE_PRODUCTS
      .filter(p => p.category === category)
      .map(calculateRating);

    res.json(items);
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};

// ---------------- GET USER WISHLIST ----------------
export const getUserWishlist = async (req, res) => {
  try {
    // Return random 3 items as wishlist for demo
    const wishlistItems = SAMPLE_PRODUCTS.slice(0, 3).map(item => ({
      wishlistId: Math.random(),
      addedAt: new Date(),
      item: calculateRating(item)
    }));

    res.json(wishlistItems);
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};
