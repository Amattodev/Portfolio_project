import { Modal, Box, Typography, TextField, Button, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
function LoginModal({ open, onClose, onLogin }) {

    //認証の機能はまだなので、一旦Googleログインボタンのクリックだけでログインできるようにしている
    const handleGoogleLogin = () => {
        onLogin();
    }

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
                <Typography id="modal-modal-title" variant="h6" align="center" gutterBottom>
                    ログイン
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                >
                    Googleでログイン
                </Button>
                <Divider sx={{ my: 2 }}>または</Divider>
                <TextField
                    fullWidth
                    label="メールアドレス"
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="パスワード"
                    type="password"
                    variant="outlined"
                    margin="normal"
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    ログイン
                </Button>
                <Box align="center" sx={{ 
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body2">
                        アカウントをお持ちでない方は
                    </Typography>
                    <Button 
                        color="primary"  
                        component={Link}
                        to="/signup"
                        onClick={onClose}
                        sx={{ 
                            textTransform: 'none', 
                            ml: 0.5 
                        }}
                    >
                        新規登録
                    </Button>
                </Box>
            </Box>
        </Modal>
    )

}

export default LoginModal;
