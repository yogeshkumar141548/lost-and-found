
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

