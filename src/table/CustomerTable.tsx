import React from 'react';
import {ICustomerRow} from '../App';
import  './CustomerTable.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

interface ICallBackFunc {
    (row: ICustomerRow): (event: any) => void;
}

interface ITableProps {
    rows: ICustomerRow[];
    delete: ICallBackFunc;
    edit: ICallBackFunc;
}

interface IRowProps {
    row: ICustomerRow;
    delete: ICallBackFunc;
    edit: ICallBackFunc;
}

function CustomerRow(props: IRowProps) {
    return (
        <tr key={props.row.id}>
            <td>{props.row.fName}</td>
            <td>{props.row.lName}</td>
            <td>{props.row.age}</td>
            <td>{props.row.device}</td>
            <td><Button onClick={props.edit(props.row)}>Edit</Button></td>
            <td><Button onClick={props.delete(props.row)}>Delete</Button></td>
        </tr>
    );
}

export function CustomerTable(props: ITableProps) {
    const rows = props.rows.map(row => {
        return CustomerRow({row: row, delete: props.delete, edit: props.edit});
    });
    return (
        <Table className="CustomerTable-table" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}
export default CustomerTable;