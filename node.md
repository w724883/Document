##模块机制

- require

```
require.__defineGetter__      require.__defineSetter__
require.__lookupGetter__      require.__lookupSetter__
require.__proto__             require.constructor
require.hasOwnProperty        require.isPrototypeOf
require.propertyIsEnumerable  require.toLocaleString
require.toString              require.valueOf

require.apply                 require.arguments
require.bind                  require.call
require.caller                require.length
require.name

require.cache                 require.extensions
require.main                  require.prototype
require.resolve
```

- module

```
module.__defineGetter__      module.__defineSetter__
module.__lookupGetter__      module.__lookupSetter__
module.__proto__             module.constructor
module.hasOwnProperty        module.isPrototypeOf
module.propertyIsEnumerable  module.toLocaleString
module.toString              module.valueOf

module._compile              module.load
module.require

module.children              module.exports
module.filename              module.id
module.loaded                module.parent
module.paths
```
