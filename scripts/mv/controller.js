
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

      view.on('childDataChange', this.updateModel, this);
      view.on('dataChange', this.updateModel, this);
    },


    destructor: function () {
      var model = this.get('model');
      var view = this.get('view');

      view.destroy();
      model.destroy();
    },


    updateModel: function () {
      throw 'This is an abstract method - updateModel';
    },


    createDefaultView: function () {
      throw 'This is an abstract method - createDefaultView';
    },


    createDefaultModel: function () {
      throw 'This is an abstract method - createDefaultModel';
    },


    render: function () {
      var view = this.get('view');
      view.render();
    },


    _attrs: {
      view: null,
      model: null
    }

  });


  return Controller;

});
