document.getElementById("itemForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please login to post items");
        return;
    }

    const itemName = document.getElementById("itemName").value.trim();
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value.trim();

    if (!itemName || !description) {
        document.getElementById("msg").innerText = "All fields are required";
        return;
    }

    const response = await fetch("http://localhost:3000/post-item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            itemName,
            type,
            description,
            userId
        })
    });

    const data = await response.json();
    document.getElementById("msg").innerText = data.message;
});
