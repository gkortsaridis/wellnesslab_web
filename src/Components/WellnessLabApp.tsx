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
import SubjectDetails from "./OurSubjects/SubjectDetails";
import {ACTIONS, ADMIN, HOME, SUBJECT_DETAILS, SUBJECTS, TEAM, VIDEOS} from "../Entities/AppRoutes";

type WellnessLabAppState = { renderFlag: boolean }

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

        this.onPageSelected = this.onPageSelected.bind(this)
        this.state = { renderFlag : false }

        // Initialize Firebase
        if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig) }
        else { firebase.app(); }

        this.appHistory.listen((listener) => {
            this.setState({ renderFlag: !this.state.renderFlag })
        })
    }

    private onPageSelected(page: string) {
        if(page !== this.appHistory.location.pathname) {
            this.appHistory.push(page)
            this.setState({ renderFlag: !this.state.renderFlag })
        }
    }

    render() {
        console.log("render",this.appHistory.location.pathname)
        return (
            <Router history={this.appHistory}>
                <Switch>
                    <Route exact path={HOME}>
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Home/>
                        </div>
                    </Route>

                    <Route exact path={SUBJECTS}>
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Subjects history={this.appHistory}/>
                        </div>
                    </Route>

                    <Route exact path={SUBJECT_DETAILS}>
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <SubjectDetails history={this.appHistory}/>
                        </div>
                    </Route>

                    <Route exact path={ACTIONS}>
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Actions/>
                        </div>
                    </Route>

                    <Route exact path={VIDEOS}>
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Videos/>
                        </div>
                    </Route>

                    <Route exact path={TEAM}>
                        <div style={this.styles.container}>
                            <WLToolbar activePage={this.appHistory.location.pathname} onPageSelected={this.onPageSelected}/> <Team/>
                        </div>
                    </Route>

                    <Route exact path={ADMIN}>
                        <AdminPanel/>
                    </Route>

                    <Route path="*">
                        <UIv1/>
                    </Route>

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