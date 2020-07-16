import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Box, Grid, Typography, Divider, Paper, Avatar, TextField, Button } from '@material-ui/core'
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
import Header from '../Header/Header';

class Setting extends Component {
    state = {
        editMode: false,
        user_id: this.props.user.id,
        username: this.props.user.username,
        display: this.props.user.display,
        phone: this.props.user.phone,
        email: this.props.user.email,
        picture: this.props.user.picture
    }

    editClick = () => {
        this.setState({editMode: true})
    }

    submitClick = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        if (this.state.username === '') {
            Toast.fire({
                title: 'Please enter a username'
            }); return
        }
        if (this.state.display === '') {
            Toast.fire({
                title: 'Please enter a display name'
            }); return
        }
        this.props.dispatch({ type: 'UPDATE_USER', payload: this.state }); /* Submits the weight */
        let timerInterval
        Swal.fire({
            title: `Changes Made`,
            html: `Your changes were successfully entered.`,
            timer: 3000,
            icon: 'success',
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
            if (result.dismiss === Swal.DismissReason.timer) { }
        })
        this.setState({editMode: false})
    }

    handleChange = (event, property) => {
        this.setState({ ...this.state, [property]: event.target.value });
    }

    render() {
        console.log(this.state)
        const { classes } = this.props;
        return (
            <>
                <Header history={this.props.history} />
                <Box className={classes.margin}>
                    
                    <Paper style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#ededed' }}>
                        <Grid container justify='flex-start' alignItems='center'>
                            <Grid item xs={2}>
                                <Box minWidth='50px'>
                                    {this.props.user.picture ? <img width='50px' src={this.props.user.picture} style={{ borderRadius: '10%' }} alt="Picture" /> : <img width='50px' src='/images/No_Avatar.png' style={{ borderRadius: '10%' }} alt="Picture" />}
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <center><Typography variant="h5">
                                    {this.props.user.display}'s Profile
                                </Typography></center>
                            </Grid>
                        </Grid>
                    </Paper>
                    
                    {this.state.editMode === false ? 
                    <Paper style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#FFFFFF' }}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={12}>
                                <Typography>Username: {this.props.user.username}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Display Name: {this.props.user.display}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Phone: {this.props.user.phone}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Email: {this.props.user.email}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Picture URL: {this.props.user.picture}</Typography>
                            </Grid>
                            </Grid> <center><Button onClick={() => this.editClick()} variant="contained" color="primary" style={{ marginTop: '10px' }}>Edit Profile</Button></center>
                    </Paper> :

                    <Paper style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#FFFFFF' }}>
                        <Grid container justify='center' alignItems='center' spacing={1}>
                        <Grid item xs={12} sm={6} md={4}>
                                    <TextField placeholder="Case Sensitive" onChange={(event) => this.handleChange(event, 'username')} fullWidth label="Username (Case Sensitive)" size="small" variant='outlined' defaultValue={this.props.user.username}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                                    <TextField onChange={(event) => this.handleChange(event, 'display')} fullWidth label="Display Name" size="small" variant='outlined' defaultValue={this.props.user.display} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                                    <TextField onChange={(event) => this.handleChange(event, 'phone')} fullWidth label="Phone" size="small" variant='outlined' defaultValue={this.props.user.phone} />
                        </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                            <TextField onChange={(event) => this.handleChange(event, 'email')} fullWidth label="Email" size="small" variant='outlined' defaultValue={this.props.user.email} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                                    <TextField onChange={(event) => this.handleChange(event, 'picture')} fullWidth multiline label="Profile Image URL" size="small" variant='outlined' defaultValue={this.props.user.picture} />
                        </Grid>
                    </Grid>
                            <center><Button onClick={() => this.submitClick()} variant="contained" color="primary" style={{ marginTop: '10px' }}>Submit Changes</Button></center>
                    </Paper>
                    }
                    

                </Box>
            </>
        )
    }
}

Setting.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
});

export default connect(putStateOnProps)(withStyles(styles)(Setting));
