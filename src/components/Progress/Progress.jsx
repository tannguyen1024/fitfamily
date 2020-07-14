import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableContainer, TablePagination, TableRow } from '@material-ui/core'
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
// Header //
import Header from '../Header/Header';

class Progress extends Component {

 createData = (name, date, weight) => {
     return { name, date, weight };
}
    
    render() {
        const {classes} = this.props;
        const rows = [
            this.createData('Tan', 'Jul 12, 2020', 196),
            this.createData('Linda', 'Jul 12, 2020', 182.6),
        ];

        return (
            <>
                <Header history={this.props.history}/>
                <Box className={classes.margin}>
                    <center><h1>Fitness at a Glance</h1></center>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Weight</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.weight}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>



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
