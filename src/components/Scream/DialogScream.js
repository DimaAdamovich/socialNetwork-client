import React, {Fragment, useEffect, useState, useCallback} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {connect} from "react-redux";
import {MyButton} from "../../util/MyButton";
import {getScream, clearScream, deleteScream} from "../../redux/actions/dataActions";
import {CircularProgress} from "@material-ui/core";
import {UnfoldMore} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
    ...theme.markup,
    card: {
        maxWidth: '100%',
        marginBottom: theme.spacing(3),
        '& header': {
            verticalAlign: 'middle'
        },
        '& .avatar': {
            width: 60,
            height: 60,
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    buttons: {
        color: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 8
    }

}));

const DialogScream = ({screamId, loading, getScream, clearScream, scream, openDialog, deleteScream, authenticated, owner}) => {
    const classes = useStyles()
    const {userImage, body, createdAt, userHandle, likeCount, commentCount, image, comments} = {...scream}
    const [open, setOpen] = React.useState(false);
    const [path, setPath] = React.useState({
        oldPath: '',
        newPath: ''
    })

    useEffect(() => {
        if (scream && screamId === scream.screamId) {
            const newPath = `/users/${userHandle}/scream/${screamId}`
            window.history.pushState(null, null, newPath)
            setPath({...path, newPath: newPath})
        }
    }, [scream, path, screamId, userHandle])

    const handleClickOpen = useCallback( () => {
        setPath({...path, oldPath: window.location.pathname})
        getScream(screamId)
        setOpen(true);
    }, [screamId, getScream, path]);
    const handleClose = () => {
        if (path.oldPath === path.newPath) path.oldPath = `/users/${userHandle}`
        setOpen(false);
        window.history.pushState(null, null, path.oldPath)
        clearScream()
    };
    useEffect(() => {
        openDialog && handleClickOpen()
    }, [openDialog, screamId, handleClickOpen])

    //menu
    const [anchorEl, setAnchorEl] = useState(null)
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    }

    const dialogScreamMarkup = loading ? <CircularProgress size={100} style={{margin: 15}}/> : (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    className={'header'}
                    avatar={<Avatar
                        alt={userHandle}
                        src={userImage}
                        className={'avatar'}
                    />}
                    action={authenticated
                                ? <React.Fragment>
                                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                                                aria-haspopup={true} onClick={handleOpen}>
                                        <MoreVertIcon color={'primary'}/>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem onClick={handleCloseMenu}>
                                            {userHandle === owner
                                                ? <Typography onClick={() => deleteScream(screamId)}>Delete</Typography>
                                                : <Typography>Report</Typography>}</MenuItem>
                                    </Menu>
                                </React.Fragment>
                                : null

                    }
                    title={<Typography
                        variant={'h6'}
                        color={'primary'}
                        component={Link}
                        to={`/users/${userHandle}`}>{userHandle} </Typography>}
                    subheader={dayjs(createdAt).format('hh:mm a, D MMMM YYYY')}

                />
                <CardContent className={classes.content}>
                            {body
                                ? <Typography variant="body1" color="textPrimary" component="p">
                                    {body}
                                </Typography>
                                : null}
                </CardContent>
                {image && <CardMedia
                className={classes.media}
                image={image}
                title="image"
            />}
                <div className={classes.buttons}>
                    <div>
                        <LikeButton screamId={screamId}/>
                        <span color={'primary'}>{likeCount || ''}</span>
                        <MyButton tip={'Comment'}>
                            <ChatIcon color={'primary'}/>
                        </MyButton>
                        <span>{commentCount || ''}</span>
                    </div>
                </div>
            </Card>
            <CommentForm screamId={screamId}/>
            <Comments comments={comments}/>
        </Fragment>
    )
    return (
        <Fragment>
            <MyButton tip={'Open dialog scream'} onClick={handleClickOpen} idIcon={screamId}>
                <UnfoldMore color={'primary'}/>
            </MyButton>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                maxWidth={'sm'}
            >
                <DialogContent >
                    {dialogScreamMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    loading: state.UI.loading,
    scream: state.data.scream,
    authenticated: state.user.authenticated,
    owner: state.user.credentials.handle
})

export default connect(mapStateToProps, {getScream, clearScream, deleteScream})(DialogScream)