
define([

  'core/create',
  'core/node-element',
  'transformations/crosshair'

], function (Create, NodeElement, Crosshair) {

  /**
   * Transformations
   */
  var Transformations = Create('Transformations', {

    initializer: function () {
      this._body = new NodeElement();
      this._body.fromNode(document.body);

      this._render();
      this._bindEvents();
    },


    destructor: function () {
      this._bodyClickEvent.destroy();
    },


    _render: function () {
      var crosshair = this.get('crosshair');
      this._body.appendChild(crosshair);
    },


    _bindEvents: function (nodeElement) {
      var targets = this.get('targets');

      this._bodyClickEvent = this._body.addDOMEvent({
        matchClass: targets,
        eventName: 'click',
        callback: '_onTargetClick',
        context: this
      });
    },


    _onTargetClick: function (e) {
      var crosshair = this.get('crosshair');

      crosshair.activate(e.target);

      this.fire('active', {
        target: e.target
      });
    },


    _attrs: {
      targets: null,
      crosshair: new Crosshair()
    }

  });


  return Transformations;

});
