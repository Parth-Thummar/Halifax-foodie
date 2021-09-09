import "./header.css"
import {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLinks: [
        {id: 'find-similarity', link: '/find-similarity', name: 'Find Similarity'},
        {id: 'chat-bot', link: '/chat-bot', name: 'Virtual Assistant'},
        {id: 'place-order', link: '/place-order', name: 'Place Order'},
        {id: 'my-orders', link: '/my-orders', name: 'My Orders'}
      ],
      activeLink: window.location
    }
  }

  handleLinkClick(item, event) {
    this.setState({activeLink: item.id});
  }

  render() {
    const navDropDownTitle = (
      <FontAwesomeIcon
        size={"2x"}
        icon={faUserCircle}
        className={"secondary"}
      />
    );
    return (
      <Navbar bg="dark" expand="lg" variant={"dark"} sticky={"top"}>
        <Navbar.Brand className={"mr-5"}>
          <h3 className={"ml-2"}>Halifax Food</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {
              this.state.headerLinks.map(headerLink => {
                return <Nav.Link href={headerLink.link} key={headerLink.id}
                                 className={this.state.activeLink.pathname === headerLink.link ? 'active' : ''}
                                 onClick={this.handleLinkClick.bind(this, headerLink)}>
                  {headerLink.name}
                </Nav.Link>

              })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title={navDropDownTitle}
              id="navbarScrollingDropdown"
              alignRight
            >
              <NavDropdown.Item href={"/login"}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
