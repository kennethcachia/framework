define(['lib/observers/object-observer'], function (ObjectObserver) {

  describe('ObjectObserver', function () {
    var callback;
    var observer;
    var context;


    beforeEach(function () {
      callback = jasmine.createSpy();

      context = {
        a: 1,
        b: 2,
        c: 3,
        d: {
          x: 4,
          y: 5,
          z: 6
        }
      };

      observer = new ObjectObserver(context);
      observer.on('updated', callback, this);
    });


    afterEach(function (done) {
      observer.destroy();
      done();
    });


    function asyncWrapper(fn) {
      setTimeout(fn, 0);
    }


    it('should fire an updated event when an item on the object is modified', function (done) {
      context.a = 10;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {},
          changed: {
            a: 10
          }
        });

        done();
      });
    });


    it('should not fire an updated event when the same value is assigned', function (done) {
      context.a = 1;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).not.toHaveBeenCalled();
        done();
      });
    });


    it('should fire an updated event when a new item is added to the object', function (done) {
      context.e = 20;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {
            e: 20
          },
          removed: {},
          changed: {}
        });

        done();
      });
    });


    it('should fire an updated event when an item is removed from the object', function (done) {
      delete context.a;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {
            a: undefined
          },
          changed: {}
        });

        done();
      });
    });
  });

});