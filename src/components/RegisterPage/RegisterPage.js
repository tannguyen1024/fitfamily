import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Box, Button } from '@material-ui/core';
import Header from '../Header/Header';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';

class RegisterPage extends Component {
  state = {
    username: '', 
    display: '',
    password: '',
    email: '',
    phone: '',
    picture: null,
  };

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.password2) {
      let timerInterval
      Swal.fire({
        title: 'The passwords did not match.',
        html: 'Please re-enter your password.',
        timer: 3500,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
      return
    }
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          display: this.state.display,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
          picture: this.state.picture
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

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
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="form" onSubmit={this.registerUser}>
          <center><h1>New User</h1></center>
          <div>
            <TextField
              label="Login Name"
              placeholder="Case Sensitive"
              fullWidth
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
            <div>
              <TextField
                label="Display Name"
                placeholder="This is seen by others"
                fullWidth
                onChange={this.handleInputChangeFor('display')}
              />
            </div>
          <div>
            <TextField
              label="Phone Number"
              fullWidth
              type="phone"
              name="phone"
              value={this.state.phone}
              onChange={this.handleInputChangeFor('phone')}
            />
          </div>
          <div>
            <TextField
              label="Email Address"
              fullWidth
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
            />
          </div>
          <div>
            <TextField
              label="Profile Picture"
              placeholder="URL to Picture"
              fullWidth
              multiline
              type="picture"
              name="picture"
              value={this.state.picture}
              onChange={this.handleInputChangeFor('picture')}
              InputProps={{ autoComplete: 'off' }}
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
              InputProps={{ autoComplete: 'off' }}
            />
          </div>
          <div>
            <TextField
              label="Confirm Password"
              fullWidth
              type="password"
              name="password2"
              value={this.state.password2}
              onChange={this.handleInputChangeFor('password2')}
              InputProps={{ autoComplete: 'off' }}
            />
          </div><br />
          <center>
            <div>
              <Button color="primary"
                variant="contained"
                className="register"
                type="submit"
                name="submit"
                value="Register"
              >Submit</Button>
            </div></center>
        </form>
        <center>
          <Button
            variant="outlined"
            type="button"
            className="link-button" style={{margin: '15px'}}
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Return to Login
          </Button>
          </center></Box>
      </div>
    );
  }
}

// PropTypes allows us to import style.jsx for use
RegisterPage.propTypes = { classes: PropTypes.object.isRequired };

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));

