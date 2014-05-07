
define([

  'core/create',
  'ui/toggle-trigger'

], function (Create, ToggleTriggerView) {

  /**
   * MenuItemView
   */
  var MenuItemView = Create('MenuItemView', {

    _attrs: {
      container: {
        // Use data-label as a CSS hook.
        value: '<div class="menu-item" data-label="{{label}}"></div>'
      },

      template: {
        value: '<div class="menu-item-icon"></div>'
      }
    }

  }, ToggleTriggerView);


  return MenuItemView;

});
