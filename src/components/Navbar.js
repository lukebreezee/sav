import React from 'react';
import { store } from '..';
import { NavButton } from './NavButton';
export { Navbar };

//This navbar holds all the buttons at the top
class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.renderBarSize = this.renderBarSize.bind(this);
    }

    //When the SIZE/SPEED slider changes...
    renderBarSize(e) {
        //If no function is in progress...
        if (!store.getState().inProgress) {
            //Change the size of the array
            store.dispatch({type: 'BAR COUNT UPDATE', amount: e.target.value});

            //Change the sorting speed (more bars, faster speed)
            store.dispatch({type: 'SORTING SPEED UPDATE', amount: e.target.value});

            //And randomize the array again
            store.dispatch({type: 'RANDOMIZE'});
        }
    }
    
    render() {
        //Render all the buttons inside our navbar
        return (
            <div id="navbar">
                <h1>SIZE/SPEED</h1>
                <input 
                    id="speed-control" 
                    type="range" 
                    min={5} 
                    max={190}
                    defaultValue={100}
                    onChange={this.renderBarSize}
                    step={1} />
                <NavButton label="RANDOMIZE" />
                <div className="separator"></div>
                <NavButton label="QUICK SORT" />
                <NavButton label="MERGE SORT" />
                <NavButton label="BUBBLE SORT" />
                <NavButton label="SELECTION SORT" />
            </div>
        );
    }
}