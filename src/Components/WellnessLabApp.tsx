import React from 'react';
import WLToolbar from "./WLToolbar/WLToolbar";
import Home from "./OurHome/Home";
import Subjects from "./OurSubjects/Subjects";
import Actions from "./OurActions/Actions";
import Videos from "./OurVideos/Videos";
import Team from "./OurTeam/Team";
import firebase from "firebase";

type WellnessLabAppState = {
    activePage: string;
}

const firebaseConfig = {
    apiKey: "AIzaSyDY9zLRl7EOpKR02SWCGpwW2jkrh-YU2uY",
    authDomain: "wellness-lab.firebaseapp.com",
    projectId: "wellness-lab",
    storageBucket: "wellness-lab.appspot.com",
    messagingSenderId: "885154242879",
    appId: "1:885154242879:web:0986faa0998be6476e338a",
    measurementId: "G-P1FY85Q6PG"
};

class WellnessLabApp extends React.Component<{}, WellnessLabAppState> {

    constructor(props: {}, state: WellnessLabAppState) {
        super(props, state);

        this.state = { activePage: 'Αρχική' }
        this.onPageSelected = this.onPageSelected.bind(this)

        // Initialize Firebase
        if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig);}
        else { firebase.app(); }

    }

    private onPageSelected(page: string) {
        console.log(page)
        this.setState({ activePage: page })
    }

    render() {
        return (
            <div style={this.styles.container}>
                <WLToolbar activePage={this.state.activePage} onPageSelected={this.onPageSelected}/>
                {
                    this.state.activePage === 'Αρχική'
                        ? <Home/>
                        : this.state.activePage === 'Θέματα'
                            ? <Subjects/>
                            : this.state.activePage === 'Δράσεις'
                                ? <Actions/>
                                : this.state.activePage === 'Βίντεο'
                                    ? <Videos/>
                                    : <Team/>
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