import React from "react";

import * as action from "utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bitsbeatLogo from "../static/logo-white.png";
import logoImage from "../static/logo.svg";

class Footer extends React.Component {
  state = {
    name: "",
    email: "",
    phoneNumber: "",
    purpose: "",
    message: "",
    data: null,
    responseMessage: null,
    responseStatus: null,
    loading: false,
    domain: 'Witti',
    anotherDomain:'Prysm'
  };

  componentDidMount() {
    toast.configure({
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnHover: true,
      draggable: false,
    });
    if(window.location.href.includes('witti')) {
      this.setState({domain:'Witti', anotherDomain:'Prysm'})
    } else if(window.location.href.includes('prysm')) {
      this.setState({domain:'Prysm', anotherDomain: 'Witti'})
    }
  }

  notifyme = () => {
    const { responseStatus, responseMessage, toastConfigure } = this.state;
    responseStatus === 200 && toast.info(responseMessage, toastConfigure);
    responseStatus === 400 && toast.error(responseMessage, toastConfigure);
  };

  handleChange = (event) => {
    const { name, email, phoneNumber, purpose, message } = this.state;
    this.setState({
      [event.target.name]: event.target.value,
    });

    name &&
      email &&
      phoneNumber &&
      purpose &&
      message &&
      this.setState({
        data: {
          full_name: name,
          email: email,
          phone_number: parseInt(phoneNumber),
          purpose: purpose,
          message: message,
        },
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const url = `contact-us`;
    const { data } = this.state;
    this.setState({ loading: true });

    return action.postData(url, data).then((res) => {
      this.setState({
        responseStatus: res.status,
        responseMessage: res.message,
        loading: false,
        name: "",
        email: "",
        phoneNumber: "",
        purpose: "",
        message: "",
        data: null,
      });
      this.notifyme();
    });
  };

  render() {
    const { domain, anotherDomain  } = this.state;

    return (
      <footer className="main-footer  ">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-center offset-md-2">
              <img src={logoImage}></img>
              <p className="main-footer-text">
                ETH 2.0 Beacon Chain {domain} {domain && domain === 'Witti' && 'Multiclient'} Testnet Explorer{" "}
              </p>

              <div>
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/blockaction"
                      target="_blank"
                      className="fb"
                      title="Facebook"
                    >
                      <i className="icon-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="gth"
                      href="https://github.com/blockaction"
                      target="_blank"
                      title="Fork us on Github"
                    >
                      <i className="icon-github"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="disc"
                      href="https://discord.gg/ySPauhP"
                      target="_blank"
                      title="Chat with us on Discord"
                    >
                      <i className="icon-discord"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/blockaction_io"
                      target="_blank"
                      className="twi"
                      title="Twitter"
                    >
                      <i className="icon-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="row pb-3">
            <div className="col-md-4">
              <small>
                BlockAction | All rights reserved | &copy; Copyright 2020
              </small>
            </div>
            <div className="col-md-8 text-right">
              <small>
                BlockAction | Developed by{" "}
                <a href="https://www.bitsbeat.com/" target="_blank" className="bitsbeat-text">
                  Bitsbeat IT Solutions
                </a>
              </small>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
