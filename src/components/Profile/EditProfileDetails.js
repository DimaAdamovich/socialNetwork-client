import React, {Fragment} from "react";
import EditIcon from '@material-ui/icons/Edit'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {connect} from "react-redux";
import {editUserDetails} from "../../redux/actions/userActions";
import TextField from "@material-ui/core/TextField";
import {MyButton} from "../../util/MyButton";

const useStyles = makeStyles((theme)=>({
    ...theme.log,
    editIcon: {
        float: 'right'
    }
}));

const EditProfileDetails = ({editUserDetails, credentials}) => {
    let { bio, location, linkedIn, gitHub} = {...credentials}
    const [state, setState] = React.useState({
        bio, location, linkedIn, gitHub
    })
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = event => {
        setState({...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSaveEditData = () => {
        const userDetails = {
            bio: state.bio || '',
            location: state.location || '',
            linkedIn: state.linkedIn || '',
            gitHub: state.gitHub || '',
        }
        editUserDetails(userDetails)
    }

    return(
        <Fragment>
            <MyButton tip={'Edit profile details'} onClick={handleClickOpen} btnClass={classes.editIcon}>
                <EditIcon color={'primary'}/>
            </MyButton>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit profile details</DialogTitle>
                <DialogContent>
                    <form noValidate >
                        <TextField
                            name={'bio'} type={'text'}
                            label={'Bio'} className={classes.textField}
                            placeholder={'A short bio'}
                            value={state.bio} onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name={'location'} type={'text'}
                            label={'Location'} className={classes.textField}
                            placeholder={'Where you live'}
                            value={state.location} onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name={'linkedIn'} type={'text'}
                            label={'LinkedIn'} className={classes.textField}
                            placeholder={'You profile'}
                            value={state.website} onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name={'gitHub'} type={'text'}
                            label={'GitHub'} className={classes.textField}
                            placeholder={'You profile'}
                            value={state.gitHub} onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveEditData} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect (mapStateToProps,{editUserDetails}) (EditProfileDetails)