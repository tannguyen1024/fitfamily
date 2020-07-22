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

class Search extends Component {
    state = {
        selected: '',
        giphy: [],
        user_id: this.props.user.id,
    }

    componentDidMount = () => {
        console.log('Found results:', this.props.giphy);
        this.setState({
            giphy: this.props.giphy,
        })
    }

    handleChange = (event) => {
        this.setState({ comment: event.target.value })
    }

    selectGif = (event, giphy) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            title: 'GIF Selected!'
        })
        this.setState({ selected: giphy.images.fixed_width.url });
    }

    cancelClick = () => {
        window.scrollTo(0, 0);
        window.location.reload();
    }

    postGif = () => {
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
        if (this.state.selected === '') {
            Toast.fire({
                title: 'Please select an image'
            }); return
        }
        this.props.dispatch({ type: 'POST_GIPHY', payload: this.state, history: this.props.history });
        window.scrollTo(0, 0);
        window.location.reload();
    }

    render() {
        const { classes } = this.props;
        return (
            <>

                <Paper style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#ededed' }}>
                    <Grid container justify='space-evenly' alignItems='stretch' padding="4">
                        <Grid item xs={1}>
                            <Avatar alt={this.props.user.username} src={this.props.user.picture} style={{ marginRight: '5px' }} />
                        </Grid>
                        <Grid item xs={9}>
                            {this.props.giphy.map(giphy =>
                                <img onClick={(event) => this.selectGif(event, giphy)} key={giphy.id} src={giphy.images.preview_gif.url} alt={giphy.title} width="50%" />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container justify='space-evenly' alignItems='center' spacing="2">
                        <Grid item xs={2}>
                            <Button color='primary' variant='contained' style={{ margin: '5px' }} onClick={this.cancelClick}>Cancel</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button color='primary' variant='contained' style={{ margin: '5px' }} onClick={this.postGif}>Post Selected</Button>
                        </Grid>

                    </Grid>
                </Paper>

            </>
        )
    }
}

Search.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
    feed: reduxState.feed,
    giphy: reduxState.giphy,
});

export default connect(putStateOnProps)(withStyles(styles)(Search));
