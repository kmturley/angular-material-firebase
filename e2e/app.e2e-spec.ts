import { Angular2MaterialFirebasePage } from './app.po';

describe('angular2-material-firebase App', () => {
  let page: Angular2MaterialFirebasePage;

  beforeEach(() => {
    page = new Angular2MaterialFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
