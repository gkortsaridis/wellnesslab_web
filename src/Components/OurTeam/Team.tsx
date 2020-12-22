import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faMailBulk} from "@fortawesome/free-solid-svg-icons";
import {Card} from "react-mdl";
import Anastasia from "../../Images/anastasia_aivatoglou.png";
import Chrysoula from "../../Images/chrysoula_grigoropoulou.png";
import maria from "../../Images/maria_dimitriadou.png";
import georgia from "../../Images/georgia_pantazi.png";
import ioanna from "../../Images/ioanna_koutsiona.png";

class Team extends React.Component<{ }, {}> {

    private team: TeamMember[] = []

    constructor(props: {}, state: {}) {
        super(props, state);

        this.team.push({
            name: "Αναστασία\nΑιβάτογλου",
            image: Anastasia,
            title: "Co-founder",
            social: [
                {
                    name: "facebook",
                    url: "https://www.facebook.com/anastasia.aivatoglou.7"
                },
                {
                    name: "linkedin",
                    url: "https://www.linkedin.com/in/anastasia-aivatoglou-963278173/"
                },
                {
                    name: "mail",
                    url: "mailto:an.aivatoglou@gmail.com"
                }
            ]
        })
        this.team.push({
            name: "Χρύσα Γρηγοροπούλου",
            image: Chrysoula,
            title: "Co-founder",
            social: [
                {
                    name: "facebook",
                    url: "https://www.facebook.com/chrysgr9"
                },
                {
                    name: "linkedin",
                    url: "https://www.linkedin.com/in/chrysoula-grigoropoulou-728b02176/"
                },
                {
                    name: "mail",
                    url: "mailto:grigoropoulou.chrys@gmail.com\n"
                }
            ]
        })
        this.team.push({
            name: "Μαρία\nΔημητριάδου",
            image: maria,
            title: "Content writer",
            social: [
                {
                    name: "facebook",
                    url: "https://www.facebook.com/profile.php?id=100005508162148"
                },
                {
                    name: "instagram",
                    url: "https://www.instagram.com/maria_dmtr/"
                },
                {
                    name: "mail",
                    url: "mailto:dimitriadoumaria00@gmail.com"
                }
            ]
        })
        this.team.push({
            name: "Γεωργία\nΠανταζή",
            image: georgia,
            title: "Content writer",
            social: [
                {
                    name: "facebook",
                    url: "https://www.facebook.com/profile.php?id=100019096519794"
                },
                {
                    name: "mail",
                    url: "mailto:geopantazi96@gmail.com\n"
                },
                {
                    name: "linkedin",
                    url: "https://www.linkedin.com/in/georgia-pantazi-6072a3200/"
                }
            ]
        })
        this.team.push({
            name: "Ιωάννα\nΚουτσιώνα",
            image: ioanna,
            title: "Content writer",
            social: [
                {
                    name: "facebook",
                    url: "https://www.facebook.com/profile.php?id=100000424791709"
                },
                {
                    name: "instagram",
                    url: "https://www.instagram.com/ioannakoutsiona/"
                },
                {
                    name: "linkedin",
                    url: "https://www.linkedin.com/in/ioanna-koutsiona-529797193?fbclid=IwAR2K7zJCylS4lNfR1Yimq0wno-gidwbC4K6vAphs1KvNRKvjdtsvlDSsRRE"
                }
            ]
        })
    }


    render() {
        const teamItems: JSX.Element[] = []

        for (let i=0; i<this.team.length; i++) {
            const personSocial: JSX.Element[] = [];
            for (let j=0; j<this.team[i].social.length; j++) {
                personSocial.push(
                    <a href={this.team[i].social[j].url} >
                        <FontAwesomeIcon icon={
                            this.team[i].social[j].name === "facebook"
                                ? faFacebook
                                : this.team[i].social[j].name === "linkedin"
                                ? faLinkedin
                                : this.team[i].social[j].name === "instagram"
                                    ? faInstagram
                                    : this.team[i].social[j].name === "mail"
                                        ? faMailBulk
                                        : faTwitter
                        } style={this.styles.socialIcon}/>

                    </a>
                )
            }

            teamItems.push(
                <div style={{flexGrow: 1, padding: '10px'}}>
                    <Card  shadow={0} style={{width: '250px',height: '330px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                        <img style={{width: '150px', height: '150px', padding: '30px'}} src={this.team[i].image}/>
                        <div style={{fontFamily: 'Roboto', fontSize: '22px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)', padding: '30px'}}>
                            <p>
                                <div style={{fontFamily: 'Roboto', fontSize: '20px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)'}}>
                                    {this.team[i].name}
                                </div>
                                <div style={{fontFamily: 'Roboto', fontSize: '16px', lineHeight: '16px', fontWeight: 500, color: 'rgb(255,63,128)', marginTop: '10px'}}>
                                    {this.team[i].title}
                                </div>

                            </p>
                            <div>
                                {personSocial}
                            </div>
                        </div>
                    </Card>
                </div>
            )
        }

        return (
            <div style={this.styles.container}>
                <div style={this.styles.cardsContainer}>
                    {teamItems}
                </div>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'white'
        },
        cardsContainer: {
            width: '75%',
            flexDirection: 'row' as 'row',
            display: 'flex',
            flexWrap: 'wrap' as 'wrap',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        socialIcon: {padding: 15, color:'rgb(99, 148, 140)'}
    }
}

export default Team