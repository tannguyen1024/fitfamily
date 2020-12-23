import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
import Header from '../Header/Header';

class REPLACE_THIS extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
            <Header/>
            <h1>REPLACE_THIS</h1>
            </>
        )
    }
}

REPLACE_THIS.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    reduxState
});

export default connect(putStateOnProps)(withStyles(styles)(REPLACE_THIS));
