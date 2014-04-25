
define([

  'core/create',
  'ui/ui',
  'ui/input-view'

], function (Create, UI, ViewInput) {

  /**
   * Input
   */
  var UIInput = Create('UIInput', {

    _attrs: {
      view: {
        value: null,

        default: function () {
          return new ViewInput();
        }
      }
    }

  }, UI);


  return UIInput;

});
