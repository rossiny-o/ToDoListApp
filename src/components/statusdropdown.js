import React, {useState} from 'react';

export function StatusDropdown() {
    const [selectedStatus, setSelectedStatus] = useState("");
  
    function handleStatusSelectChange(event) {
      setSelectedStatus(event.target.value);
    }
  
    const status = [
      { id: 1, state: "Stuck" },
      { id: 2, state: "In Progress" },
      { id: 3, state: "Done" },
    ];
  
    return (
      <div>
        <label htmlFor="dropdown1">
          <select
            value={selectedStatus}
            onChange={handleStatusSelectChange}
            className="dropdown1"
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
    );
  }
  
  export default StatusDropdown;