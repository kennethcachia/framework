
define([

  'core/create',
  'ui/toggle-view'

], function (Create, ToggleView) {

  /**
   * TabView
   */
  var TabView = Create('TabView', {

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
