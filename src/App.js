import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { UserDropdown } from "./components/userdropdown";
import { StatusDropdown } from "./components/statusdropdown";
import { PencilFill } from "react-bootstrap-icons";

function ToDoList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleClear(event) {
    event.preventDefault();
    setItems([]);
  }

  function handleEdit(id, newText) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      })
    );
  }

  function handleSubmit(event) {
    setItems([...items, { id: Date.now(), text: event.target.item.value }]);
    event.preventDefault();
    setInputValue("");
    inputRef.current.focus();
  }

  // This is for the date

  const [date, setDate] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    setDate(`${month} ${day}, ${year}`);
  }, []);

  // This is the end of the date

  // This  is the start of the time code
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // This  is the end of the time code

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>
            {date} | {time.toLocaleTimeString()}
          </h3>

          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
              name="item"
              placeholder=" Add new to do... "
              className="todo-input-form"
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
              value={inputValue}
            />
            <button id="btn" type="submit" disabled={!inputValue}>
              Add
            </button>
            &nbsp;&nbsp;
            <button id="btn" onClick={handleClear}>
              Clear List
            </button>
          </form>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col todo-section">
          <h3>To Do</h3>
          {items.map((item) => (
            <ToDoItem
              key={item.id}
              id={item.id}
              text={item.text}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


function ToDoItem({ id, text, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(event) {
    setIsChecked(event.target.checked);
  }

  function handleSave() {
    onEdit(id, newText);
    setIsEditing(false);
  }



  if (isEditing) {
    return (
      <div className="todo-table-grid">
        <div className="todo-edit">
          <input
            className="editIteminput"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          {"  "}
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="todo">
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            id="todo-checkbox"
          />
        </div>

        <h3 className="todo-text" onClick={() => setIsEditing(true)}>
          {text}
        </h3>

        <div>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
          &nbsp;&nbsp;
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>

        <UserDropdown/>
        <StatusDropdown/>

        
      </div>
    </>
  );
}

export default ToDoList;
