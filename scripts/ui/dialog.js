
define([

  'core/create',
  'mv/controller'

], function (Create, Controller) {

  /**
   * Dialog
   */
  var Dialog = Create('Dialog', {

    _attrs: {
      //label: null
      //container: '<div class="dialog"></div>',
      //template: '<div class="dialog-ui"></div><div class="dialog-buttons"></div>',
      //ui: []
    }

  }, Controller);


  return Dialog;

});
