
define([

  'lib/base/create',
  'lib/ui/action'

], function (Create, ActionView) {

  /**
   * ToggleView
   */
  var ToggleView = Create('ToggleView', {

    initializer: function () {
      this._currentView = null;

      this.on('action', this._onAction, this);
      this.on('activeViewChange', this._setView, this);
    },


    destructor: function () {
      this._reset();
    },


    _reset: function () {
      if (this._currentView) {
        this._currentView.deactivate();
        this._currentView = null;
      }
    },


    _onAction: function (data) {
      this.set('currentAction', data.action);
      this.set('activeView', data.source);

      return false;
    },


    _setView: function () {
      var activeView = this.get('activeView');
      var currentAction = this.get('currentAction');

      if (activeView && activeView !== this._currentView) {

        this._reset();

        this._currentView = activeView;
        this._currentView.activate();

        this.fire('toggle', {
          action: currentAction
        });

      }
    },


    _attrs: {
      activeView: {
        value: null
      },

      currentAction: {
        value: null
      },

      repeatAction: {
        value: false
      },

      container: {
        value: '<div class="toggle-view"></div>'
      }
    }

  }, ActionView);


  return ToggleView;

});
