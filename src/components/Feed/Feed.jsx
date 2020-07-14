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
import OneFeed from './OneFeed'

class Feed extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_FEED' }); /* Gets all of the feed */
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Header history={this.props.history} />
                <Box className={classes.margin}>
                    <h1>{this.props.user.username}'s Feed</h1>
                    <Paper style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#ebebeb' }}>
                        <Grid container justify='space-evenly' alignItems='stretch'>
                            <Grid item xs={1}>
                                <Avatar alt="Tan Nguyen" src={this.props.user.picture} style={{marginRight: '5px'}}/>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField style={{paddingLeft:'10px'}} size='small' variant='outlined' fullWidth multiline placeholder={`Post your fitness here, ` + this.props.user.username + '!'} onChange={(event) => this.handleChange(event)}/>
                            </Grid>
                        </Grid>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={1}>
                                <Button color='primary' variant='contained' style={{ marginTop: '5px' }}>Post</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                        
                        {this.props.feed.map(feed =>
                            <OneFeed feed={feed}/>
                        )}

                </Box>
            </>
        )
    }
}

Feed.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
    feed: reduxState.feed
});

export default connect(putStateOnProps)(withStyles(styles)(Feed));
