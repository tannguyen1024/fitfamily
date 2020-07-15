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
    render() {
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

                        </Grid>
                    </Paper>

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
