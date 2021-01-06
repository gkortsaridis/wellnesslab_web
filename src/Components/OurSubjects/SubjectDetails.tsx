import * as React from 'react';
import {emptySubject, getSubjectById} from "../../Repositories/SubjectsRepository";
import {Subject} from "../../Entities/Entities";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {Button, Card} from 'rmwc'
import {isMobile} from 'react-device-detect'

import back from '../../Images/back_arrow.png'
import tips from '../../Images/tips_icon.png'
import suggestions from '../../Images/suggestions_icon.png'

type SubjectDetailsProps = {
    history: any
}

type SubjectDetailsState = {
    subject: Subject,
    card0hover: boolean,
    card1hover: boolean,
    card2hover: boolean
}

class SubjectDetails extends React.Component<SubjectDetailsProps, SubjectDetailsState> {

    constructor(props: SubjectDetailsProps, state: SubjectDetailsState) {
        super(props, state);

        let subjectObj: Subject = JSON.parse(JSON.stringify(emptySubject))
        this.state = {subject: subjectObj, card0hover: false, card1hover: false, card2hover: false }

        this.goBack = this.goBack.bind(this)
        this.readArticle = this.readArticle.bind(this)
    }

    componentDidMount() {
        const paths = this.props.history.location.pathname.split("/")
        const subjectId = paths[paths.length - 1]
        console.log("Opened subject",subjectId)

        getSubjectById(subjectId)
            .then((subject: Subject) => {
                console.log(subject)
                this.setState({subject: subject})
            })
            .catch((error) => {
                alert("Could not get subject")
            })
    }

    goBack() {
        const appHistory = this.props.history
        appHistory.goBack()
    }

    cardHoverEnter(card: number) {
        if(card === 0) {
            this.setState({card0hover: true})
        } else if(card === 1 && this.state.subject.tips.length > 0) {
            this.setState({card1hover: true})
        } else if(card === 2 && this.state.subject.suggestions !== ""){
            this.setState({card2hover: true})
        }
    }

    cardHoverLeave(card: number) {
        if(card === 0) {
            this.setState({card0hover: false})
        } else if(card === 1) {
            this.setState({card1hover: false})
        } else {
            this.setState({card2hover: false})
        }
    }

