
define([

  'core/create'

], function (Create) {

  /**
   * Controller
   */
  var Controller = Create('Controller', {

    initializer: function () {
      var view = this.get('view');

      view.on('appendedView', this._updateModel, this);
      view.on('childDataChange', this._updateModel, this);

      this.on('initReady', this._render, this);
    },


    destructor: function () {
      var model = this.get('model');
      var view = this.get('view');

      view.destroy();
      model.destroy();
    },


    // It's important that the view is rendered
    // after all the initializers are called,
    // as it's common to bind events on the view
    // in the controller's initializer() that might
    // initially fire after the view is rendered.
    _render: function () {
      var view = this.get('view');
      view.render();  
    },


    _updateModel: function (e) {
      this.fire('updateModel', e);
    },


    _attrs: {
      view: {
        value: null
      },

      model: {
        value: null
      }
    }

  });


  return Controller;

});
