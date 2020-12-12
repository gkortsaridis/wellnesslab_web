import React from 'react';
import WLToolbar from "./WLToolbar/WLToolbar";
import Home from "./Home/Home";
import Subjects from "./Subjects/Subjects";

type WellnessLabAppState = {
    activePage: string;
}

class WellnessLabApp extends React.Component<{}, WellnessLabAppState> {

    constructor(props: {}, state: WellnessLabAppState) {
        super(props, state);

        this.state = { activePage: 'Αρχική' }
        this.onPageSelected = this.onPageSelected.bind(this)
    }

    private onPageSelected(page: string) {
        console.log(page)
        this.setState({ activePage: page })
    }

    render() {
        return (
            <div style={this.styles.container}>
                <WLToolbar onPageSelected={this.onPageSelected}/>
                {
                    this.state.activePage === 'Αρχική'
                        ? <Home/>
                        : <Subjects/>
                }
            </div>
        )
    }

    styles = {
        container: {
            display: 'flex',
            height: '100vh',
            flex: 1,
            flexDirection: 'column' as 'column',
            background: 'white'
        }
    }
}

export default WellnessLabApp