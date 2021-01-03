import * as React from 'react';
import {emptySubject, getSubjectById} from "../../Repositories/SubjectsRepository";
import {Subject} from "../../Entities/Entities";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {Button, Card} from 'rmwc'

import back from '../../Images/back_arrow.png'

type SubjectDetailsProps = {
    history: any
}

type SubjectDetailsState = {
    subject: Subject
}

class SubjectDetails extends React.Component<SubjectDetailsProps, SubjectDetailsState> {

    constructor(props: SubjectDetailsProps, state: {}) {
        super(props, state);

        let subjectObj: Subject = JSON.parse(JSON.stringify(emptySubject))
        this.state = {subject: subjectObj}

        this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
        const paths = this.props.history.location.pathname.split("/")
        const subjectId = paths[paths.length - 1]
        console.log(subjectId)

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

    render() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.smallToolbar}>
                    <img style={{width: 25, height: 25, marginRight: 10}} src={back} onClick={this.goBack}/>
                    <div style={{fontSize: 20}}>{this.state.subject.title}</div>
                </div>
                <div style={this.styles.dataContainer}>
                    <div style={this.styles.articleDiv}>
                        <div style={this.styles.title}>Άρθρο</div>
                        <Card style={this.styles.contentCard}>
                            <div style={{width: '100%', height: 400,  background: 'url('+this.state.subject.article.imgUrl+') center / cover'}} />
                            <div style={{height: 100, fontSize: 20, justifyContent: 'center' as 'center', alignItems: 'center' as 'center', display: 'flex', flexDirection: 'column'}}>
                                <div>{this.state.subject.article.title}</div>
                                <Button label={"ΔΙΑΒΑΣΕ ΤΟ"}/>
                            </div>
                        </Card>
                    </div>
                    <div style={this.styles.tipsDiv}>
                        <div style={this.styles.title}>Tips</div>
                        <Card style={this.styles.contentCard}>
                            <Slide style={{width: '100%'}} easing="ease">
                                {
                                    this.state.subject.tips.map((tip: string) =>
                                        <div style={this.styles.eachSlide}>
                                            <div style={{width: '100%', height: '100%', background: 'url('+tip+') center / contain no-repeat'}}>
                                            </div>
                                        </div>
                                    )
                                }
                            </Slide>
                        </Card>
                    </div>
                    <div style={this.styles.suggestionsDiv}>
                        <div style={this.styles.title}>Suggestions</div>
                        <Card style={this.styles.contentCard}>
                            <div style={{display: 'flex', flexGrow: 1, whiteSpace: 'pre-line', overflowY: 'scroll', padding: 10}}>
                                {this.state.subject.suggestions}
                            </div>
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
        dataContainer: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            flexGrow: 1,
            backgroundColor: '#F7F7F7'
        },
        smallToolbar: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            alignItems: 'center' as 'center',
            padding: 15,
            backgroundColor: '#F7F7F7'
        },
        articleDiv: {
            display: 'flex',
            width: '33%',
            flexGrow: 1,
            flexDirection: 'column' as 'column',
            alignItems: 'center',
        },
        tipsDiv: {
            display: 'flex',
            flexGrow: 1,
            width: '33%',
            flexDirection: 'column' as 'column',
            alignItems: 'center',
        },
        suggestionsDiv: {
            display: 'flex',
            flexGrow: 1,
            width: '33%',
            alignItems: 'center',
            flexDirection: 'column' as 'column'
        },
        articleCard: {
            borderRadius: this.cardRadius,
            display: "flex",
            flexDirection: 'column' as 'column',
            backgroundColor: 'white',
            border: '1px solid black'
        },
        articleImage: {width: '300px', height: '400px', overflow: 'hidden', borderRadius: this.cardRadius},
        articleTitleContainer: {
            width: '300px',
            height: '100px',
            backgroundColor: 'white',
            display: 'table',
            textAlign: 'center' as 'center',
            borderRadius: this.cardRadius
        },
        articleTitleText: {
            textDecoration: 'none',
            color: 'black',
            textAlign: 'center' as 'center',
            fontSize: '20px',
            display: 'table-cell',
            verticalAlign: 'middle',
            padding: '5px'
        },
        eachSlide: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundSize: 'cover',
            height: 500,
            flexGrow: 1,
            width: '100%'
        },
        title: {fontSize: 25, fontWeight: 100, paddingBottom: 10},
        contentCard: {width: '80%', height: 500}
    }
}

export default SubjectDetails