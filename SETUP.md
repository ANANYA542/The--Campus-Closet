# Campus Closet Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Database Setup

### 1. Start MySQL Server

Make sure your MySQL server is running:

```bash
# On macOS with Homebrew
brew services start mysql

# Or start manually
mysql.server start
```

### 2. Create Database

Log in to MySQL and create the database:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE campuscloset;
EXIT;
```

### 3. Configure Environment Variables

Update the `.env` file in the `backend` directory with your MySQL credentials:

```env
DATABASE_URL="mysql://root:your_password@localhost:3306/campuscloset"
PORT=5050
```

Replace `your_password` with your actual MySQL root password.

### 4. Run Database Migration

Navigate to the backend directory and run the Prisma migration:

```bash
cd backend
npx prisma migrate dev
```

This will apply the schema changes including:
- Adding the Wishlist model
- Adding viewCount and stockQuantity to Item model
- Creating all necessary database tables

### 5. Seed the Database

Run the seed script to populate the database with sample data:

```bash
node prisma/seed.js
```

This will create:
- 4 sample users
- 13 products across 5 categories (Textbooks, Electronics, Apparel, Dorm & Living, Stationery)
- 5 product reviews
- 4 wishlist items
- 1 transaction

## Running the Application

### Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5050`

### Frontend Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns)

## Testing the Features

### 1. Browse Product Listings

Navigate to `http://localhost:5173/products` to see all products.

- Try the search bar with queries like "textbook", "hoodie", "lamp"
- Click category filter pills to filter by category
- Click "New Listings" to see products added in the past 7 days

### 2. View Product Details

Click on any product card to view its detail page.

- Check the image gallery
- View product rating and reviews
- See seller information
- Scroll down to see "You Might Also Like" recommendations
- Try "Add to Cart" and "Buy Now" buttons

### 3. Visit Buyer Dashboard

Navigate to `http://localhost:5173/buyer/dashboard` to see:

- Recent orders
- Wishlist items
- Quick picks recommendations
- Click "Shop New Arrivals" button to navigate to product listings

Use the sidebar to switch between:
- Dashboard (overview)
- Orders (all purchases)
- Wishlist (saved items)

### 4. Seller Dashboard

Navigate to `http://localhost:5173/seller/dashboard` to access seller features.

**Note:** The seller dashboard integration is a work in progress. The UI exists but needs to be connected to the new backend endpoints.

## API Endpoints

All API endpoints are available at `http://localhost:5050/api`

### Product Endpoints

- `GET /api/products/new-arrivals` - Get products from past 7 days
- `GET /api/products/:id` - Get product details
- `GET /api/products/:id/similar` - Get similar products
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/category/:category` - Filter by category
- `GET /api/products/wishlist/:userId` - Get user wishlist

### Buyer Endpoints

- `GET /api/buyer/items` - Get all available items
- `GET /api/buyer/:buyerId/orders` - Get buyer orders
- `POST /api/cart/add` - Add item to cart

### Seller Endpoints

- `GET /api/seller/:sellerId/items` - Get seller's items
- `POST /api/seller/items` - Add new item
- `PUT /api/seller/items/:id` - Update item
- `DELETE /api/seller/items/:id` - Delete item

## Troubleshooting

### MySQL Connection Error

If you get `P1000: Authentication failed` error:

1. Check your MySQL credentials in `.env`
2. Ensure MySQL server is running
3. Verify the database exists: `SHOW DATABASES;` in MySQL

### Port Already in Use

If port 5050 or 5173 is already in use:

- Backend: Change `PORT` in `.env`
- Frontend: Vite will automatically try the next available port

### Prisma Client Not Found

If you get Prisma client errors:

```bash
cd backend
npx prisma generate
```

## Sample Login Credentials

Use any of these users created by the seed:

- Email: `alex.johnson@university.edu` | Password: `password123`
- Email: `sarah.chen@university.edu` | Password: `password123`
- Email: `mike.wilson@university.edu` | Password: `password123`
- Email: `priya.sharma@university.edu` | Password: `password123`

## Next Steps

Once you verify everything works:

1. Integrate seller dashboard with new backend APIs
2. Add authentication context/state management
3. Implement protected routes
4. Add error boundaries and better error handling
5. Optimize images and add lazy loading
6. Add pagination for product listings
7. Implement real payment integration
