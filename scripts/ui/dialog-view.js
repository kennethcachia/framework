
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

  /**
   * ViewDialog
   */
  var ViewDialog = Create('ViewDialog', {

    _attrs: {
      container: '<div class="dialog"></div>',

      data: {
        title: null
      },

      template: '<div class="dialog-title">Title:{{title}}</div>'
    }

  }, ParentView);


  return ViewDialog;

});
