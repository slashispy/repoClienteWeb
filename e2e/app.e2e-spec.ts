import { ClienteWebPage } from './app.po';

describe('cliente-web App', function() {
  let page: ClienteWebPage;

  beforeEach(() => {
    page = new ClienteWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
