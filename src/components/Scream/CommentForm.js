import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {commentScream} from "../../redux/actions/dataActions";


const useStyles = makeStyles(theme=>({
    ...theme.log,
}))
const CommentForm = ({screamId, authenticated, commentScream}) => {
    const classes = useStyles()
    const [state, setState] = useState({
        body: ''
    })

    const handleSubmit = event => {
        event.preventDefault()
        if(state.body) {
            commentScream({screamId, body: state.body})
            setState({body: ''})
        }

    }
    const handleChange = event => setState({
        [event.target.name]: event.target.value
    })
    return (
        !authenticated? null: (
            <Grid item sm={12}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name={'body'} type={'text'}
                        label={'New comment'}
                        value={state.body}
                        onChange={handleChange}
                        className={classes.textField}
                        fullWidth
                        variant="outlined"
                    >
                    </TextField>
                </form>
            </Grid>
        )
    )

}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
})
export default connect(mapStateToProps, {commentScream})(CommentForm)