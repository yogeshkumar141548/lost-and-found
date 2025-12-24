Backend – Get All Items API (server.js)

app.get("/items", async (req, res) => {
    const items = await Item.find().populate("userId", "name");
    res.json(items);
});
