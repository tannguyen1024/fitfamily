import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';

// Page Imports //
import Start from '../Start/Start';
import Setting from '../Setting/Setting';
import Workout from '../Workout/Workout';
import Feed from '../Feed/Feed';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
// import Nav from '../Backup/Nav/Nav';
// import Footer from '../Footer/Footer';
// import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';
import './App.css';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff9c08', // Orange
    },
    secondary: {
      main: '#FFFFFF', // White
    }
  }
});

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <MuiThemeProvider theme={mainTheme}>
      <Router>
        <div>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            {/* <Route
              exact
              path="/about"
              component={AboutPage}
            /> */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <ProtectedRoute exact path="/home" component={Start}/>
            <ProtectedRoute exact path="/setting" component={Setting} />
            <ProtectedRoute exact path="/workout" component={Workout} />
            <ProtectedRoute exact path="/feed" component={Feed} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            /> */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);