    readArticle(url: string) {
        window.open(url, "_blank")
    }

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.smallToolbar}>
                    <img style={this.styles.backBtn} src={back} onClick={this.goBack}/>
                    <div style={this.styles.backTxt}>{this.state.subject.title}</div>
                </div>
                <div style={isMobile ? this.styles.dataContainerMobile : this.styles.dataContainer}>
                    <div style={isMobile ? this.styles.articleDivMobile : this.styles.articleDiv}>
                        <div style={this.styles.title}>Άρθρο</div>
                        <Card style={this.state.card0hover ? this.styles.contentCardHoverArticle : this.styles.contentCardArticle }  onMouseEnter={() => this.cardHoverEnter(0)} onMouseLeave={() => this.cardHoverLeave(0)}>
                            <div style={{width: '100%', height: 400,  background: 'url('+this.state.subject.article.imgUrl+') center / cover'}} />
                            <div style={this.styles.articleTextContainer}>
                                <div>{this.state.subject.article.title}</div>
                                <Button label={"ΔΙΑΒΑΣΕ ΤΟ"} onClick={() => {this.readArticle(this.state.subject.article.articleUrl)}}/>
                            </div>
                        </Card>
                    </div>
                    <div style={isMobile ? this.styles.tipsDivMobile : this.styles.tipsDiv}>
                        <div style={this.styles.title}>Tips</div>
                        <Card style={this.state.card1hover ? this.styles.contentCardHoverTips : this.styles.contentCardTips }  onMouseEnter={() => this.cardHoverEnter(1)} onMouseLeave={() => this.cardHoverLeave(1)}>
                            {
                                this.state.subject.tips.length > 0
                                    ? <Slide style={this.styles.slideContainer} easing="ease">
                                        {
                                            this.state.subject.tips.map((tip: string) =>
                                                <div style={this.styles.eachSlide}>
                                                    <div style={{width: '100%', height: '100%', background: 'url('+tip+') center / contain no-repeat'}}>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Slide>
                                    : <div style={this.styles.noSuggestionsContainer}>
                                        <img src={tips} style={this.styles.noContentIcon}/>
                                        <div style={this.styles.noContentTxt}>Δεν υπάρχουν tips για αυτό το θέμα ακόμα. Επισκευτείτε μας ξανά σε λίγες μέρες.</div>
                                    </div>
                            }
                        </Card>
                    </div>
                    <div style={isMobile ? this.styles.suggestionsDivMobile : this.styles.suggestionsDiv}>
                        <div style={this.styles.title}>Suggestions</div>
                        <Card style={this.state.card2hover ? this.styles.contentCardHoverSuggestions : this.styles.contentCardSuggestions }  onMouseEnter={() => this.cardHoverEnter(2)} onMouseLeave={() => this.cardHoverLeave(2)}>
                            {
                                this.state.subject.suggestions !== ""
                                    ? <div style={this.styles.suggestionsTxtContainer}>
                                        {this.state.subject.suggestions}
                                    </div>
                                    : <div style={this.styles.noSuggestionsContainer}>
                                        <img src={suggestions} style={this.styles.noContentIcon}/>
                                        <div style={this.styles.noContentTxt}>Δεν υπάρχουν suggestions για αυτό το θέμα ακόμα. Επισκευτείτε μας ξανά σε λίγες μέρες.</div>
                                    </div>
                            }

                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    cardRadius = 15

    styles = {
        container: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            flex: 1,
            background: 'white'
        },
        smallToolbar: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            alignItems: 'center' as 'center',
            padding: 15,
            backgroundColor: '#F7F7F7'
        },
        backBtn: {width: 25, height: 25, marginRight: 10},
        backTxt: {fontSize: 20},
        dataContainer: {display: 'flex', flexDirection: 'row' as 'row', flexGrow: 1, backgroundColor: '#F7F7F7'},
        dataContainerMobile: {display: 'flex', flexDirection: 'column' as 'column', flexGrow: 1, backgroundColor: '#F7F7F7'},
        articleDiv: {display: 'flex', width: '33%', flexGrow: 1, flexDirection: 'column' as 'column', alignItems: 'center'},
        articleDivMobile: {display: 'flex', width: '100%', flexGrow: 1, flexDirection: 'column' as 'column', alignItems: 'center'},
        title: {fontSize: 25, fontWeight: 100, paddingBottom: 10},
        contentCardArticle: {width: '80%', height: 500},
        contentCardHoverArticle: {width: '80%', height: 500, boxShadow: "0px 0px 15px 1px rgba(53,53,53,0.89)"},
        articleTextContainer: {height: 100, fontSize: 20, justifyContent: 'center' as 'center', alignItems: 'center' as 'center', display: 'flex', flexDirection: 'column' as 'column'},
        tipsDiv: {display: 'flex', flexGrow: 1, width: '33%', flexDirection: 'column' as 'column', alignItems: 'center',},
        tipsDivMobile: {display: 'flex', flexGrow: 1, width: '100%', flexDirection: 'column' as 'column', alignItems: 'center', marginTop: 20},
        contentCardTips: {width: '80%', height: 500},
        contentCardHoverTips: {width: '80%', height: 500, boxShadow: "0px 0px 15px 1px rgba(53,53,53,0.89)"},
        slideContainer: {width: '100%'},
        noTipsContainer: {display: 'flex', flexGrow: 1, padding: 10, backgroundColor: '#dddddd'},
        suggestionsDiv: {display: 'flex', flexGrow: 1, width: '33%', alignItems: 'center', flexDirection: 'column' as 'column'},
        suggestionsDivMobile: {display: 'flex', flexGrow: 1, width: '100%', alignItems: 'center', flexDirection: 'column' as 'column', marginTop: 20, marginBottom: 40},
        contentCardSuggestions: {width: '80%', height: 500},
        contentCardHoverSuggestions: {width: '80%', height: 500, boxShadow: "0px 0px 15px 1px rgba(53,53,53,0.89)"},
        suggestionsTxtContainer: {display: 'flex', flexGrow: 1, whiteSpace: 'pre-line' as 'pre-line', overflowY: 'scroll' as 'scroll', padding: 10},
        noSuggestionsContainer: {display: 'flex', flexGrow: 1, padding: 10, backgroundColor: '#dddddd', flexDirection: 'column' as 'column', alignItems: 'center' as 'center', justifyContent: 'center' as 'center'},
        eachSlide: {display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', height: 500, flexGrow: 1, width: '100%'},
        noContentIcon: {width: '150px', height: '150px'},
        noContentTxt: {padding: 50, fontSize: 20, textAlign: 'center' as 'center', lineHeight: 1.4, color: 'white'}
    }
}

export default SubjectDetails