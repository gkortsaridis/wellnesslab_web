import firebase from "firebase";
import {Article, Subject} from "../Entities/Entities";

export const emptyArticle: Article = {title: "", imgUrl: "", articleUrl: ""}
export const emptySubject: Subject = {id: "", title: "", imgUrl: "", article: emptyArticle, suggestions: "", tips: [], createdDate: Date.now(), modifiedDate: Date.now() }


 export function getAllSubjects() {

     return new Promise<Subject[]>((resolve, reject) => {
         firebase.firestore().collection('subjects').get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
             const subjectsArray: Subject[] = [];

             for(let cnt=0; cnt< snapshot.docs.length; cnt++) {
                 const doc = snapshot.docs[cnt]
                 let subjectObj: Subject = JSON.parse(JSON.stringify(emptySubject))

                 const title = doc.data().title
                 const imgUrl = doc.data().imgUrl
                 const tips = doc.data().tips
                 const suggestions = doc.data().suggestions
                 const creationDate = doc.data().createdDate
                 const modifiedDate = doc.data().modifiedDate

                 const articleTitle = (doc.data() as any).article.title
                 const articleImgUrl = (doc.data() as any).article.imgUrl
                 const articleUrl = (doc.data() as any).article.articleUrl
                 const article: Article = {title: articleTitle, articleUrl: articleUrl, imgUrl: articleImgUrl }

                 subjectObj.title = title
                 subjectObj.imgUrl = imgUrl
                 subjectObj.id = doc.id
                 subjectObj.article = article
                 subjectObj.tips = tips
                 subjectObj.suggestions = suggestions
                 subjectObj.createdDate = creationDate
                 subjectObj.modifiedDate = modifiedDate
                 subjectsArray.push(subjectObj)

                 if(cnt === snapshot.docs.length - 1) {
                     console.log('Before', subjectsArray)
                     subjectsArray.sort((a: Subject, b: Subject) => a.modifiedDate < b.modifiedDate ? 1 : -1)
                     console.log('After', subjectsArray)
                     resolve(subjectsArray)
                 }
             }
         })
     })
 }

 export function updateSubject(subject: Subject) {

     return new Promise<any>((resolve, reject) => {
         firebase.firestore().collection('subjects').doc(subject.id).set({
             suggestions: subject.suggestions,
             tips: subject.tips,
             title: subject.title,
             imgUrl: subject.imgUrl,
             createdDate: subject.createdDate,
             modifiedDate: subject.modifiedDate,
             article: {
                 title: subject.article.title,
                 imgUrl: subject.article.imgUrl,
                 articleUrl: subject.article.articleUrl
             }
         })
             .then((result) => resolve(result))
             .catch((error) => reject(error))

     })
 }

 export function createSubject(subject: Subject) {

    return new Promise<any>((resolve, reject) => {
        firebase.firestore().collection('subjects').add({
            suggestions: subject.suggestions,
            tips: subject.tips,
            title: subject.title,
            imgUrl: subject.imgUrl,
            createdDate: subject.createdDate,
            modifiedDate: subject.modifiedDate,
            article: {
                title: subject.article.title,
                imgUrl: subject.article.imgUrl,
                articleUrl: subject.article.articleUrl
            }
        })
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    })
}

 export function deleteSubject(subjectID: string) {
     return new Promise<any>((resolve, reject) => {
         firebase.firestore().collection('subjects').doc(subjectID).delete()
             .then((result) => resolve(result))
             .catch((error) => reject(error))
     })
 }