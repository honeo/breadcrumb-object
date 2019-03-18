# breadcrumb-object
* [honeo/breadcrumb-object](https://github.com/honeo/breadcrumb-object)  
* [breadcrumb-object](https://www.npmjs.com/package/breadcrumb-object)


## なにこれ
参照したプロパティの履歴を配列で取得するやつ。


## 使い方
```bash
$ npm i breadcrumb-object
```
```js
import Breadcrumb from 'breadcrumb-object';

const breadcrumb = new Breadcrumb();

breadcrumb.foo.bar(); // ["foo", "bar"]
breadcrumb.hoge.fuga.piyo(); // ["hoge", "fuga", "piyo"]


/*
	callback
*/
const breadcrumb = new Breadcrumb( (logs, args)=>{
	return [...logs, ...args].join('.');
});

breadcrumb.Hans.Grete('🍞'); // "Hans.Grete.🍞"
```
