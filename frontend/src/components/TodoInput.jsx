export default function TodoInput({ title, setTitle, addTodo }) {
  return (
    <div className="bg-white dark:bg-[#25273c] rounded-md shadow flex items-center gap-4 px-4 py-4">
      <div className="w-5 h-5 rounded-full border"></div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
        placeholder="Create a new todo..."
        className="flex-1 outline-none bg-transparent text-gray-600 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
}


