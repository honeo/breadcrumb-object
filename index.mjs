/*
	読み込んだpropertyの足跡を出力するやつ
*/

// Var
const weakmap = new WeakMap(); // {instance: {...}}


/*
	本モジュール返り値
*/
class Breadcrumb extends Function {
	constructor(callback){
		super();

		weakmap.set(this, {
			arr_log: [],
			callback
		});

		return new Proxy(this, {
			apply: proxy_apply,
			get: proxy_get
		});
	}
}

function proxy_apply(target, thisArg, args){
	const {arr_log, callback} = weakmap.get(target);
	weakmap.set(target, {
		callback,
		arr_log: []
	});
	return typeof callback==='function' ?
		callback(arr_log, args):
		arr_log;
}
function proxy_get(target, name, proxy){
	const {arr_log, callback} = weakmap.get(target);
	weakmap.set(target, {
		arr_log: [...arr_log, name],
		callback
	});
	return proxy;
}


export default Breadcrumb;
