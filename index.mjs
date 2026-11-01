/*
	読み込んだpropertyの足跡を出力するやつ
		Q: メソッドチェーン外でもログが残るけど
			A: 用途はチェーンに限らないし、非同期呼び出し対応のパンくずなのでOK
		Q: symbolやprototype元関数もログが残るけど
			A: 文字列に限らず、参照したプロパティは全部残すのでOK.
*/

/*
	本モジュール返り値
*/
class Breadcrumb extends Function {
	#arr_log = [];
	#callback;

	constructor(callback){
		super();

		this.#callback = typeof callback==='function' ?
			callback:
			(arg)=>{
			   return arg;
			};

		return new Proxy(this, {
			apply: Breadcrumb.#proxy_apply,
			get: Breadcrumb.#proxy_get
		});
	}

	static #proxy_apply(target, thisArg, args){
		const arr_result = target.#arr_log;
		target.#arr_log = [];
    	return target.#callback(arr_result, args);
	}

	static #proxy_get(target, name, receiver){
		target.#arr_log.push(name);
		return receiver;
	}

}

export default Breadcrumb;
