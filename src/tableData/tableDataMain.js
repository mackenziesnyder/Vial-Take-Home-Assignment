import React, { useState, useEffect } from 'react';
import CreateTable from '../createTable';
import '@mantine/core/styles.css';
import { Button, Checkbox, CloseButton } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import './tableData.css';
import TableToolbar from '../tableToolBar/tableToolBar';
import SearchBar from '../dataHelpers/handleSearch/handleSearchFunction';
import SortOptions from '../dataHelpers/handleSort/handleSort';

// Contains code to display the landing page
// Contains algorithms to sort, filter, and search the patient data
function TableData() {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numOfRows, setNumOfRows] = useState(0); 
  const [originalNumOfRows, setOriginalNumOfRows] = useState(0); 
  const [activeFilters, setActiveFilters] = useState({
    maleChecked: false,
    femaleChecked: false,
    activeChecked: false,
    inactiveChecked: false
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSortClick = () => {
    setIsSortVisible(true);
    setIsFilterVisible(false);
    setIsSearchVisible(false);
  };

  const handleFilterClick = () => {
    setIsFilterVisible(true);
    setIsSearchVisible(false);
    setIsSortVisible(false);
  };

  const handleSearchClick = () => {
    setIsSearchVisible(true);
    setIsFilterVisible(false);
    setIsSortVisible(false);
  };

  const handleClose = () => {
    setIsFilterVisible(false);
    setIsSearchVisible(false);
    setIsSortVisible(false);
  };

  // fetch data
  const fetchSubjects = async () => {
    try {
      const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
      const text = await response.text();
      console.log(text);

      const correctedResponseText = text
        .replace(/^\s*{\s*"data"\s*:\s*/, '')
        .replace(/\s*}\s*$/, '')
        .replace(/{{/g, '{')
        .replace(/}}/g, '}');

      console.log(correctedResponseText);
      const json = JSON.parse(correctedResponseText);
      setSubjects(json);
      setOriginalNumOfRows(json.length);
      setNumOfRows(json.length); 

    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // sort data algorithm
  const sortData = (property, order) => {
    const sortingFunction = (a, b) => {
      if (order === 'asc') {
        if (property === 'age') return a[property] - b[property];
        if (property === 'name' || property === 'gender' || property === 'id' 
          || property === 'status' || property ==='diagnosisDate') {
          return a[property].localeCompare(b[property]);
        }
      } else {
        if (property === 'age') return b[property] - a[property];
        if (property === 'name' || property === 'gender' || property === 'id' 
          || property === 'status' || property === 'diagnosisDate') {
          return b[property].localeCompare(a[property]);
        }
      }
    };
  
    let sortedData;
    if (filteredSubjects.length > 0) {
      sortedData = [...filteredSubjects].sort(sortingFunction);
      setFilteredSubjects(sortedData);
    } else {
      sortedData = [...subjects].sort(sortingFunction);
      setSubjects(sortedData);
    }
  };
  
  
  // Search data algorithm
  const handleSearch = (query) => {
    const filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(query.toLowerCase()) ||
      subject.gender.toLowerCase().includes(query.toLowerCase()) ||
      subject.age.toString().includes(query.toLowerCase()) ||
      subject.diagnosisDate.toLowerCase().includes(query.toLowerCase()) ||
      subject.status.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      setFilteredSubjects([0]);
      setNoResults(true);
      setNumOfRows(filtered.length); 
    } else {
      setFilteredSubjects(filtered);
      setNoResults(false);
      setNumOfRows(filtered.length);
    }
  };

  const removeSearch = () => {
    setFilteredSubjects([]);
    setNoResults(false);
    setNumOfRows(originalNumOfRows); 
  };
  
  const handleFilterChange = (filterName) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  // Filter data algorithm
  const applyFilters = () => {
    let filteredData = subjects;
  
    if (activeFilters.maleChecked || activeFilters.femaleChecked) {
      filteredData = filteredData.filter(subject =>
        (activeFilters.maleChecked && subject.gender === 'Male') ||
        (activeFilters.femaleChecked && subject.gender === 'Female')
      );
    }
  
    if (activeFilters.activeChecked || activeFilters.inactiveChecked) {
      filteredData = filteredData.filter(subject =>
        (activeFilters.activeChecked && subject.status === 'Active') ||
        (activeFilters.inactiveChecked && subject.status === 'Inactive')
      );
    }
  
    if (startDate && endDate) {
      filteredData = filteredData.filter(subject =>
        new Date(subject.diagnosisDate) >= startDate && new Date(subject.diagnosisDate) <= endDate
      );
    }
  
    setNumOfRows(filteredData.length);
  
    if (filteredData.length === 0) {
        setFilteredSubjects([0]);
        setNoResults(true);
      
    } else {
      setFilteredSubjects(filteredData);
      setNoResults(false);
    }
  };
  

  return (
    <div className='container'>
      <div className='left-column'>
        <div className='toolbar'>
          <TableToolbar
            tableName="Patient Data"
            onSortClick={handleSortClick}
            onFilterClick={handleFilterClick}
            onSearchClick={handleSearchClick}
          />
        </div>
        <div className='table-content'>
          <div className="patient-rows-number">
            Displaying {numOfRows} out of {originalNumOfRows} Patients
          </div>
          <div className='table'>
            <CreateTable data={filteredSubjects.length > 0 ? filteredSubjects : subjects} />
          </div>
        </div>
      </div>
      {isSearchVisible || isFilterVisible || isSortVisible ? (
        <div className='right-column'>
          <div className='actions'>
            {isSearchVisible && (
              <div className='section'>
                <div className='section-header'>
                  Search Patient Data
                  <div className="close-button-container">
                    <CloseButton
                      className="close-button"
                      onClick={handleClose}
                    />
                  </div>
                </div>
                <SearchBar onSearch={handleSearch} removeSearch={removeSearch} />
                {noResults && 
                  <div className="no-results-message">
                      No results found.
                  </div>}
              </div>
            )}
            {isFilterVisible && (
              <div className='section'>
                <div className='section-header'>
                  Filter Patient Data
                  <div className="close-button-container">
                    <CloseButton
                      className="close-button"
                      onClick={handleClose}
                    />
                  </div>
                </div>
                <div className='filter-group'>
                  <div className="filter-group-title">Filter by Gender</div>
                  <div className="check-box-group">
                    <div className="check-box-container">
                      <Checkbox
                        checked={activeFilters.maleChecked}
                        onChange={() => handleFilterChange('maleChecked')}
                        name="male"
                        label="Male"
                      />
                    </div>
                    <div className="check-box-container">
                      <Checkbox
                        checked={activeFilters.femaleChecked}
                        onChange={() => handleFilterChange('femaleChecked')}
                        name="female"
                        label="Female"
                      />
                    </div>
                  </div>
                </div>
                <div className='filter-group'>
                  <div className="filter-group-title">Filter by Date</div>
                  <div className="instructions">
                    Select the Year, Month, and Day to filter by date.
                    Selecting the time is optional.
                  </div>
                  <div className="date-time-picker-container">
                    <DateTimePicker
                      label="Start Date:"
                      value={startDate}
                      onChange={setStartDate}
                    />
                    <DateTimePicker
                      label="End Date:"
                      value={endDate}
                      onChange={setEndDate}
                    />
                  </div>
                  {noResults && 
                  <div className="no-results-message">
                    No results found. Please expand the date range.
                  </div>}
                </div>
                <div className='filter-group'>
                  <div className="filter-group-title">Filter by Status</div>
                  <div className="check-box-group">
                    <div className="check-box-container">
                      <Checkbox
                        checked={activeFilters.activeChecked}
                        onChange={() => handleFilterChange('activeChecked')}
                        name="active"
                        label="Active"
                      />
                    </div>
                    <div className="check-box-container">
                      <Checkbox
                        checked={activeFilters.inactiveChecked}
                        onChange={() => handleFilterChange('inactiveChecked')}
                        name="inactive"
                        label="Inactive"
                      />
                    </div>
                  </div>
                </div>
                <div className='filter-buttons'>
                  <div className="button-container">
                    <Button onClick={applyFilters}>Apply Filters</Button>
                  </div>
                </div>
              </div>
            )}
            {isSortVisible && (
              <div className='section'>
                <div className='section-header'>
                  Sort Patient Data
                  <div className="close-button-container">
                    <CloseButton
                      className="close-button"
                      onClick={handleClose}
                    />
                  </div>
                </div>
                <SortOptions
                  sortData={sortData}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TableData;
