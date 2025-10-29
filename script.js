// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// 🔑 MongoDB Atlas connection
const mongoURI = "mongodb+srv://prasannasalunkhe2288_db_user:<db_password>@mykitchen.rqu5bpn.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=Mykitchen";

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ Error connecting to MongoDB:", err));

// ✅ Example Schema (Menu Items)
const menuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Menu = mongoose.model("Menu", menuSchema);

// ✅ Routes
app.get("/", (req, res) => {
    res.send("🍴 Restaurant backend is running!");
});

// Add menu item
app.post("/add-item", async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const newItem = new Menu({ name, price, category });
        await newItem.save();
        res.send("✅ Item added to menu!");
    } catch (error) {
        res.status(500).send("❌ Error adding item: " + error.message);
    }
});

// Get menu items
app.get("/menu", async (req, res) => {
    try {
        const items = await Menu.find();
        res.json(items);
    } catch (error) {
        res.status(500).send("❌ Error fetching menu: " + error.message);
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
