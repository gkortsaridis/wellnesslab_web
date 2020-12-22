import * as React from 'react';
import firebase from "firebase";
import {Router, Switch, Route } from "react-router-dom";

import WLToolbar from "./WLToolbar/WLToolbar";
import Home from "./OurHome/Home";
import Subjects from "./OurSubjects/Subjects";
import Actions from "./OurActions/Actions";
import Videos from "./OurVideos/Videos";
import Team from "./OurTeam/Team";
import UIv1 from "./UIv1/UIv1";
import AdminPanel from "./Admin/AdminPanel";
import { createBrowserHistory } from 'history'

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

    private appHistory = createBrowserHistory()

    constructor(props: {}, state: WellnessLabAppState) {
        super(props, state);

        this.state = { activePage: 'Αρχική' }
        this.onPageSelected = this.onPageSelected.bind(this)

        // Initialize Firebase
        if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig);}
        else { firebase.app(); }

    }

    private onPageSelected(page: string) {
        if(page !== this.appHistory.location.pathname) {
            this.appHistory.push(page)
            this.setState({ activePage: page })
        }
    }

    render() {
        return (
            <Router history={this.appHistory}>
                <Switch>
                    <Route exact path="/dev">
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.state.activePage} onPageSelected={this.onPageSelected}/> <Home/>
                        </div>
                    </Route>
                    <Route exact path="/dev/subjects">
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.state.activePage} onPageSelected={this.onPageSelected}/> <Subjects/>
                        </div>
                    </Route>
                    <Route exact path="/dev/actions">
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.state.activePage} onPageSelected={this.onPageSelected}/> <Actions/>
                        </div>
                    </Route>
                    <Route exact path="/dev/video">
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.state.activePage} onPageSelected={this.onPageSelected}/> <Videos/>
                        </div>
                    </Route>
                    <Route exact path="/dev/team">
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.state.activePage} onPageSelected={this.onPageSelected}/> <Team/>
                        </div>
                    </Route>
                    <Route exact path="/adminpanel" component={AdminPanel}/>
                    <Route path="*" component={UIv1}/>
                </Switch>
            </Router>
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