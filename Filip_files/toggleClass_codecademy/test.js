console.log = function() {};
global.$ = window.$ = require('jquery');
var rewire = require('rewire'),
    jsdom = require('jsdom').jsdom,
  	appModule = rewire('../js/main.js');

global.document = jsdom('<body></body>');

describe('', function() {
  it ('Did you attach the text function to $(this)?', function() {
    expect(appModule.__get__('main')).to.match(/\$\( *[\'"].projects-button[\'"] *\).on\( *[\'"]click[\'"], *function *\( *\) \{((\n|.)*)\$\( *this *\).text\(.*\)((\n|.)*)\}\)/);
  });

  it ('Did you provide the text function a string?', function() {
    expect(appModule.__get__('main')).to.match(/\$\( *[\'"].projects-button[\'"] *\).on\( *[\'"]click[\'"], *function *\( *\) \{((\n|.)*)\$\( *this *\).text\( *[\'"].*[\'"]\)((\n|.)*)\}\)/);
  });
});
