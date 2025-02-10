import { Container, Grid2, Box, Select, MenuItem, FormControl,CircularProgress } from '@mui/material';
import PortfolioCard from './PortfolioCard';
import { useState, useEffect } from 'react';
import { getPortfolios, searchPortfolios } from '../api/portfolios';
import { useSearch } from '../contexts/SearchContext';
function PortfolioList() {
    const [portfolios, setPortfolios] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { searchQuery } = useSearch();

    useEffect(() => {
        fetchPortfolios();
    }, [searchQuery]);

    const fetchPortfolios = async () => {
        try {
            setLoading(true);
            const data = await searchPortfolios(searchQuery.trim());
            setPortfolios(data || []);
        } catch (error) {
            console.error('Error fetching portfolios:', error);  
            setError('ポートフォリオの取得に失敗しました');
        } finally {
            setLoading(false)
        }
            
    }

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>>
                <CircularProgress />
            </Container>
        )
    }

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