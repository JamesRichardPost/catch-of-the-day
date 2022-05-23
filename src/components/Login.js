import React from 'react';
import PropType from 'prop-types';

const Login = (props) => (
    <nav className={props.classes}>
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory.</p>
        <p>Being the first one to log in to this store will identify you as the manager 
            - see what happens when you try and log in to the same store from a different account!</p>
        <button className="github" onClick={() => props.authenticate(`Github`)}>
            Log In With Github
        </button>
        <button className="facebook" onClick={() => props.authenticate(`Facebook`)}>
            Log In With Facebook
        </button>
    </nav>
);

Login.proptypes = {
    authenticate: PropType.func.isRequired
}

export default Login;