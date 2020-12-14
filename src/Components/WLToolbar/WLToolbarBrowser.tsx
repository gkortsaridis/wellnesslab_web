import React from 'react';
import logoWhite from "../../Images/logo_white.png";
import WLToolbarItem from "./WLToolbarItem";
import coverImg from "../../Images/cover1.jpg";

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
                <div style={this.stylesBrowser.row1}>
                    <img src={logoWhite} style={this.stylesBrowser.logo}/>
                    <div>
                        <h1 style={this.stylesBrowser.logoText}>WellnessLab</h1>
                    </div>
                </div>

                <div style={this.stylesBrowser.row1}>
                    <WLToolbarItem activePage={this.props.activePage} name={"Αρχική"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem activePage={this.props.activePage} name={"Θέματα"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem activePage={this.props.activePage} name={"Δράσεις"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem activePage={this.props.activePage} name={"Βίντεο"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem activePage={this.props.activePage} name={"Ομάδα"} link={""} onPageSelected={this.onPageSelected} />
                </div>

                <div style={this.stylesBrowser.fader}/>

            </div>
        )
    }

    stylesBrowser = {
        container: {
            backgroundImage:`url(${coverImg})`,
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column' as 'column'
        },
        row1: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10
        },
        logo: {
            width: 80,
            height: 80,
            margin: 40
        },
        logoText: {
            color: 'white'
        },
        fader: {
            height: 10,
            background: "linear-gradient(transparent, #ffffff)"
        }
    }
}

export default WLToolbarBrowser