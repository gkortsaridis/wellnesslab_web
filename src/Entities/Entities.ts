// @ts-ignore
interface Subject {id: string, title: string, imgUrl: String, article: Article, tips: string[], suggestions: string}
interface Article {title: string, imgUrl: string, articleUrl: string }
interface SocialMedia { name: string, url: string }
interface TeamMember { name: string, image: string, title: string, social: SocialMedia[]}