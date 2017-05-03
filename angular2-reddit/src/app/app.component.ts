import { Component } from '@angular/core';
import { Article } from "./article/article.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  articles: Article[];

  constructor() {
    this.articles = [
      new Article("atet", "http://www.baidu.com", 12),
    ];
  }

  saveArticle(title: HTMLInputElement, link: HTMLInputElement) {
    console.log(`${title.value}, ${link.value}`);
    this.articles.push(new Article(title.value, link.value));

    title.value = "";
    link.value = "";
  }

  sortArticle() {
    return this.articles.sort((a,b) => b.votes - a.votes);
  }

}
