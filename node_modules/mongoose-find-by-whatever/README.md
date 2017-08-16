# Model.findByWhatever('whatever')

Creates a find query based on the value you are trying to find by. I mostly use use this to add "login with username or password" option. For example `User.findByWhatever(username or email)` would turn into `User.find({username: username})` or `User.find({email: email})` based on some rules you define.

## Install
```
npm install mongoose-find-by-whatever
```

## How to use
Use like any other mongoose plugin and pass an array of rules as the 2nd argument. The order of the rules determines their precedence. A rule can be one of the following:

- `RegExp` to test against value
- `Function` that will get passed the value
- `"ObjectId"` will search by _id
- `"*"` will match anything

```js
var whatevers = [{propertyName: rule}, {propertyName: rule}, ...];
UserSchema.plugin(require('mongoose-find-by-whatever'), [propertyName: rule]);
```

## Example
```js
// Given a User model
var UserSchema = mongoose.Schema({ name: String , email: String });

// define some finder rules
var whatevers = [
  {email: /@/} // Regexp
, {_id: 'ObjectId'} // ObjectId
, {secret: function (value) { return value.indexOf('secret') !== -1; }}
, {name:'*'} // Everything
];

UserSchema.plugin(require('mongoose-find-by-whatever'), whatevers);
User = mongoose.model('User', UserSchema);

User.findByWatever('bob@email.com') // Turns into User.find({email: 'bob@email.com'})
User.findByWatever('52aa38f7bcd27e0200000024') // Turns into User.find({_id: '52aa38f7bcd27e0200000024'})
User.findByWatever('bob') // Turns into User.find({name: 'bob'})
```

## License
[MIT license](http://opensource.org/licenses/MIT).
