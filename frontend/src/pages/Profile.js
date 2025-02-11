import { useState, useEffect } from 'react';
import { getProfile, getUsersPortfolios } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
    Container, 
    Box, 
    Avatar, 
    Typography, 
    IconButton, 
    Grid2, 
    Divider,
    Paper,
    CircularProgress
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PortfolioCard from './PortfolioCard';
import EditIcon from '@mui/icons-material/Edit';
function Profile() {

    const [profile, setProfile] = useState(null);
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [portfolioCount, setPortfolioCount] = useState(0);

    const handleDeletePortfolio = async (deletePortfolioId) => {
        setPortfolios(prevPortfolios => 
            prevPortfolios.filter(portfolio => portfolio._id !== deletePortfolioId)
        )
        setPortfolioCount(prevCount => prevCount - 1);
    }

    const isOwner = Boolean(
        currentUser?.uid && 
        profile?.uid && 
        currentUser.uid === profile.uid
    )
    

    useEffect(() => {
        if(!currentUser) {
            navigate('/signup');
            return;
        }
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const profileData = await getProfile();

                if (!profileData) {
                    setError('プロフィールの取得に失敗しました');
                    return;
                }

                if (profileData.uid) {
                    try {
                        const portfoliosData = await getUsersPortfolios(profileData.uid);
                        setPortfolios(portfoliosData || []);
                        setPortfolioCount(portfoliosData.length)
    
                    } catch (portfolioError) {
                        console.error('ポートフォリオの取得に失敗しました', portfolioError);
                        setPortfolios([]);
                        setPortfolioCount(0);
                    }
    
                }
                setProfile(profileData);

            } catch(error) {
                console.log('Error fetching profile:', error);
                setError(error.message || 'データの取得に失敗しました');
            } finally {
                setLoading(false);
            }
        }
        fetchProfileData();
    }, [currentUser, navigate])
    

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    if (!profile) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography>プロフィールが見つかりませんでした</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={1} sx={{mt: 4, p: 4, position: 'relative' }}>
                {isOwner && (
                    <IconButton
                        onClick={() => navigate('/profile/edit')}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            }
                        }}
                    >   
                        <EditIcon />
                    </IconButton>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Avatar  
                        src={profile.photoURL || '/default-avatar.png'}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 600 }}>
                        <Typography variant="h5" gutterBottom>
                            {profile.username}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {profile.bio}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <IconButton href={profile.twitter} target="_blank">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton href={profile.github} target="_blank">
                                <GitHubIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: 600 }}>
                        <Divider />
                        <Box sx ={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 6,
                            mt: 2
                        }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">作品数</Typography>
                                <Typography variant="h6">{portfolioCount}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">いいね数</Typography>
                                <Typography variant="h6">{profile.totalLikes}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Grid2 
                    container 
                    spacing={3}
                    columns={{ xs: 12, sm: 12, md: 12 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    {portfolios.map((portfolio) => (
                        <Grid2 xs={12} sm={6} md={4} key={portfolio.id}>
                            <PortfolioCard 
                                portfolio={portfolio}
                                showDeleteButton={true}
                                onDelete={handleDeletePortfolio}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Container>
    )
}
 
export default Profile;