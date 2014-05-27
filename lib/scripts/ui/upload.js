
define([

  'lib/base/create',
  'lib/mv/view'

], function (Create, View) {

  /**
   * UploadView
   */
  var UploadView = Create('UploadView', {

    _onChange: function (event, e) {
      var files = e.target.files;

      this.fire('filesSelected', {
        files: files
      }, true);
    },


    _attrs: {
      data: {
        value: {
          multiple: false
        }
      },

      domEvents: {
        value: [{
          eventName: 'change',
          callback: '_onChange'
        }],
      },

      container: {
        value: '<div class="ui-upload"></div>'
      },

      template: {
        value: '<input type="file" {{#multiple}}multiple{{/multiple}} />'
      }
    }

  }, View);


  return UploadView;

});
