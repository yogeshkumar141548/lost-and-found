// server.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 1️⃣ Connect to MongoDB
mongoose.connect(
  "mongodb+srv://yogeshkumar141548_db_user:<db_password>@cluster0.pzee1hn.mongodb.net/lostfound?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("MongoDB Atlas connected"))
.catch((err) => console.log(err));

})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// 2️⃣ User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", UserSchema);

// 3️⃣ Item Schema
const ItemSchema = new mongoose.Schema({
    itemName: String,
    type: String,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Item = mongoose.model("Item", ItemSchema);

// 4️⃣ Registration API
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ message: "All fields are required" });
    }

    if (password.length < 6) {
        return res.json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();
    res.json({ message: "Registration successful" });
});

// 5️⃣ Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ message: "Invalid password" });
    }

    res.json({
        success: true,
        message: "Login successful",
        userId: user._id
    });
});

// 6️⃣ Post Item API
app.post("/post-item", async (req, res) => {
    const { itemName, type, description, userId } = req.body;

    if (!itemName || !type || !description || !userId) {
        return res.json({ message: "All fields are required" });
    }

    const item = new Item({
        itemName,
        type,
        description,
        userId
    });

    await item.save();
    res.json({ message: "Item posted successfully" });
});

// 7️⃣ Get All Items API
app.get("/items", async (req, res) => {
    const items = await Item.find().populate("userId", "name");
    res.json(items);
});

// 8️⃣ Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
