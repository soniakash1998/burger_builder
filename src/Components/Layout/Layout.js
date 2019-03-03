import React from 'react';
import classes from './Layout.module.css';
import Aux from '../../HOC/Aux';

const Layout = ( props ) => (
    <Aux>
        <div>this is navbar, sidebar, bottombar</div>
        <main className = {classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;