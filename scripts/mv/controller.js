
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
    },


    destructor: function () {
      var model = this.get('model');
      var view = this.get('view');

      view.destroy();
      model.destroy();
    },


    _updateModel: function (e) {
      this.fire('updateModel', e);
    },


    render: function () {
      var view = this.get('view');
      view.render();
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
