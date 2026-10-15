import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add new task
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = task.trim();
    if (!title) return;

    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTask("");
  };

  // Mark task complete or incomplete
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete task
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Start editing task
  const startEdit = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const title = editText.trim();
    if (!title) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, title } : todo
      )
    );

    setEditingId(null);
    setEditText("");
  };

  // Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app">
      <header className="header">
        <div className="logo">TaskMate</div>
      </header>

      <p className="subtitle">Small steps every day lead to big results.</p>

      {/* Dashboard Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <span>Total Tasks</span>
          <h2>{todos.length}</h2>
        </div>
        <div className="stat-card">
          <span>Remaining</span>
          <h2>{remaining}</h2>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <h2>{completedCount}</h2>
        </div>
      </div>

      {/* Main Task Section */}
      <div className="task-section">
        <h3>My Tasks</h3>
        <p>Keep track of what matters today.</p>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">+ Add Task</button>
        </form>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
          <span className="task-count">{filteredTodos.length} tasks</span>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="task-item">
              {editingId === todo.id ? (
                <form onSubmit={saveEdit} className="edit-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className={todo.completed ? "completed-text" : ""}>
                      {todo.title}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => startEdit(todo.id, todo.title)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;