const express = require("express");
const app = express();
const cors = require("cors");

const sellerRoutes = require("./routes/seller.routes");
const buyerRoutes = require("./routes/buyer.routes");
const interactionRoutes = require("./routes/interaction.routes");



app.use(cors());
app.use(express.json());

app.use("/api/seller", sellerRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/interaction", interactionRoutes);


app.get("/", (req, res) => res.send("Campus Closet Backend Running "));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));