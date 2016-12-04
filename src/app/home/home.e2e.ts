import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });


//   it('should have a title', () => {
//     let subject = browser.getTitle();
//     let result  = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
//     expect(subject).toEqual(result);
//   });

//   it('should have `your content here` x-large', () => {
//     let subject = element(by.css('[x-large]')).getText();
//     let result  = 'Your Content Here';
//     expect(subject).toEqual(result);
//   });

    it("translate test", () => {
        let source = element(by.css(".select-language .source-select"));
        let value1 = source.getAttribute("value");

        let target = element(by.css(".select-language .target"));
        let value2= target.getAttribute("value");

        let toggleBtn = element(by.css(".translate-language-btn"));
        toggleBtn.click();

        expect(value1).toEqual(target.getAttribute("value"));

    });

    it("input data", () => {
        let input_box = element(by.tagName("input"));

        input_box.sendKeys("看");

        let searchBtn = element(by.css(".search-btn"));
        searchBtn.click();

        let trans_box = element(by.css(".tranlsate-box"));


        browser.sleep(5000);
        let text = trans_box.getText();
        expect(text).toEqual("Look");
    })


});
