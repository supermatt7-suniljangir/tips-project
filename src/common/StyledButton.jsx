import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#0c1e39', // Dark blue color
        color: '#fff',
        padding: '5px 20px',
        borderRadius: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            backgroundColor: '#0a172d', // Slightly darker blue on hover
        },
        '&:hover $arrow': {
            transform: 'translateX(5px)', // Move arrow 5px to the right on hover
        },
    },
    arrow: {
        marginLeft: '10px',
        transition: 'transform 0.3s ease', // Smooth transition for arrow movement
    },
});

const ButtonWithArrow = () => {
    const classes = useStyles();

    return (
        <Button className={classes.root}>
            Start now
            <ArrowForwardIosIcon className={classes.arrow} />
        </Button>
    );
};

export default ButtonWithArrow;
