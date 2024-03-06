import React from 'react';
import ReactDOM from 'react-dom';
import TableData from './tableData/tableDataMain';
import reportWebVitals from './reportWebVitals';
import { MantineProvider, DEFAULT_THEME } from '@mantine/core';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={DEFAULT_THEME}>
      <TableData />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

