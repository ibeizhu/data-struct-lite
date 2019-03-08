(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.library = {}));
}(this, function (exports) { 'use strict';

  /**
   * Created by beizhu on 2019/3/8.
   */

  var is = function is(type) {
    return function (o) {
      return Object.prototype.toString.call(o).toLowerCase() === '[object ' + type + ']';
    };
  };

  /**
   * types
   * @type {{string: string, number: string, boolean: string, object: string, array: string}}
   */
  var types = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    object: 'object',
    array: 'array'
  };

  /**
   * default value
   * @param type
   * @return {*}
   */
  var getDefaultVal = function getDefaultVal(type) {
    var val = void 0;
    switch (type) {
      case types.string:
        {
          val = '';
          break;
        }
      case types.number:
      case types.boolean:
        {
          // don't provide default val for number boolean types
          break;
        }
      case types.object:
        {
          val = {};
          break;
        }
      case types.array:
        {
          val = [];
          break;
        }
    }
    return val;
  };

  function struct() {
    var scheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // check struct scheme
    Object.keys(scheme).forEach(function (key) {
      var defineType = scheme[key];
      if (!types[defineType]) {
        throw new Error('the key \'' + key + '\' that in struct scheme is error');
      }
    });

    return function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var protectData = {};
      Object.keys(data).forEach(function (key) {
        if (!scheme[key]) {
          console.error('the struct scheme didn\'t define the key \'' + key + '\' that \'data\' provided');
          protectData[key] = data[key];
        }
      });

      Object.keys(scheme).forEach(function (key) {
        var defineType = scheme[key];
        var currentValue = data[key];
        if (currentValue !== undefined) {
          if (!is(defineType)(currentValue)) {
            protectData[key] = getDefaultVal(defineType);
          } else {
            protectData[key] = currentValue;
          }
        } else {
          protectData[key] = getDefaultVal(defineType);
        }
      });
      return protectData;
    };
  }

  struct.types = types;

  exports.types = types;
  exports.default = struct;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
