const express = require("express");
const app = express();
const cors = require("cors");

const sellerRoutes = require("./routes/seller.routes");
app.use("/api/seller", sellerRoutes);
app.use(cors());
app.use(express.json());

app.use("/api/seller", sellerRoutes);


app.get("/", (req, res) => res.send("Campus Closet Backend Running "));

const PORT = 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));