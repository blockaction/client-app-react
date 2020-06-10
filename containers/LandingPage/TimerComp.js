import React, { Component } from 'react'
import * as action from "utils/api";

class TimerComp extends Component {
    state = {
      counter: 15,
    }

    fetchData = async () => {

        await action.getData("validators/validators_list").then((res) => {
          this.props.newValidators(res);
          this.setState({
            newValidators: res,
            counter: 15,
            status: "called",
          }, () => {
              clearInterval(this.myInterval)
                this.myInterval = setInterval(() => {
                  const { counter } = this.state
                  if(counter > 0) {
                  this.setState({counter: counter - 1})
                  }
              }, 1000)
          });
        });
    
        // await action.getData("attestations").then((res) => {
        //   this.setState({ newAttestations: res });
        // });
      };
    
      componentDidMount() {
        clearInterval(this.myInterval)
                this.myInterval = setInterval(() => {
                  const { counter } = this.state
                  if(counter > 0) {
                  this.setState({counter: counter - 1})
                  }
              }, 1000)
        this.interval = setInterval(() => {
          this.fetchData();
        }, 15000);
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }
    
    render() {
        // const { timer } = this.props;
        const { counter } = this.state;
        return (
            <div>
              {/* {'Last Updated: ' + counter + ' sec ago'} */}
              {'Updating In: ' + counter + ' sec'}
            </div>
        )
    }
}

export default TimerComp;