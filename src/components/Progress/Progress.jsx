import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Box } from '@material-ui/core'
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
// Header //
import Header from '../Header/Header';

class Progress extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Header history={this.props.history}/>
                <Box className={classes.margin}>
                    <center><h1>{this.props.user.username}'s Progress</h1></center>
                </Box>
            </>
        )
    }
}

Progress.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
});

export default connect(putStateOnProps)(withStyles(styles)(Progress));
