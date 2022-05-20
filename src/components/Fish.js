import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from "../helpers";
import fishes from '../sample-fishes';
import propTypes from 'prop-types';
import { string } from 'prop-types';

class Fish extends React.Component {
    static propTypes = {
        details: propTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: propTypes.func
    }
    
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    
    render() {
        const image = this.props.details.image;
        const name = this.props.details.name;
        const price = this.props.details.price;
        const desc = this.props.details.desc;
        const status = this.props.details.status;
        const isAvailable = status === 'available';
    
        return (
            <li className='menu-fish'>
                <img src={image} alt={name}/>
                <h3 className='fish-name'>{name}
                    <span className='price'>{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button 
                disabled={!isAvailable} 
                onClick={this.handleClick}>
                    {isAvailable ? "Add To Cart" : "Sold Out"}
                </button>
                
            </li>
        )
    }

    
}

export default Fish;