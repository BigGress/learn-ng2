import { Component, OnInit, Input } from '@angular/core';

export class Article {
  title: string;
  link: string;
  votes: number;
  constructor(title: string, link: string, votes: number = 0) {
    this.title = title;
    this.link = link;
    this.votes = votes;
  }


  voteUp() {
    this.votes++;
  }

  voteDown() {
    this.votes--;
  }

  domain() {
    try {
      const link = this.link.split("//")[1];
      return link.split("/")[0]
    } catch (err) {
      return null;
    }
  }
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  constructor() {
    // this.article = new Article("test", "http://dsfadsfsd", 10);
  }

  ngOnInit() {
  }

  voteUp() {
    this.article.voteUp();
  }

  voteDown() {
    this.article.voteDown();
  }
}
