define(['lib/events/eventable'], function (Eventable) {

  describe('Eventable', function () {
    it('should not throw an error when just calling fire()', function () {
      var a = new Eventable();
      a.fire('test');
    });

    it('should invoke all the callback functions when fire() is called', function () {
      var a = new Eventable();
      var b = new Eventable();

      var callbackA = jasmine.createSpy();
      var callbackB = jasmine.createSpy();
      var callbackC = jasmine.createSpy();

      a.on('eventA', callbackA);
      a.on('eventA', callbackB);

      b.on('eventB', callbackB);
      b.on('eventB', callbackC);

      a.fire('eventA');

      expect(callbackA.calls.count()).toEqual(1);

      a.fire('eventA');
      b.fire('eventB');

      expect(callbackA.calls.count()).toEqual(2);
      expect(callbackB.calls.count()).toEqual(3);
      expect(callbackC.calls.count()).toEqual(1);
    });

    it('should apply the correct context to a callback function', function () {
      var e = new Eventable();

      function A() {
        e.on('event', function () {
          this.x += 10;
        });

        e.on('event', function () {
          this.y += 100;
        }, this);
      }

      A.prototype.x = 10;
      A.prototype.y = 100;

      var a = new A();

      e.fire('event');

      expect(a.x).toEqual(10);
      expect(a.y).toEqual(200);
    });

    it('should not call the callback after an off()', function () {
      var e = new Eventable();
      var callback = jasmine.createSpy();

      e.on('event', callback);
      e.fire('event');
      e.off('event', callback, null);
      e.fire('event');

      expect(callback.calls.count()).toEqual(1);
    });

    it('should invoke callbacks added using before(), on() and after() in the correct order', function () {
      var order = [];

      var callbackA = function () { order.push('A'); };
      var callbackB = function () { order.push('B'); };
      var callbackC = function () { order.push('C'); };
      var callbackD = function () { order.push('D'); };

      var e = new Eventable();

      e.on('event', callbackB);
      e.after('event', callbackC);
      e.before('event', callbackD);
      e.on('event', callbackA);

      e.fire('event');

      expect(order).toEqual(['D', 'B', 'A', 'C']);
    });

    it('should allow the removal of callbacks added using before() or after()', function () {
      var callbackA = function () {};
      var callbackB = function () {};

      var e = new Eventable();

      e.before('event', callbackA);
      e.after('event', callbackB);

      expect(e._listeners._callbacks[e.BEFORE + 'event']).not.toBeUndefined();
      expect(e._listeners._callbacks[e.AFTER + 'event']).not.toBeUndefined();

      expect(function () {
        e.off('event', callbackA, null, '..');
      }).toThrowError('Incorrect type');

      e.off('event', callbackA, null, e.BEFORE);
      e.off('event', callbackB, null, e.AFTER);

      expect(e._listeners._callbacks[e.BEFORE + 'event']).toBeUndefined();
      expect(e._listeners._callbacks[e.AFTER + 'event']).toBeUndefined();
    });
  });

});