import React from 'react';
import Header from "./Header"
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const params = this.props.match.params;
        // first reinstate local storage
        const localStorageRef = JSON.parse(localStorage.getItem(params.storeId));
        if (localStorageRef)
        {
            this.setState({order: localStorageRef});   
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }


    addFish = (fish) => {
        // take a copy of the existing state
        const fishes = {...this.state.fishes};
        // add new fish to that fishes varable
        fishes[`fish${Date.now()}`] = fish;
        // set new fishes object to state
        this.setState({
            fishes: fishes
        });
    }

    updateFish = (key, updatedFish) => {
        // take a copy of the current state
        const fishes = this.state.fishes;
        // update that state
        fishes[key] = updatedFish;
        // set that to state
        this.setState({fishes});
    }

    deleteFish = (key) => {
        // take a copy of state
        const fishes = this.state.fishes;
        // remove fish
        fishes[key] = null;
        // set that to state
        this.setState({fishes});
    }

    loadSamples = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder = (key) => {
        // take a copy of the existing state
        const order = {...this.state.order};
        // Add new order or update the number 
        order[key] = order[key] + 1 || 1;
        // set new orders object to state
        this.setState({
            order: order
        });
    }

    removeFromOrder = (key) => {
        // take a copy of the existing order
        const order ={...this.state.order};
        // remove the order specified (or deincriment)
//        if (order[key] === 1)
//            order[key] = null;
//       else
//            order[key] = order[key] - 1;
        delete order[key];

        // set new orders object to state
        this.setState({
            order: order
        })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="does this work"/>
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                        key={key} 
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    fishes={this.state.fishes} 
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    deleteFish={this.deleteFish}
                    loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;