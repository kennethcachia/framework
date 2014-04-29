
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Menu Item
   */
  var MenuItemView = Create('MenuItemView', {

    _onClick: function () {
      this.fire('menuItemClick', null, true);
    },


    _attrs: {
      data: {
        value: {
          label: null
        }
      },

      action: {
        value: null
      },

      container: {
        value: '<div class="menu-item" data-label="{{label}}"></div>'
      },

      template: {
        value: '<div class="menu-item-icon"></div>'
      },

      domEvents: {
        value: [{
          matchClass: '.menu-item',
          eventName: 'click',
          callback: '_onClick'
        }]
      }
    }

  }, View);


  return MenuItemView;

});
