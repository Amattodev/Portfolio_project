import { Card, CardContent, CardMedia, CardActions, Typography, Box, IconButton, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
function PortfolioCard({ portfolio }) {
    return (
        <Card sx={{ 
            height: '380px', 
            width: '360px',
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: '10px',
        }}>
            <CardMedia
                component="img"
                height="220"
                image={portfolio.image}
                alt={portfolio.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ overflow: 'hidden' }}>
                <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {portfolio.title}
                </Typography>
                <Typography 
                    variant="body2" 
                    color='text.secondary' 
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {portfolio.description}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <CardActions sx={{
                justifyContent: 'space-between',
            }}>
                <Box>
                    <IconButton size="small">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton size="small">
                        <LanguageIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small">
                        <FavoriteIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {portfolio.likes}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    )
}

 export default PortfolioCard;