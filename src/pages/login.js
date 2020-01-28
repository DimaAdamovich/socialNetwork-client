import React, {useState} from 'react'
import {Link, Redirect} from "react-router-dom";
import chatPng from '../images/logoChat.png'

//Mui Stuff
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//Redux Stuff
import {loginUser} from "../redux/actions/userActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme)=>({
    ...theme.log
}));

const login = ({loginUser, loading, errors, authenticated}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState]=useState({
        email: '',
        password: ''
    })

    const handleSubmit = event => {
        event.preventDefault()
        const userData = {
            email: state.email,
            password: state.password
        }
        loginUser(userData)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleChange = event => {
        setState({...state,
            [event.target.name]: event.target.value
        })
    }
    return (
        authenticated ? <Redirect to='/'/>:
        <Grid container className={classes.form}>
            <Grid item sm></Grid>
            <Grid item sm>
                <img className={classes.image} src={chatPng} alt="chatPng"/>
                <Typography variant={'h2'} className={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        id={'email'}
                        name={'email'} type={'email'}
                        label={'Email'} className={classes.textField}
                        helperText={errors.email && errors.email}
                        error={!!errors.email}
                        value={state.email} onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id={'password'}
                        name={'password'} type={'password'}
                        label={'Password'} className={classes.textField}
                        helperText={errors.password && errors.password}
                        error={!!errors.password}
                        value={state.password} onChange={handleChange}
                        fullWidth
                    />
                    {errors.general && <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>}
                    <Button
                        type={'submit'} variant={'contained'} disabled={loading}
                        color={'primary'} className={classes.button}>Login</Button>
                    <br/>
                    <Typography variant={'body2'}>Dont have an account? sign up <Link to={'/signup'}>here</Link></Typography>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}

const mapStateToProps =(state) => ({
    loading: state.UI.loading,
    errors: state.UI.errors,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {loginUser}) (login)

