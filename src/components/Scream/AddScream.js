import React, {Fragment, useEffect} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {MyButton} from "../../util/MyButton";
import {postScream, postScreamWithImg} from "../../redux/actions/dataActions";
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import {CircularProgress} from "@material-ui/core";
import {PhotoCamera} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    ...theme.log,
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 7,
        '& button:hover': {
            background: 'none'
        },
    },
    content: {
        '& .buttons': {
            display: 'flex',
            justifyContent: 'space-between'
        }
    },
    camera: {
        padding: '2px!important'
    }

}));

const AddScream = ({postScream, loading, postScreamWithImg}) => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        body: ''
    })
    const [formData, setFormData] = React.useState(null)

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        setState('')
        setFormData(null)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleImageChange = event => {
        if (event.target.files.length) {
            const image = event.target.files[0]
            const formData = new FormData()
            formData.append('image', image, image.name)
            setFormData(formData)
        } else setFormData(null)
    }
    const handleClickCameraIcon = () => {
        document.getElementById('inputUpload').click()
    }
    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        !loading && handleClose()
    }, [loading])

    const handleSubmit = event => {
        event.preventDefault()
        debugger
        const newScream = {
            body: state.body
        }
        if (formData !== null) {
            postScreamWithImg({formData, body: state.body})
            setFormData(null)
        } else state.body && postScream(newScream)


    }
    return (
        <Fragment>
            <MyButton tip={'Post a scream'} onClick={handleClickOpen}>
                <AddIcon/>
            </MyButton>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <div className={classes.title}>
                    <DialogTitle>New post</DialogTitle>
                    <MyButton tip={'Close'} onClick={handleClose} btnClass={classes.closeIcon}>
                        <CloseIcon/>
                    </MyButton>
                </div>
                <DialogContent className={classes.content}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus={true}
                            name={'body'} type={'text'}
                            multiline
                            rows={3}
                            label={'New scream'} className={classes.textField}
                            placeholder={'What new?'}
                            value={state.body} onChange={handleChange}
                            fullWidth
                        />
                        <input type={'file'} onChange={handleImageChange} id={'inputUpload'} hidden={'hidden'} accept=".jpg, .jpeg, .png"/>
                        <div className={'buttons'}>
                            <div>
                                <MyButton tip={'attach image'} tipClass={classes.camera}
                                          onClick={handleClickCameraIcon}>
                                    <PhotoCamera color={'primary'} fontSize="large"/>

                                </MyButton>
                                {formData && <Typography variant={'body2'} color={'textSecondary'} component={'span'}>
                                    &nbsp;image attached</Typography>}
                            </div>
                            <Button type={'submit'} color="primary" variant={'contained'}
                                    disabled={loading}>
                                Send
                                {loading && <CircularProgress size={30}/>}
                            </Button></div>
                    </form>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    loading: state.UI.loading
})

export default connect(mapStateToProps, {postScream, postScreamWithImg})(AddScream)