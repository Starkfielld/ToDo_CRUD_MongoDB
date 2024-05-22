/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Create from './create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Certifique-se de que está importando os ícones corretamente

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo._id === id);
    const updatedTodo = { ...todoToEdit, done: !todoToEdit.done };

    axios.put(`http://localhost:3000/update/${id}`, updatedTodo)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err));
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(result => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };
  return (
    <div className='home'>
      <h2>Todo list</h2>
      <Create />
      {
        todos.length === 0 ? (
          <div><h2>Não há dados</h2></div>
        ) : (
          todos.map((todo, index) => (
            <div className='tarefa' key={index}>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done ? 
                  <BsFillCheckCircleFill className='icon' /> :
                  <BsCircleFill className='icon' />
                }
                <p className={todo.done ? "line_through":""}>{todo.tarefa}</p>
              </div>
              <div>
                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}

export default Home;
