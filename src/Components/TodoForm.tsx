import React, {Dispatch, SetStateAction, useState} from 'react';
import TodoService from '../TodoService';
import TodoTypes from '../todo';

interface PropType {
    setTodos : Dispatch<SetStateAction<TodoTypes[]>>
}

const TodoForm : React.FC<PropType> = ({setTodos}) => {
    
    const [newTodoText, setNewTodoText] = useState<string>("");
    const handleAddTodo = () => {
        if(newTodoText.trim() !=="") {
            const newTodo = TodoService.addTodos(newTodoText);
    
            setTodos((prevTodo) => [...prevTodo,newTodo]);
            setNewTodoText("");
        }
    }
    

  return (
     <div className="inputForm">

     <input type='text' 
     value={newTodoText}
     onChange={(e) => setNewTodoText(e.target.value)}
     autoFocus = {true}
     placeholder='Add a Task'
     />
     <button onClick={handleAddTodo}>Add</button>

     </div>


  )
}

export default TodoForm
