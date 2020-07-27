import Link from "next/link";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import * as action from "utils/api";
import logoImage from "../static/logo.svg";
// import logoImage2 from "../static/img/bitsbeat.png";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarToggle: false,
      domain: "Madella",
      anotherDomain: "Prysm",
    };
  }

  componentDidMount() {
    if (window.location.href.includes("madella")) {
      this.setState({ domain: "Madella", anotherDomain: "Prysm" });
    } else if (window.location.href.includes("prysm")) {
      this.setState({ domain: "Prysm", anotherDomain: "Madella" });
    }
  }

  render() {
    const { domain, anotherDomain } = this.state;
    return (
      <header>
        <div className="top-nav">
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="main-nav"
        >
          <Container>
            <Link href="/" passHref>
              <Navbar.Brand>
                <div className="logo">
                  <img
                    style={{ maxWidth: "170px", maxHeight: "40px" }}
                    src={logoImage}
                    alt="Eth Logo"
                  />
                  {/* <img
                    style={{ maxWidth: "170px", maxHeight: "30px" }}
                    // src={logoImage}
                    alt="Eth Logo"
                  /> */}
                </div>
              </Navbar.Brand>
            </Link>
            {/* Active Network
            <NavDropdown
                  className="tool-selector"
                  title={domain}
                  id="collasible-nav-dropdown"
                >
                  <a
                    href={`https://${anotherDomain}.blockaction.io/`}
                    target="_blank"
                  >
                    {anotherDomain}
                  </a>
                </NavDropdown> */}
            {/* <span className="nav__text">Beacon Ethereum</span> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <Link href="/" passHref>
                  <Nav.Link>Home</Nav.Link>
                </Link>
                {/* <a href="https://www.coindesk.com/learn/ethereum-101/how-to-mine-ethereum" target="_blank" className="nav-link">
                    Blog
                </a> */}
                <Link href="/reward" passHref>
                  <Nav.Link>Reward Calculator</Nav.Link>
                </Link>
                <Link href="/resources" passHref>
                  <Nav.Link>Resources</Nav.Link>
                </Link>
                <Link href="/all-validators" passHref>
                  <Nav.Link>Validators</Nav.Link>
                </Link>
                <Link href="/epochs" passHref>
                  <Nav.Link>Epochs</Nav.Link>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default NavigationBar;
