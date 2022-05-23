import propTypes from 'prop-types';
import react from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { fishValidation } from '../helpers';

class AddFishForm extends React.Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();
    
    static propTypes = {
        addFish: PropTypes.func
    }

    
    createFish = (e) => {

        e.preventDefault();
        let name = this.nameRef.current.value;
        let price = this.priceRef.current.value;

        // strip all non number characters
        price = price.replace(/\D/g, "");

        // need to validate the price and give things a name
        if (name === "")
        {
            name = "New Fish";
        }

        if (price === "")
        {
            price = 0;
        }

        const fish = {
            name: name,
            price: parseFloat(price),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }
        
        this.props.addFish(fish);
        
        // refresh form
        e.currentTarget.reset();
    }
    
    render() { 
        return (
            <form className='fish-edit' onSubmit={this.createFish}>
                <input name="name" type="text" placeholder="Name" ref={this.nameRef} />
                <input name="price" type="text" placeholder='Price' ref={this.priceRef} />
                <select name="status" ref={this.statusRef}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc"  placeholder='Desc' ref={this.descRef}></textarea>
                <input name="image" type="text" placeholder='Image' ref={this.imageRef}/>
                <button type='submit'>+ Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;