define(['lib/base/properties'], function (Properties) {

  describe('Mutable Properties', function () {
    var A;
    var a;

    beforeEach(function () {
      A = function () {
        Properties.defineMutableProperty(this, 'prop1', 10);  
      };

      Properties.defineMutableProperty(A.prototype, 'prop2', 20);
      a = new A();
    });


    it('should assign a default value', function () {
      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });


    it('should allow modification', function () {
      a.prop1 = 20;
      a.prop2 = 40;

      expect(a.prop1).toEqual(20);
      expect(a.prop2).toEqual(40);
    });
  });


  describe('Immutable Properties', function () {
    var A;
    var a;

    beforeEach(function () {
      A = function () {
        Properties.defineImmutableProperty(this, 'prop1', 10);
      };

      Properties.defineImmutableProperty(A.prototype, 'prop2', 20);
      a = new A();
    });


    it('should throw an error if an initial value is not defined', function () {
      expect(function () {
        var B = function () {
          Properties.defineImmutableProperty(this, 'prop1');
        };
        new B();
      }).toThrowError();

      expect(function () {
        var B = function () {};
        Properties.defineImmutableProperty(B.prototype, 'prop1');
      }).toThrowError();
    });


    it('should assign a default value', function () {
      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });


    it('should not allow modification', function () {
      a.prop1 = 20;
      a.prop2 = 40;

      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });
  });


  describe('Immutable Accessors', function () {
    var A;
    var a;
    var getter;

    beforeEach(function () {
      getter = function (val) {
        return val;
      };

      A = function () {
        Properties.defineImmutableAccessor(this, 'prop1', 10, getter);
      };

      Properties.defineImmutableAccessor(A.prototype, 'prop2', 20, getter);
      a = new A();
    });


    it('should set an initial value', function () {
      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });


    it('should not allow modification', function () {
      a.prop1 = 100;
      a.prop2 = 200;

      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });
  });


  describe('Mutable Accessors', function () {
    var A;
    var a;
    var getter;
    var setter;

    beforeEach(function () {
      getter = function (val) {
        return val;
      };

      setter = function (val) {
        return val;
      };

      A = function () {
        Properties.defineMutableAccessor(this, 'prop1', 10, getter, setter);
      };

      Properties.defineMutableAccessor(A.prototype, 'prop2', 20, getter, setter);
      a = new A();
    });


    it('should set an initial value', function () {
      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });


    it('should invoke the setter when setting the initial value', function () {
      var getter = jasmine.createSpy();
      var setter = jasmine.createSpy();

      var X = function () {
        Properties.defineMutableAccessor(this, 'prop', 10, getter, setter);
      }

      var x = new X();
      expect(setter.calls.count()).toEqual(1);
    });


    it('should allow modification', function () {
      a.prop1 = 100;
      a.prop2 = 200;

      expect(a.prop1).toEqual(100);
      expect(a.prop2).toEqual(200);
    });


    it('should allow computed values', function () {
      Properties.defineMutableAccessor(A.prototype, 'prop3', 1, function (val) {
        return val + 1;
      }, function (val) {
        return val + 10;
      });

      a = new A();

      expect(a.prop3).toEqual(12);
      a.prop3 = 20;
      expect(a.prop3).toEqual(31);
    });
  });


  describe('Properties', function () {
    it('should create independent properties when they are defined within constructors', function () {
      var A = function () {
        Properties.defineMutableProperty(this, 'prop', {
          a: 1
        });
      };

      var a = new A();
      var b = new A();

      b.prop.a = 100;

      expect(a.prop.a).toEqual(1);
      expect(b.prop.a).toEqual(100);
    });


    it('should create properties that link to each other when they are defined on the prototype', function () {
      var A = function () {};

      Properties.defineMutableProperty(A.prototype, 'prop', {
        a: 1
      });

      var a = new A();
      var b = new A();

      b.prop.a = 100;

      expect(a.prop.a).toEqual(100);
      expect(b.prop.a).toEqual(100);
    })
  });

});