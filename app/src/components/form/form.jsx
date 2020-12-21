import React from "react";
import { TextField, Button, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: theme.spacing(1),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    }
}));

export function Form(props) {

    const classes = useStyles();
    const {setLength, setHeight, setWidth, handleClick} = props.setParams;

    return (
        <form className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                <TextField
                    id="outlined-number"
                    label="Height"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={e => setHeight(e.target.value)}
                />
                <TextField
                    id="outlined-number"
                    label="Width"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={e => setWidth(e.target.value)}
                />
                <TextField
                    id="outlined-number"
                    label="Length"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={e => setLength(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>
                    Draw
                </Button>
            </Grid>
        </form>
    )
}
