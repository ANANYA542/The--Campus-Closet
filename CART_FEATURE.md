# Shopping Cart Feature

## Overview
A modern, beautiful shopping cart interface for The Campus Closet marketplace, inspired by contemporary e-commerce design patterns.

## Features

### Frontend Components
- **Cart Page** (`/cart`) - Main shopping cart interface
- **Cart Service** - API integration for cart operations
- **Navigation Integration** - Cart link in navbar with icon

### Functionality
1. **View Cart** - Display all items in user's cart
2. **Remove Items** - Remove individual items from cart
3. **Quantity Display** - Show quantity for each item
4. **Price Calculation** - Automatic subtotal and total calculation
5. **Checkout** - Process cart checkout and create transactions
6. **Empty State** - Beautiful empty cart display

### Design Features
- ✨ Modern gradient purple theme (#667eea to #764ba2)
- 🎨 Smooth animations and transitions
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎯 Premium aesthetic with glassmorphism effects
- 💫 Hover effects and micro-interactions
- 🔒 Security badge for trust

## API Endpoints Used

### GET `/api/cart/:userId`
Fetches all cart items for a user

### POST `/api/cart`
Adds an item to the cart
```json
{
  "userId": 1,
  "itemId": 5,
  "quantity": 1
}
```

### DELETE `/api/cart/:id`
Removes a cart item by ID

### POST `/api/cart/checkout`
Processes checkout for all cart items
```json
{
  "userId": 1
}
```

## File Structure

```
frontend/src/
├── pages/
│   ├── Cart.jsx          # Main cart component
│   └── Cart.css          # Cart styling
├── services/
│   └── cartService.js    # Cart API calls
├── components/
│   └── NavBar.jsx        # Updated with cart link
└── App.jsx               # Updated with cart route
```

## Usage

### Accessing the Cart
1. User must be authenticated
2. Click "Cart" button in navigation bar
3. Cart page displays at `/cart`

### Adding Items to Cart
Items can be added to cart from product listings (to be implemented in product pages)

### Checkout Process
1. Review items in cart
2. Click "Proceed to Checkout"
3. System creates transactions for all items
4. Items marked as "sold"
5. Cart is cleared
6. User receives confirmation

## Design Inspiration
The design takes inspiration from modern e-commerce platforms with:
- Clean, spacious layouts
- Premium color gradients
- Smooth animations
- Trust indicators (security badges)
- Clear call-to-action buttons

## Responsive Breakpoints
- **Desktop**: 1024px and above (2-column layout)
- **Tablet**: 768px - 1024px (single column)
- **Mobile**: Below 768px (optimized mobile layout)

## Future Enhancements
- [ ] Update quantity directly in cart
- [ ] Save for later functionality
- [ ] Apply promo codes
- [ ] Estimated delivery dates
- [ ] Cart item count badge in navbar
- [ ] Persist cart across sessions
- [ ] Add to cart animations
- [ ] Product recommendations

## Notes
- Cart uses `userId` from localStorage
- Images are displayed if available in item data
- Free shipping is currently default
- Checkout creates immediate transactions (no payment gateway yet)
