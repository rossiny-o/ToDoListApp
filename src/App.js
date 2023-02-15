import React, { useState, useEffect, useRef } from "react";
import "./App.css";

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
					<h5>
						{date} | {time.toLocaleTimeString()}
					</h5>

					<hr />
				</div>
			</div>

			<div className="row">
				<div className="col">
					<form className="add-todo-form" onSubmit={handleSubmit}>
						<input
							name="item"
							placeholder="New Todo... "
							className="todo-input-form"
							onChange={(e) => setInputValue(e.target.value)}
							ref={inputRef}
							value={inputValue}
						/>
						
							<button id="btn" type="submit" disabled={!inputValue}>
								Add
							</button>&nbsp;&nbsp;
							<button id="btn" onClick={handleClear}>
								Clear List
							</button>
						
					</form>
					<hr />
				</div>
			</div>

			<div className="row">
				<div className="col k">
					{/* <table className="table-titles">
            <th>-To Do-</th>
            <th>-People-</th>
            <th>-Status-</th>
            </table> */}
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

	function handleChange(event) {
		setIsChecked(event.target.checked);
	}

	function Table() {
		return (
			<div className="table">
				<td className="todo">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={handleChange}
						id="todo-checkbox"
					/>

					<span className="todo-text" onClick={() => setIsEditing(true)}>
						{text}
					</span>
					{/* <h6 className="timestamp">{time}</h6> */}
				</td>

				<td className="user">
					<label for="dropdown">
						<select className="dropdown">
							{users.map((user) => (
								<option>{user.name}</option>
							))}
						</select>
					</label>

					<label for="dropdown">
						<select className="dropdown">
							{status.map((status) => (
								<option>{status.state}</option>
							))}
						</select>
					</label>
				</td>
			</div>
		);
	}

	const users = [
		{ id: 1, name: "Myself" },
		{ id: 2, name: "John Doe", email: "johndoe@example.com" },
		{ id: 3, name: "Jane Doe", email: "janedoe@example.com" },
		{ id: 4, name: "Jim Smith", email: "jimsmith@example.com" },
		{ id: 5, name: "Alice Johnson", email: "alicejohnson@example.com" },
		{ id: 6, name: "Bob Williams", email: "bobwilliams@example.com" },
		{ id: 7, name: "Carol Davis", email: "caroldavis@example.com" },
		{ id: 8, name: "David Brown", email: "davidbrown@example.com" },
		{ id: 9, name: "Emily Wilson", email: "emilywilson@example.com" },
		{ id: 10, name: "Frank Taylor", email: "franktaylor@example.com" },
		{ id: 11, name: "Grace Lee", email: "gracelee@example.com" },
		{ id: 12, name: "Henry Clark", email: "henryclark@example.com" },
		{ id: 13, name: "Isabel Martinez", email: "isabelmartinez@example.com" },
	];

	const status = [
		{ id: 1, state: "Not Started" },
		{ id: 2, state: "In Progress" },
		{ id: 3, state: "Done" },
	];

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
		<div className="todo-table-grid">
			<label htmlFor="checkbox" className={isChecked ? "todo-text-strike" : ""}>
				<Table />
			</label>
		</div>
	);

	// test extra code
}

export default ToDoList;
