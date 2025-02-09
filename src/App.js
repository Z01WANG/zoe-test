import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';
import * as LucideIcons from "lucide-react"; 

function App() {
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // 控制彈窗顯示
  const [todos, setTodos] = useState([]); // Todo List 狀態
  const [inputValue, setInputValue] = useState(""); // 輸入框狀態

  // 當 count 變更時，執行 useEffect
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  // 頁面載入時讀取 localStorage 的數值
  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    if (savedCount !== null) {
      setCount(parseInt(savedCount, 10));
    }

    // 讀取 localStorage 的 Todo List
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // 點擊減少按鈕時的處理
  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setShowPopup(true);
    }
  };

  // 新增 Todo
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodos = [...todos, { text: inputValue, completed: false }];
    setTodos(newTodos);
    setInputValue("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // 切換 Todo 完成狀態
  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // 刪除 Todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="App bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <header className="App-header">
        <ul className="flex">
          <li className="mr-2">item1</li>
          <li>item2</li>
        </ul>
      </header>

      <main>
        {/* 計數器區塊 */}
        <section className='flex flex-col items-center justify-center mb-8'>
          <h2 className='font-bold my-4 text-center'>數字增減</h2>
          <div className="counter flex items-center p-3">
            <button className='newBtn' onClick={handleDecrease}>
              <LucideIcons.ChevronLeft size={24} />
            </button>
            <div className="count px-3 w-[100px] text-center">{count}</div>
            <button className='newBtn' onClick={() => setCount(count + 1)}>
              <LucideIcons.ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* Todo List 區塊 */}
        <section className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold text-center mb-4">Todo List</h2>
          
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l"
              placeholder="新增待辦事項..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
              onClick={addTodo}
            >
              <LucideIcons.Plus size={20} />
            </button>
          </div>

          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-2 border-b ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                <span
                  className="flex-1 cursor-pointer"
                  onClick={() => toggleTodo(index)}
                >
                  {todo.text}
                </span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteTodo(index)}
                >
                  <LucideIcons.Trash size={18} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Popup 彈窗 */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold text-red-600">數字不能小於 0！</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              確定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
