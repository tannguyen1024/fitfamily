import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { TableCell, TableRow } from '@material-ui/core'
// Sweet Alert 2 //
import '../Style/Swal.scss';
// Moment.js //
const moment = require('moment');

class OneProgress extends Component {
    render() {
        let date = moment(this.props.row.date).utcOffset("-05:00").format(`MMM DD, YYYY h:mm a`);
        return (
            
                <TableRow>
                    <TableCell component="th" scope="row">{this.props.row.display}</TableCell>
                    <TableCell align="left">{date}</TableCell>
                    <TableCell align="left">{this.props.row.weight}</TableCell>
                </TableRow>
            
        )
    }
}

OneProgress.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    reduxState
});

export default connect(putStateOnProps)(withStyles(styles)(OneProgress));
