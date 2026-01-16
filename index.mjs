/*
	breadcrumb-object
	- 参照したプロパティの履歴を配列で取得する
*/
export default class Breadcrumb extends Function {
	constructor(callback){
		super();

		// インスタンスごとにログとコールバックを保持
		const weakmap = new WeakMap();
		weakmap.set(this, {
			arr_log: [],
			callback
		});

		// Proxyハンドラ
		const handler = {
			/*
				プロパティアクセス時にログを記録
				- breadcrumb.foo.bar
			*/
			get: (target, name, proxy)=>{
				const {arr_log, callback} = weakmap.get(target);
				weakmap.set(target, {
					arr_log: [...arr_log, name],
					callback
				});
				return proxy;
			},
			/*
				関数呼び出し時にログを返却、またはコールバックを実行
				- breadcrumb.foo.bar()
			*/
			apply: (target, thisArg, args)=>{
				const {arr_log, callback} = weakmap.get(target);

				// ログをリセット
				weakmap.set(target, {
					callback,
					arr_log: []
				});

				// コールバックが指定されていれば実行、なければログ配列を返す
				return typeof callback==='function' ?
					callback(arr_log, args):
					arr_log;
			}
		};

		return new Proxy(this, handler);
	}
}
