import { AnimatePresence } from "framer-motion";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import TodoItem from "./TodoItem";


export default function TodoCard({
  todos,
  setTodos,
  filter,
  setFilter,
  toggleTodo,
  deleteTodo,
  clearCompleted,
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex(
      (todo) => todo._id === active.id
    );
    const newIndex = todos.findIndex(
      (todo) => todo._id === over.id
    );

    setTodos((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="bg-white dark:bg-[#25273c] rounded-md shadow overflow-hidden">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todos.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence>
  {todos.map((todo) => (
    <TodoItem
      key={todo._id}
      id={todo._id}
      todo={todo}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
    />
  ))}
</AnimatePresence>
        </SortableContext>
      </DndContext>

      {/* FOOTER */}
      <div className="flex justify-between items-center px-5 py-4 text-sm
                      text-gray-500 dark:text-gray-400
                      border-t dark:border-[#393a4c]">
        <span>{todos.filter(t => !t.completed).length} items left</span>

        <div className="flex gap-4 font-semibold">
          <button onClick={() => setFilter("all")}
            className={filter === "all" ? "text-blue-500" : ""}>
            All
          </button>
          <button onClick={() => setFilter("active")}
            className={filter === "active" ? "text-blue-500" : ""}>
            Active
          </button>
          <button onClick={() => setFilter("completed")}
            className={filter === "completed" ? "text-blue-500" : ""}>
            Completed
          </button>
        </div>

        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}
