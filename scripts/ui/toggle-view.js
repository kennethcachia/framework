
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

  /**
   * ToggleView
   */
  var ToggleView = Create('ToggleView', {

    initializer: function () {
      this._currentView = null;
      this._currentAction = null;

      this.on('triggerClick', this._changeView, this);
      this.on(['rendered', 'activeViewChange'], this._setView, this);
    },


    destructor: function () {
      this.reset();
    },


    reset: function () {
      if (this._currentAction) {
        this._currentAction.destroy();
        this._currentAction = null;
      }

      if (this._currentView) {
        this._currentView.deactivate();
        this._currentView = null;
      }
    },


    _changeView: function (e) {
      this.set('activeView', e.source);

      return false;
    },


    _setView: function () {
      var activeView = this.get('activeView');

      if (activeView && activeView !== this._currentView) {

        this.reset();

        this._currentView = activeView;
        this._currentView.activate();

        this._setAndPropagateAction();

      }
    },


    _setAndPropagateAction: function () {
      var activeView = this.get('activeView');
      var action = activeView.get('action');

      if (action) {
        this._currentAction = action.call(this);
      } else {
        this._currentAction = null;
      }

      this.fire('action', {
        action: this._currentAction
      });
    },


    _attrs: {
      activeView: {
        value: null
      },

      container: {
        value: '<div class="toggle-view"></div>'
      }
    }

  }, ParentView);


  return ToggleView;

});
