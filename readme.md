# breadcrumb-object
* [honeo/breadcrumb-object](https://github.com/honeo/breadcrumb-object)
* [breadcrumb-object](https://www.npmjs.com/package/breadcrumb-object)


## なにこれ
Proxyを触ってみたくて勢いで作った実験用モジュール。
参照したプロパティの履歴を配列で取得する。


## 使い方
```bash
$ npm i breadcrumb-object
```
```js
import Breadcrumb from 'breadcrumb-object';

const breadcrumb = new Breadcrumb();

breadcrumb.foo.bar(); // ["foo", "bar"]
breadcrumb.hoge.fuga.piyo(); // ["hoge", "fuga", "piyo"]
```

### Callback
```js
const breadcrumb = new Breadcrumb( (logs, args)=>{
	return [...logs, ...args].join('.');
});

breadcrumb.Hans.Grete('🍞'); // "Hans.Grete.🍞"
```

## BreakinｇChange
### v1 => v2
callbackのthisをundefからインスタンスに変更、JS本来の挙動に合わせた。
ESMの先行実装や策定中だった部分を現在の仕様に合わせた。
