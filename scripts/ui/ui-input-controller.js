
define([

  'core/create',
  'ui/ui',
  'ui/input'

], function (Create, UI, ViewInput) {

  /**
   * Input
   */
  var UIInput = Create('UIInput', {

    createDefaultView: function () {
      return new ViewInput();
    }

  }, UI);


  return UIInput;

});
