import React from 'react';

import coverImg from '../../Images/cover1.jpg'
import logoWhite from '../../Images/logo_white.png'
import WLToolbarItem from "./WLToolbarItem";

type WLToolbarProps = {
    onPageSelected: (page: string) => void;
}

class WLToolbar extends React.Component<WLToolbarProps, {}> {

    constructor(props: WLToolbarProps, state: {}) {
        super(props, state);

        this.onPageSelected = this.onPageSelected.bind(this)
    }

    private onPageSelected(page: string) {
        this.props.onPageSelected(page)
    }

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.row1}>
                    <img src={logoWhite} style={this.styles.logo}/>
                    <div>
                        <h1 style={this.styles.logoText}>WellnessLab</h1>
                    </div>
                </div>

                <div style={this.styles.row1}>
                    <WLToolbarItem name={"Αρχική"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem name={"Θέματα"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem name={"Δράσεις"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem name={"Βίντεο"} link={""} onPageSelected={this.onPageSelected} />
                    <WLToolbarItem name={"Ομάδα"} link={""} onPageSelected={this.onPageSelected} />
                </div>

                <div style={this.styles.fader}/>

            </div>
        )
    }

    styles = {
        container: {
            backgroundImage:`url(${coverImg})`,
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column' as 'column'
        },
        row1: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            alignItems: 'center'
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

export default WLToolbar