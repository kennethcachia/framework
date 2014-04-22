
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

  /**
   * Menu
   */
  var MenuView = Create('MenuView', {

    initializer: function () {
      this._activeItem = null;
      this._currentAction = null;

      this.on('menuItemClick', this._onMenuItemClick, this);
    },


    destructor: function () {
      this.reset();
    },


    reset: function () {
      this._activeItem = null;

      if (this._currentAction) {
        this._currentAction.destroy();
      }
    },


    _onMenuItemClick: function (e) {
      var menuItem = e.source;
      var data = e.data;

      if (menuItem !== this._activeItem) {

        this.reset();
        this._activeItem = menuItem;

        var action = data.action;

        if (typeof action === 'function') {
          this._currentAction = action.call(this);
        }

      } else {
        console.log('Same action -- SKIPPING.');
      }

      return false;
    },


    _attrs: {
      data: {
        value: {
          inline: false
        }
      },

      container: {
        value: '<div class="menu{{#inline}} menu--inline{{/inline}}"></div>'
      }
    }

  }, ParentView);


  return MenuView;

});
