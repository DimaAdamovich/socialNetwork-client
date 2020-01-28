import React, {Fragment} from "react";
import MuiLink from "@material-ui/core/Link/Link";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {CalendarToday, LocationOn} from "@material-ui/icons";
import LinkedIn from "@material-ui/icons/LinkedIn";
import GitHub from "@material-ui/icons/GitHub";
import dayjs from "dayjs";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";

const useStyles = makeStyles((theme) => ({
    ...theme.markup,
    ...theme.paper
}));

const ProfileDetails = ({profile: {handle, bio, linkedIn, gitHub, createdAt, location}}) => {
    const classes = useStyles()
    return <div className={classes.profileDetails}>
        <hr className={classes.invisibleSeparator}/>
        <MuiLink component={Link} to={`/user/${handle}`} variant={'h5'}>
            @{handle}
        </MuiLink>
        <hr className={classes.invisibleSeparator}/>
        {bio && <div>
            <Typography variant={'body2'}>{bio}</Typography>
            <hr className={classes.invisibleSeparator}/>
        </div>}
        {location && <div>
            <LocationOn color={'primary'}/>
            <span>{location}</span>
            <hr className={classes.invisibleSeparator}/>
        </div>}

        <CalendarToday color={'primary'}/>
        <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        <hr className={classes.invisibleSeparator}/>
        {linkedIn && <Fragment>
            <Typography component={'a'} href={linkedIn} target={'_blank'}
                        rel={'noopener noreferrer'} color={'primary'}>&nbsp;<LinkedIn  color={'primary'}/></Typography>
        </Fragment>}
        {gitHub && <Fragment>
            <Typography component={'a'} href={gitHub} target={'_blank'}
                        rel={'noopener noreferrer'} color={'primary'}>&nbsp;<GitHub color={'primary'}/></Typography>
        </Fragment>}


    </div>
}

export default ProfileDetails