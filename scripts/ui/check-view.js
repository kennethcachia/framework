
define([

  'core/create',
  'ui/input-view'

], function (Create, ViewInput) {

  /**
   * Checkbox
   */
  var ViewCheck = Create('ViewCheck', {

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

  }, ViewInput);


  return ViewCheck;

});
