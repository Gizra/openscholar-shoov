'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
}

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

describe('Live testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the sociology page',function(done) {
    client
      .url('http://sociology.fas.harvard.edu/')
      .webdrivercss(testName, {
        name: 'sociology',
        exclude:
          [
            '.slide, .slide .caption ',
            '.region-sidebar-second .field-name-field-photo',
            '.region-sidebar-second .node-title a',
            '.region-sidebar-second .field-name-field-news-date',
            '.view-id-os_events',
            '.item-list img',
            '.item-list .date-display-single',
          ],
        remove:
          [
            '.field-name-body',
            '.item-list .node-header',
            '.item-list .field-name-body',
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the gking page',function(done) {
    client
      .url('http://gking.harvard.edu/')
      .webdrivercss(testName, {
        name: 'gking',
        exclude:
          [
            '.region-sidebar-second .block-content',
            '#block-views-os-software-releases-block-1 .block-content',
            '#block-boxes-og-3633-3d069521-fbt-174',
            '#box-og-3633-9187deb-page',
          ],
        remove:
          [
            '#footer',
            'article a.more',
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });
});
