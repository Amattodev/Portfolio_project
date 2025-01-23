import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Avatar,
    IconButton,
    Stack,
    InputAdornment
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

function ProfileSetup() {
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);

    //非同期処理をよりわかりやすく書くべき
    const handleImageChange = (e) => {
        //　inputで選択されたファイルを取得
        const file = e.target.files[0];
        if (file) {
            //読み込み方を定義しているだけ
            //ファイルの内容を読み込む（オブジェクトとして取得）
            const reader = new FileReader();
            //読み込みが完了したら、previewUrlに設定
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            }

            //実際の読み込み処理
            //データURLへ変換することで、画像を表示できるようにする
            reader.readAsDataURL(file);
        }
    }
 
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    プロフィール設定
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{position: 'relative'}}>
                        <Avatar 
                            sx={{ width: 120, height: 120 }} 
                            src={previewUrl}
                        />
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            sx={{
                                position: 'absolute',
                                bottom: -8,
                                right: -8,
                                backgroundColor: 'white'
                            }}
                        >
                            <input 
                                type="file" 
                                hidden 
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                </Box>
                <Box component="form">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="ユーザー名"
                        name="username"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="自己紹介文"
                        name="bio"
                        multiline
                        rows={4}
                    />
                    <Stack spacing={2}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Twitter"
                            name="twitter"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TwitterIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="GitHub"
                            name="github"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GitHubIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Stack>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        プロフィールを登録
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ProfileSetup;