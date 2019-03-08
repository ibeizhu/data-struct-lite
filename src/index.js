/**
 * Created by beizhu on 2019/3/8.
 */

const is = type => {
  return function(o) {
    return (
      Object.prototype.toString.call(o).toLowerCase() === `[object ${type}]`
    );
  };
};

/**
 * types
 * @type {{string: string, number: string, boolean: string, object: string, array: string}}
 */
export const types = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  object: 'object',
  array: 'array',
};

/**
 * default value
 * @param type
 * @return {*}
 */
const getDefaultVal = type => {
  let val;
  switch (type) {
    case types.string: {
      val = '';
      break;
    }
    case types.number:
    case types.boolean: {
      // don't provide default val for number boolean types
      break;
    }
    case types.object: {
      val = {};
      break;
    }
    case types.array: {
      val = [];
      break;
    }
  }
  return val;
};

export default function struct(scheme = {}) {
  // check struct scheme
  Object.keys(scheme).forEach(key => {
    const defineType = scheme[key];
    if (!types[defineType]) {
      throw new Error(`the key '${key}' that in struct scheme is error`);
    }
  });

  return function(data = {}) {
    let protectData = {};
    Object.keys(data).forEach(key => {
      if (!scheme[key]) {
        console.error(
          `the struct scheme didn't define the key '${key}' that 'data' provided`
        );
        protectData[key] = data[key];
      }
    });

    Object.keys(scheme).forEach(key => {
      const defineType = scheme[key];
      let currentValue = data[key];
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
