import React, { useState, useEffect, useRef } from "react";
import "./App.css";
// import image from "./deskspace.png";
// import {Carous} from "react-bootstrap";

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

  

  console.log(`this is the items array: ${items.id} , ${items.text}`);

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
    setDate(` Today is ${month} ${day}, ${year}!`);
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
        <div className="col image-content">
            {/* <img className="image" width={350} src={image} alt="todo-list-img" /> */}
        </div>

        <div className="col">

          <h5>{date}</h5>
          <h4>{time.toLocaleTimeString()}</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              name="item"
              placeholder="New Todo... "
              className="newIteminput"
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
              value={inputValue}
            />
            <button id="btn" type="submit" disabled={!inputValue}>
              Add
            </button>
            <button id="btn" onClick={handleClear}>
              Clear List
            </button>
          </form>
          <hr />
          <h6>-To Do-</h6>
          <ul>
            {items.map((item) => (
              <ToDoItem
                key={item.id}
                id={item.id}
                text={item.text}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        </div>
      </div>

      
    </div>
  );
}

function ToDoItem({ id, text, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [isChecked, setIsChecked] = useState(false);

  function handleSave() {
    onEdit(id, newText);
    setIsEditing(false);
  }

  function handleChange(event) {
    setIsChecked(event.target.checked);
  }

  if (isEditing) {
    return (
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
    );
  }

  return (
    <ul className="list-items">
      <label htmlFor="checkbox" className={isChecked ? "todo-text-strike" : ""}>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />

        <span className="todo-text" onClick={() => setIsEditing(true)}>
          {text}
        </span>
        {/* <h6 className="timestamp">{time}</h6> */}
      </label>
    </ul>
  );

  // test extra code
}

export default ToDoList;
