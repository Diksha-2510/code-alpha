async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
    } else {
        alert(data.message);
    }
}
async function createPost() {
    const content = document.getElementById("postContent").value;
    const userId = "USER_ID_HERE"; // Replace with logged-in user ID

    const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, content })
    });

    if (response.ok) {
        alert("Post created!");
        location.reload();
    }
}
async function fetchPosts() {
    const response = await fetch("http://localhost:5000/api/posts");
    const posts = await response.json();
    const postsContainer = document.getElementById("posts");

    posts.forEach(post => {
        postsContainer.innerHTML += `
            <div class="post">
                <p>${post.content}</p>
                <button onclick="likePost('${post._id}')">Like (${post.likes.length})</button>
                <button onclick="deletePost('${post._id}')">Delete</button>
                <input type="text" id="comment-${post._id}" placeholder="Add a comment">
                <button onclick="commentPost('${post._id}')">Comment</button>
            </div>
        `;
    });
}

fetchPosts();
async function likePost(postId) {
    const userId = "USER_ID_HERE"; // Replace with logged-in user ID

    await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    });

    alert("Liked!");
    location.reload();
}
async function commentPost(postId) {
    const userId = "USER_ID_HERE"; // Replace with logged-in user ID
    const text = document.getElementById(`comment-${postId}`).value;

    await fetch(`http://localhost:5000/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text })
    });

    alert("Comment added!");
    location.reload();
}
async function sendMessage(receiverId) {
    const senderId = "USER_ID_HERE"; // Replace with logged-in user ID
    const message = document.getElementById("chatMessage").value;

    await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId, message })
    });

    alert("Message sent!");
}
