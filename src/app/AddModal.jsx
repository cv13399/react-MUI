import {useState} from 'react'
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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddModal = ({addRows}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let newRow = {};

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
                            newRow.title = event.target.value;
                            console.log("Title text field: " + event.target.value);
                        }}
                    />
                    <TextField
                        fullWidth
                        id="outlined"
                        label="Description"
                        margin="normal"
                        onChange ={(event)=>{
                            newRow.description = event.target.value;
                        }}
                    />

                    <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Assignee"
                        margin="normal"
                        onChange ={(event)=>{
                            newRow.assignee = event.target.value;
                        }}
                    />
                    <Typography>Start date: </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <MobileDatePicker defaultValue={dayjs()}
                                onChange ={(event)=>{
                                    newRow.start = event.target.value.toString();
                                }}
                            /> 
                        </DemoContainer>
                    </LocalizationProvider>

                    <Typography sx={{py:1}} >End date: </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <MobileDatePicker defaultValue={dayjs('2024-10-10')} 
                                onChange ={(event)=>{
                                    if (event.target.value !== undefined) {
                                        newRow.end = event.target.value.toString();
                                    }
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Box sx={{ display:'flex', justifyContent:'space-around', py: 3}}>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={()=>{
                            addRows(newRow.title, newRow.description, newRow.start, newRow.end, newRow.assignee);
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