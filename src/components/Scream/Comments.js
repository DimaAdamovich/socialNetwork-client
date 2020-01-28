import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    ...theme.markup,
    commentAvatar: {
        width: 100,
        height: 100,
    }

}))

const Comments = ({comments}) => {
    const classes = useStyles()
    dayjs.extend(relativeTime)
//format('h:mm a, D MMMM YYYY')
    return (
            comments ? comments.map(comment => (
                <Fragment key={comment.commentId}>
                    <hr className={classes.visibleSeparator}/>
                    <Grid container >
                        <Grid item sm={3} >
                            <Avatar src={comment.userImage}  className={classes.commentAvatar} alt={'avatar'}/>
                        </Grid>
                        <Grid item sm={9}>
                            <Typography variant={"h6"} color={'primary'} component={Link} to={`/users/${comment.userHandle}`}>{comment.userHandle}</Typography>
                            <Typography variant={"body2"} color={'textSecondary'}>{dayjs(comment.createdAt).fromNow()}</Typography>
                            <hr className={classes.invisibleSeparator}/>
                            <Typography variant={"body1"}>{comment.body}</Typography>
                            <hr className={classes.invisibleSeparator}/>
                        </Grid>
                    </Grid>
                </Fragment>
            )): null


    )
}

export default Comments