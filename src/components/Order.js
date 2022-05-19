import React from 'react';
import {formatPrice } from '../helpers';

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        if (!fish) return null; // Firebase takes a second to load our menu items
        const count = this.props.order[key];
        const isAvailable = (fish && fish.status === 'available');

        if (!isAvailable)
        {
            return <li key={key}>
                Sorry, {fish ? fish.name : "fish"} is no longer available. 
            </li>
        }

        else {
            return <li key={key}>
                <span className='count'>{count} lbs {fish.name}</span>

                {formatPrice(count * fish.price)}
                <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                </li>
        }
    }
    
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';

            if (isAvailable)
                return prevTotal + (count * fish.price);
            
            else
                return prevTotal;
        }, 0);

        return (
            <div className='order-wrap'>
                <h2>
                    Order
                </h2>
                <ul className='order'>
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className='total'>
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;