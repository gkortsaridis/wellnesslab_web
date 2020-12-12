import React from "react";
import WLToolbar from "../WLToolbar/WLToolbar";

import { Layout, Header, Content, Card, CardTitle } from 'react-mdl';

import Ripples from 'react-ripples'
import WebFont from 'webfontloader'
import { Parallax } from "react-parallax";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";


//Images
import Anastasia from '../../Images/anastasia_aivatoglou.png'
import Chrysoula from '../../Images/chrysoula_grigoropoulou.png'
import georgia from '../../Images/georgia_pantazi.png'
import ioanna from '../../Images/ioanna_koutsiona.png'
import maria from '../../Images/maria_dimitriadou.png'
import Facebook from '../../Images/facebook.png'
import Twitter from '../../Images/twitter.png'
import Instagram from '../../Images/instagram.png'
import LinkedIn from '../../Images/linkedin.png'
import logo from '../../Images/logo_white.png'
import cover from '../../Images/cover.jpg'
import Email from '../../Images/email.png'
/*import firebase from "firebase";
import DocumentData from firebase.firestore.DocumentData

//import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;*/

import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDY9zLRl7EOpKR02SWCGpwW2jkrh-YU2uY",
    authDomain: "wellness-lab.firebaseapp.com",
    projectId: "wellness-lab",
    storageBucket: "wellness-lab.appspot.com",
    messagingSenderId: "885154242879",
    appId: "1:885154242879:web:0986faa0998be6476e338a",
    measurementId: "G-P1FY85Q6PG"
};

type WLToolbarProps = { }
type WLToolabrState = {
    articles: Article[]
    team: TeamMember[],
    socialMedia: SocialMedia[]
}

class UIv1 extends React.Component<WLToolbarProps, WLToolabrState> {

