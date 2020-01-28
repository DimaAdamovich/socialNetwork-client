import React from "react";
import {MyButton} from "../../util/MyButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {likeScream, unlikeScream} from "../../redux/actions/dataActions";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'


const LikeButton = ({authenticated, likes, screamId, unlikeScream, likeScream}) => {
    const likedScream = () => likes && likes.find(like => like.screamId === screamId);
    const likeButton = authenticated ? likedScream() ? (
            <MyButton tip={'Like'} onClick={() => unlikeScream(screamId)}>
                <FavoriteIcon color={'secondary'}/>
            </MyButton>
        ) : (
            <MyButton tip={'Like'} onClick={() => likeScream(screamId)}>
                <FavoriteBorderIcon color={'primary'}/>
            </MyButton>
        )
        : (
            <Link to={'/login'}>
                <MyButton tip={'Like'}>
                    <FavoriteBorderIcon color={'primary'}/>
                </MyButton>
            </Link>
        )
    return likeButton
}
const mapStateToProps = state => ({
    likes: state.user.likes,
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps, {unlikeScream, likeScream})(LikeButton)