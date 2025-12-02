import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("Clearing existing data...");
  await prisma.wishlist.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.rental.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.item.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  console.log("Creating users...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Alex Johnson",
        email: "alex.johnson@university.edu",
        password: hashedPassword,
        urnId: "URN001",
        role: "BOTH",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        emailVerified: true,
        address: {
          create: {
            collegeName: "IIT Bombay",
            departmentName: "Computer Science",
            hostelName: "Hostel 1",
            roomNumber: "101",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Chen",
        email: "sarah.chen@university.edu",
        password: hashedPassword,
        urnId: "URN002",
        role: "BOTH",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        emailVerified: true,
        address: {
          create: {
            collegeName: "IIT Bombay",
            departmentName: "Electrical Engineering",
            hostelName: "Hostel 2",
            roomNumber: "205",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Mike Wilson",
        email: "mike.wilson@university.edu",
        password: hashedPassword,
        urnId: "URN003",
        role: "SELLER",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        emailVerified: true,
        address: {
          create: {
            collegeName: "IIT Bombay",
            departmentName: "Mechanical Engineering",
            hostelName: "Hostel 3",
            roomNumber: "312",
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Priya Sharma",
        email: "priya.sharma@university.edu",
        password: hashedPassword,
        urnId: "URN004",
        role: "BOTH",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        emailVerified: true,
        address: {
          create: {
            collegeName: "IIT Bombay",
            departmentName: "Physics",
            hostelName: "Hostel 4",
            roomNumber: "405",
          },
        },
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Helper function to get random date in past N days
  const getDateDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  // Create sample items
  console.log("Creating items...");
  const items = await Promise.all([
    // Textbooks (some recent)
    prisma.item.create({
      data: {
        name: "Introduction to Algorithms, 4th Edition",
        description: "The latest edition of the essential text for students and professionals in computer science. This book is in good condition with minor highlighting on a few pages. Perfect for algorithms courses. No torn pages or cover damage.",
        category: "Textbooks",
        price: 1250,
        rentPrice: 299,
        condition: "Good",
        isForRent: true,
        stockQuantity: 1,
        viewCount: 45,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        ]),
        ownerId: users[0].id,
        createdAt: getDateDaysAgo(2), // New arrival
      },
    }),
    prisma.item.create({
      data: {
        name: "Data Structures & Algorithms in Java",
        description: "Comprehensive guide to data structures and algorithms implementation in Java. Excellent condition with no markings. Includes all original companion materials.",
        category: "Textbooks",
        price: 850,
        rentPrice: 200,
        condition: "Excellent",
        isForRent: true,
        stockQuantity: 1,
        viewCount: 32,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
        ]),
        ownerId: users[1].id,
        createdAt: getDateDaysAgo(15),
      },
    }),
    prisma.item.create({
      data: {
        name: "Clean Code by Robert C. Martin",
        description: "A handbook of agile software craftsmanship. Learn how to write clean, maintainable code. Minor wear on cover but pages are in excellent condition.",
        category: "Textbooks",
        price: 999,
        condition: "Good",
        isForRent: false,
        stockQuantity: 1,
        viewCount: 28,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        ]),
        ownerId: users[2].id,
        createdAt: getDateDaysAgo(20),
      },
    }),
    prisma.item.create({
      data: {
        name: "Operating Systems: Three Easy Pieces",
        description: "Modern approach to operating systems. Perfect for OS courses. Book is like new with minimal usage.",
        category: "Textbooks",
        price: 1100,
        rentPrice: 250,
        condition: "Excellent",
        isForRent: true,
        stockQuantity: 1,
        viewCount: 18,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
        ]),
        ownerId: users[3].id,
        createdAt: getDateDaysAgo(5), // New arrival
      },
    }),

    // Electronics
    prisma.item.create({
      data: {
        name: "Noise-Cancelling Headphones",
        description: "Premium wireless headphones with active noise cancellation. Perfect for studying in noisy environments. Includes original box, charger, and carrying case. Battery lasts 30+ hours.",
        category: "Electronics",
        price: 4500,
        condition: "Excellent",
        isForRent: false,
        stockQuantity: 1,
        viewCount: 67,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
        ]),
        ownerId: users[0].id,
        createdAt: getDateDaysAgo(3), // New arrival
      },
    }),
    prisma.item.create({
      data: {
        name: "Portable Bluetooth Speaker",
        description: "Compact bluetooth speaker with amazing sound quality. Waterproof design, 12-hour battery life. Perfect for dorm parties or outdoor study sessions.",
        category: "Electronics",
        price: 2400,
        condition: "Good",
        isForRent: false,
        stockQuantity: 1,
        viewCount: 41,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        ]),
        ownerId: users[2].id,
        createdAt: getDateDaysAgo(25),
      },
    }),

    // Apparel
    prisma.item.create({
      data: {
        name: "Graphic Hoodie",
        description: "Comfortable cotton hoodie in tan color. Size: Medium. Perfect for campus wear. Minimal signs of use, no stains or tears.",
        category: "Apparel",
        price: 800,
        condition: "Good",
        isForRent: false,
        stockQuantity: 1,
        viewCount: 55,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
        ]),
        ownerId: users[1].id,
        createdAt: getDateDaysAgo(4), // New arrival
      },
    }),

    // Dorm & Living
    prisma.item.create({
      data: {
        name: "Compact Mini-Fridge",
        description: "Small fridge perfect for dorm rooms. 1.6 cubic feet capacity. Keeps drinks cold and snacks fresh. Energy efficient. Only used for one semester.",
        category: "Dorm & Living",
        price: 4400,
        rentPrice: 500,
        condition: "Excellent",
        isForRent: true,
        stockQuantity: 1,
        viewCount: 89,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400",
        ]),
        ownerId: users[0].id,
        createdAt: getDateDaysAgo(30),
      },
    }),
    prisma.item.create({
      data: {
        name: "Modern LED Desk Lamp",
        description: "Adjustable LED lamp with 3 brightness levels and touch control. Perfect for late-night study sessions. Includes USB charging port. Warm white light easy on the eyes.",
        category: "Dorm & Living",
        price: 1200,
        condition: "Excellent",
        isForRent: false,
        stockQuantity: 1,
        viewCount: 34,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
        ]),
        ownerId: users[3].id,
        createdAt: getDateDaysAgo(6), // New arrival
      },
    }),
    prisma.item.create({
      data: {
        name: "Ergonomic Desk Chair",
        description: "Comfortable office chair with lumbar support. Adjustable height and armrests. Great for long study sessions. Minor wear on fabric but fully functional.",
        category: "Dorm & Living",
        price: 4800,
        rentPrice: 600,
        condition: "Good",
        isForRent: true,
        stockQuantity: 1,
        viewCount: 71,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
        ]),
        ownerId: users[1].id,
        createdAt: getDateDaysAgo(12),
      },
    }),

    // Stationery
    prisma.item.create({
      data: {
        name: "Pastel Highlighter Set",
        description: "Complete set of 10 pastel colored highlighters. Perfect for note-taking and organizing study materials. Brand new, never used.",
        category: "Stationery",
        price: 450,
        condition: "New",
        isForRent: false,
        stockQuantity: 2,
        viewCount: 23,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
        ]),
        ownerId: users[2].id,
        createdAt: getDateDaysAgo(1), // New arrival
      },
    }),

    // More items
    prisma.item.create({
      data: {
        name: "Psychology 101 Textbook",
        description: "Introduction to Psychology textbook. 12th edition. Some highlighting but all pages intact. Great for psych majors or elective students.",
        category: "Textbooks",
        price: 600,
        rentPrice: 150,
        condition: "Good",
        isForRent: true,
        stockQuantity: 1,
        viewCount: 19,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        ]),
        ownerId: users[0].id,
        createdAt: getDateDaysAgo(18),
      },
    }),
    prisma.item.create({
      data: {
        name: "Scientific Calculator",
        description: "TI-84 Plus graphing calculator. Essential for math and engineering courses. Includes protective cover and manual. Excellent working condition.",
        category: "Electronics",
        price: 2800,
        condition: "Excellent",
        isForRent: false,
        stockQuantity: 1,
        viewCount: 52,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=400",
        ]),
        ownerId: users[3].id,
        createdAt: getDateDaysAgo(8),
      },
    }),
  ]);

  console.log(`Created ${items.length} items`);

  // Create sample reviews
  console.log("Creating reviews...");
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        userId: users[1].id,
        itemId: items[0].id, // Algorithms book
        rating: 5,
        comment: "Excellent condition! Exactly as described. The seller was very responsive and helpful.",
      },
    }),
    prisma.review.create({
      data: {
        userId: users[2].id,
        itemId: items[0].id,
        rating: 4,
        comment: "Good book, fair price. Some highlighting but doesn't bother me.",
      },
    }),
    prisma.review.create({
      data: {
        userId: users[0].id,
        itemId: items[4].id, // Headphones
        rating: 5,
        comment: "Amazing headphones! Sound quality is superb. Great for studying.",
      },
    }),
    prisma.review.create({
      data: {
        userId: users[3].id,
        itemId: items[6].id, // Hoodie
        rating: 4,
        comment: "Nice hoodie, fits well. Very comfortable for campus wear.",
      },
    }),
    prisma.review.create({
      data: {
        userId: users[1].id,
        itemId: items[1].id, // Data Structures book
        rating: 5,
        comment: "Perfect condition! Helped me ace my data structures exam.",
      },
    }),
  ]);

  console.log(`Created ${reviews.length} reviews`);

  // Create sample wishlist items
  console.log("Creating wishlist items...");
  const wishlistItems = await Promise.all([
    prisma.wishlist.create({
      data: {
        userId: users[0].id,
        itemId: items[1].id, // Data Structures book
      },
    }),
    prisma.wishlist.create({
      data: {
        userId: users[0].id,
        itemId: items[7].id, // Mini-fridge
      },
    }),
    prisma.wishlist.create({
      data: {
        userId: users[1].id,
        itemId: items[4].id, // Headphones
      },
    }),
    prisma.wishlist.create({
      data: {
        userId: users[2].id,
        itemId: items[0].id, // Algorithms book
      },
    }),
  ]);

  console.log(`Created ${wishlistItems.length} wishlist items`);

  // Create sample transactions
  console.log("Creating transactions...");
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        buyerId: users[1].id,
        sellerId: users[2].id,
        itemId: items[2].id, // Clean Code book
        amount: 999,
        status: "completed",
        createdAt: getDateDaysAgo(10),
      },
    }),
  ]);

  console.log(`Created ${transactions.length} transactions`);

  console.log("Creating chat conversations...");
  const conversation = await prisma.conversation.create({
    data: {
      buyerId: users[0].id, // Alex
      sellerId: users[1].id, // Sarah
      itemId: items[9].id,   // Ergonomic Desk Chair
    },
  });

  await prisma.message.createMany({
    data: [
      { conversationId: conversation.id, senderId: users[0].id, content: "Hi! Is this armchair still available? I saw it on Campus Closet." },
      { conversationId: conversation.id, senderId: users[1].id, content: "Hey! Yes, it's in great condition, just a minor scuff on one leg." },
      { conversationId: conversation.id, senderId: users[0].id, content: "That's fine by me! Could I pick it up tomorrow evening?" },
      { conversationId: conversation.id, senderId: users[1].id, content: "Of course. Does 7 PM work for you?" },
    ],
  });

  const conversation2 = await prisma.conversation.create({
    data: {
      buyerId: users[0].id,
      sellerId: users[2].id, // Mike
      itemId: items[6].id,
    },
  });
  await prisma.message.createMany({
    data: [
      { conversationId: conversation2.id, senderId: users[0].id, content: "Is the hoodie still available?" },
      { conversationId: conversation2.id, senderId: users[2].id, content: "Yes, available. Tan color, size M." },
      { conversationId: conversation2.id, senderId: users[0].id, content: "Great, I'll take it!" },
    ],
  });

  const conversation3 = await prisma.conversation.create({
    data: {
      buyerId: users[1].id,
      sellerId: users[3].id, // Priya
      itemId: items[10].id,
    },
  });
  await prisma.message.createMany({
    data: [
      { conversationId: conversation3.id, senderId: users[1].id, content: "Does the lamp have warm white light?" },
      { conversationId: conversation3.id, senderId: users[3].id, content: "Yes, adjustable brightness and warm white." },
      { conversationId: conversation3.id, senderId: users[3].id, content: "I can meet you on campus." },
    ],
  });

  console.log("✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
