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
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

class Chart extends Component {
    state={weight: []}

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CHART', payload: this.props.user.id }); /* Gets all of the chart */
        this.setState({
            weight: this.props.chart.weight,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chart.weight != this.props.chart.weight) {
            this.setState({
                weight: this.props.chart.weight,
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <center><h1>Progress Chart</h1></center>

                <center>
                    <LineChart width={300} height={250} data={this.state.weight}
                        margin={{ top: 5, right: 45, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                    </LineChart>
                </center>

            </>
        )
    }
}

Chart.propTypes = { classes: PropTypes.object.isRequired };

const putStateOnProps = reduxState => ({
    user: reduxState.user,
    chart: reduxState.chart
});

export default connect(putStateOnProps)(withStyles(styles)(Chart));
