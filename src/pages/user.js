import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getUserData, likeScream, unlikeScream} from "../redux/actions/dataActions";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/Scream/Scream";
import StaticProfile from "../components/Profile/StaticProfile";
import Profile from "../components/Profile/Profile";


const user = ({loading, screams, getUserData, likeScream, unlikeScream, match, owner}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [profile, setProfile] = useState(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loadingProfile, setLoadingProfile] = useState(true)
    const screamIdParam = match.params.screamId
    const handle = match.params.userHandle
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getUserData(handle)
        axios.get(`/users/${handle}`)
            .then(res => {
                setProfile(res.data.user)
                setLoadingProfile(false)
            })
            .catch(err => console.error(err))
    }, [getUserData, handle])

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                {screams && screams.map((scream, index) => <Scream
                    loading={loading}
                    key={scream.screamId || index}
                    scream={scream}
                    likeScream={likeScream}
                    unlikeScream={unlikeScream}
                    openDialog={scream.screamId === screamIdParam}
                />)}
            </Grid>
            <Grid item sm={4} xs={12}>
                {handle === owner
                    ? <Profile/>
                    : <StaticProfile profile={profile} loading={loadingProfile}/>
                }
            </Grid>

        </Grid>
    )
}

const mapStateToProps = state => ({
    loading: state.data.loading,
    screams: state.data.screams,
    likes: state.user.likes,
    owner: state.user.credentials.handle
})
export default connect(mapStateToProps, {likeScream, unlikeScream, getUserData})(user)