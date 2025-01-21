import { Modal, Box, Typography, TextField, Button } from '@mui/material';
function LoginModal({ open, onClose }) {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" >ログイン</Typography>
                <Button>Googleでログイン</Button>
            </Box>
        </Modal>
    )

}

export default LoginModal;
