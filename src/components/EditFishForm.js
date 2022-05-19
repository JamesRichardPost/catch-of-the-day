import React from 'react';
import {formatPrice} from "../helpers";

class EditFishForm extends React.Component {
    handleChange = e => {
        // update that fish

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