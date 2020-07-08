import React, { Component } from "react";
import * as action from "utils/api";

class TimerComp extends Component {

  _isMounted = false;

  state = {
    counter: 15,
  };

  fetchData = async () => {
    await action.getData("validators/validators_list").then((res) => {
      if(this._isMounted) {
      this.props.newValidators(res);
      this.setState(
        {
          newValidators: res,
          counter: 15,
          status: "called",
        },
        () => {
          clearInterval(this.myInterval);
          this.myInterval = setInterval(() => {
            const { counter } = this.state;
            if (counter > 0) {
              this.setState({ counter: counter - 1 });
            }
          }, 1000);
        }
       );
      }
      });

    // await action.getData("attestations").then((res) => {
    //   this.setState({ newAttestations: res });
    // });
  };

  componentDidMount() {
    this._isMounted = true;
    clearInterval(this.myInterval);
    this.myInterval = setInterval(() => {
      const { counter } = this.state;
      if(this._isMounted) {
      if (counter > 0) {
        this.setState({ counter: counter - 1 });
      }
    }
    }, 1000);
    this.interval = setInterval(() => {
      this.fetchData();
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
    this._isMounted = false;
  }

  render() {
    // const { timer } = this.props;
    const { counter } = this.state;
    return (
      <div className="text-monospace counter">
        {/* {'Last Updated: ' + counter + ' sec ago'} */}
        <i className="icon-clock-o" /> Next Update in : {counter + " sec"}
      </div>
    );
  }
}

export default TimerComp;
