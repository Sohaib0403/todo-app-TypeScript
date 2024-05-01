import {FaPen, FaClipboardList} from "react-icons/fa";
import TodoList from "./Components/TodoList";
import "./CSS/App.css"
import "./CSS/TodoForm.css"
import "./CSS/TodoList.css"





function App() {
  

  return (
    <div className="app">
      <div className="header">
        <div className="logoside">
          <FaPen />
          <h1>What ToDo</h1>
          <FaClipboardList/>
        </div>
      </div>
      <TodoList/>
    </div>
  )

}

export default App
