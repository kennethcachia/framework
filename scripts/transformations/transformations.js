
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
      for (var e = 0; e < this._events.length; e++) {
        this._events[e].destroy();
      }
    },


    _render: function () {
      var crosshair = this.get('crosshair');
      this._body.appendChild(crosshair);
    },


    _bindEvents: function (nodeElement) {
      var targets = this.get('targets');

      this._events = [];

      this._events.push(this._body.addDOMEvent({
        matchClass: targets,
        eventName: 'mousedown',
        callback: '_onTargetMouseDown',
        context: this
      }));

      this._events.push(this._body.addDOMEvent({
        eventName: 'mouseup',
        callback: '_onTargetMouseUp',
        context: this
      }));

      // mousedown should still work when
      // crosshair is on top of a target
      var crosshair = this.get('crosshair');

      crosshair.addDOMEvent({
        eventName: 'mousedown',
        callback: '_onTargetMouseDown',
        context: this
      });
    },


    _registerMouseMove: function () {
      this._mouseMoveEvent = this._body.addDOMEvent({
        eventName: 'mousemove',
        callback: '_onTargetMouseMove',
        context: this
      });
    },


    _destroyMouseMove: function () {
      this._mouseMoveEvent.destroy();
    },


    _activateCrosshair: function (e) {
      var crosshair = this.get('crosshair');
      crosshair.activate(e.target);

      this.fire('active', {
        target: e.target
      });
    },


    _getPos: function () {
      var fn = this.get('getPos');
      return fn.call(this, this._isActive);
    },


    _setPos: function (x, y) {
      var fn = this.get('setPos');
      fn.call(this, this._isActive, x, y);
    },


    _onTargetMouseDown: function (e) {
      if (!this._isActive) {
        this._isActive = e.target;
        this._registerMouseMove();

        var coords = this._getPos();

        this._offset = {
          x: e.layerX - coords.x,
          y: e.layerY - coords.y
        };

        this._activateCrosshair(e);
        console.log('down');
      }
    },


    _onTargetMouseUp: function () {
      if (this._isActive) {
        this._isActive = null;
        this._destroyMouseMove();
        console.log('up');
      }
    },


    _onTargetMouseMove: function (e) {
      var crosshair = this.get('crosshair');

      if (this._isActive === e.target) {
        console.log('move');
        var x = e.layerX - this._offset.x;
        var y = e.layerY - this._offset.y;

        this._setPos(x, y);
        crosshair.setBoundary(this._isActive);
      }
    },


    _attrs: {
      targets: null,
      crosshair: new Crosshair(),

      getPos: function (element) {
        return {
          x: element.getStyle('left'),
          y: element.getStyle('top')
        };
      },

      setPos: function (element, x, y) {
        element.setStyle('left', x + 'px');
        element.setStyle('top', y + 'px');
      }
    }

  });


  return Transformations;

});
