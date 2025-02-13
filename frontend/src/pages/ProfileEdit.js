import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
    Box, 
    Container, 
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
import { getProfile, updateProfile } from '../api/users';
import { resizeImage, blobToBase64 } from '../pages/imageUtils';
function ProfileEdit() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        twitter: '',
        github: ''  
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setFormData({
                    username: profileData.username || '',
                    bio: profileData.bio || '',
                    twitter: profileData.twitter || '',
                    github: profileData.github || ''
                });
                setPreviewUrl(profileData.photoURL);
            } catch (error) {
                console.error('プロフィールの取得に失敗しました:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreviewUrl(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resizedBlob = await resizeImage(file);
                const base64String = await blobToBase64(resizedBlob);
                setPreviewUrl(base64String);
                setFormData(prev => ({
                    ...prev,
                    photoURL: base64String
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
            });
            navigate('/profile');
        } catch (error) {
            console.error('プロフィールの更新に失敗しました:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    プロフィール編集
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
                    更新する
                </Button>
            </Box>
        </Container>
    );
}

export default ProfileEdit;
