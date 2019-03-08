# data-struct

data struct for more safe data

## Installation

```
npm i @fm/data-struct -S
```

## Usage

```
// in ES5
const struct = require('@fm/data-struct');
// in ES6
// import struct,{types} from '@fm/data-struct';

const CarStruct = struct({
  id: types.number,
  name: types.string,
  flag: types.boolean,
  info: types.object,
  list: types.array,
});

const car = CarStruct({
 id: 1,
 flag: false,
});

console.log(car);
// id: 1,
// flag: false,
// name: '',
// info: {},
// list: [],
  
```