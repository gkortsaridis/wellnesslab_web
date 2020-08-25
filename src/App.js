import React from 'react';
import './App.css';
import Anastasia from './anastasia_aivatoglou.png'
import Chrysoula from './chrysoula_grigoropoulou.png'
import Cover from './cover.jpg'
import Facebook from './facebook.png'
import Twitter from './twitter.png'
import Instagram from './instagram.png'
import LinkedIn from './linkedin.png'
import Email from './email.png'
import ReactGA from 'react-ga';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        team: [
            {
                name: "Αναστασία Αιβάτογλου",
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

    ReactGA.initialize('UA-176319397-1');
    ReactGA.pageview('/home');
  }

  componentDidMount() {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wellnesslab.psy")
        .then(res => res.json())
        .then(
            (result) => {
              //console.log(result);
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
          <div className="col s12 m4 l4">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={this.state.articles[i].thumbnail}/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    <a href={this.state.articles[i].link}>{this.state.articles[i].title} </a>
                </span>
              </div>
            </div>
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

          <div id="top" className="scrollspy">
            <div id="loader-wrapper">
              <div id="loader"></div>
              <div className="loader-section section-left"></div>
              <div className="loader-section section-right"></div>
            </div>
          </div>

          <div className="navbar-fixed">
            <nav id="nav_f" className="default_color" role="navigation">
              <div className="container">
                <div className="nav-wrapper">
                  <ul className="hide-on-med-and-down">
                    <li><a href="#intro">WellnessLab</a></li>
                    <li><a href="#articles">Άρθρα</a></li>
                    <li><a href="#social">Social Media</a></li>
                    <li><a href="#team">Ομάδα</a></li>
                  </ul>
                  <ul id="nav-mobile" className="side-nav">
                    <li><a href="#intro">WellnessLab</a></li>
                    <li><a href="#articles">Άρθρα</a></li>
                    <li><a href="#social">Social Media</a></li>
                    <li><a href="#team">Ομάδα</a></li>
                  </ul>
                  <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
                </div>
              </div>
            </nav>
          </div>

          <div className="section no-pad-bot" id="index-banner">
            <div className="container">
              <h1 className="text_h center header cd-headline letters type">
                <span>WellnessLab </span>
                <span className="cd-words-wrapper waiting">
                  <b className="is-visible">για υγιές σώμα</b>
                  <b>για υγιή ψυχή</b>
                </span>
              </h1>
            </div>
          </div>

          <div id="intro" className="section scrollspy">
            <div className="container">
              <div className="row">
                <div className="col s12">

                  <h2 className="center header text_h2">
                    Το WellnessLab σας ενημερώνει για θέματα σωματικής υγείας και πώς αυτά επηρεάζουν την ψυχική μας υγεία. Προωθεί την προσωπική και συλλογική ευημερία και στοχεύει στην παροχή υποστήριξης σε ζητήματα που αφορούν τη σωματική και ψυχική ευεξία.
                  </h2>

                </div>

              </div>
            </div>
          </div>

          <div className="section scrollspy" id="work">
            <div className="container">
              <h2 className="header text_b">Άρθρα</h2>
              <div className="row">
                {articleItems}
              </div>
            </div>
          </div>

          <div className="parallax-container">
            <div className="parallax"><img src={Cover}/></div>
          </div>

          <div id="intro" className="section scrollspy">
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
    );
  }

}

export default App;
