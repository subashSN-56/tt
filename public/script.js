
const API_URL = "http://localhost:3000/api/todos"; // Works both locally and on Render

// Fetch all todos
async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.task}
      <button onclick="deleteTodo('${todo._id}')">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

// Add new todo
document.getElementById("todoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const task = document.getElementById("task").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });

  document.getElementById("todoForm").reset();
  fetchTodos();
});

// Delete a todo
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  fetchTodos();
}

window.onload = fetchTodos;
