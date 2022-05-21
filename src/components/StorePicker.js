import React from "react";
import { formatException } from "stylus/lib/utils";
import {getFunName} from "../helpers";

class StorePicker extends React.Component {
    myInput = React.createRef();
    
    goToStore = (e) => {
        // Stop form from submitting
        e.preventDefault();

        // get text from input
        const storeName = this.myInput.current.value;

        // change the page based on input
        this.props.history.push(`/store/${storeName}`);
    };
    
    render() {
        return (
            <form className='store-selector' onSubmit={this.goToStore}>
                <h2>What's the name of your store?</h2>
                <input 
                    type="text" 
                    ref= { this.myInput }
                    required placeholder="Store Name" 
                    defaultValue={ getFunName() }
                    />
                <button type="submit">Visit Store</button>
            </form>
        )

    }

    
}

export default StorePicker;