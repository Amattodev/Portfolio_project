import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
    Container, 
    Box, 
    Typography, 
    TextField, 
    Button,
    Paper,
    IconButton,
    InputAdornment
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import { createPortfolio } from '../api/portfolios';

function NewPortfolio() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        githubUrl: '',
        deployUrl: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setFormData(prev => ({
                    ...prev,
                    imageUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await createPortfolio(formData);
            navigate('/profile')
        } catch (error) {
            console.error('ポートフォリオの作成に失敗しました', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="ポートフォリオタイトル"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <Box>
                        <input 
                            type="file" 
                            accept="image/*" 
                            id="portfolio-image"
                            hidden
                            value={formData.imageUrl}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="portfolio-image">
                            <Box
                                sx={{
                                    border: '2px dashed #ccc',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    height: '200px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {!previewUrl && (
                                <Box sx={{ color: 'text.secondary' }}>
                                    <PhotoCamera sx={{ fontSize: 40, mb: 1 }}/>
                                    <Typography>画像を選択する</Typography>
                                </Box>
                                )}
                            </Box>
                        </label>
                    </Box>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="ポートフォリオの説明"
                        name="description"
                        required
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="GitHubのURL"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment 
                                    position="start" 
                                >
                                    <GitHubIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="デプロイURL"
                        name="deployUrl"
                        value={formData.deployUrl}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment 
                                    position="start"
                                >
                                    <LanguageIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"    
                        sx={{ mt: 4}}
                    >
                        公開する
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default NewPortfolio;