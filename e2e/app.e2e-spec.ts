import { SliderPortfolioPage } from './app.po';

describe('slider-portfolio App', () => {
  let page: SliderPortfolioPage;

  beforeEach(() => {
    page = new SliderPortfolioPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
