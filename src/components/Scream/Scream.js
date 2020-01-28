import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {MyButton} from "../../util/MyButton";
import ChatIcon from '@material-ui/icons/Chat'
import DialogScream from "./DialogScream";
import LikeButton from "./LikeButton";
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles(theme => ({
    ...theme.markup,
    card: {
        maxWidth: '100%',
        marginBottom: theme.spacing(2),
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    content: {},
    buttons: {
        color: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 8
    },
    avatar: {
        width: 60,
        height: 60,
    },
}));

function Media(props) {
    const {loading, scream: {userImage, body, createdAt, userHandle, likeCount, commentCount, screamId, image}, authenticated, owner, deleteScream, openDialog} = props;
    const classes = useStyles();
    dayjs.extend(relativeTime)
    const [anchorEl, setAnchorEl] = useState(null)
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    }
    const handleClickChat = () => {
        document.getElementById(screamId).click()
    }
    return (
        <Card className={classes.card}>
            <CardHeader style={{paddingBottom: 0}}
                        avatar={
                            loading ? (
                                <Skeleton variant="circle" width={60} height={60}/>
                            ) : (
                                <Link to={`/users/${userHandle}`} >
                                <Avatar
                                    alt={userHandle}
                                    src={userImage}
                                    className={classes.avatar}
                                />
                                </Link>
                                
                            )
                        }
                        action={
                            loading ? null : (
                                authenticated
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
                            )
                        }
                        title={loading
                            ? <Skeleton height={10} width="80%" style={{marginBottom: 6}}/>
                            : <Typography
                                variant={'h6'}
                                color={'primary'}
                                component={Link}
                                to={`/users/${userHandle}`}>{userHandle} </Typography>}
                        subheader={loading
                            ? <Skeleton height={10} width="40%"/>
                            : <Typography variant={'body2'}
                                          color={'textSecondary'}>{dayjs(createdAt).fromNow()}</Typography>}
            />
            <CardContent className={classes.content}>
                {loading ? (
                    <React.Fragment>
                        <Skeleton height={10} style={{marginBottom: 6}}/>
                        <Skeleton height={10} width="80%"/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {body
                            ? <Typography variant="body1" color="textPrimary" component="p">
                                {body}
                            </Typography>
                            : null}
                    </React.Fragment>
                )}
            </CardContent>
            {loading ? (
                <Skeleton variant="rect" className={classes.media}/>
            ) : (
                image && <CardMedia
                    className={classes.media}
                    image={image}
                    title="image"
                />
            )}
            <div className={classes.buttons}>
                <div>
                    <LikeButton screamId={screamId}/>
                    <span color={'primary'}>{likeCount || ''}</span>
                    <MyButton tip={'Comment'} onClick={handleClickChat}>
                            <ChatIcon color={'primary'}/>
                    </MyButton>
                    <span>{commentCount || ''}</span>
                </div>
                <DialogScream screamId={screamId} openDialog={openDialog}/>
            </div>
        </Card>
    );
}

export default Media