import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.computeRemainingTime(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  computeRemainingTime(finalDate) {
    let gap = (Date.parse(new Date(finalDate)) - Date.parse(new Date())) / 1000;

    if (gap <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    // calculate time gap between now and expected date
    if (gap >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(gap / (365.25 * 86400));
      gap -= timeLeft.years * 365.25 * 86400;
    }
    if (gap >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(gap / 86400);
      gap -= timeLeft.days * 86400;
    }
    if (gap >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(gap / 3600);
      gap -= timeLeft.hours * 3600;
    }
    if (gap >= 60) {
      timeLeft.min = Math.floor(gap / 60);
      gap -= timeLeft.min * 60;
    }
    timeLeft.sec = gap;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  isExtraZeroRequired(val) {
    val = String(val);
    while (val.length < 2) {
      val = '0' + val;
    }
    return val;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown mb-3">
        <div>
            Medalla Genesis Event is coming soon (24th of August):
        </div>  
        <span>
          <span>
              <strong>{this.isExtraZeroRequired(countDown.days)} </strong>
              <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
          </span>
        </span>

        <span>
          <span>
            <strong> {this.isExtraZeroRequired(countDown.hours)} </strong>
            <span>Hours</span>
          </span>
        </span>


        <span>
          <span>
            <strong> {this.isExtraZeroRequired(countDown.min)} </strong>
            <span>Min</span>
          </span>
        </span>

        <span>
          <span>
            <strong> {this.isExtraZeroRequired(countDown.sec)} </strong>
             <span>Sec</span>
          </span>
        </span>
      </div>
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;