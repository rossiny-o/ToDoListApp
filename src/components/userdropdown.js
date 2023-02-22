import React, {useState} from 'react';


 export function UserDropdown() {
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

