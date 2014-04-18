
define([

  'core/create'

], function (Create) {

  /**
   * Controller
   */
  var Controller = Create('Controller', {

    initializer: function () {
      var view = this.get('view');
      var model = this.get('model');

      if (!model) {
        this.createDefaultModel();
      }

      if (!view) {
        this.createDefaultView();
      }

      view = this.get('view');
      model = this.get('model');

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
