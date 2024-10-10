module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  };


// for installing the jest and testing lib
//   1)npm i -D @testing-library/react
//   2)npm i -D jest
//   3)npm install --save-dev babel-jest @babel/core @babel/preset-env
//   4) maked : babel.config.js in it - 
//   module.exports = {
//     presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
//   };
//   5) maked : .parcelrc in it -
//   {
//     "extends": "@parcel/config-default",
//     "transformers": {
//       "*.{js,mjs,jsx,cjs,ts,tsx}": [
//         "@parcel/transformer-js",
//         "@parcel/transformer-react-refresh-wrap"
//       ]
//     }
//   }