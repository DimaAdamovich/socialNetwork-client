import React, {Fragment} from "react";
import {connect} from "react-redux";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {logout, uploadImage} from "../../redux/actions/userActions";
import EditIcon from '@material-ui/icons/Edit'
import ExitIcon from '@material-ui/icons/ExitToApp'
import EditProfileDetails from "./EditProfileDetails";
import {MyButton} from "../../util/MyButton";
import SkeletonProfile from "./SceletonProfile";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles((theme) => ({
    ...theme.markup,
    ...theme.paper,
    

}));
const Profile = ({loading, credentials, authenticated, uploadImage, logout}) => {
    const classes = useStyles()
    let {imageUrl} = {...credentials}
    const handleImageChange = event => {
        if (event.target.files.length) {
            const image = event.target.files[0]
            const formData = new FormData()
            formData.append('image', image, image.name)
            uploadImage(formData)
        }
    }
    const handleEditPicture = () => {
        const fileImage = document.getElementById('imageInput')
        fileImage.click()
    }
    let profileMarkup = authenticated ? (
            <Paper className={classes.profile}>
                {loading
                    ? <SkeletonProfile/>
                    : <div >
                        <div className="image-wrapper">
                            <Fragment>
                                <img src={imageUrl} alt="profile" className="profile-image"/>
                                < input type="file" onChange={handleImageChange}
                                        id='imageInput' hidden='hidden'
                                        accept=".jpg, .jpeg, .png"/>
                                <MyButton tip={'Profile image'} onClick={handleEditPicture} btnClass={'button'}>
                                    <EditIcon color={'primary'}/>
                                </MyButton>
                            </Fragment>
                        </div>
                        <ProfileDetails profile={credentials}/>
                        <MyButton tip={'Logout'} onClick={logout}>
                            <ExitIcon color={'primary'}/>
                        </MyButton>
                        <EditProfileDetails/>
                    </div>}
            </Paper>
        )
        : (
            <Paper className={classes.profile}>
                <Typography variant={'body2'} align={'center'}>
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant={'contained'} component={Link} color={'primary'} to={'/login'}>Login</Button>
                    <Button variant={'contained'} component={Link} color={'secondary'} to={'/signup'}>Sign up</Button>
                </div>

            </Paper>)
    return profileMarkup
}

const mapStateToProps = state => ({
    loading: state.user.loading,
    credentials: state.user.credentials,
    authenticated: state.user.authenticated,
})
export default connect(mapStateToProps, {uploadImage, logout})(Profile)
