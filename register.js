document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic validation
    if (!name || !email || !password) {
        document.getElementById("msg").innerText = "All fields are required";
        return;
    }

    if (password.length < 6) {
        document.getElementById("msg").innerText = "Password must be at least 6 characters";
        return;
    }

    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    document.getElementById("msg").innerText = data.message;
});
