document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        document.getElementById("msg").innerText = "All fields are required";
        return;
    }

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    document.getElementById("msg").innerText = data.message;

    if (data.success) {
        // Save login status
        localStorage.setItem("userId", data.userId);
    }
});
