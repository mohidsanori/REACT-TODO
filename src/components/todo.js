import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import './todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Todo = () => {
  const [data, setData] = useState('');
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const storedTodo = localStorage.getItem('todo');

    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);

  const addTodo = () => {
    if (!data) {
      return;
    }

    const newTodo = { text: data, sort: todo.length };
    setTodo([...todo, newTodo]);
    setData('');
  };

   const deleteTodo = (id) => {
    const updatedTodo = todo.filter((_, index) => index !== id);
    setTodo(
      updatedTodo.map((item, index) => ({
        ...item,
        sort: index,
      }))
    );
  };

  const dragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e, id) => {
    const dragId = e.dataTransfer.getData('text/plain');
    const dragIndex = todo.findIndex((_, index) => index === Number(dragId));
    const dropIndex = todo.findIndex((_, index) => index === id);

    const updatedTodo = [...todo];
    const [dragItem] = updatedTodo.splice(dragIndex, 1);
    updatedTodo.splice(dropIndex, 0, dragItem);

    setTodo(
      updatedTodo.map((item, index) => ({
        ...item,
        sort: index,
      }))
    );
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={logo} className="logo" alt="logo" />
            <figcaption>Add your Todos here:</figcaption>
          </figure>
        </div>

        <div className="addItems">
          <input
            type="text"
            placeholder="Add Todo"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <Button onClick={addTodo}>+</Button>
        </div>

        <div className="showItems">
          {todo.map((todoItem, index) => (
            <div
              className="each"
              key={index}
              draggable="true"
              onDragStart={(e) => dragStart(e, index)}
              onDragOver={dragOver}
              onDrop={(e) => drop(e, index)}
            >
              <FontAwesomeIcon
                icon={faBars}
                className="add-btn drag-btn"
                title="Drag Item"
              />
              <h3>{todoItem.text}</h3>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="add-btn"
                title="Delete Item"
                onClick={() => deleteTodo(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
