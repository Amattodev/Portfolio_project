import { AppBar, Toolbar, Typography, Button, Container, IconButton, TextField, InputAdornment, Box, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header () {
    const { currentUser, logout } = useAuth();
    console.log(currentUser);

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const handleLoginClick = () => {
        setOpenLoginModal(true);
    };

    const handleCloseModal = () => {
        setOpenLoginModal(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log('ログアウトに失敗しました:', error)
        }
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
                        component={Link}
                        to="/"
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
                        {currentUser ? (
                            <>
                                <IconButton>
                                    <NotificationsIcon fontSize="medium" />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    to="/profile"
                                >
                                    {currentUser.photoURL ? (
                                        <Avatar 
                                            src={currentUser.photoURL} 
                                            sx={{width: 32, height: 32}} 
                                        />
                                    ) : (
                                        <PersonIcon fontSize="medium" />
                                    )}
                                </IconButton>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    component={Link}
                                    to="/new/portfolio"
                                    sx={{borderRadius: '5px'}}
                                >
                                    投稿
                                </Button>
                                <Button onClick={handleLogout} >
                                    ログアウト
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
            />
        </AppBar>
    )
}

export default Header;