import {useState} from 'react';
// import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const _rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(name, description, start, end, assignee) {
    return { name, description, start, end, assignee };
}

const TodoArea = (props) => {

const [rows, setRows] = useState(_rows)

return (
    <TableContainer component={Paper}>
        <Table sx={{minWidth: 650 }} aria-label="todo table">
            <TableHead>
                <TableRow>
                    <TableCell> Title </TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Start</TableCell>
                    <TableCell align="right">End</TableCell>
                    <TableCell align="right">Assignees</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">{row.start}</TableCell>
                        <TableCell align="right">{row.end}</TableCell>
                        <TableCell align="right">{row.assignee}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TodoArea