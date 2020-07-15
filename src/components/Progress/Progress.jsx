import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableContainer, TablePagination, TableRow } from '@material-ui/core'
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
// Header //
import Header from '../Header/Header';
import OneProgress from './OneProgress';

class Progress extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_WEIGHT' }); /* Gets all of the weight */
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Header history={this.props.history} />
                <Box className={classes.margin}>
                    <center><h1>Fitness at a Glance</h1></center>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Weight</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.weight.map((row) => (
                                    <OneProgress key={row.weight_id} row={row}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <center><Button variant="contained" color="primary" onClick={() => window.scrollTo(0, 0)} style={{ margin: '20px' }}>Return to Top</Button></center>

                </Box>
            </>
        )
    }
}

Progress.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
    weight: reduxState.weight
});

export default connect(putStateOnProps)(withStyles(styles)(Progress));
