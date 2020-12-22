import * as React from 'react';

type SubjectDetailsProps = {
    history: any
}

class SubjectDetails extends React.Component<SubjectDetailsProps, {}> {

    constructor(props: SubjectDetailsProps, state: {}) {
        super(props, state);
    }

    render() {
        return (
            <div style={this.styles.container}>
                <h1>Subject Details</h1>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'white'
        }
    }
}

export default SubjectDetails