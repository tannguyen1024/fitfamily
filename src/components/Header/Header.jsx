import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Box, Grid } from '@material-ui/core'
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
// Material UI Icons //
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
    render() {
        const page = window.location.href.split('/')[4];
        const { classes } = this.props;
        return (
            <Box className={classes.shadow}>
                <Box className={classes.header} maxHeight="100px" style={{ backgroundImage: `url(https://unsplash.com/photos/RyhDsX_oGT4/download?force=true&w=1920)` }}>
                    <Box className={classes.padding}>
                        <Grid container justify="space-around">
                            {page === 'home' ? <HomeIcon className={classes.icon_check} /> : <HomeIcon className={classes.icon} onClick={() => this.props.history.push('/home')}/>}
                            {page === 'feed' ? <ChatIcon className={classes.icon_check} /> : <ChatIcon className={classes.icon} onClick={() => this.props.history.push('/feed')}/>}
                            {page === 'workout' ? <CreateIcon className={classes.icon_check} /> : <CreateIcon className={classes.icon} onClick={() => this.props.history.push('/workout')}/>}
                            {page === 'setting' ? <MenuIcon className={classes.icon_check} /> : <MenuIcon className={classes.icon} onClick={() => this.props.history.push('/setting')}/>}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        )
    }
}

Header.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    reduxState
});

export default connect(putStateOnProps)(withStyles(styles)(Header));
