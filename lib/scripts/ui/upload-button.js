
define([

  'lib/base/create',
  'lib/ui/button',
  'lib/ui/upload'

], function (Create, ButtonView, Upload) {

  /**
   * UploadButtonView
   */
  var UploadButtonView = Create('UploadButtonView', {

    initializer: function () {
      // TODO: Move to bindEvents and test.
      this.on('rendered', this._onRendered, this);
    },


    _onRendered: function () {
      var container = this.get('container');

      this._uploader = new Upload({
        anchor: container
      });

      this._uploader.propagateEventsTo(this);
      this._uploader.render();
    },


    _attrs: {
      data: {
        value: {
          label: 'Upload'
        }
      },

      className: {
        value: 'ui-upload--button'
      }
    }

  }, ButtonView);


  return UploadButtonView;

});
