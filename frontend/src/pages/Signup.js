import { Box, Typography, TextField, Button, Container, Paper, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
function SignUp() {
    const handleGoogleSignup = () => {
        console.log('Googleで登録');
    }

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
                <Box component="form" sx={{ mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="ユーザー名"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="メールアドレス"
                        name="email"
                        type="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="パスワード"
                        type="password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="パスワード（確認）"
                        type="password"
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