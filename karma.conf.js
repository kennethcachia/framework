// Karma configuration
// Generated on Mon May 26 2014 14:36:15 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'lib/**/*.js', included: false},
      {pattern: 'src/**/*.js', included: false},

      {pattern: 'lib/**/*Spec.js', included: false},
      {pattern: 'src/**/*Spec.js', included: false},

      'test-main.js'
    ],


    // list of files to exclude
    exclude: [
      'src/app/app.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // BrowserStack config
    browserStack: {
      username: 'username',
      accessKey: 'accessKey'
    },


    // BS browsers
    customLaunchers: {
      bs_opera_win7: {
        base: 'BrowserStack',
        browser: 'opera',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie11_win7: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '7'
      },
      bs_ie10_win7: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '7'
      }
    },


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: [
      //'bs_opera_win7', 'bs_ie11_win7', 'bs_ie10_win7',
      'Chrome', 'Firefox', 'Safari', 'iOS'
    ],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
