
define([

  'core/create',
  'ui/toggle-trigger-view'

], function (Create, ToggleTriggerView) {

  /**
   * MenuItemView
   */
  var MenuItemView = Create('MenuItemView', {

    _attrs: {
      data: {
        value: {
          label: null
        }
      },

      container: {
        value: '<div class="menu-item" data-label="{{label}}"></div>'
      },

      template: {
        value: '<div class="menu-item-icon"></div>'
      }
    }

  }, ToggleTriggerView);


  return MenuItemView;

});
