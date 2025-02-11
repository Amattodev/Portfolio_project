import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    IconButton, 
    Paper,
    Divider,
    Avatar,
    Stack,
    CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import { getPortfolioById } from '../api/portfolios';
import { useAuth } from '../contexts/AuthContext';
import { toggleLike } from '../api/portfolios';
import { deletePortfolio } from '../api/portfolios';
import { useNavigate } from 'react-router-dom';

function PortfolioDetail() {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(portfolio?.likes?.length);

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const data = await getPortfolioById(id);
                setPortfolio(data);
                setLikeCount(data.likes.length);
                setIsLiked(data.likes.includes(currentUser?._id));
            } catch (error) {
                setError('ポートフォリオの取得に失敗しました');
            } finally {
                setLoading(false);
            }
        }
        fetchPortfolio();
    }, [id]);

    const handleLikeClick = async () => {

        if (!currentUser) {
            return;
        }

        try {
            const response = await toggleLike(id);
            setIsLiked(response.isLiked);
            setLikeCount(response.likesCount);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    }

    //ここ一旦保留
    const isOwner = Boolean(
        currentUser?._id && 
        portfolio?.user?._id && 
        currentUser._id === portfolio.user._id
    );

    const handleDelete = async() => {
        try {
            await deletePortfolio(id);
            navigate('/profile');
        } catch {
            console.error('Error deleting portfolio:', error);
        }
    }

    if(loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Container>
        )
    }

    if (!portfolio) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography>ポートフォリオが見つかりませんでした</Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4}}>
                <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mb: 3 ,
                    justifyContent: 'space-between',
                    alignItems: 'center', 
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={portfolio.user?.photoURL}></Avatar>
                        <Box>
                            <Typography variant="subtitle1">{portfolio.user?.username || '名前なし'}</Typography>
                            <Typography variant="body2" color="text.secondary">{new Date(portfolio.createdAt).toLocaleDateString()}</Typography>
                        </Box>
                    </Box>
                    {isOwner &&
                        <IconButton
                        onClick={handleDelete}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            }
                        }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        
                    }
                </Box>

                <Typography variant="h4" gutterBottom>{portfolio.title}</Typography>

                <Box 
                    component="img"
                    src={portfolio.imageUrl || '/images/default-portfolio.jpg'}
                    alt={portfolio.title}
                    sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 2, mb: 3 }}
                />

                <Typography variant="body1" paragraph>{portfolio.description}</Typography>

                <Divider sx={{ my: 3 }} />

                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Box>
                        <IconButton href={portfolio.githubUrl} target="_blank">
                            <GitHubIcon />
                        </IconButton>
                        <IconButton href={portfolio.deployUrl} target="_blank">
                            <LanguageIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleLikeClick}>
                            <FavoriteIcon color={isLiked ? 'error' : 'inherit'}/>
                        </IconButton>
                        <Typography>
                            {likeCount}
                        </Typography>
                    </Box>
                </Stack>
            {/* </Paper> */}
        </Container>
    )
} 

export default PortfolioDetail;