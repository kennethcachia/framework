define([

  'lib/base/abstract-destructable',
  'lib/base/inherit'

], function (AbstractDestructable, Inherit) {

  describe('AbstractDestructable', function () {
    var D;

    beforeEach(function () {
      D = function () {
        D.superClass.call(this);
      };

      Inherit(D, AbstractDestructable);
      D.prototype.destructor = jasmine.createSpy();
    });

    it('should throw an error if destructor is not implemented', function () {
      function A() {
        A.superClass.call(this);
      };
      Inherit(A, AbstractDestructable);

      var a = new A();

      expect(function () {
        a.destroy();
      }).toThrowError('destructor() not implemented');
    });

    it('should call destructor() and mark itself as destroyed when destroy is called', function () {
      var d = new D();

      expect(d._isDestroyed).toBeFalsy();

      d.destroy();

      expect(d._isDestroyed).toBeTruthy();
      expect(d.destructor).toHaveBeenCalled();
    });

    it('should only destroy itself once', function () {
      var d = new D();

      d.destroy();
      d.destroy();
      d.destroy();

      expect(d.destructor.calls.count()).toEqual(1);
    });

    it('should throw an error when addObjectToDestroy is called with a non-Destructable object', function () {
      var d = new D();
      var e = new D();
      var f = new function () {};

      expect(function () {
        d.addObjectToDestroy(e);
      }).not.toThrowError();

      expect(function () {
        d.addObjectToDestroy(f);
      }).toThrowError('Incorrect type');
    });

    it('should add an object to the internal array when addObjectToDestroy is called', function () {
      var d = new D();
      var e = new D();

      expect(d._objectsToDestroy.length).toEqual(0);
      d.addObjectToDestroy(e);
      expect(d._objectsToDestroy.length).toEqual(1);
    });

    it('should also destroy all associated objects when destroy is called', function () {
      var d = new D();
      var e = new D();

      d.addObjectToDestroy(e);
      d.destroy();

      expect(d._isDestroyed).toBeTruthy();
      expect(e._isDestroyed).toBeTruthy();
    });
  });

});