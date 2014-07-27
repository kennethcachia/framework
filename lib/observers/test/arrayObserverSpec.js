define(['lib/observers/array-observer'], function (ArrayObserver) {

  describe('ArrayObserver', function () {
    var callback;
    var observer;
    var context;


    beforeEach(function () {
      callback = jasmine.createSpy();
      context = [20, 30, 40, 50, 60];

      observer = new ArrayObserver(context);
      observer.on('updated', callback, this);
    });


    afterEach(function (done) {
      observer.destroy();
      done();
    });


    function asyncWrapper(fn) {
      setTimeout(fn, 0);
    }


    it('should fire an updated event when an item in the array is modified', function (done) {
      context[0] = 10;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {},
          changed: {
            0: 10
          }
        });

        done();
      });
    });


    it('should process multiple changes', function (done) {
      context[3] = 200;
      context[4] = 300;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {},
          changed: {
            3: 200,
            4: 300
          }
        });

        done();
      });
    });


    it('should process multiple changes', function (done) {
      context[3] = 200;
      context[4] = 300;
      context.push(600);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {
            5: 600
          },
          removed: {},
          changed: {
            3: 200,
            4: 300
          }
        });

        done();
      });
    });


    it('should process multiple changes', function (done) {
      context[0] = 200;
      context[1] = 300;
      context.push(500);
      context.splice(2, 1);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {
            4: 500,
          },
          removed: {
            2: undefined
          },
          changed: {
            0: 200,
            1: 300
          }
        });

        done();
      });
    });


    it('should process multiple changes', function (done) {
      context.splice(1, 2);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {
            1: undefined,
            2: undefined
          },
          changed: {}
        });

        done();
      });
    });


    it('should process multiple changes', function (done) {
      context.unshift(200);
      context.splice(1, 2);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {
            1: undefined
          },
          changed: {
            0: 200
          }
        });

        done();
      });
    });


    it('should process multiple changes', function (done) {
      context.splice(1, 2);
      context.unshift(200);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {
            0: 200
          },
          removed: {
            2: undefined,
            3: undefined
          },
          changed: {}
        });

        done();
      });
    });


    it('should not fire an updated event when the same value is assigned', function (done) {
      context[0] = 20;
      observer.sync();

      asyncWrapper(function () {
        expect(callback).not.toHaveBeenCalled();
        done();
      });
    });


    it('should fire an updated event when a new item is pushed to the array', function (done) {
      context.push(100);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {
            5: 100
          },
          removed: {},
          changed: {}
        });

        done();
      });
    });


    it('should fire an updated event when an item is popped from the array', function (done) {
      context.pop();
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {
            4: undefined
          },
          changed: {}
        });

        done();
      });
    });


    it('should fire an updated event after an unshift()', function (done) {
      context.unshift(1);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {
            0: 1
          },
          removed: {},
          changed: {}
        });

        done();
      });
    });


    it('should fire an updated event after a shift()', function (done) {
      context.shift();
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {
            0: undefined
          },
          changed: {}
        });

        done();
      });
    });


    it('should fire an updated event when an item is spliced from the array', function (done) {
      context.splice(2, 1);
      observer.sync();

      asyncWrapper(function () {
        expect(callback).toHaveBeenCalledWith({
          added: {},
          removed: {
            2: undefined
          },
          changed: {}
        });

        done();
      });
    });
  });

});