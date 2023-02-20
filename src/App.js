import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function ToDoList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // this will store data in session storage

  useEffect(() => {
    // Retrieve the data from sessionStorage and update the state
    const savedInputValue = sessionStorage.getItem("inputValue");
    if (savedInputValue) {
      setInputValue(savedInputValue);
    }
  }, []);

  useEffect(() => {
    // Store the data in sessionStorage whenever the inputValue changes
    sessionStorage.setItem("inputValue", inputValue);
  }, [inputValue]);

  //   end of storing data in session storage

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

  function handleSave() {
    onEdit(id, newText);
    setIsEditing(false);
  }

  function Table() {
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");


    const users = [
      { id: 1, name: "John Doe", email: "johndoe@example.com" },
      { id: 2, name: "Jane Doe", email: "janedoe@example.com" },
      { id: 3, name: "Jim Smith", email: "jimsmith@example.com" },
      { id: 4, name: "Alice Johnson", email: "alicejohnson@example.com" },
      { id: 5, name: "Bob Williams", email: "bobwilliams@example.com" },
      { id: 6, name: "Carol Davis", email: "caroldavis@example.com" },
      { id: 7, name: "David Brown", email: "davidbrown@example.com" },
      { id: 8, name: "Emily Wilson", email: "emilywilson@example.com" },
      { id: 9, name: "Frank Taylor", email: "franktaylor@example.com" },
      { id: 10, name: "Grace Lee", email: "gracelee@example.com" },
      { id: 11, name: "Henry Clark", email: "henryclark@example.com" },
      { id: 12, name: "Isabel Martinez", email: "isabelmartinez@example.com" },
    ];
  
    const status = [
      { id: 1, state: "Stuck" },
      { id: 2, state: "In Progress" },
      { id: 3, state: "Done" },
    ];
    

    function handleChange(event) {
      setIsChecked(event.target.checked);
    }

    function handleUserSelectChange(event) {
      setSelectedUser(event.target.value);
    }

    function handleStatusSelectChange(event) {
      setSelectedStatus(event.target.value);
    }

    return (
      <div className="table">
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            id="todo-checkbox"
          />
        </div>
        <div className="todo">
          <span className="todo-text" onClick={() => setIsEditing(true)}>
            {text}
          </span>
        </div>
        &nbsp;&nbsp;
        <div>
          <label htmlFor="dropdown1">
            <select
               value={selectedUser}
              onChange={handleUserSelectChange}
              className="dropdown1"
            >
              <option value="">Select user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

         
        </div>
        &nbsp;&nbsp;
        <div>
          <label htmlFor="dropdown2">
            <select
              value={selectedStatus}
              onChange={handleStatusSelectChange}
              className="dropdown2"
            >
              <option value="">Select status...</option>
              {status.map((status) => (
                <option key={status.id} value={status.state}>
                  {status.state}
                </option>
              ))}
            </select>
          </label>
        </div>
        &nbsp;&nbsp;
        <div>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
          &nbsp;&nbsp;
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
    );
  }

  

  //   useEffect(() => {
  //     console.table(users);
  //     console.table(status);
  //   }, [users, status]);

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

  const test = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Doe", email: "janedoe@example.com" },
    { id: 3, name: "Jim Smith", email: "jimsmith@example.com" }
  ];

  return (
    <div className="todo-tablegrid">
      <label htmlFor="checkbox" className={isChecked ? "todo-text-strike" : ""}>
        <Table />
      </label>

      <Dropdown />

      <label>
            <select>
              {test.map( user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </label>
    </div>
  );

  // test extra code
}

function Dropdown() {

  const [selectedUser, setSelectedUser] = useState("");

  function handleUserSelectChange(event) {
    setSelectedUser(event.target.value);
  }

  const users = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Doe", email: "janedoe@example.com" },
    { id: 3, name: "Jim Smith", email: "jimsmith@example.com" },
    { id: 4, name: "Alice Johnson", email: "alicejohnson@example.com" },
    { id: 5, name: "Bob Williams", email: "bobwilliams@example.com" },
    { id: 6, name: "Carol Davis", email: "caroldavis@example.com" },
    { id: 7, name: "David Brown", email: "davidbrown@example.com" },
    { id: 8, name: "Emily Wilson", email: "emilywilson@example.com" },
    { id: 9, name: "Frank Taylor", email: "franktaylor@example.com" },
    { id: 10, name: "Grace Lee", email: "gracelee@example.com" },
    { id: 11, name: "Henry Clark", email: "henryclark@example.com" },
    { id: 12, name: "Isabel Martinez", email: "isabelmartinez@example.com" },
  ];

  return (

    <div>
          <label htmlFor="dropdown1">
            <select
               value={selectedUser}
              onChange={handleUserSelectChange}
              className="dropdown1"
            >
              <option value="">Select user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

         
        </div>

  );

}

export default ToDoList;
