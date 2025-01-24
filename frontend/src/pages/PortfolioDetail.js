import { 
    Container, 
    Box, 
    Typography, 
    IconButton, 
    Paper,
    Divider,
    Avatar,
    Stack
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
function PortfolioDetail() {
    const portfolio ={
        id: 1,
        title: "アプリタイトル1",
        description: "テスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてす",
        image: "/images/application_image1.jpg",
        likes: 10,
        github_url: "https://github.com/Amattodev/Phase1-format",
        deploy_url: "http://localhost:3000/",
        user: {
            name: "テストユーザー",
            avatar: "/images/application_image1.jpg"
        },
        created_at: "2025-01-24",
    }
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar src={portfolio.user.avatar}></Avatar>
                <Box>
                    <Typography variant="subtitle1">{portfolio.user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{portfolio.created_at}</Typography>
                </Box>
            </Box>

            <Typography variant="h4">{portfolio.title}</Typography>

            <Box 
                component="img"
                src={portfolio.image}
                alt={portfolio.title}
                sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 2, mb: 3 }}
            />

            <Typography variant="body1" paragraph>{portfolio.description}</Typography>

            <Divider sx={{ my: 3 }} />

            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box>
                    <IconButton href={portfolio.github_url} target="_blank">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href={portfolio.deploy_url} target="_blank">
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