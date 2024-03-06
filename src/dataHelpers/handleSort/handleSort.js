import React, { useState } from 'react';
import './handleSort.css';

// Contains code to show sort module
function SortOptions({ sortData}) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const getArrowIcon = (dropdownName) => {
    return activeDropdown === dropdownName ? "▲" : "▼";
  };

  return (
    <div>
      <div className="sort-section">
        <div className="sort-header" onClick={() => handleDropdownToggle("id")}>
          Sort by ID {getArrowIcon("id")}
        </div>
        {activeDropdown === "id" && (
          <div className="dropdown-menu">
            <button onClick={() => sortData('id', 'asc')}>Ascending</button>
            <button onClick={() => sortData('id', 'desc')}>Descending</button>
          </div>
        )}
      </div>

      <div className="sort-section">
        <div className="sort-header" onClick={() => handleDropdownToggle("name")}>
          Sort by Name {getArrowIcon("name")}
        </div>
        {activeDropdown === "name" && (
          <div className="dropdown-menu">
            <button onClick={() => sortData('name', 'asc')}>A-Z</button>
            <button onClick={() => sortData('name', 'desc')}>Z-A</button>
          </div>
        )}
      </div>

      <div className="sort-section">
        <div className="sort-header" onClick={() => handleDropdownToggle("age")}>
          Sort by Age {getArrowIcon("age")}
        </div>
        {activeDropdown === "age" && (
          <div className="dropdown-menu">
            <button onClick={() => sortData('age', 'asc')}>Low - High</button>
            <button onClick={() => sortData('age', 'desc')}>High - Low</button>
          </div>
        )}
      </div>

      <div className="sort-section">
        <div className="sort-header" onClick={() => handleDropdownToggle("gender")}>
          Sort by Gender {getArrowIcon("gender")}
        </div>
        {activeDropdown === "gender" && (
          <div className="dropdown-menu">
            <button onClick={() => sortData('gender', 'asc')}>Females First</button>
            <button onClick={() => sortData('gender', 'desc')}>Males First</button>
          </div>
        )}
      </div>

      <div className="sort-section">
        <div className="sort-header" onClick={() => handleDropdownToggle("date")}>
          Sort by Date {getArrowIcon("date")}
        </div>
        {activeDropdown === "date" && (
          <div className="dropdown-menu">
            <button onClick={() => sortData('diagnosisDate', 'asc')}>Old - New</button>
            <button onClick={() => sortData('diagnosisDate', 'desc')}>New - Old</button>
          </div>
        )}
      </div>

      <div className="sort-section">
        <div className="sort-header" onClick={() => handleDropdownToggle("status")}>
          Sort by Status {getArrowIcon("status")}
        </div>
        {activeDropdown === "status" && (
          <div className="dropdown-menu">
            <button  onClick={() => sortData('status', 'asc')}>Active - Inactive</button>
            <button  onClick={() => sortData('status', 'desc')}>Inactive - Active</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SortOptions;


