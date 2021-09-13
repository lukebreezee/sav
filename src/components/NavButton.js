import React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import { actionCreator } from '../action-creators';
import { mapState } from '../map-to-props';
import { mergeSort } from '../helpers';
export { NavButton };

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

    handleClick() {
        this.setState({color: '#FFFB7A'});

        //store.dispatch(actionCreator(this.props.label));
        switch(this.props.label) {
            case 'MERGE SORT':
                //mergeSort(this.props.nums, 0, this.props.nums.length - 1);
                store.dispatch(actionCreator(this.props.label));
                break;
            case 'RANDOMIZE':
                store.dispatch(actionCreator('RANDOMIZE'));
                break;
        }
    }

    handleMouseDown() {
        this.setState({color: '#474DFF'});
    }
    handleMouseOut() {
        this.setState({color: '#FFFFFF'});
    }
    handleMouseOver() {
        this.setState({color: '#FFFB7A'});
    }

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

const NavButton = connect(mapState)(NavButtonClass);