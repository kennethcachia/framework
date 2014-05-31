
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
      this._addLoadingState();
      this._initModel();
    },


    _addLoadingState: function () {
      var container = this.get('container');
      var loadingClass = this.get('loadingClass');

      container.addClass(loadingClass);
    },


    _removeLoadingState: function () {
      var container = this.get('container');
      var loadingClass = this.get('loadingClass');

      container.removeClass(loadingClass);
    },


    _initModel: function () {
      var model = this.get('model');

      model.load(this._onModelLoad.bind(this));
    },


    _onModelLoad: function () {
      SyncView.super._render.call(this);

      this._removeLoadingState();
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
