
define([

  'core/create',
  'ui/ui',
  'views/input'

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
