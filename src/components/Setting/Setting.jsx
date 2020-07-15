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
        const {classes} = this.props;
        return (
            <>
                <Header history={this.props.history}/>
                <Box className={classes.margin}>
                    <center><h1>{this.props.user.username}'s Settings</h1></center>
                    
                    
                    <Paper style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#ededed' }}>
                        <Grid container justify='flex-start' alignItems='center'>
                            <Grid item xs={2}>
                                <Box minWidth='50px'>
                                    <img width='50px' src={this.props.user.picture} style={{  borderRadius: '10%' }} alt="Tan Nguyen" />
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>
                                    {this.props.user.username} {this.props.user.phone}
                                    </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={1}>
                                
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
