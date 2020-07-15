import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import Header from '../Header/Header';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <Box style={{ margin: '15px' }}>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <center><h1>Login</h1></center>
          <div>
            <TextField
              label="Username"
              placeholder="Case Sensitive"
              fullWidth
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div>
            <TextField
              label="Password"
              fullWidth
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div><br />
            <center><Button
              color="primary"
              variant="contained"
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            >Login</Button></center>
          </div>
        </form>

        <center>
          <Button
            variant="outlined"
            type="button"
            className="link-button" style={{ margin: '15px' }}
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          >
            Register
          </Button>
          </center></Box>
      </div>
    );
  }
}

// PropTypes allows us to import style.jsx for use
LoginPage.propTypes = { classes: PropTypes.object.isRequired };

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
