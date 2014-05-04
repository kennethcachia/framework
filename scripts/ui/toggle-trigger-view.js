
define([

  'core/create',
  'ui/activated-view'

], function (Create, ActivatedView) {

  /**
   * ToggleTriggerView
   */
  var ToggleTriggerView = Create('ToggleTriggerView', {

    _onClick: function () {
      this.fire('triggerClick', null, true);
    },


    _attrs: {
      data: {
        value: {
          label: null
        }
      },

      activeClassName: {
        value: 'toggle-trigger-view--active'
      },

      action: {
        value: null
      },

      container: {
        value: '<div class="toggle-trigger-view"><span>{{label}}</span></div>'
      },

      domEvents: {
        value: [{
          eventName: 'click',
          callback: '_onClick'
        }]
      }
    }

  }, ActivatedView);


  return ToggleTriggerView;

});
