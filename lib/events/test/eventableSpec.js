define(['lib/events/eventable'], function (Eventable) {

  describe('Eventable', function () {
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
  });

});