import React from 'react';
import PropTypes from 'prop-types';
import Header from "./Header"
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import Navbar from './Navbar';
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
        matches: window.matchMedia("(min-width: 768px)").matches,
        paused: true
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {

        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 768px)").addEventListener('change', handler);

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

        this.setState({paused: false})

        if(!this.state.matches)
        {
            console.log(this.state.matches);
            this.hideInventory();
        }
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

    changeView = (input) => {
        console.log(input);
        // show the one we press
        const displayPart = document.querySelector("." + input);
        displayPart.classList.remove("hidden");
        // hide the others
        // These are our mobile pages for now, add here if you add more in the future
        const pages = ["menu", "order-wrap", "inventory"];
        pages.forEach(page => {
            if (page !== input)
            {
                const hidePart = document.querySelector("." + page);
                if (hidePart !== null)
                {
                    hidePart.classList.add("hidden");
                }   
            }
        });
    }

    fishCheck = () => {
        const isEmpty = Object.keys(this.state.fishes).length === 0;
        if (isEmpty)
        {
          return (<ul>There aren't any fish in the store yet. Check the inventory page to get started!</ul>)
        }

        else {
            return (
                <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                        key={key} 
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder}/>)}
                </ul>
            )
        }
    }
    
    hideInventory = () => {
        const menu = document.querySelector(".menu");
        const inventory = document.querySelector(".inventory");
        console.log(menu.classList);
        const classes = menu.classList; 
    }

    render() {
        return (
            <div className="catch-of-the-day">
                {!this.state.matches && <Navbar changeView={this.changeView} />}
                <div className="menu">
                    <Header tagline={this.props.match.params.storeId} paused={this.state.paused}/>
                    {this.fishCheck()}
                </div>
                <Order 
                    matches={this.state.matches}
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    paused={this.state.paused}
                    changeView={this.changeView}
                    fishes={this.state.fishes} 
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    deleteFish={this.deleteFish}
                    loadSamples={this.loadSamples}
                    storeId={this.props.match.params.storeId}
                    />
            </div>
        )
    }
}

export default App;