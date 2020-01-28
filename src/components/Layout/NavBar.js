import React, {Fragment} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import HomeIcon from '@material-ui/icons/Home'
import {MyButton} from "../../util/MyButton";
import AddScream from "../Scream/AddScream";
import Notifications from "./Notifications";


const NavBar = ({authenticated}) => {
    return (
        <AppBar>
            <Toolbar className={'nav-container'}>
                {authenticated ?
                    <Fragment>
                        <AddScream/>
                        <Link to={'/'}>
                            <MyButton tip={'Home'}>
                                <HomeIcon/>
                            </MyButton>
                        </Link>
                            <Notifications/>
                    </Fragment>
                    :
                    <Fragment>
                        <Button color="inherit" component={Link} to={'/'}>Home</Button>
                        <Button color="inherit" component={Link} to={'/login'}>Login</Button>
                        <Button color="inherit" component={Link} to={'/signup'}>Sign up</Button>
                    </Fragment>
                }

            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(NavBar)
