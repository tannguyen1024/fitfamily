import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Paper, Radio, InputLabel, Box, TextField, Grid, Button } from '@material-ui/core'
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
import Header from '../Header/Header';
import Stats from './Stats';

class Workout extends Component {

    state = {
        user_id: this.props.user.id,
        weight: '',
        date: '',
        private: 'false',
    }

    handleChange = (event, property) => {
        this.setState({ ...this.state, [property]: event.target.value })
    }

    cancelSelect = (event) => {
        this.setState({ private: event.target.value });
    };

    submitButton = () => {
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
        if (this.state.date === '') {
            Toast.fire({
                title: 'Please choose a date and time'
            }); return
        }
        if (this.state.weight === '') {
            Toast.fire({
                title: 'Please enter a weight'
            }); return
        }
        this.props.dispatch({ type: 'POST_WEIGHT', payload: this.state }); /* Submits the weight */
        this.setState({weight: '', date: ''})
        let timerInterval
        Swal.fire({
            title: `Weight Added`,
            html: `Great Job!  Get that fitness!`,
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
    }

    render() {
        const { classes } = this.props;
        let cancelValue = String(this.state.private);
        return (
            <>
                <Header history={this.props.history} />
                <Box className={classes.margin}>
                    <center><h1>Track Your Weight</h1></center>

                    <Paper style={{ padding: '15px', borderRadius: '5px', backgroundColor: '#ededed' }}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date & Time"
                                type="datetime-local"
                                fullWidth
                                value={this.state.date}
                                InputLabelProps={{
                                    shrink: true,
                                    }} onChange={(event) => this.handleChange(event, 'date')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Weight"
                                type="number"
                                fullWidth
                                value={this.state.weight}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="#"
                                    onChange={(event) => this.handleChange(event, 'weight')}
                            />
                        </Grid>


                        <InputLabel style={{marginTop: '10px'}}>Share with Others?</InputLabel>
                        <Grid container justify="center">
                                <Grid item xs={12} sm={1}>
                                    <center><Radio
                                        color="primary"
                                        checked={cancelValue === 'false'}
                                        onChange={this.cancelSelect}
                                        value='false'
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'FALSE' }}
                                    />Yes</center>
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                <center><Radio
                                    color="primary"
                                    checked={cancelValue === 'true'}
                                    onChange={this.cancelSelect}
                                    value='true'
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'TRUE' }}
                                />No</center>
                                    </Grid>
                            
                        </Grid>

                            <Button color='primary' variant='contained' style={{ marginTop: '5px' }} onClick={this.submitButton}>Post</Button>
                    </Grid></Paper>

                    <Stats history={this.props.history}/>

                </Box>
            </>
        )
    }
}

Workout.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
});

export default connect(putStateOnProps)(withStyles(styles)(Workout));
