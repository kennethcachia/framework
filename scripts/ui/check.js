
define([

  'core/create',
  'ui/input'

], function (Create, InputView) {

  /**
   * Checkbox
   */
  var CheckView = Create('CheckView', {

    _attrs: {
      data: {
        value: {
          value: null,
          checked: false
        }
      },

      container: {
        value: '<div class="ui-check"></div>'
      },

      template: {
        value: '<input type="checkbox" {{#value}}value="{{value}}"{{/value}} {{#checked}}checked{{/checked}}/>'
      }
    }

  }, InputView);


  return CheckView;

});
