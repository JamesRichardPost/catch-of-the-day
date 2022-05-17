import React from "react";
import { formatException } from "stylus/lib/utils";

class StorePicker extends React.Component {
    render() {
        return (
            <form className='store-selector'>
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name"/>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

export default StorePicker;