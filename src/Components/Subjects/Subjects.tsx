import React from 'react';

class Subjects extends React.Component<{ }, {}> {

    constructor(props: {}, state: {}) {
        super(props, state);
    }


    render() {
        return (
            <div style={this.styles.container}>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'blue'
        }
    }
}

export default Subjects