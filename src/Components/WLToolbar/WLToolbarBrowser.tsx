import * as React from 'react';
import { TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from 'rmwc';
import logoWhite from "../../Images/logo_white.png";
import WLToolbarItem from "./WLToolbarItem";
import {wellnessLabPrimary} from "../../Entities/Colors";

type WLToolbarProps = {
    onPageSelected: (page: string) => void;
    activePage: string
}

class WLToolbarBrowser extends React.Component<WLToolbarProps, {}> {

    constructor(props: WLToolbarProps, state: {}) {
        super(props, state);

        this.onPageSelected = this.onPageSelected.bind(this)
    }

    private onPageSelected(page: string) {
        this.props.onPageSelected(page)
    }

    render() {
        return (
            <div style={this.stylesBrowser.container}>
                <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                    <TopAppBarRow>
                        <TopAppBarSection>
                            <img src={logoWhite} style={this.stylesBrowser.logo}/>
                            <TopAppBarTitle>WellnessLab</TopAppBarTitle>
                        </TopAppBarSection>
                    </TopAppBarRow>
                    <TopAppBarRow>
                        <TopAppBarSection >
                            <WLToolbarItem activePage={this.props.activePage} name={"Αρχική"} link={"/dev/"} onPageSelected={this.onPageSelected} />
                            <WLToolbarItem activePage={this.props.activePage} name={"Θέματα"} link={"/dev/subjects"} onPageSelected={this.onPageSelected} />
                            <WLToolbarItem activePage={this.props.activePage} name={"Δράσεις"} link={"/dev/actions"} onPageSelected={this.onPageSelected} />
                            <WLToolbarItem activePage={this.props.activePage} name={"Βίντεο"} link={"/dev/video"} onPageSelected={this.onPageSelected} />
                            <WLToolbarItem activePage={this.props.activePage} name={"Ομάδα"} link={"/dev/team"} onPageSelected={this.onPageSelected} />
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust />
            </div>
        )
    }

    stylesBrowser = {
        container: {backgroundColor: '#63948C', backgroundSize: 'cover', display: 'flex', flexDirection: 'column' as 'column', paddingBottom: 64},
        logo: {width: 40, height: 40, marginRight: 20 },
    }
}

export default WLToolbarBrowser