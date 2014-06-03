
define([

  'lib/base/create',
  'lib/ui/toggle',
  'lib/ui/toggle-trigger'

], function (Create, ToggleView, ToggleTriggerView) {

  /**
   * TabView
   */
  var TabView = Create('TabView', {

    bindEvents: function () {
      this.on('toggle', this._onToggle, this);
      this.on('childrenRendered', this._activateFirstTab, this);
    },


    setActiveTabByIndex: function (index) {
      this.performActionByIndex(index);
    },


    _activateFirstTab: function () {
      this.performActionByIndex(1);
    },


    _onToggle: function (data) {
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
      defaultChildType: {
        value: ToggleTriggerView
      },

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