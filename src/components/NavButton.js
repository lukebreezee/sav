import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import { mapState } from '../map-to-props';

import { 
    
    mergeSort, 
    quickSort, 
    selectionSort, 
    bubbleSort, 
    colorize, 
    changeProgress

} from '../helpers';

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

        const sortingSpeed = store.getState().sortingSpeed;

        //If sorting algorithm is not already happening...
        if (!store.getState().inProgress) {
            //Tell redux that we've starting sorting
            store.dispatch({type: 'CHANGE PROGRESS'});
            const label = this.props.label;

            //Switch statement for the button that was clicked
            //'changeProgress' function tells redux that we're done
            //We turn the array green after we are finished sorting
            switch(label) {
                case 'MERGE SORT':
                    mergeSort(this.props.barProperties, 0, this.props.barProperties.length - 1);
                    colorize(-1, '#00FF00', sortingSpeed * .5);
                    changeProgress(sortingSpeed * .5);
                    break;
                case 'QUICK SORT':
                    quickSort(this.props.barProperties, 0, this.props.barProperties.length - 1);
                    colorize(-1, '#00FF00', sortingSpeed);
                    break;
                case 'SELECTION SORT':
                    selectionSort(this.props.barProperties, 0);
                    colorize(-1, '#00FF00', sortingSpeed);
                    break;
                case 'BUBBLE SORT':    
                    bubbleSort(this.props.barProperties, this.props.barProperties.length);   
                    colorize(-1, '#00FF00', sortingSpeed);
                    break;
                case 'RANDOMIZE':
                    store.dispatch({type: 'RANDOMIZE'});
                    store.dispatch({type: 'CHANGE PROGRESS'});
                    break;
            }
            if (label !== 'MERGE SORT' && label !== 'RANDOMIZE') {
                changeProgress(sortingSpeed);
            }
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