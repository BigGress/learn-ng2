import { ReduxChatAppPage } from './app.po';

describe('redux-chat-app App', () => {
  let page: ReduxChatAppPage;

  beforeEach(() => {
    page = new ReduxChatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
