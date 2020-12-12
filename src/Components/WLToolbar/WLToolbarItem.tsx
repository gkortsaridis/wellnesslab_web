import React from 'react';

type WLToolbarItemProps = {
    name: string,
    link: string,
    onPageSelected: (page: string) => void
}

type WLToolbarItemState = {
    isHovering: boolean
}

class WLToolbarItem extends React.Component<WLToolbarItemProps, WLToolbarItemState> {

    constructor(props: WLToolbarItemProps, state: WLToolbarItemState) {
        super(props, state);

        this.state = {isHovering: false}

        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.onClick = this.onClick.bind(this)
    }


    private onMouseEnter() {
        this.setState({
            isHovering: true
        })
    }

    private onMouseLeave() {
        this.setState({
            isHovering: false
        })
    }

    private onClick() {
        this.props.onPageSelected(this.props.name)
    }

    render() {
        return (
            <div style={this.styles.container} onClick={this.onClick}>
                <p
                    style={this.state.isHovering ? this.styles.textHover : this.styles.textNotHover}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.onClick}>
                    {this.props.name}
                </p>
            </div>
        )
    }

    styles = {
        container: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            cursor: 'pointer'
        },
        textHover: {
            color: 'red',
            fontSize: '25px',
            lineHeight: '30px'
        },
        textNotHover: {
            color: 'white',
            fontSize: '25px',
            lineHeight: '30px'
        }
    }
}

export default WLToolbarItem