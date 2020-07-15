import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Paper, Divider, Box, TextField, Button, Grid, Avatar, Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
// Moment.js //
const moment = require('moment');

class OneFeed extends Component {

    deleteClick = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Swal.fire({
            input: 'textarea',
            inputPlaceholder: `Type "DELETE" Here and press Confirm`,
            inputAttributes: {
                'aria-label': 'New Event Name'
            },
            title: `Delete comment?`,
            text: this.props.feed.username + ': ' + this.props.feed.comment,
            // icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#296EC8',
            cancelButtonColor: '#F45255',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then(result => {
            if (result.value === 'DELETE') {
                this.props.dispatch({ type: 'DELETE_FEED', payload: this.props.feed.feed_id, history: this.props.history })
                let timerInterval
                Swal.fire({
                    title: `Comment Deleted`,
                    html: `Comment has been successfully deleted.`,
                    timer: 2000,
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
            else if (result.value !== 'DELETE') {
                Toast.fire({
                    title: 'Comment was not deleted'
                })
            }
        })
    }

    upvoteClick = () => {
        this.props.dispatch({ type: 'UPVOTE_FEED', payload: this.props.feed.feed_id, history: this.props.history })
    }

    render() {
        let date = moment(this.props.feed.date).utcOffset("-05:00").format(`MMMM Do YYYY, h:mm a`);
        const { classes } = this.props;
        return (
            
            <Paper style={{ marginTop: '20px', padding: '5px', borderRadius: '5px', backgroundColor: '#f7f7f7' }}>
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
                            <span style={{ fontWeight: '600', fontSize:'20px' }}>{this.props.feed.upvotes}</span> <FavoriteIcon onClick={this.upvoteClick} style={{ color: 'red', fontSize: '120%' }} />
                            {this.props.feed.user_id === this.props.user.id && <DeleteIcon onClick={this.deleteClick} style={{ marginLeft: '25px', fontSize: '120%' }}/>}
                        </Grid>
                    </Grid>
                </Paper>
            
        )
    }
}

OneFeed.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user
});

export default connect(putStateOnProps)(withStyles(styles)(OneFeed));
