
define([

  'lib/base/create',
  'lib/mv/parent-view'

], function (Create, ParentView) {

  /**
   * SyncView
   */
  var SyncView = Create('SyncView', {

    // Override
    _render: function () {
      this.fire('loading');
      this._addLoadingClass();
      this._initModel();
    },


    _addLoadingClass: function () {
      var container = this.get('container');
      var loadingClass = this.get('loadingClass');

      container.addClass(loadingClass);
    },


    _removeLoadingClass: function () {
      var container = this.get('container');
      var loadingClass = this.get('loadingClass');

      container.removeClass(loadingClass);
    },


    _initModel: function () {
      var model = this.get('model');

      model.load(this._onModelLoad.bind(this));
    },


    _onModelLoad: function () {
      // Check if the view was destroyed while
      // the model was still loading.
      if (!this._destroyed) {
        this.fire('modelLoaded');

        SyncView.super._render.call(this);

        this._removeLoadingClass();
        this.fire('ready');
      }
    },


    _attrs: {
      model: {
        value: null,

        default: function () {
          throw new Error('Missing model');
        }
      },

      loadingClass: {
        value: 'sync-view--loading'
      }
    }

  }, ParentView);


  return SyncView;

});
