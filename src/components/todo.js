import React, { useState } from 'react';
import logo from '../images/logo.png';
import './todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Todo = () => {
  const [data, setData] = useState('');
  const [todo, setTodo] = useState([]);
  const [order, setOrder] = useState([]);

  const addTodo = () => {
    if (!data) {
      return;
    }

    setTodo([...todo, data]);
    setOrder([...order, todo.length]);
    setData('');
  };

  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((element, index) => index !== id);
    const updatedOrder = order.filter((index) => index !== id).map((index) => {
      return index > id ? index - 1 : index;
    });
    setTodo(updatedTodo);
    setOrder(updatedOrder);
  };

  const dragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e, id) => {
    const dragId = e.dataTransfer.getData('text/plain');
    const dragIndex = order.findIndex((index) => index === Number(dragId));
    const dropIndex = order.findIndex((index) => index === id);

    const updatedOrder = [...order];
    updatedOrder.splice(dragIndex, 1);
    updatedOrder.splice(dropIndex, 0, Number(dragId));

    setOrder(updatedOrder);
  };

  const dragTodo = (id) => {
    const dragIndex = order.findIndex((index) => index === id);
    const updatedOrder = [...order];
    updatedOrder.splice(dragIndex, 1);
    updatedOrder.push(id);
    setOrder(updatedOrder);
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
          {order.map((index) => {
            const element = todo[index];
            return (
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
                  onMouseDown={() => dragTodo(index)}
                />
                <h3>{element}</h3>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="add-btn"
                  title="Delete Item"
                  onClick={() => deleteTodo(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
