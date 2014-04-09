
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

      this.on('rendered', this._onRendered, this);
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


    _onRendered: function () {
      var inlineItems = this.get('inlineItems');
      var container = this.get('container');

      if (inlineItems === true) {
        container.addClass('menu--inline');
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
          // TODO: auto execute when calling get() on a function (global change)
          this._currentAction = action.call(this);
        }

      } else {
        console.log('Same action -- SKIPPING.');
      }

      return false;
    },


    _attrs: {
      inlineItems: false,
      container: '<div class="menu"></div>'
    }

  }, ParentView);


  return MenuView;

});
