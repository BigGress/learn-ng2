import { YoutubePage } from './app.po';

describe('youtube App', () => {
  let page: YoutubePage;

  beforeEach(() => {
    page = new YoutubePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
