# ContextBuilder

This helps you to build DOM test environment without browser nor global pollution.


## INSTALL

```
npm install context_builder
```

## HOW TO USE


```coffee
{ContextBuilder} = require 'context_builder'

env = new ContextBuilder
  html: "<span id='item'> item </span>"
  scripts: [
    "jquery.js"
  ]

env.build ->
  env.run ->
    # you can touch browser object like on browser
    $('#item').text() #=> item

  window? #=> false
  env.ctx.window? #=> true

```


## Test Example

TestRunner is tuned for Mocha BDD Style.

```coffee
TestEnv = require '../../src/test_env'
ck = require 'coffeekup' # npm install coffeekup

settings =
  root: __dirname
  html: ck.render ->
    div id:'hoge', -> 'div'
  scripts: [
    "lib/jquery.js"
    "lib/underscore.js"
    "lib/backbone.js"
  ]

env = new TestEnv settings
{_do, _async} = env

describe 'hoge', ->
  beforeEach (done)->
    env.build done

  it 'should have id hoge', _do ->
    ok $('#hoge').size() is  1

  it 'should have id hoge', _async ->
    ok $('#hoge').size() is  1
    setTimeout done, 100

```


```
$ mocha --compilers coffee:coffee-script --ignore-leaks test.coffee
```


"_do" and "_async" wrap contextify. In lambda after that, you can code like on browser.


## TODO

- change implicit done on _async
- wrap describe and it
