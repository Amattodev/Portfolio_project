import { Container, Grid2, TextField, Box, Select, MenuItem } from '@mui/material';
import PortfolioCard from './PortfolioCard';

const portfolios = [
    {
        id: 1,
        title: "アプリタイトル",
        description: "アプリの説明",
        image: "../../public/images/application_image1.jpg",
        likes: 10,
    },
    {
        id: 2,
        title: "アプリタイトル",
        description: "アプリの説明",
        image: "../../public/images/application_image1.jpg",
        likes: 20,
    },
    {
        id: 3,
        title: "アプリタイトル",
        description: "アプリの説明",
        image: "../../public/images/application_image1.jpg",
        likes: 30,
    }
]

function PortfolioList() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid2 container spacing={3}>
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