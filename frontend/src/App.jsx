import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoCard from "./components/TodoCard";
import { motion } from "framer-motion";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // 🌙 THEME STATE
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // APPLY THEME TO <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // FETCH TODOS
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ADD TODO
  const addTodo = async () => {
    if (!title.trim()) return;

    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const newTodo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
    setTitle("");
  };

  // TOGGLE TODO
  const toggleTodo = async (todo) => {
    await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos();
  };

  // DELETE TODO
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  // CLEAR COMPLETED
  const clearCompleted = async () => {
    await fetch("http://localhost:5000/api/todos/completed", {
      method: "DELETE",
    });
    fetchTodos();
  };

  // FILTER LOGIC
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#181824] transition-colors">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-72 bg-gradient-to-r from-purple-500 to-blue-500
             dark:from-[#371c58] dark:to-[#181824]"
      >
        <div className="max-w-xl mx-auto px-6 pt-16 flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold tracking-[0.35em]">
            TODO
          </h1>

          {/* 🌙 THEME TOGGLE */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-white text-2xl hover:scale-110 transition"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* INPUT */}
        <div className="max-w-xl mx-auto px-6 mt-10">
          <TodoInput title={title} setTitle={setTitle} addTodo={addTodo} />
        </div>
      </motion.header>

      {/* TODO LIST */}
      <main className="max-w-xl mx-auto px-6 -mt-20">
        <TodoCard
          todos={filteredTodos}
          setTodos={setTodos} // ✅ ADD THIS
          filter={filter}
          setFilter={setFilter}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          clearCompleted={clearCompleted}
        />
      </main>
    </div>
  );
}

export default App;
