import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// Sample data
const foodItem = {
    name: 'Grilled Chicken Salad',
    description: 'A healthy grilled chicken salad with fresh vegetables and a light dressing.',
    image: 'https://source.unsplash.com/random/400x300?chicken-salad', // Replace with your image URL
    allergens: ['Gluten', 'Nuts', 'Dairy']
};

const MenuItemCard = () => {
    const handleAddToCart = () => {
        console.log(`${foodItem.name} added to cart`);
        // Add functionality to add the item to the cart
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            {/* Food Item Image */}
            <CardMedia
                component="img"
                height="140"
                image={foodItem.image}
                alt={foodItem.name}
            />

            {/* Card Content */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {foodItem.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {foodItem.description}
                </Typography>

                {/* Allergen Tags */}
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Allergens:
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        {foodItem.allergens.map((allergen) => (
                            <Chip key={allergen} label={allergen} variant="outlined" />
                        ))}
                    </Stack>
                </Box>
            </CardContent>

            {/* Card Actions */}
            <CardActions>
                <Button size="small" color="primary" variant="contained" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default MenuItemCard;
