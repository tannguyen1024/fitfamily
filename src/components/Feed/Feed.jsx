import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Paper, Box, TextField, Button, Grid, Avatar } from '@material-ui/core'
import styles from '../Style/Style';
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
import Header from '../Header/Header';
import OneFeed from './OneFeed';
import Search from './Search';

class Feed extends Component {
    state = {
        comment: '',
        user_id: this.props.user.id,
        giphy: 0,
    }
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_FEED' }); /* Gets all of the feed */
    }

    handleChange = (event) => {
        this.setState({ comment: event.target.value })
    }

    gifClick = (event) => {
        this.setState({ giphy: 1 })
    }

    gifCancel = (event) => {
        this.setState({ giphy: 0 })
    }

    searchGif = (event) => {
        this.props.dispatch({ type: 'FETCH_SEARCH', payload: this.state.comment });
        this.setState({ giphy: 2 })
    }

    postComment = () => {
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
        if (this.state.comment === '') {
            Toast.fire({
                title: 'Please enter a comment'
            }); return
        }
        this.props.dispatch({ type: 'POST_FEED', payload: this.state, history: this.props.history })
        this.setState({ comment: '' })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Header history={this.props.history} />
                <Box className={classes.margin}>
                    <center><h1>{this.props.user.username}'s Fit Feed</h1></center>
                    
                    {this.state.giphy === 0 && 
                    <Paper style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#ededed' }}>
                        <Grid container justify='space-evenly' alignItems='stretch'>
                            <Grid item xs={1}>
                                <Avatar alt={this.props.user.username} src={this.props.user.picture} style={{ marginRight: '5px' }} />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField style={{ paddingLeft: '10px' }} size='small' variant='outlined' value={this.state.comment} fullWidth multiline placeholder={`Post your fitness here, ` + this.props.user.display + '!'} onChange={(event) => this.handleChange(event)} />
                            </Grid>
                        </Grid>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={3}>
                                <Button color='primary' variant='contained' style={{ margin: '5px' }} onClick={this.gifClick}>GIF</Button> 
                            </Grid>
                            <Grid item xs={3}>
                                <Button color='primary' variant='contained' style={{ margin: '5px' }} onClick={this.postComment}>Post</Button>
                            </Grid>
                        </Grid>
                        </Paper>}

                    {this.state.giphy === 1 &&
                        <Paper style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#ededed' }}>
                            <Grid container justify='space-evenly' alignItems='stretch'>
                                <Grid item xs={1}>
                                    <Avatar alt={this.props.user.username} src={this.props.user.picture} style={{ marginRight: '5px' }} />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField style={{ paddingLeft: '10px' }} color='secondary' size='small' variant='outlined' value={this.state.comment} fullWidth multiline placeholder={`Search for a GIF here, ` + this.props.user.display + '!'} onChange={(event) => this.handleChange(event)} />
                                </Grid>
                            </Grid>
                        <Grid container justify='center' alignItems='center'>
                                <Grid item xs={3}>
                                    <Button color='secondary' variant='contained' style={{ margin: '5px' }} onClick={this.gifCancel}>Cancel</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button color='secondary' variant='contained' style={{ margin: '5px' }} onClick={this.searchGif}>Search</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        }

                    {this.state.giphy === 2 &&
                        <Search history={this.props.history} />}

                    {this.props.feed.map(feed =>
                        <OneFeed key={feed.feed_id} feed={feed} />
                    )}
                    <center><Button variant="contained" color="primary" onClick={() => window.scrollTo(0, 0)} style={{ margin: '20px' }}>Return to Top</Button></center>
                    <center><img src="./images/Giphy.png" alt="Powered by Giphy" /></center>
                </Box>
            </>
        )
    }
}

Feed.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
    feed: reduxState.feed,
});

export default connect(putStateOnProps)(withStyles(styles)(Feed));
