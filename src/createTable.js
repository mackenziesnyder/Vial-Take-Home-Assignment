import React from 'react';
import { Table, TableTd, TableTh, TableTr } from '@mantine/core';

// Contains code to create the patient table
function CreateTable({ data }) {
  return (
    <div style={{ maxHeight: '75vh', overflowY: 'auto' }}>
      <Table withColumnBorders>
        <thead style={{ backgroundColor: '#228be6', color:'white', position: 'sticky', top: 0, zIndex: 1}}>
          <TableTr>
            <TableTh>ID</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Age</TableTh>
            <TableTh>Gender</TableTh>
            <TableTh>Diagnosis Date</TableTh>
            <TableTh>Status</TableTh>
          </TableTr>
        </thead>
        <tbody>
          {data.map((subject, index) => (
            <TableTr
              key={subject.id}
              style={{ backgroundColor: index % 2 === 0 ? 'white' : 'lightgrey' }}
            >
              <TableTd>{subject.id}</TableTd>
              <TableTd>{subject.name}</TableTd>
              <TableTd>{subject.age}</TableTd>
              <TableTd>{subject.gender}</TableTd>
              <TableTd>{subject.diagnosisDate}</TableTd>
              <TableTd>{subject.status}</TableTd>
            </TableTr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CreateTable;
