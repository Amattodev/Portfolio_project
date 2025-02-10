import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
function LoginModal({ open, onClose, onLogin }) {
    const { loginWithGoogle, login  } = useAuth();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            onClose();
        } catch (error) {
            setError('Googleログインに失敗しました');
        }
    }

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            onClose();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('メールアドレスが登録されていません');
                    break;
                case 'auth/wrong-password':
                    setError('パスワードが間違っています');
                    break;
                case 'auth/invalid-email':
                    setError('メールアドレスの形式が正しくありません');
                    break;
                case 'auth/too-many-requests':
                    setError('ログイン試行回数が多すぎます。しばらく待ってから再試行してください');
                    break;
                default:
                    setError(`ログインに失敗しました: ${error.message}`);
                    break;
            }
        }
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
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                >
                    Googleでログイン
                </Button>
                <Divider sx={{ my: 2 }}>または</Divider>
                <Box component="form" onSubmit={handleEmailLogin}>
                    <TextField
                        fullWidth
                        label="メールアドレス"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="パスワード"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        ログイン
                    </Button>
                </Box>
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
