
define([

  'core/create'

], function (Create) {

  /**
   * Controller
   */
  var Controller = Create('Controller', {

    initializer: function () {
      var view = this.get('view');

      view.on('appendedView', this.updateModel, this);
      view.on('childDataChange', this.updateModel, this);
    },


    destructor: function () {
      var model = this.get('model');
      var view = this.get('view');

      view.destroy();
      model.destroy();
    },


    updateModel: function () {
      // TODO: convert to event
      console.log('This is an abstract method - updateModel');
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
