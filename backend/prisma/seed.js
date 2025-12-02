import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Create Users
    const user1 = await prisma.user.upsert({
        where: { email: 'alice@college.edu' },
        update: {},
        create: {
            email: 'alice@college.edu',
            name: 'Alice Student',
            password: 'password123', // In real app, hash this
            urnId: 'URN001',
            role: 'BOTH',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'bob@college.edu' },
        update: {},
        create: {
            email: 'bob@college.edu',
            name: 'Bob Senior',
            password: 'password123',
            urnId: 'URN002',
            role: 'BOTH',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        },
    });

    // Create Items
    const item1 = await prisma.item.create({
        data: {
            name: 'Vintage Denim Jacket',
            description: 'Classic Levis denim jacket, size M. Great condition, perfect for fall.',
            category: 'Jackets',
            price: 1200,
            condition: 'Good',
            status: 'available',
            images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800'],
            ownerId: user1.id,
        },
    });

    const item2 = await prisma.item.create({
        data: {
            name: 'Calculus Textbook',
            description: 'Essential Calculus 2nd Edition. Minimal highlighting.',
            category: 'Books',
            price: 800,
            condition: 'Like New',
            status: 'available',
            images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'],
            ownerId: user2.id,
        },
    });

    const item3 = await prisma.item.create({
        data: {
            name: 'Graphic Tee',
            description: 'Cool graphic t-shirt, size L. Never worn.',
            category: 'T-Shirts',
            price: 350,
            condition: 'New',
            status: 'available',
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
            ownerId: user1.id,
        },
    });

    const item4 = await prisma.item.create({
        data: {
            name: 'Study Lamp',
            description: 'LED desk lamp with adjustable brightness. USB powered.',
            category: 'Electronics',
            price: 500,
            condition: 'Good',
            status: 'available',
            images: ['https://images.unsplash.com/photo-1534234828563-02511c8457cc?auto=format&fit=crop&q=80&w=800'],
            ownerId: user2.id,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
