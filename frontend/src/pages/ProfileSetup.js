import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
import { updateProfile } from '../api/users';
import { resizeImage, blobToBase64 } from '../pages/imageUtils';

function ProfileSetup() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        twitter: '',
        github: ''  
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // const resizeImage = (file) => {
    //     return new Promise((resolve) => {
    //       const reader = new FileReader();
    //       reader.onload = (e) => {
    //         const img = new Image();
    //         img.onload = () => {
    //           const canvas = document.createElement('canvas');
    //           const MAX_WIDTH = 800;
    //           const MAX_HEIGHT = 800;
    //           let width = img.width;
    //           let height = img.height;
      
    //           if (width > height) {
    //             if (width > MAX_WIDTH) {
    //               height *= MAX_WIDTH / width;
    //               width = MAX_WIDTH;
    //             }
    //           } else {
    //             if (height > MAX_HEIGHT) {
    //               width *= MAX_HEIGHT / height;
    //               height = MAX_HEIGHT;
    //             }
    //           }
      
    //           canvas.width = width;
    //           canvas.height = height;
    //           const ctx = canvas.getContext('2d');
    //           ctx.drawImage(img, 0, 0, width, height);
              
    //           canvas.toBlob((blob) => {
    //             resolve(blob);
    //           }, 'image/jpeg', 0.7); // 品質を0.7に設定
    //         };
    //         img.src = e.target.result;
    //       };
    //       reader.readAsDataURL(file);
    //     });
    // };

    // //非同期処理をよりわかりやすく書くべき
    // const handleImageChange = async (e) => {
    //     //　inputで選択されたファイルを取得
    //     const file = e.target.files[0];
    //     if (file) {
    //         const resizedImage = await resizeImage(file);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreviewUrl(reader.result);
    //             setFormData(prev => ({
    //                 ...prev,
    //                 imageUrl: reader.result
    //             }));
    //         };
    //         reader.readAsDataURL(resizedImage);
    //     }
    // }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resizedBlob = await resizeImage(file);
                const base64String = await blobToBase64(resizedBlob);
                setPreviewUrl(base64String);
                setFormData(prev => ({
                    ...prev,
                    imageUrl: base64String
                }));
            } catch (error) {
                console.error('画像の処理に失敗しました:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProfile({
                ...formData,
                photoURL: previewUrl || currentUser?.photoURL || ''
            })
            navigate('/profile');
        } catch (error) {
            console.log('Error details:', error);
        }
    }

    
 
    return (
        <Container maxWidth="sm">
            <Box
                onSubmit={handleSubmit}
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
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="自己紹介文"
                        name="bio"
                        multiline
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    <Stack spacing={2}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Twitter"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
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
                            value={formData.github}
                            onChange={handleChange}
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