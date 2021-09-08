import React from 'react';
import ReactSlider from 'react-slider';
import { NavButton } from './NavButton';
export { Navbar };

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div id="navbar">
                <ReactSlider />
                <NavButton label="RANDOMIZE" />
                <NavButton label="CANCEL" />
                <div className="separator"></div>
                <NavButton label="QUICK SORT" />
                <NavButton label="MERGE SORT" />
                <NavButton label="BUBBLE SORT" />
                <NavButton label="SELECTION SORT" />
            </div>
        );
    }
}