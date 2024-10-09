import { useState, useRef } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { blue, green, red } from '@mui/material/colors';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddModal = ({addRows}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const newRowRef = useRef({
        title: '',
        description: '',
        start: '',
        end: '',
        assignee: '',
    });

    return (
        <Box sx={{ py:1, position:"relative"}} >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} alignItems="center">
                    <Typography id="modal-modal-title" variant="h6" component="h1" sx={{p:1}}>
                        Add a new todo
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Title"
                        margin="normal"
                        onChange ={(event)=>{
                            newRowRef.title = event.target.value;
                            console.log("Title text field: " + newRowRef.title);
                        }}
                    />
                    <TextField
                        fullWidth
                        id="outlined"
                        label="Description"
                        multiline
                        maxRows={4}
                        margin="normal"
                        onChange ={(event)=>{
                            if (event.target.value !== undefined) {
                                newRowRef.description = event.target.value;
                            }
                        }}
                    />

                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Assignee"
                        margin="normal"
                        onChange ={(event)=>{
                            newRowRef.assignee = event.target.value;
                        }}
                    />
                    <FormControl sx={{ my: 1, minWidth: 160 }}>
                        <InputLabel 
                            id="simple-select-helper-label">Status</InputLabel>
                        <Select
                            labelId="simple-select-helper-label"
                            id="simple-select-helper"
                            value={status}
                            label="Status"
                            onChange={handleChange}
                            sx={{
                                color: status === 'done' ? green[300] : 
                                        status === 'progressing' ? 'orange' : 
                                        status === 'todo' ? blue[300] : 'white'
                            }} 
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem sx={{color: blue[300]}} value={'todo'}>Todo</MenuItem>
                            <MenuItem sx={{color:'orange'}} value={'progressing'}>Progressing</MenuItem>
                            <MenuItem sx={{color: green[300]}} value={'done'}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display:'flex', justifyContent:'space-between', py: 1}}>
                        <Box>
                            <Typography>Start date: </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <MobileDatePicker defaultValue={dayjs()} 
                                        onChange ={(value)=>{
                                            newRowRef.start = value.format('YYYY/MM/DD').toString();
                                        }}
                                        sx={{ width:100, p:1}}
                                    /> 
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        
                        <Box>
                            <Typography >End date: </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <MobileDatePicker defaultValue={dayjs().add(7,'day')} 
                                        onChange ={(value)=>{
                                            console.log("End date : " + value);
                                            
                                            if (value !== undefined) {
                                                newRowRef.end = value.format('YYYY/MM/DD').toString();
                                            }
                                        }}
                                        sx={{ width:100, p:1}}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                    </Box>
                  
                    <Box sx={{ display:'flex', justifyContent:'space-around', py: 3}}>
                        <Button
                            sx={{ color: red[300]}}
                            variant="outlined"
                            onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button 
                            variant="outlined"
                            sx={{
                                color: green[400]
                            }}
                            onClick={()=>{
                                addRows(newRowRef.title, newRowRef.description, newRowRef.start, newRowRef.end, newRowRef.assignee, status);
                                handleClose();
                        }}>
                            OK
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Button onClick={handleOpen}  sx={{
                    position: "fixed", // Position fixed to the viewport
                    bottom: "20px", // Adjust spacing from the bottom
                    right: "20px", // Adjust spacing from the right
                    p: 2,
                    zIndex: 1300, // Ensure it stays on top of other elements
                }}>
                <AddCircleIcon fontSize='large'/>
            </Button>
        </Box>
    )
}

export default AddModal