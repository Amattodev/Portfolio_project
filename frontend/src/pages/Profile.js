import { 
    Container, 
    Box, 
    Avatar, 
    Typography, 
    IconButton, 
    Grid2, 
    Divider,
    Paper
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PortfolioCard from './PortfolioCard';
function Profile() {
    const user = {
        username: "テストユーザー",
        bio: "フロントエンドエンジニアです。React/JavaScriptを使用した開発を行っています。",
        avatar: "/images/application_image1.jpg",
        twitter: "https://x.com/Amatto196362",
        github: "https://github.com/Amattodev/Portfolio_project",
        portfolioCount: 5,
        likesCount: 25
    }

    const portfolios = [
        {
            id: 1,
            title: "アプリタイトル1アプリタイトル1アプリタイトル1アプリタイトル1",
            description: "テスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてすテスてす",
            image: "/images/application_image1.jpg",
            likes: 10,
        },
        {
            id: 2,
            title: "アプリタイトル2",
            description: "アプリの説明",
            image: "/images/application_image1.jpg",
            likes: 20,
        },
        {
            id: 3,
            title: "アプリタイトル3",
            description: "アプリの説明",
            image: "/images/application_image1.jpg",
            likes: 30,
        }
    ]

    return (
        <Container maxWidth="lg">
            <Paper elevation={1} sx={{mt: 4, p: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Avatar  
                        src={user.avatar}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 600 }}>
                        <Typography variant="h5" gutterBottom>
                            {user.username}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {user.bio}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <IconButton href={user.twitter} target="_blank">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton href={user.github} target="_blank">
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
                                <Typography variant="h6">{user.portfolioCount}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">いいね数</Typography>
                                <Typography variant="h6">{user.likesCount}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <Box sx={{ mt: 4,  mb: 4 }}>
                <Grid2 
                    container 
                    spacing={3}
                    columns={{ xs: 12, sm: 12, md: 12 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    {portfolios.map((portfolio) => (
                        <Grid2 xs={12} sm={6} md={4} key={portfolio.id}>
                            <PortfolioCard portfolio={portfolio}/>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Container>
    )
}
 
export default Profile;