import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

export default function TodoItem({ id, todo, toggleTodo, deleteTodo }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-4 px-5 py-4 border-b
                 dark:border-[#393a4c] cursor-grab
                 hover:bg-gray-50 dark:hover:bg-[#2e3050]"
    >
      {/* Checkbox */}
      <div
        onClick={() => toggleTodo(todo)}
        className={`w-5 h-5 rounded-full flex items-center justify-center
        ${
          todo.completed
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "border"
        }`}
      >
        {todo.completed && (
          <span className="text-white text-xs">✓</span>
        )}
      </div>

      {/* Text */}
      <p
        className={`flex-1 transition-colors ${
          todo.completed
            ? "line-through text-gray-400"
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {todo.title}
      </p>

      {/* Delete */}
      <button
        onClick={() => deleteTodo(todo._id)}
        className="text-gray-400 hover:text-red-500 transition"
      >
        ✕
      </button>
    </motion.div>
  );
}
