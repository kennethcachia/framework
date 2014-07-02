define(['lib/base/object-observer'], function (ObjectObserver) {

  describe('ObjectObserver', function () {
    var observer;
    var callback;
    var o;

    beforeEach(function () {
      o = {
        a: 1,
        b: 2,
        _c: 3
      };

      callback = jasmine.createSpy();

      observer = new ObjectObserver(o);
      observer.on('updated', callback);
    });


    it('should fire an event after an update', function () {
      o.a = 100;
      observer.sync();
      expect(callback).toHaveBeenCalled();

      o.x = 50;
      observer.sync();
      expect(callback).toHaveBeenCalled();

      delete o.x;
      observer.sync();
      expect(callback).toHaveBeenCalled();
    });


    it('should not fire an update event when the value does not change', function () {
      o.a = 1;
      observer.sync();
      expect(callback).not.toHaveBeenCalled();
    });


    it('should not fire an update event when a private property is updated', function () {
      o._c = 5;
      observer.sync();
      expect(callback).not.toHaveBeenCalled();

      o._d = 4;
      observer.sync();
      expect(callback).not.toHaveBeenCalled();

      delete o._c;
      observer.sync();
      expect(callback).not.toHaveBeenCalled();
    });

    it('should do a local sync when sync() is called', function () {
      var observer2 = new ObjectObserver(o);
      var callback2 = jasmine.createSpy();

      observer2.on('updated', callback2);

      o.a = 100;
      observer.sync();
      expect(callback).toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });


    it('should do a global sync when globalSync() is called', function () {
      var observer2 = new ObjectObserver(o);
      var callback2 = jasmine.createSpy();

      observer2.on('updated', callback2);

      o.a = 100;
      observer.globalSync();
      expect(callback).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

});