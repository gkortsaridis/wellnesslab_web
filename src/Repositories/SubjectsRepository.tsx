import firebase from "firebase";

export const emptyArticle: Article = {title: "", imgUrl: "", articleUrl: ""}
export const emptySubject: Subject = {id: "", title: "", imgUrl: "", article: emptyArticle, suggestions: "", tips: [] }


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
                 subjectsArray.push(subjectObj)

                 if(cnt === snapshot.docs.length - 1) { resolve(subjectsArray) }
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