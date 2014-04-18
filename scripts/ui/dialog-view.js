
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

  /**
   * ViewDialog
   */
  var ViewDialog = Create('ViewDialog', {

    _attrs: {
      container: {
        value: '<div class="dialog"></div>'
      },

      data: {
        value: {
          title: null
        }
      },

      template: {
        value: '<div class="dialog-title">Title:{{title}}</div>'
      }
    }

  }, ParentView);


  return ViewDialog;

});
