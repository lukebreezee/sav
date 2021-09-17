import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import { actionCreator } from '../action-creators';
import { mapState } from '../map-to-props';
import { mergeSort, quickSort } from '../helpers';
export { NavButton };

//Component for the buttons inside Navbar.js
class NavButtonClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#FFFFFF'
        };

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //When a button is clicked...
    handleClick() {
        //Color goes back to when mouse was hovered
        this.setState({color: '#FFFB7A'});

        /* We call our sorting functions from this component and not
         * the reducer. This is because you cannot dispatch to the
         * store from a reducer, and we need to continuously dispatch
         * within our function to have the animation working properly
         */

        //Switch statement for the button that was clicked
        switch(this.props.label) {
            case 'MERGE SORT':
                mergeSort(this.props.nums, 0, this.props.nums.length - 1);
                break;
            case 'QUICK SORT':
                quickSort(this.props.nums, 0, this.props.nums.length - 1);
                break;
            case 'RANDOMIZE':
                store.dispatch(actionCreator('RANDOMIZE'));
                break;
        }
    }

    //Button turns dark blue when mouse is down
    handleMouseDown() {
        this.setState({color: '#474DFF'});
    }

    //Button turns back to white when mouse moves out
    handleMouseOut() {
        this.setState({color: '#FFFFFF'});
    }

    //Button turns yellow when mouse hovers
    handleMouseOver() {
        this.setState({color: '#FFFB7A'});
    }

    //Render the component with all of its properties
    render() {
        return (
            <div 
            className="nav-button" 
            style={{color: this.state.color}}
            onClick={this.handleClick}
            onMouseDown={this.handleMouseDown}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}>
            {this.props.label}
            </div>
        );
    }
}

//Connect our component to the redux store
const NavButton = connect(mapState)(NavButtonClass);