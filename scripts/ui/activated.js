
define([

  'base/create',
  'mv/view'

], function (Create, View) {

  /**
   * ActivatedView
   */
  var ActivatedView = Create('ActivatedView', {

    activate: function () {
      this._setActive(true);
    },


    deactivate: function () {
      this._setActive(false);
    },


    _setActive: function (isActive) {
      var container = this.get('container');
      var activeClassName = this.get('activeClassName');

      if (isActive) {
        container.addClass(activeClassName);
      } else {
        container.removeClass(activeClassName);
      }
    },


    _attrs: {
      activeClassName: {
        value: 'activated-view--active'
      }
    }

  }, View);


  return ActivatedView;

});
