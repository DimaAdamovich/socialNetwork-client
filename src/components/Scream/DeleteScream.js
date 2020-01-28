import React, {Fragment, useEffect} from "react";
import CloseIcon from '@material-ui/icons/Close'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {connect} from "react-redux";
import {MyButton} from "../../util/MyButton";
import {deleteScream} from "../../redux/actions/dataActions";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme)=>({
    closeIcon: {
        position: 'absolute!important',
        right: '1rem',
        top: '0.5rem'
    }
}));

const DeleteScream = ({screamId, deleteScream, loading}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteScream = () => {
        deleteScream(screamId)
    };
    useEffect(() => {
        !loading && handleClose()
    }, [loading])
    return(
        <Fragment>
            <Typography onClick={handleClickOpen}>Delete</Typography>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle >Are you sure you want to delete this scream?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteScream} color="secondary" disabled={loading}>
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    loading: state.UI.loading
})

export default connect (mapStateToProps,{deleteScream}) (DeleteScream)