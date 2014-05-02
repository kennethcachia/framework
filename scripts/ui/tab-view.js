
define([

  'core/create',
  'ui/toggle-view'

], function (Create, ToggleView) {

  /**
   * TabView
   */
  var TabView = Create('TabView', {

    initializer: function () {
      this.on('action', this._onAction, this);
      this.on('rendered', this._activateFirstTab, this);
    },


    _activateFirstTab: function () {
      var children = this.getRenderedChildren();
      var first = children[0];

      this.set('activeView', first);      
    },


    _onAction: function (data) {
      var action = data.action;

      if (action) {

        var container = this.get('container');
        var anchor = container.one('.tab-view-active');

        action.propagateEventsTo(this);
        action.set('anchor', anchor);
        action.render();

      }

      this.fire('tabSwitch', {
        view: action
      }, true);

      return false;
    },


    _attrs: {
      container: {
        value: '<div class="tab-view"></div>'
      },

      template: {
        value: '<div class="tab-view-triggers"></div>' +
               '<div class="tab-view-active"></div>'
      },

      childrenAnchor: {
        value: '.tab-view-triggers'
      }
    }

  }, ToggleView);


  return TabView;

});
