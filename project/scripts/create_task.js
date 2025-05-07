import { createTodo } from "../lib/mock_api.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#todo_form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const postData = {
                id: Date.now().toString(),
                title: document.getElementById("todo-title").value,
                desc: document.getElementById("todo-match").value,
                category: document.getElementById("todo-category").value,
                priority: document.getElementById("todo-priority").value,
                is_done: false,
                createdAt: new Date().toISOString(),
                due_date: document.getElementById("todo-due").value,
            };

            try {
                await createTodo(postData);
                alert("Todo created successfully!");
                form.reset();
                window.location.href = "./index.html"; // Redirect to the task list page
            } catch (error) {
                console.error("Error creating todo:", error);
                alert("Failed to create todo. Please try again.");
            }
        });
    }
});