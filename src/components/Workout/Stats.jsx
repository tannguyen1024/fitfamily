import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI Imports //
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Style/Style';
import { Divider, Box, Paper, Table, TableBody, TableCell, TableHead, TableContainer, TablePagination, TableRow } from '@material-ui/core'
// Sweet Alert 2 //
import Swal from 'sweetalert2/src/sweetalert2.js';
import '../Style/Swal.scss';
// Header //
import Header from '../Header/Header';
import SingleStats from './SingleStats';
import Chart from './Chart';

class Progress extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_ONE_WEIGHT', payload: this.props.user.id }); /* Gets all of the weight */
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Box>
                    <Divider/>
                    <Chart weight={this.props.weight} history={this.props.history} />
<Divider/>
        <center><h1>Your History</h1></center>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="left">Weight</TableCell>
                                    <TableCell align="left">Shared</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.weight.map((row) => (
                                    <SingleStats key={row.weight_id} row={row}/>
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
    weight: reduxState.oneWeight
});

export default connect(putStateOnProps)(withStyles(styles)(Progress));
