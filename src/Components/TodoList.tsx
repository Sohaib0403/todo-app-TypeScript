import { useState } from "react";
import React from 'react';
import TodoTypes from "../todo";
import TodoService from "../TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>("");

  // function for editing actions

  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleEditCancle = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editingTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        text: editingTodoText,
        completed: false,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditingTodoId(null);
      setEditingTodoText("");
    }
  };

  //Delete function
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <div className='"todoContainer'>
      <div>
        <TodoForm setTodos={setTodos}/>
      </div>

      {todos.map((todo) => (
        <div className="items" key={todo.id}>
          {editingTodoId == todo.id ? (
            <div className="editedText">
              <input
                type="text"
                value={editingTodoText}
                onChange={(e) => setEditingTodoText(e.target.value)}
                autoFocus={true}
              />
              <button
                className="saveBtn"
                onClick={() => handleEditSave(todo.id)}
              >
                <FaCheck />
              </button>

              <button className="cancleBtn" onClick={() => handleEditCancle()}>
                <GiCancel />
              </button>
            </div>
          ) : (
            <div className="ediBtn">
              <span>{todo.text}</span>
              <button onClick={() => handleEditStart(todo.id, todo.text)}>
                <FaEdit />
              </button>
            </div>
          )}

          <button onDoubleClick={() => handleDeleteTodo(todo.id)}>
            <RiDeleteBin5Fill />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
