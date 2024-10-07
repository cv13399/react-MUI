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

const _rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(title, description, start, end, assignee) {
    return { title, description, start, end, assignee };
}

const TodoArea = (props) => {

const [rows, setRows] = useState(_rows);

const addRows = (title, description, start, end, assignee) => {
    console.log("Adding row: " + title);
    const newRow = createData(title, description, start, end, assignee);
    setRows(prevRows => [...prevRows, newRow]);
    rows.forEach(rows => {
        console.log(rows.title, rows.assignee, rows.start, rows.end);
    });
}
return (
    <div>
        <AddModal addRows={addRows}/>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650 }} aria-label="todo table">
                <TableHead>
                    <TableRow>
                        <TableCell> Title </TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="left">Start</TableCell>
                        <TableCell align="left">End</TableCell>
                        <TableCell align="right">Assignees</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="left">{row.start}</TableCell>
                            <TableCell align="left">{row.end}</TableCell>
                            <TableCell align="right">{row.assignee}</TableCell>
                            <TableCell align="center"> 
                                <DeleteForeverIcon/>
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