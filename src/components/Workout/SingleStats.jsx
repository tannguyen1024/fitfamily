import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { TableCell, TableRow } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
// Moment.js //
const moment = require('moment-timezone');

class OneProgress extends Component {
    deleteClick = () => {
        let date = moment(this.props.row.date).tz('America/Chicago').format(`MMMM Do YYYY`);
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
            title: `Delete This Entry?`,
            text: this.props.row.weight + 'lbs on ' + date,
            showCancelButton: true,
            confirmButtonColor: '#296EC8',
            cancelButtonColor: '#F45255',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then(result => {
            if (result.value === 'DELETE') {
                this.props.dispatch({ type: 'DELETE_WEIGHT', payload: this.props.row.weight_id, user: this.props.user.id })
                let timerInterval
                Swal.fire({
                    title: `Entry Removed`,
                    html: `No proof of that one!`,
                    timer: 2500,
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
                    title: 'Entry was not deleted'
                })
            }
        })
    }
    
    render() {
        let date = moment(this.props.row.date).tz('America/Chicago').format(`MMM DD, YYYY h:mm a`);
        return (
            
                <TableRow>
                    <TableCell component="th">{date}</TableCell>
                    <TableCell align="left">{this.props.row.weight}</TableCell>
                <TableCell>{this.props.row.private ? <span style={{ color: 'blue' }}>No</span> : <span style={{ color: 'green' }}>Yes</span> }</TableCell> 
                    <TableCell><DeleteIcon onClick={this.deleteClick}/></TableCell> 
                </TableRow>
            
        )
    }
}

OneProgress.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user
});

export default connect(putStateOnProps)(withStyles(styles)(OneProgress));
