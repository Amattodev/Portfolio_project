import { useState } from 'react';
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

function NewPortfolio() {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
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
                    />
                    <Box>
                        <input 
                            type="file" 
                            accept="image/*" 
                            id="portfolio-image"
                            hidden
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
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="GitHubのURL"
                        name="github_url"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GitHubIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="デプロイURL"
                        name="deploy_url"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
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