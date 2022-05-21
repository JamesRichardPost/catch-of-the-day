import React from 'react';

class Navbar extends React.Component {
    
    buttonRef = React.createRef();

    handleButton = (e) => {
        this.props.changeView(e.target.value);
    }
    
    render() {
        return (
            <ul className='navbar'>
                <li>
                    <button value="menu" onClick={this.handleButton}>Menu</button>
                </li>
                <li>
                    <button value="order-wrap" onClick={this.handleButton}>Order</button>
                </li>
                <li>
                    <button value="inventory" onClick={this.handleButton}>Inventory</button>
                </li>
            </ul>
        )
    }
}

export default Navbar;