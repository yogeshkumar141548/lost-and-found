Backend – Item Schema (server.js)


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
