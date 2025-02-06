import { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { createUserProfile } from '../api/users';

function SignUp() {
    const { loginWithGoogle, signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',  
        password: '',
        confirmPassword: '',
    });

    const handleGoogleSignup = async () => {
        try {
            await loginWithGoogle();
            navigate('/profile/setup')
        } catch (error) {
            setError('Googleでの登録に失敗しました');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('パスワードと確認用パスワードが一致しません');
            return;
        }

        try {
            const userCredential = await signup(formData.email, formData.password);

            await createUserProfile({
                uid: userCredential.uid,
                username: formData.username
            });
            navigate('/profile/setup')
        } catch (error) {
            console.log('Error details:', error);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('このメールアドレスは既に使用されています');
                    break;
                case 'auth/invalid-email':
                    setError('メールアドレスの形式が正しくありません');
                    break;
                case 'auth/weak-password':
                    setError('パスワードは6文字以上である必要があります');
                    break;
                default:
                    setError('アカウント作成に失敗しました');
                    console.log('Error details:', error);
            }
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    アカウント登録
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleSignup}
                    sx={{ mb: 2 }}
                    >
                    Googleで登録
                </Button>
                <Divider sx={{ my: 2 }}>または</Divider>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
                    {error && (
                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="ユーザー名"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="メールアドレス"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="パスワード"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="パスワード（確認）"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        登録
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">
                            すでにアカウントをお持ちの方は
                            <Link to="/" style={{ textDecoration: 'none', marginLeft: '4px' }}>
                                ログイン
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp;