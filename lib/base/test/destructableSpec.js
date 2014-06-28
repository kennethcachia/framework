define(['lib/base/destructable'], function (Destructable) {

  describe('Destructable', function () {
    it('should throw an error if destructor is not implemented', function () {
      var d = new Destructable();

      expect(function () {
        d.destroy();
      }).toThrowError('destructor() not implemented');
    });

    it('should call destructor() and mark itself as destroyed when destroy is called', function () {
      var d = new Destructable();
      d.destructor = jasmine.createSpy();

      expect(d.isDestroyed).toBeFalsy();

      d.destroy();

      expect(d.isDestroyed).toBeTruthy();
      expect(d.destructor).toHaveBeenCalled();
    });

    it('should only destroy itself once', function () {
      var d = new Destructable();
      d.destructor = jasmine.createSpy();

      d.destroy();
      d.destroy();
      d.destroy();

      expect(d.destructor.calls.count()).toEqual(1);
    });

    it('should throw an error when addObjectToDestroy is called with a non-Destructable object', function () {
      var d = new Destructable();
      var e = new Destructable();
      var f = new function () {};

      d.destructor = function () {};
      e.destructor = function () {};

      expect(function () {
        d.addObjectToDestroy(e);
      }).not.toThrowError();

      expect(function () {
        d.addObjectToDestroy(f);
      }).toThrowError('Incorrect type');
    });

    it('should add an object to the internal array when addObjectToDestroy is called', function () {
      var d = new Destructable();
      var e = new Destructable();

      expect(d._objectsToDestroy.length).toEqual(0);
      d.addObjectToDestroy(e);
      expect(d._objectsToDestroy.length).toEqual(1);
    });

    it('should also destroy all associated objects when destroy is called', function () {
      var d = new Destructable();
      var e = new Destructable();

      d.destructor = function () {};
      e.destructor = function () {};

      d.addObjectToDestroy(e);
      d.destroy();

      expect(d.isDestroyed).toBeTruthy();
      expect(e.isDestroyed).toBeTruthy();
    });
  });

});