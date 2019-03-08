# data-struct-lite

data struct for more safe data

## Installation

```
npm i data-struct-lite -S
```

## Usage

```
// in ES5
const struct = require('data-struct-lite');
// in ES6
// import struct,{types} from 'data-struct-lite';

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