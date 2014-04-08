
define([

  'core/create',
  'ui/menu',
  'ui/menu-item-view'

], function (Create, Menu, MenuItemView) {

  /**
   * A Menu that renders views
   */
  var MenuView = Create('MenuView', {

    initializer: function () {
      this._activeView = null;

      this.on('newAction', this._onNewAction, this);
      this.on('resetAction', this._onResetView, this);
    },


    _onNewAction: function (e) {
      var viewParent = this.get('viewParent');

      if (viewParent) {

        var menuItem = e.menuItem;
        var view = this._createView(menuItem);

        viewParent.renderChild(view);

        this._activeView = view;
        this._activeView.propagateEventsTo(this);

      } else {
        throw 'Menu -- no parent specified';
      }
    },


    _onResetView: function () {
      if (this._activeView) {
        this._activeView.destroy();
      }

      this._activeView = null;
    },


    _createView: function (menuItem) {
      var view = menuItem.get('view');
      var object;

      if (view && view.type) {
        var config = view.config;
        object = new view.type(config);
      }

      return object;
    },


    _attrs: {
      defaultChildType: MenuItemView,
      viewParent: null
    }

  }, Menu);


  return MenuView;

});
