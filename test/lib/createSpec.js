
define(['lib/base/create'], function (Create) {

  describe('Create', function () {
    it('should throw an error when name is missing', function () {
      expect(Create).toThrow('No Name');
    });

    it('should add isBaseObject to the object prototype', function () {
      var Obj = Create('Obj', {});
      expect(Obj.prototype.isBaseObject).toBe(true);
    });

    it('should add methods to the object prototype', function () {
      var Obj = Create('Obj', {
        method1: function () {},
        method2: function () {}
      });

      expect(Obj.prototype.method1).toBeDefined();
      expect(Obj.prototype.method2).toBeDefined();
    });

    it('should extend methods from other objects', function () {
      var Base = Create('Base', {
        method1: function () {},
        method2: function () {}
      });

      var Result = Create('Result', {
        method3: function () {}
      }, Base);

      expect(Result.prototype.method1).toBeDefined();
      expect(Result.prototype.method2).toBeDefined();
      expect(Result.prototype.method3).toBeDefined();

      expect(Base.prototype.method3).not.toBeDefined();
    });

    it('should keep a reference to super on an object that\'s being extended', function() {
      var Base = Create('Base', {
        method1: function () {},
        method2: function () {}
      });

      var Result = Create('Result', {
        method1: function () {},
        method3: function () {}
      }, Base);

      expect(Result.super).toBeDefined();
      expect(Result.super.method2).toBeDefined();
    });

    it('should augment the initializers and destructors when extending objects', function () {
      var Base = Create('Base', {
        initializer: function () {},
        destructor: function () {}
      });

      var Result = Create('Result', {
        initializer: function () {},
        destructor: function () {}
      }, Base);

      expect(Result.prototype._initializers.length).toEqual(2);
      expect(Result.prototype._destructors.length).toEqual(2);
    });
  });

});
