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
    CircularProgress
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import { getPortfolioById } from '../api/portfolios';
function PortfolioDetail() {
    //APIを設計していないため、まだここのidは使われていない
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // const portfolio ={
    //     id: 1,
    //     title: "アプリタイトル1",
    //     description: "テスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてす",
    //     image: "/images/application_image1.jpg",
    //     likes: 10,
    //     github_url: "https://github.com/Amattodev/Phase1-format",
    //     deploy_url: "http://localhost:3000/",
    //     user: {
    //         name: "テストユーザー",
    //         avatar: "/images/application_image1.jpg"
    //     },
    //     created_at: "2025-01-24",
    // }

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const data = await getPortfolioById(id);
                setPortfolio(data);
            } catch (error) {
                setError('ポートフォリオの取得に失敗しました');
            } finally {
                setLoading(false);
            }
        }
        fetchPortfolio();
    }, [id]);

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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar src={portfolio.user?.photoURL}></Avatar>
                <Box>
                    <Typography variant="subtitle1">{portfolio.user?.username || '名前なし'}</Typography>
                    <Typography variant="body2" color="text.secondary">{new Date(portfolio.createdAt).toLocaleDateString()}</Typography>
                </Box>
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
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                    <Typography>
                        {portfolio.likes}
                    </Typography>
                </Box>
            </Stack>
        </Container>
    )
} 

export default PortfolioDetail;