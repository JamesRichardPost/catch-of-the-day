import React from 'react';
import PropType from 'prop-types';
import {formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        fishes: PropType.object,
        order: PropType.object,
        removeFromOrder: PropType.func
    }

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        if (!fish) return null; // Firebase takes a second to load our menu items
        const count = this.props.order[key];
        const isAvailable = (fish && fish.status === 'available');

        if (!isAvailable)
        {
            return ( <CSSTransition><li key={key}>
                Sorry, {fish ? fish.name : "fish"} is no longer available. 
            </li>
            </CSSTransition>
            )
        }

        else {
            return (
                <CSSTransition 
                    classNames="order" 
                    key={key} 
                    timeout={{enter: 500, exit: 500}}>
                <li key={key}>
                <span>
                    <TransitionGroup component="span" className="count">
                        <CSSTransition classNames="count" key={count} timeout={{enter: 250, exit:250}}>
                        <span>{count}</span>
                        </CSSTransition> 
                    </TransitionGroup>                
                    lbs {fish.name}
                </span>
                    <span className="cost">
                        {formatPrice(count * fish.price)}
                        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    </span>
                </li>
                </CSSTransition>
                )
        }
    }
    
    render() {
        const orderIds = Object.keys(this.props.order);
        const orderClass = this.props.matches ? 'order-wrap' : 'order-wrap hidden';
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
            <div className={orderClass}>
                <h2>
                    Order
                </h2>
                <TransitionGroup component="ul" className='order'>
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className='total'>
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;