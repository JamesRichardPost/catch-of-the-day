import React from 'react';
import PropType from 'prop-types';
import firebase from 'firebase';
import base, { app } from '../base';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component {
    newLogin = false;
    
    static propType = {
        updateFish: PropType.func,
        deleteFish: PropType.func,
        fishes: PropType.object,
        addFish: PropType.func,
        loadSamples: PropType.func,
        storeId: PropType.string
    }

    state = {
        uid: null,
        owner: null,
        newLogin: false
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.authHandler({ user });
            }
        })
    }

    authHandler = async (authData) => {
        // look up current store in FBDB
        const store = await base.fetch(this.props.storeId, { context: this });
        // if there is no owner, claim
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // set the state of the inventory component to reflect current user
        this.setState ({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid,
        })
        
    } 

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        app.auth().signInWithPopup(authProvider).then(this.authHandler);
    }
    
    logout = async () => {
        await app.auth().signOut();
        this.setState({ uid: null });
    }
    
    sleep = (miliseconds) => {
        return new Promise(resolve => setTimeout(resolve, miliseconds));
    }

    render() {
        const menu = document.querySelector(".menu");
        const order = document.querySelector(".order-wrap");
        let inventoryClass;
        if (menu !== null && order !== null)
        {
            const hiddenMenu = menu.classList.contains("hidden");
            const hiddenOrder = order.classList.contains("hidden");
            inventoryClass = hiddenMenu && hiddenOrder ? "inventory" : "inventory hidden";
        }
        else
        {
            inventoryClass = "inventory";
        }  

        const logout = <button onClick={this.logout}>Log Out</button>;
        //const inventoryClass = this.props.matches ? 'inventory' : 'inventory hidden'; 
        console.log(inventoryClass);
        // check if the user is logged in alredy
        if (!this.state.uid && !this.props.paused)
        {
            return <Login classes={inventoryClass} authenticate={this.authenticate}></Login>;
        }
        
        // check if they are the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
            <div className={inventoryClass}>
                <p class="inventory">Sorry, you are not the owner.</p>
                {logout}
            </div>
            );
        }

        
        // they must be the owner!
        return (
            <div className={inventoryClass}>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                <EditFishForm 
                updateFish={this.props.updateFish} 
                deleteFish={this.props.deleteFish}
                key={key}
                id={key} 
                fish={this.props.fishes[key]}/> )}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Test Fish</button>
            </div>
        )
    }
}

export default Inventory;