import React from 'react';
import {Card, CardTitle} from "react-mdl";
import Ripples from "react-ripples";
import firebase from "firebase";

type OurSubjectsState = {
    articles: Article[]
}

class Subjects extends React.Component<{ }, OurSubjectsState> {

    constructor(props: {}, state: OurSubjectsState) {
        super(props, state);

        this.state = { articles: [] }
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

    }


    render() {
        const articleItems = [];
        for (let i=0; i<this.state.articles.length; i++) {
            articleItems.push(
                <div style={this.styles.cardContainer}>
                    <Card shadow={0} style={this.styles.card}>
                        <CardTitle style={{...{background: 'url('+this.state.articles[i].imgUrl+') center / cover'}, ...this.styles.cardImage}}/>
                        <Ripples during={600} color={'rgb(99, 148, 140, 0.3)'}>
                            <div style={this.styles.titleContainer}>
                                <div style={this.styles.titleContainer2}>
                                    <a target={"_blank"} href={this.state.articles[i].articleUrl} style={this.styles.text}>{this.state.articles[i].title}</a>
                                </div>
                            </div>
                        </Ripples>
                    </Card>
                </div>
            );
        }

        return (
            <div style={this.styles.container}>
                <div style={this.styles.articlesContainer}> {articleItems} </div>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'white'
        },
        articlesContainer: {
            width: '75%',
            flexDirection: 'row' as 'row',
            display: 'flex',
            flexWrap: 'wrap' as 'wrap',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        cardContainer: {flexGrow: 1, padding: '10px'},
        card: {width: '450px', display: 'block', marginLeft: 'auto', marginRight: 'auto'},
        cardImage: {color: '#fff', height: '600px'},
        titleContainer: {width: '450px', height: '120px'},
        titleContainer2: {fontFamily: 'Roboto', fontSize: '24px', lineHeight: '30px', marginLeft: '15px', marginRight: '15px', marginTop: '30px'},
        text: {textDecoration:'none', color: 'black'}
    }
}

export default Subjects