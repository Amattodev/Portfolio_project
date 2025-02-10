import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActions, Typography, Box, IconButton, Avatar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from '../contexts/AuthContext';
import { toggleLike } from '../api/portfolios';
import { useState } from 'react';
function PortfolioCard({ portfolio }) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(portfolio.likes.length);

    const handleCardClick = () => {
        navigate(`/portfolio/${portfolio._id}`)
    }

    const handleLikeClick = async (e) => {
        e.stopPropagation();

        //ログインを促す処理
        if (!currentUser) {
            return;
        }

        try {
            const response = await toggleLike(portfolio._id);
            setIsLiked(response.isLiked);
            setLikeCount(response.likesCount);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }

    return (
        <Card 
                sx={{ 
                height: '380px', 
                width: '360px',
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '10px',
                cursor: 'pointer',
            '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out',
                boxShadow: 3
            }
        }}
        onClick={handleCardClick}
        >
            <CardMedia
                component="img"
                height="220"
                image={portfolio.imageUrl || '/images/default-portfolio.jpg'}
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
                        whiteSpace: 'nowrap',
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar 
                        src={portfolio.user?.photoURL} 
                        sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {portfolio.user?.username || '名前なし'}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <CardActions sx={{
                justifyContent: 'space-between',
            }}>
                <Box>
                    <IconButton size="small" href={portfolio.githubUrl} target="_blank">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton size="small" href={portfolio.deployUrl} target="_blank">
                        <LanguageIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" onClick={handleLikeClick}>
                        <FavoriteIcon color={isLiked ? 'error' : 'inherit'}/>
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {likeCount}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    )
}

 export default PortfolioCard;