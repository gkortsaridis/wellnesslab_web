import React from 'react';
import './App.css';
import Anastasia from './anastasia_aivatoglou.png'
import Chrysoula from './chrysoula_grigoropoulou.png'
import georgia from './georgia_pantazi.png'
import ioanna from './ioanna_koutsiona.png'
import maria from './maria_dimitriadou.png'
import Cover from './cover.jpg'
import Facebook from './facebook.png'
import Twitter from './twitter.png'
import Instagram from './instagram.png'
import LinkedIn from './linkedin.png'
import Email from './email.png'
import ReactGA from 'react-ga';
import Typist from 'react-typist';
import Ripples from 'react-ripples'

import WebFont from "webfontloader";
import { Layout, Header, Navigation, Drawer, Content, Grid, Cell, Card, CardTitle, Button, CardActions } from 'react-mdl';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        team: [
            {
                name: "Αναστασία\nΑιβάτογλου",
                image: Anastasia,
                title: "Co-founder",
                social: [
                    {
                        type: "facebook",
                        url: "https://www.facebook.com/anastasia.aivatoglou.7"
                    },
                    {
                        type: "linkedin",
                        url: "https://www.linkedin.com/in/anastasia-aivatoglou-963278173/"
                    },
                    {
                        type: "mail",
                        url: "mailto:an.aivatoglou@gmail.com"
                    }
                ]
            }, {
                name: "Χρύσα Γρηγοροπούλου",
                image: Chrysoula,
                title: "Co-founder",
                social: [
                    {
                        type: "facebook",
                        url: "https://www.facebook.com/chrysgr9"
                    },
                    {
                        type: "linkedin",
                        url: "https://www.linkedin.com/in/chrysoula-grigoropoulou-728b02176/"
                    },
                    {
                        type: "mail",
                        url: "mailto:grigoropoulou.chrys@gmail.com\n"
                    }
                ]
            }, {
                name: "Μαρία\nΔημητριάδου",
                image: maria,
                title: "Content writer",
                social: [
                    {
                        type: "facebook",
                        url: "https://www.facebook.com/profile.php?id=100005508162148"
                    },
                    {
                        type: "instagram",
                        url: "https://www.instagram.com/maria_dmtr/"
                    },
                    {
                        type: "mail",
                        url: "mailto:dimitriadoumaria00@gmail.com"
                    }
                ]
            }, {
                name: "Γεωργία\nΠανταζή",
                image: georgia,
                title: "Content writer",
                social: [
                    {
                        type: "facebook",
                        url: "https://www.facebook.com/profile.php?id=100019096519794"
                    },
                    {
                        type: "mail",
                        url: "mailto:geopantazi96@gmail.com\n"
                    },
                    {
                        type: "linkedin",
                        url: "https://www.linkedin.com/in/georgia-pantazi-6072a3200/"
                    }
                ]
            }, {
                name: "Ιωάννα\nΚουτσιώνα",
                image: ioanna,
                title: "Content writer",
                social: [
                    {
                        type: "facebook",
                        url: "https://www.facebook.com/profile.php?id=100000424791709"
                    },
                    {
                        type: "instagram",
                        url: "https://www.instagram.com/ioannakoutsiona/"
                    },
                    {
                        type: "linkedin",
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
    ReactGA.initialize('UA-176319397-1');
    ReactGA.pageview('/home');
  }

  componentDidMount() {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wellnesslab-psy")
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result);
              this.setState({
                articles: result.items
              });
            },
            (error) => { }
        )
  }

  render() {
    const articleItems = [];
    const teamItems = [];
    const socialItems = [];

    for (let i=0; i<this.state.articles.length; i++) {
        articleItems.push(
            <div style={{flexGrow: '1', padding: '10px'}}>
                <Card shadow={0} style={{width: '450px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                    <CardTitle style={{color: '#fff', height: '600px', background: 'url('+this.state.articles[i].thumbnail+') center / cover'}}/>

                    <Ripples during={600}>
                        <div style={{width: '450px', height: '120px'}}>
                            <div style={{fontFamily: 'Roboto', fontSize: '25px', lineHeight: '30px', marginLeft: '15px', marginRight: '15px', marginTop: '30px', fontWeight: '500', color: 'rgb(99, 148, 140)'}}>
                                {this.state.articles[i].title}
                            </div>
                        </div>
                    </Ripples>
                </Card>
            </div>
        );
    }

    for (let i=0; i<this.state.team.length; i++) {
        const personSocial = [];
        for (let j=0; j<this.state.team[i].social.length; j++) {
            personSocial.push(
                <a className="blue-text text-lighten-2" href={this.state.team[i].social[j].url} style={{padding: 5}}>
                    <i className={
                        this.state.team[i].social[j].type == "facebook"
                            ? "fa fa-facebook"
                            : this.state.team[i].social[j].type == "twitter"
                                ? "fa fa-twitter"
                                : this.state.team[i].social[j].type == "linkedin"
                                    ? "fa fa-linkedin"
                                    : this.state.team[i].social[j].type == "instagram"
                                        ? "fa fa-instagram"
                                        : "fa fa-envelope-o"
                    }></i>
                </a>
            )
        }

        teamItems.push(
          <div className="col s12 m3">
              <div className="card card-avatar">
                  <div className="waves-effect waves-block waves-light">
                      <img className="activator" src={this.state.team[i].image}/>
                  </div>
                  <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            {this.state.team[i].name}<br/>
                            <small>
                                <em>
                                    <a className="red-text text-darken-1" href="#">{this.state.team[i].title}</a>
                                </em>
                            </small>
                        </span>
                      <p>{personSocial}</p>
                  </div>
              </div>
          </div>
      )
    }

    for (let i=0; i<this.state.socialMedia.length; i++) {
        socialItems.push(
            <div className="col s12 m3">
                <div className="card card-avatar">
                    <div className="waves-effect waves-block waves-light">
                        <img src={
                            this.state.socialMedia[i].name == "Facebook"
                                ? Facebook
                                : this.state.socialMedia[i].name == "Twitter"
                                    ? Twitter
                                    : this.state.socialMedia[i].name == "Instagram"
                                        ? Instagram
                                        : this.state.socialMedia[i].name == "LinkedIn"
                                            ? LinkedIn
                                            : Email
                        }/>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            <em>
                                <a className="red-text text-darken-1" href={this.state.socialMedia[i].url}>{this.state.socialMedia[i].name}</a>
                            </em>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            <div>
                <Layout fixedHeader>
                    <Header title="Title" style={{color: 'white'}}>
                        <Navigation>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                        </Navigation>
                    </Header>
                    <Drawer title="Title">
                        <Navigation>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <div id="intro" className="section scrollspy" style={{paddingLeft: '15%', paddingRight: '15%', paddingTop: '100px', paddingBottom: '100px'}}>
                            <h1 style={{fontFamily: 'Roboto', fontWeight: '100'}}>
                                Το WellnessLab σας ενημερώνει για θέματα σωματικής υγείας και πώς αυτά επηρεάζουν την ψυχική μας υγεία. Προωθεί την προσωπική και συλλογική ευημερία και στοχεύει στην παροχή υποστήριξης σε ζητήματα που αφορούν τη σωματική και ψυχική ευεξία.
                            </h1>
                        </div>

                        <div id="arthra">
                            <h2 style={{color: 'rgb(99, 148, 140)', fontFamily: 'Roboto', fontWeight: '400'}}>Άρθρα</h2>
                            <div style={{width: '75%', flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto'}}> {articleItems} </div>
                        </div>


                    </Content>

                </Layout>
            </div>
            {
                /*
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header" style={{background: '#63948C'}}>
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">WellnessLab</span>
                        <div className="mdl-layout-spacer"></div>
                    </div>
                </header>

                <main className="mdl-layout__content">
                    <div className="page-content">

                        */


                        /*
                        <div className="section scrollspy" id="health_experiences">
                            <div className="container">
                                <h2 className="header text_b">Εμπειρίες Υγείας</h2>
                                <div className="row">
                                    <div className="col s12">
                                        <h4 className="center header text_h2">
                                            Μοιράσου και εσύ τη δική σου εμπειρία υγείας ανώνυμα, συμπληρώνοντας την παρακάτω <a target="_blank" href={"https://forms.gle/5jbZK3NRPLDWhdrn9"}>φόρμα</a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="parallax-container">
                            <div className="parallax"><img src={Cover}/></div>
                        </div>

                        <div id="social_media" className="section scrollspy">
                            <div className="container">
                                <h2 className="header text_b"> Social Media </h2>
                                <div className="row"> {socialItems}</div>
                            </div>
                        </div>

                        <div className="section scrollspy" id="team">
                            <div className="container">
                                <h2 className="header text_b"> Ομάδα </h2>
                                <div className="row"> {teamItems}</div>
                            </div>
                        </div>

                        <footer id="contact" className="page-footer default_color scrollspy">
                            <div className="container">
                                <div className="row">

                                </div>
                            </div>
                            <div className="footer-copyright default_color">
                                <div className="container">
                                </div>
                            </div>
                        </footer>

                    </div>
                </main>
            </div>
                */
            }
        </div>
    );
  }

}

export default App;
