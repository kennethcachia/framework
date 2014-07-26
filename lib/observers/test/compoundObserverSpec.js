define(['lib/observers/compound-observer'], function (CompoundObserver) {

  describe('CompoundObserver', function () {
    var callback;
    var observer;
    var context;


    beforeEach(function () {
      callback = jasmine.createSpy();

      context = {
        a: 1,
        b: 2,
        c: 3,
        d: [1, 2, 3, 4, 5],
        e: {
          x: 10,
          y: 20,
          z: 30
        },
        f: [{x: 1}, {y: 2}, {z: 3}],
        g: {
          x: [1, 2, 3]
        }
      };

      observer = new CompoundObserver(context);
      observer.on('updated', callback, this);
    });


    afterEach(function (done) {
      observer.destroy();
      done();
    });


    function asyncWrapper(fn) {
      setTimeout(fn, 0);
    }


    it('should fire an updated event when a top level value is udpated', function (done) {
      context.a = 100;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalled();
        done();
      });
    });


    it('should fire an updated event when an item on an internal array changes', function (done) {
      context.d[0] = 100;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalled();
        done();
      });
    });


    it('should fire an updated event when an item on an internal object changes', function (done) {
      context.e.x = 100;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalled();
        done();
      });
    });


    it('should fire an updated event when an item on an object within an internal array changes', function (done) {
      context.f[0].x = 100;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalled();
        done();
      });
    });


    it('should fire an updated event when an item within an array on an internal object changes', function (done) {
      context.g.x[0] = 100;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalled();
        done();
      });
    });


    it('should fire an updated event when a new object is added to an inner array and then modified', function (done) {
      context.f.push({ a: 100 });
      observer.sync();

      asyncWrapper(function () {
        expect(callback.calls.count()).toEqual(1);

        context.f[3].a = 200;
        observer.sync();

        asyncWrapper(function () {
          expect(callback.calls.count()).toEqual(2);
          done();
        });
      });
    });


    it('should fire an updated event when a new array is added to an object and then modified', function (done) {
      context.z = [{ x: 500 }];
      observer.sync();

      asyncWrapper(function () {
        expect(callback.calls.count()).toEqual(1);

        context.z[0].x = 10;
        observer.sync();

        asyncWrapper(function () {
          expect(callback.calls.count()).toEqual(2);
          done();
        });
      });
    });


    it('should fire an updated event when a value is replaced by an array and then modified', function (done) {
      context.a = [10, 20, 30];
      observer.sync();

      asyncWrapper(function () {
        expect(callback.calls.count()).toEqual(1);

        context.a[0] = 100;
        observer.sync();

        asyncWrapper(function () {
          expect(callback.calls.count()).toEqual(2);
          done();
        });
      });
    });


    it('should fire an updated event when a value is replaced by an object and then modified', function (done) {
      context.a = {x: 20};
      observer.sync();

      asyncWrapper(function () {
        expect(callback.calls.count()).toEqual(1);

        context.a.x = 200;
        observer.sync();

        asyncWrapper(function () {
          expect(callback.calls.count()).toEqual(2);
          done();
        });
      });
    });
  });

});