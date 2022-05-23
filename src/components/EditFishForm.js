import React from 'react';
import {formatPrice} from "../helpers";
import PropTypes from 'prop-types';
import propTypes from 'prop-types';

class EditFishForm extends React.Component {
    static propTypes = {
        fish: propTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        id: PropTypes.string
    } 
    
    handleChange = e => {
        // update that fish
        // we want to make sure we can't put non numbers in the price section
        const target = e.target["name"];

        if (target === "price")
        {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g,'');
        }
        
        // copy current fish
        const currentFish = { 
            ...this.props.fish,
            [e.currentTarget.name]: e.currentTarget.value
        };

        this.props.updateFish(this.props.id, currentFish);
    }

    deleteFish = e => {
        this.props.deleteFish(this.props.id);
    }
    
    render() {
        const fish = this.props.fish;

        return (
            <div className='fish-edit'>
                <input name="name" type="text" onChange={this.handleChange} value={fish.name} ref={this.nameRef}></input>
                <input name="price" type="text" onChange={this.handleChange} value={fish.price} ref={this.priceRef}/>
                <select name="status" onChange={this.handleChange} value={fish.status} ref={this.statusRef}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={fish.desc} ref={this.descRef}></textarea>
                <input name="image" type="text" onChange={this.handleChange} value={fish.image} ref={this.imageRef}/>
                <button onClick={this.deleteFish}>Remove Fish</button>
            </div>
        )
    }
}

export default EditFishForm;