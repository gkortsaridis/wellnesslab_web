import * as React from 'react';
import "rmwc/styles";
import { Typography } from 'rmwc';

class Home extends React.Component<{ }, {}> {

    constructor(props: {}, state: {}) {
        super(props, state);
    }


    render() {
        return (
            <div style={this.styles.container}>
                <Typography style={this.styles.topText} use="headline3">Το WellnessLab σας ενημερώνει για θέματα σωματικής υγείας και πώς αυτά επηρεάζουν την ψυχική μας υγεία. Προωθεί την προσωπική και συλλογική ευημερία και στοχεύει στην παροχή υποστήριξης σε ζητήματα που αφορούν τη σωματική και ψυχική ευεξία.</Typography>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            backgroundColor: '#F7F7F7',
            padding: 40
        },
        topText: {
            fontFamily: 'Roboto',
            fontWeight: 100
        }
    }
}

export default Home