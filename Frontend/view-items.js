async function loadItems() {
    const response = await fetch("http://localhost:3000/items");
    const items = await response.json();

    const container = document.getElementById("items");
    container.innerHTML = "";

    items.forEach(item => {
        const div = document.createElement("div");
        div.style.border = "1px solid black";
        div.style.margin = "10px";
        div.style.padding = "10px";

        div.innerHTML = `
            <strong>${item.itemName}</strong><br>
            Type: ${item.type}<br>
            Description: ${item.description}<br>
            Posted By: ${item.userId.name}<br>
            Date: ${new Date(item.date).toLocaleDateString()}
            function logout() {
    localStorage.removeItem("userId");
    alert("Logged out successfully");
    window.location.href = "login.html";
}

        `;

        container.appendChild(div);
    });
}

loadItems();
