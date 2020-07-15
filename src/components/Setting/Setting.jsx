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
import Header from '../Header/Header';

class Setting extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Header history={this.props.history}/>
                <Box className={classes.margin}>
                    <center><h1>{this.props.user.username}'s Settings</h1></center>
                    Coming Soon: Change Profile Picture.
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
