
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

  /**
   * ActionView
   */
  var ActionView = Create('ActionView', {

    initializer: function () {
      this._currentSource = null;
      this._currentAction = null;

      this.on('triggerClick', this._onTriggerClick, this);
    },


    destructor: function () {
      this._destroyAction();
    },


    performActionByIndex: function (index) {
      var children = this.getRenderedChildren();
      var child = children[index - 1];

      if (child) {
        this._performAction(child);
      }
    },


    _onTriggerClick: function (data) {
      var source = data.source;

      this._performAction(source);

      return false;
    },


    _destroyAction: function () {
      if (this._currentAction) {
        this._currentAction.destroy();
      }

      this._currentAction = null;
    },


    _performAction: function (source) {
      var repeatAction = this.get('repeatAction');

      if (repeatAction || source !== this._currentSource) {

        this._currentSource = source;
        this._destroyAction();

        var action = source.get('action');

        if (action) {
          this._currentAction = action.call(this);
        }

        this.fire('action', {
          source: source,
          action: this._currentAction
        });

      }
    },


    _attrs: {
      repeatAction: {
        value: true
      },

      container: {
        value: '<div class="action-view"></div>'
      }
    }

  }, ParentView);


  return ActionView;

});
