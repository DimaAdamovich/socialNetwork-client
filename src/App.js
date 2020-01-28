import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {MuiThemeProvider}  from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
//redux
import {Provider} from 'react-redux'
import store from "./redux/store";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
//Components
import NavBar from "./components/Layout/NavBar";
import AuthRoute from './util/AuthRoute'
import myTheme from './util/theme'
import {SET_AUTHENTICATED} from "./redux/types";
import axios from "axios";
import {getUserData, logout} from "./redux/actions/userActions";


axios.defaults.baseURL = "https://europe-west1-socialnetwork-fd235.cloudfunctions.net/api"

const theme = createMuiTheme(myTheme)

const token = localStorage.FBIdToken
if(token){
    const decodedToken = jwtDecode(token)
    if(decodedToken.exp * 1000 < Date.now()){
        store.dispatch(logout())
        window.location.href= '/login'
    }else {
        store.dispatch({type: SET_AUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = token
        store.dispatch(getUserData())
    }
}

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App" >
                        <NavBar/>
                        <div className={'container'}><Switch>
                            <Route exact path={'/'} component={home}/>
                            <AuthRoute path={'/login'} component={login} />
                            <AuthRoute path={'/signup'} component={signup} />
                            <Route exact path={'/users/:userHandle'} component={user}/>
                            <Route exaxt path={'/users/:userHandle/scream/:screamId'} component={user}/>
                        </Switch></div>
                    </div>
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
