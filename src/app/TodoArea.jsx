import {useState} from 'react';
// import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddModal from './AddModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import dayjs from 'dayjs';
import { red } from '@mui/material/colors';
import Storage from './Storage';

const saveKey = "TODO_LIST_SAVE_KEY";

let _rows = [
    createData('Feed the cat', 'Do it ASAP', dayjs("2024-1-13").format('YYYY/MM/DD').toString(), dayjs("2024-1-13").format('YYYY/MM/DD').toString(), "Allen", "done"),
    createData('Do the dishes', 'Mom is angry already', dayjs("2024-2-20").format('YYYY/MM/DD').toString(), dayjs("2024-2-21").format('YYYY/MM/DD').toString(), "Eric", "progressing"),
    createData('Throw the trash out', 'It stinks', dayjs().format('YYYY/MM/DD').toString(), dayjs().format('YYYY/MM/DD').toString(), "Chase", "progressing"),
    createData('Pay the electricity bill', 'overdue', dayjs('2024-10-1').format('YYYY/MM/DD').toString(), dayjs('2024-10-10').format('YYYY/MM/DD').toString(), 'Mom', 'done'),
    createData('Buy a birthday cake for Kathy', 'Chocolate flavor', dayjs('2024-12-12').format('YYYY/MM/DD').toString(), dayjs('2024-12-12').format('YYYY/MM/DD').toString(), 'Urin', 'todo'),
];

function createData(title, description, start, end, assignee, status) {
    return { title, description, start, end, assignee, status };
}

const TodoArea = (props) => {

let oldRows = Storage.load(saveKey).length > 0 ? Storage.load(saveKey) : _rows;

const [rows, setRows] = useState(oldRows);

const addRows = (title, description, start, end, assignee, status) => {
    console.log("Adding row: " + title);

    if (start === undefined) {
        start = dayjs().format('YYYY/MM/DD').toString();
    }

    if (end === undefined) {
        end = dayjs().add(7,'day').format('YYYY/MM/DD').toString();
    }

    const newRow = createData(title, description, start, end, assignee, status);
    setRows(prevRows => [...prevRows, newRow]);
    _rows.push(newRow);

    rows.forEach(row => {
        console.log(row.title, row.assignee, row.start, row.end);
    });

    Storage.save(saveKey, rows);
}

return (
    <div>
        <AddModal addRows={addRows}/>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650 }} aria-label="todo table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ fontWeight:"bold"}}> Title </TableCell>
                        <TableCell sx={{ fontWeight:"bold"}} align="left">Description</TableCell>
                        <TableCell sx={{ fontWeight:"bold"}} align="left">Status</TableCell>
                        <TableCell sx={{ fontWeight:"bold"}} align="left">Start</TableCell>
                        <TableCell sx={{ fontWeight:"bold"}} align="left">End</TableCell>
                        <TableCell sx={{ fontWeight:"bold"}} align="left">Assignees</TableCell>
                        <TableCell sx={{ fontWeight:"bold"}} align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.title + Date.now()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left"
                                sx={{
                                    color: row.status === 'done' ? 'green' : 
                                           row.status === 'progressing' ? 'orange' : 
                                           'white'
                                }}
                            >{row.status}</TableCell>
                            <TableCell align="left">{row.start}</TableCell>
                            <TableCell align="left">{row.end}</TableCell>
                            <TableCell align="left">{row.assignee}</TableCell>
                            <TableCell align="center"> 
                                <DeleteForeverIcon sx={{ color: red[300] }} 
                                    onClick={() => {
                                    // console.log(row.title);
                                    setRows((prevRows) => 
                                        prevRows.filter((preRow) => preRow.title !== row.title));
                                }}/>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default TodoArea