import React, {Fragment} from "react";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {Paper} from "@material-ui/core";
import SkeletonProfile from "./SceletonProfile";
import ProfileDetails from "./ProfileDetails";


const useStyles = makeStyles((theme) => ({
    ...theme.markup,
    ...theme.paper
}));
const StaticProfile = ({profile, loading}) => {
    const classes = useStyles()
    let {imageUrl} = {...profile}
    let profileMarkup = (
        <Paper className={classes.profile}>
            {loading
                ? <SkeletonProfile/>
                : <Fragment>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                    </div>
                    <ProfileDetails profile={profile}/>
                </Fragment>}
        </Paper>
    )
    return profileMarkup
}


export default StaticProfile
