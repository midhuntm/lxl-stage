import React, { Component } from 'react';
import './attendence.scss'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Attendece extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <div className="attendence-wrapper">
                <div className="calendar-wrap">
                    {/* <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    /> */}
                    <DayPicker numberOfMonths={6} />
                </div>

            </div>

        );
    }
}
export default Attendece