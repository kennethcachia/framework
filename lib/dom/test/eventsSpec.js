define([

  'lib/dom/events',
  'lib/dom/node',
  'lib/base/test/fixtures',
  'lib/base/test/events'

], function (DOMEvents, DOMNode, Fixtures, Events) {

  describe('Events', function () {
    var fixture;

    var clickEvent = Events.createClickEvent();
    var downEvent = Events.createMouseDownEvent();

    beforeEach(function () {
      fixture = Fixtures.create();
      fixture.innerHTML = '<p></p>';
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should invoke the callback when a DOM event is fired and passes a DOMNode created with the event\'s target', function () {
      var d = new DOMNode('.fixture');
      var e = new DOMEvents(d);
      var callback = jasmine.createSpy();

      e.add('click', callback, this);
      expect(e._listeners.length).toEqual(1);

      d._node.dispatchEvent(clickEvent);
      expect(callback).toHaveBeenCalledWith(d, jasmine.any(Event));
    });


    it('should execute the callback only when the className matches if a selector is supplied', function () {
      var d = new DOMNode('.fixture');
      var e = new DOMEvents(d);
      var callback = jasmine.createSpy();

      e.add('click', callback, this, 'p');

      d._node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(0);

      d.one('p')._node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(1);
    });


    it('should register multiple events when an array is passed', function () {
      var d = new DOMNode('.fixture');
      var e = new DOMEvents(d);
      var callback = jasmine.createSpy();

      e.add(['click', 'mousedown'], callback, this);

      d._node.dispatchEvent(clickEvent);
      d._node.dispatchEvent(downEvent);
      expect(callback.calls.count()).toEqual(2);
    });


    it('should capture bubbling events', function () {
      var d = new DOMNode('.fixture');
      var p = d.one('p');

      var e = new DOMEvents(d);
      var callbackWrapper = jasmine.createSpy();
      var callbackInner = jasmine.createSpy();

      e.add('click', callbackWrapper, this);
      e.add('click', callbackInner, this, 'p');

      d._node.dispatchEvent(clickEvent);
      expect(callbackWrapper.calls.count()).toEqual(1);
      expect(callbackInner.calls.count()).toEqual(0);

      d.one('p')._node.dispatchEvent(clickEvent);
      expect(callbackWrapper.calls.count()).toEqual(2);
      expect(callbackInner.calls.count()).toEqual(1);

      expect(callbackWrapper).toHaveBeenCalledWith(d, jasmine.any(Event));
      expect(callbackInner).toHaveBeenCalledWith(p, jasmine.any(Event));
    });


    it('should detach all the callback functions when purge() is used', function () {
      var d = new DOMNode('.fixture');
      var e = new DOMEvents(d);
      var callback = jasmine.createSpy();

      e.add('click', callback, this);

      d._node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(1);

      e.purge();
      expect(e._listeners.length).toEqual(0);

      d._node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(1);
    });


    it('should purge the listeners when destroyed', function () {
      var d = new DOMNode('.fixture');
      var e = new DOMEvents(d);
      var callback = jasmine.createSpy();

      e.add('click', callback, this);

      d._node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(1);

      e.destroy();
      expect(e._listeners).toBeNull();

      d._node.dispatchEvent(clickEvent);
      expect(callback.calls.count()).toEqual(1);
    });
  });

});