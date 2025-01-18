import { AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

function Header () {
    return (
        <AppBar position="static" color= "default" elevation={1}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography 
                        variant='h6' 
                        component= "div" 
                        sx={{ flexGrow: 1, fontWeight: 'bold'}}
                    >
                        ポートフォリオ投稿サイト
                    </Typography>
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
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;