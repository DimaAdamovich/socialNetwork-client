import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from "../components/Scream/Scream";
import Profile from "../components/Profile/Profile";
import {connect} from "react-redux";
import {deleteScream, getScreams, likeScream, unlikeScream} from "../redux/actions/dataActions";


const home = ({loading, screams, getScreams, deleteScream, likeScream, unlikeScream, authenticated, owner}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getScreams()
    }, [getScreams])
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                {screams && screams.map((scream, index) => <Scream
                    loading={loading}
                    key={scream.screamId || index}
                    scream={scream}
                    owner={owner}
                    likeScream={likeScream}
                    deleteScream={deleteScream}
                    authenticated={authenticated}
                    unlikeScream={unlikeScream}
                />)}
            </Grid>
            <Grid item sm={4} xs={12} >
                <Profile/>
            </Grid>

        </Grid>
    )
}
const mapStateToProps = state => ({
    loading: state.data.loading,
    screams: state.data.screams,
    authenticated: state.user.authenticated,
    owner: state.user.credentials.handle
})
export default connect(mapStateToProps, {getScreams, likeScream, unlikeScream, deleteScream})(home)