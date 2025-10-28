## Overview
**Campus Closet** is a community-driven marketplace platform designed **exclusively for college students** to **buy, sell, or rent** items within their campus.  
Think of it as a mini **Amazon + OLX + Rentomojo**, but just for students.

This project aims to make student life easier by creating a trusted, college-only environment where users can exchange items safely — from textbooks and gadgets to furniture and costumes.

---

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS / ShadCN UI
- Axios (for API calls)

**Backend:**
- Node.js + Express.js
- Prisma ORM
- MySQL Database

**Other Tools:**
- JWT Authentication
- Cloudinary / AWS S3 for image storage
- Socket.io (for real-time chat)
- Swagger / Postman (for API documentation)

---

##  Core Features

### 1. Item Management
Users can list items to sell or rent with details such as:
- Item name, description, price, condition, and images  
- Mark items as “for sale”, “for rent”, or “free”  
- Update or delete listings anytime  

### 2. Cart System
- Add items to cart for purchase  
- Separate “rent cart” for rental items  
- Manage quantity and remove items before checkout  

### 3.  Buy / Sell Logic
- Seller posts → Buyer purchases → Item marked as *sold*  
- Transaction details stored (buyer, seller, item, total amount, date)  
- Automatic status updates for both item and transaction  

### 4. Renting Logic
- Users can rent items for specific date ranges  
- Rent price and security deposit supported  
- Items auto-marked as *rented* during active period  
- System restores item availability after return date  
- Optional fine for overdue returns  

---

## ✨ Additional (Fun) Features

### 5. Campus Verification
- Only verified college students can sign up using a valid **college email ID** (e.g., `@university.edu`)  
- Ensures a trusted, campus-only network  

### 6. Ratings & Reviews
- Buyers and renters can rate items and leave feedback after each transaction  
- Helps build a reputation system for trustworthy sellers  

### 7. In-App Chat
- Real-time chat between buyer and seller via **Socket.io**  
- Secure, one-to-one messaging for negotiation and coordination  

### 8. Rental Calendar
- Each rentable item shows availability dates  
- Renters can select an available time window before booking  

### 9. Notifications System
- Sellers get notified when an item is purchased or rented  
- Renters receive reminders before the return date  
- In-app + email notifications supported  

### 10. Freebies Section
- Students can post items they’re giving away for free  
- Promotes sustainability and recycling on campus  

### 11. 🎯 Points / Reputation System
- Users earn **trust points** for:
  - Successful deals  
  - Positive reviews  
  - On-time rental returns  
- High-trust users get highlighted on the platform  

### 12. 📦 Wishlist / Favorites
- Save items to wishlist for future reference  
- View and manage saved items easily  

---

## 🧱 Database Overview

### Key Tables
| Table | Description |
|--------|-------------|
| **User** | Stores student info and authentication data |
| **Item** | Holds details of each listed item |
| **Transaction** | Tracks all purchases |
| **Rental** | Manages rental duration, payment, and status |
| **Wishlist** | Tracks user’s saved items |
| **Review** | Stores item reviews and ratings |
| **Notification** | Manages user notifications |

---

## ⚙️ Project Progress (Milestone Plan)

| Stage | Features | Status |
|--------|-----------|--------|
| **Phase 1 (Backend Setup)** | User Auth, Prisma Models, CRUD for Items, Buy/Sell/Rent Logic | ✅ In Progress |
| **Phase 2 (Enhancements)** | Wishlist, Reviews, Notifications, Points System | ⏳ Planned |
| **Phase 3 (Frontend)** | React UI + Integration + Real-time Chat | ⏳ Planned |
| **Phase 4 (Deployment)** | Production build, Hosting on Vercel/Render + MySQL Cloud | ⏳ Upcoming |

---

## 📚 API Endpoints (Preview)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST /api/auth/register` | Register new user |
| `POST /api/auth/login` | Login and get JWT |
| `GET /api/items` | Get all items |
| `POST /api/items` | Create new item |
| `POST /api/cart/add` | Add item to cart |
| `POST /api/buy` | Buy an item |
| `POST /api/rent` | Rent an item |
| `POST /api/review` | Add a review |
| `GET /api/wishlist` | View wishlist |

---

## 🧠 Future Improvements
- Payment gateway integration (Stripe / Razorpay)
- AI-based item recommendation system
- Delivery partner integration for physical goods
- Admin dashboard for moderation


## 🧾 License
This project is released under the **MIT License** — free for educational and open-source use.

---

