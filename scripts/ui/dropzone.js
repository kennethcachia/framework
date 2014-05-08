
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * DropzoneView
   */
  var DropzoneView = Create('DropzoneView', {

    _onChange: function (event, e) {
      var files = e.target.files;

      this.fire('filesSelected', {
        files: files
      });
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
        value: '<div class="ui-dropzone"></div>'
      },

      template: {
        value: '<input type="file" {{#multiple}}multiple{{/multiple}} />'
      }
    }

  }, View);


  return DropzoneView;

});
