import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Paper, Divider, Box, TextField, Button, Grid, Avatar, Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
import Header from '../Header/Header';
// Moment.js //
const moment = require('moment');

class OneFeed extends Component {
    render() {
        let date = moment(this.props.feed.date).format(`MMMM Do YYYY, h:mm a`);
        const { classes } = this.props;
        return (
            <>
                <Paper style={{ marginTop: '20px', padding: '5px', borderRadius: '5px', backgroundColor: '#ebebeb' }}>
                    <Grid container justify='space-evenly' alignItems='stretch'>
                        <Grid item xs={1}>
                            <Avatar alt={this.props.feed.username} src={this.props.feed.picture} />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography style={{ marginLeft: '10px' }}>
                                <span style={{ fontWeight: '600' }}>{this.props.feed.username} </span></Typography>
                            <Typography style={{ marginLeft: '10px' }}>
                                <span style={{ fontWeight: '400', fontSize: '12px' }}>{date} </span></Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container justify='center' alignItems='center'>
                        <Grid item xs={12}>
                            <Typography style={{ padding: '10px', marginLeft: '10px' }}>
                                <span style={{ fontWeight: '400' }}>{this.props.feed.comment} </span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container justify='space-evenly'>
                        <Grid item xs={4} style={{ marginTop: '5px', textAlign: 'center'}}>
                            <span style={{ fontWeight: '600' }}>{this.props.feed.upvotes}</span> <FavoriteIcon style={{ color: 'red', fontSize: '90%' }} />
                        </Grid>
                    </Grid>
                </Paper>
            </>
        )
    }
}

OneFeed.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    reduxState
});

export default connect(putStateOnProps)(withStyles(styles)(OneFeed));
