import React from 'react';
export { Bar };

class Bar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="bar" 
            style={{height: (this.props.height).toString() + '%'}}>
            </div>
        );
    }
}