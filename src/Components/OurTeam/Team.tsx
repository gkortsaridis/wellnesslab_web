import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faMailBulk} from "@fortawesome/free-solid-svg-icons";
import Anastasia from "../../Images/anastasia_aivatoglou.png";
import Chrysoula from "../../Images/chrysoula_grigoropoulou.png";
import maria from "../../Images/maria_dimitriadou.png";
import georgia from "../../Images/georgia_pantazi.png";
import ioanna from "../../Images/ioanna_koutsiona.png";
import {TeamMember} from "../../Entities/Entities";
import { ParallaxHover } from 'react-parallax-hover';

class Team extends React.Component<{ }, {}> {

    private team: TeamMember[] = []

    constructor(props: {}, state: {}) {
        super(props, state);

        this.clickedLink = this.clickedLink.bind(this)

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

    private clickedLink(link: string) {
        alert(link)
    }

    render() {
        const teamItems: JSX.Element[] = []

        for (let i=0; i<this.team.length; i++) {
            const personSocial: JSX.Element[] = [];

            for (let j=0; j<this.team[i].social.length; j++) {
                personSocial.push(
                    <div onClick={(e) => {this.clickedLink(this.team[i].social[j].url)}} >
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
                        } style={this.styles.teamMemberSocialIcon}/>

                    </div>
                )
            }

            teamItems.push(
                <div style={this.styles.itemCardContainer}>
                    <ParallaxHover width={252} height={272} rotation={9} shadow={2} borderRadius={15} light={0}>
                        <div style={this.styles.teamMemberCard}>
                            <img style={this.styles.teamMemberImg} src={this.team[i].image}/>
                            <div style={this.styles.teamMemberTextContainer}>
                                <p>
                                    <div style={this.styles.teamMemberName}> {this.team[i].name} </div>
                                    <div style={this.styles.teamMemberTitle}> {this.team[i].title} </div>
                                </p>
                            </div>
                        </div>
                    </ParallaxHover>
                    <div style={this.styles.teamMemberSocialsContainer}>{personSocial}</div>
                </div>
            )
        }


        return (
            <div style={this.styles.container}>
                <h3 style={this.styles.introText}>Αυτό είναι ένα σύντομο κείμενο που θα περιγραφει την ομάδα </h3>
                <div style={this.styles.cardsContainer}> {teamItems} </div>
            </div>
        )
    }

    cardRadius = 15

    styles = {
        container: {
            flex: 1,
            backgroundColor: '#F7F7F7'
        },
        cardsContainer: {
            width: '75%',
            flexDirection: 'row' as 'row',
            display: 'flex',
            flexWrap: 'wrap' as 'wrap',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        introText: {fontFamily: 'Roboto', fontWeight: 100, padding: 20},
        itemCardContainer: {flexGrow: 1, padding: '10px', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        teamMemberCard: {width: '250px',height: '270px', display: 'flex', flexDirection: 'column' as 'column', backgroundColor: 'white', border: '1px solid black', borderRadius: this.cardRadius, alignItems: 'center' as 'center'},
        teamMemberSocialIcon: {width: '30px', height: '30px', padding: 15, color:'rgb(99, 148, 140)'},
        teamMemberSocialsContainer: {display: 'flex', flexDirection: 'row' as 'row'},
        teamMemberImg: {width: '120px', height: '120px', marginTop: '20px'},
        teamMemberTextContainer: {fontFamily: 'Roboto', fontSize: '22px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)', padding: '30px'},
        teamMemberName: {fontFamily: 'Roboto', fontSize: '20px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)', whiteSpace: 'pre-line' as 'pre-line',},
        teamMemberTitle: {fontFamily: 'Roboto', fontSize: '16px', lineHeight: '16px', fontWeight: 500, color: 'rgb(255,63,128)', marginTop: '10px'}
    }
}

export default Team