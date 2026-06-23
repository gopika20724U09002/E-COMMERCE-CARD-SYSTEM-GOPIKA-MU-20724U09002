import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { ThemeContext } from './context/ThemeContexts';
import { FaRegMoon, FaShoppingCart } from 'react-icons/fa';
import { GoSun } from 'react-icons/go';
import { AiOutlineMenu } from 'react-icons/ai'
import { ProductConsumer } from '../context';

class Navbar extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 768, // Adjust the breakpoint as needed
      menuOpen: false,
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      isMobile: window.innerWidth <= 768, // Adjust the breakpoint as needed
    });
  }

  handleMenu() {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const { theme, toggleTheme } = this.context;
    const { isMobile, menuOpen } = this.state;

    return (
      <div>
        {isMobile ? (
          // Mobile View
          <MobileNavWrapper className="navbar nav-bar-expand-sm bg-slate-800 px-sm-5 w-100">
            <Link to="/" className="w-50">
              <span className="navbar-brand">Store</span>
            </Link>
            <div className="text-white w-50 menu" onClick={this.handleMenu}>
              <AiOutlineMenu className="menubar" />
            </div>
            {menuOpen && (
              <div className=" resmenu w-100 ">
                <ProductConsumer>
                  {value => (<li style={{
                    listStyleType: 'none'
                  }}>
                    <input className="w-100" placeholder='Search' onChange={(e) => {
                      value.filterProducts(e.target.value);
                    }}>
                    </input>
                  </li>)
                  }
                </ProductConsumer>
                <Link className="text-white bg-transparent themes" onClick={toggleTheme}>
                  {theme ? <h6>Dark Mode <FaRegMoon /></h6> : <h6>Light Mode <GoSun /></h6>}
                </Link>
                <Link to="/cart" className="ml-auto">
                  <ButtonContainer>
                    <span className="nav-cart-button"><FaShoppingCart /> my cart</span>
                  </ButtonContainer>
                </Link>
              </div>
            )}
          </MobileNavWrapper>
        ) : (
          // Desktop View
          <DesktopNavWrapper className="navbar nav-bar-expand-sm bg-slate-800 px-sm-5">
            <Link to="/">
              <span className="navbar-brand">Store</span>
            </Link>
            <ul className="navbar-nav align-items-center w-full">
              <ProductConsumer>
                {value => (<li className="nav-item ml-5 w-full">
                  <input className="w-full text-center" placeholder='Search' onChange={(e) => {
                    value.filterProducts(e.target.value);
                  }}>
                  </input>
                </li>)
                }
              </ProductConsumer>
            </ul>
            <Link to="/cart" className="ml-auto">
              <ButtonContainer>
                <span className="nav-cart-button"><FaShoppingCart /> my cart</span>
              </ButtonContainer>
            </Link>
            <div className="text-white bg-transparent themes mainmenu" onClick={toggleTheme}>
              {theme ? <FaRegMoon /> : <GoSun />}
            </div>
          </DesktopNavWrapper>
        )}
      </div>
    );
  }
}

const NavWrapper = styled.nav`
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

const MobileNavWrapper = styled(NavWrapper)`
  /* Add mobile-specific styles here */
`;

const DesktopNavWrapper = styled(NavWrapper)`
  /* Add desktop-specific styles here */
`;

export default Navbar;
