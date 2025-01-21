import { AppBar, Toolbar, Typography, Button, Container, IconButton, TextField, InputAdornment, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import LoginModal from '../components/LoginModal';
function Header () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const handleLoginClick = () => {
        setOpenLoginModal(true);
    };

    const handleCloseModal = () => {
        setOpenLoginModal(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        setOpenLoginModal(false);
    }

    return (
        <AppBar position="static" color= "default" elevation={1}>
            <Container maxWidth="lg">
                <Toolbar 
                    disableGutters
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography 
                        variant='h6' 
                        component= "div" 
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        ポートフォリオ投稿サイト
                    </Typography>
                    <TextField
                        size="small"
                        placeholder="ポートフォリオを検索する"
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: {
                                xs: '30%', 
                                sm: '35%', 
                                md: '40%', 
                                lg: '45%'  
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isLoggedIn ? (
                            <>
                                <IconButton>
                                    <NotificationsIcon fontSize="medium" />
                                </IconButton>
                                <IconButton>
                                    <PersonIcon fontSize="medium" />
                                </IconButton>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    sx={{borderRadius: '5px'}}
                                >
                                    投稿
                                </Button>
                            </>
                        ) : (
                            <Button 
                                variant="contained" 
                                onClick={handleLoginClick}
                                sx={{
                                    borderRadius: '5px'
                                }}
                            >
                                ログイン
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            <LoginModal
                open={openLoginModal}
                onClose={handleCloseModal}
                onLogin={handleLogin}
            />
        </AppBar>
    )
}

export default Header;