    constructor(props: WLToolbarProps, state:WLToolabrState) {
        super(props, state);
        this.state = {
            articles: [],
            team: [
                {
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
                }, {
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
                }, {
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
                }, {
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
                }, {
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
                }
            ],
            socialMedia: [
                {
                    name: "Facebook",
                    url: "https://www.facebook.com/WellnessLab-104016004679802/"
                }, {
                    name: "Instagram",
                    url: "https://www.instagram.com/wellnesslab__/?hl=en"
                }, {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/wellnesslab-psy/"
                }, {
                    name: "Twitter",
                    url: "https://twitter.com/WellnessLab_psy"
                }, {
                    name: "Email",
                    url: "mailto:wellnesslab@gmail.com"
                }
            ]
        };

        WebFont.load({google: {families: ["Roboto:100,300,400,500"]}});

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }else {
            firebase.app(); // if already initialized, use that one
        }
    }

    componentDidMount() {

        const snapshot = firebase.firestore().collection('articles').get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
            const articlesArray: Article[] = [];
            snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
                articlesArray.push({
                    'title': doc.data().title,
                    'imgUrl': doc.data().imgUrl,
                    'articleUrl': doc.data().articleUrl
                })
            });

            console.log(articlesArray);

            this.setState({
                articles: articlesArray
            })
        })

        /*
        fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wellnesslab-psy")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => { }
            )*/
    }

    render() {
        const articleItems = [];
        const teamItems = [];
        const socialItems = [];

        for (let i=0; i<this.state.articles.length; i++) {
            articleItems.push(
                <div style={{flexGrow: 1, padding: '10px'}}>
                    <Card shadow={0} style={{width: '450px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                        <CardTitle style={{color: '#fff', height: '600px', background: 'url('+this.state.articles[i].imgUrl+') center / cover'}}/>
                        <Ripples during={600} color={'rgb(99, 148, 140, 0.3)'}>
                            <div style={{width: '450px', height: '120px'}}>
                                <div style={{fontFamily: 'Roboto', fontSize: '24px', lineHeight: '30px', marginLeft: '15px', marginRight: '15px', marginTop: '30px'}}>
                                    <a target={"_blank"} href={this.state.articles[i].articleUrl} style={{textDecoration:'none', color: 'black'}}>{this.state.articles[i].title}</a>
                                </div>
                            </div>
                        </Ripples>
                    </Card>
                </div>
            );
        }

        for (let i=0; i<this.state.socialMedia.length; i++) {
            socialItems.push(
                <div style={{flexGrow: 1, padding: '10px'}}>
                    <Card shadow={0} style={{width: '250px',height: '250px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                        <img style={{width: '150px', height: '150px', padding: '30px'}} src={
                            this.state.socialMedia[i].name === "Facebook"
                                ? Facebook
                                : this.state.socialMedia[i].name === "Twitter"
                                ? Twitter
                                : this.state.socialMedia[i].name === "Instagram"
                                    ? Instagram
                                    : this.state.socialMedia[i].name === "LinkedIn"
                                        ? LinkedIn
                                        : Email
                        }/>
                        <div style={{fontFamily: 'Roboto', fontSize: '25px', lineHeight: '30px', fontWeight: 500, color: 'rgb(99, 148, 140)'}}>
                            <a target={"_blank"} href={this.state.socialMedia[i].url} style={{textDecoration:'none'}}>{this.state.socialMedia[i].name}</a>
                        </div>
                    </Card>
                </div>
            )
        }

        for (let i=0; i<this.state.team.length; i++) {
            const personSocial = [];
            for (let j=0; j<this.state.team[i].social.length; j++) {
                personSocial.push(
                    <a href={this.state.team[i].social[j].url} >
                        <FontAwesomeIcon icon={
                            this.state.team[i].social[j].name === "facebook"
                                ? faFacebook
                                : this.state.team[i].social[j].name === "linkedin"
                                ? faLinkedin
                                : this.state.team[i].social[j].name === "instagram"
                                    ? faInstagram
                                    : this.state.team[i].social[j].name === "mail"
                                        ? faMailBulk
                                        : faTwitter
                        } style={{padding: 15, color:'rgb(99, 148, 140)'}}/>

                    </a>
                )
            }

            teamItems.push(
                <div style={{flexGrow: 1, padding: '10px'}}>
                    <Card  shadow={0} style={{width: '250px',height: '330px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                        <img style={{width: '150px', height: '150px', padding: '30px'}} src={this.state.team[i].image}/>
                        <div style={{fontFamily: 'Roboto', fontSize: '22px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)', padding: '30px'}}>
                            <p>
                                <div style={{fontFamily: 'Roboto', fontSize: '20px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)'}}>
                                    {this.state.team[i].name}
                                </div>
                                <div style={{fontFamily: 'Roboto', fontSize: '16px', lineHeight: '16px', fontWeight: 500, color: 'rgb(255,63,128)', marginTop: '10px'}}>
                                    {this.state.team[i].title}
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
            <div className="App">
                <WLToolbar/>
                <div>
                    <Layout fixedHeader>
                        <Header title={"WellnessLab"} style={{color: 'white', backgroundColor: 'rgb(99, 148, 140)'}}>
                            <img src={logo} style={{height: '100%'}}/>
                        </Header>

                        <Content>
                            <div id="intro" className="section scrollspy" style={{paddingLeft: '15%', paddingRight: '15%', paddingTop: '100px', paddingBottom: '100px'}}>
                                <h1 style={{fontFamily: 'Roboto', fontWeight: 100}}>
                                    Το WellnessLab σας ενημερώνει για θέματα σωματικής υγείας και πώς αυτά επηρεάζουν την ψυχική μας υγεία. Προωθεί την προσωπική και συλλογική ευημερία και στοχεύει στην παροχή υποστήριξης σε ζητήματα που αφορούν τη σωματική και ψυχική ευεξία.
                                </h1>
                            </div>

                            <div id="arthra" style={{backgroundColor: 'rgb(247,247,247)', paddingTop: '30px', paddingBottom: '30px'}}>
                                <h2 style={{color: 'rgb(99, 148, 140)', fontFamily: 'Roboto', fontWeight: 400}}>Άρθρα</h2>
                                <div style={{width: '75%', flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto'}}> {articleItems} </div>
                            </div>

                            <div id="health_experiences" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                                <h2 style={{color: 'rgb(99, 148, 140)', fontFamily: 'Roboto', fontWeight: 400}}>Εμπειρίες Υγείας</h2>
                                <h4 style={{fontFamily: 'Roboto', fontWeight: 400}}>
                                    Μοιράσου και εσύ τη δική σου εμπειρία υγείας ανώνυμα, συμπληρώνοντας την παρακάτω <a target="_blank" href={"https://forms.gle/5jbZK3NRPLDWhdrn9"}>φόρμα</a>
                                </h4>
                            </div>

                            <div className="parallax-container">
                                <Parallax
                                    bgImage={cover}
                                    blur={{ min: -15, max: 15 }}
                                    strength={300}>
                                    <div style={{height: '600px'}}/>
                                </Parallax>
                            </div>

                            <div id="social_media" style={{paddingTop: '30px', paddingBottom: '30px'}} >
                                <h2 style={{color: 'rgb(99, 148, 140)', fontFamily: 'Roboto', fontWeight: 400}}> Social Media </h2>
                                <div style={{width: '75%', flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto'}}>
                                    {socialItems}
                                </div>
                            </div>

                            <div id="team" style={{backgroundColor: 'rgb(247,247,247)', paddingTop: '30px', paddingBottom: '30px'}}>
                                <h2 style={{color: 'rgb(99, 148, 140)', fontFamily: 'Roboto', fontWeight: 400}}> Ομάδα </h2>
                                <div style={{width: '75%', flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto'}}>
                                    {teamItems}
                                </div>
                            </div>

                            <div style={{height: '100px', backgroundColor: 'rgb(99, 148, 140)'}}></div>

                        </Content>

                    </Layout>
                </div>
            </div>
        );
    }

}

export default UIv1