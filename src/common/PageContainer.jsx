import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "100vh",
        borderRadius: "10px 10px 0px 0px",
        // background: "red"
    },
}));

function PageContainer({ children }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}

export default PageContainer;