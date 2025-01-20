import { Container, Grid2, TextField, Box, Select, MenuItem, FormControl } from '@mui/material';
import PortfolioCard from './PortfolioCard';

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

function PortfolioList() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        // value={sortBy}
                        // onChange={handleSortChange}
                    >
                        <MenuItem value="newest">新着順</MenuItem>
                        <MenuItem value="likes">いいね数順</MenuItem>
                    </Select>
                </FormControl>
            </Box>
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
        </Container>
    )
}

export default PortfolioList;