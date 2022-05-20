import React from 'react';
import PropType from 'prop-types';
import firebase from 'firebase';
import base, { app } from '../base';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component {
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
        owner: null
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
            owner: store.owner || authData.user.uid
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

    render() {
        const logout = <button onClick={this.logout}>Log Out</button>;

        // check if the user is logged in alredy
        if (!this.state.uid)
        {
            return <Login authenticate={this.authenticate}></Login>;
        }
        
        // check if they are the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
            <div>
                <p>Sorry, you are not the owner.</p>
                {logout}
            </div>
            );
        }

        // they must be the owner!
        return (
            <div className='inventory'>
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