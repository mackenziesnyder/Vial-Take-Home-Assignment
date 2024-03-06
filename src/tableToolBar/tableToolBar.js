import React from 'react';
import { Button, Group } from '@mantine/core';
import './tableToolBar.css';

function TableToolbar({ tableName, onSortClick, onFilterClick, onSearchClick }) {

  return (
    <div className="table-toolbar">
        <div className="button-container">
          <div className="toolbar-left">
            <h2>{tableName}</h2>
          </div>
          <div className="toolbar-right">
            <Group>
              <Button onClick={onSortClick}>Sort</Button>
              <Button onClick={onFilterClick}>Filter</Button>
              <Button onClick={onSearchClick}>Search</Button>
            </Group>
          </div>
        </div>
    </div>
  );
}

export default TableToolbar;


