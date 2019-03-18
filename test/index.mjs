/*
	Test
*/

// Mod
import assert from 'assert';
import Breadcrumb from '../';
import json from '../package.json';
console.log(`${json.name} v${json.version}: test`);

// Main
const breadcrumb = new Breadcrumb();

assert.deepEqual(
	breadcrumb(),
	[]
);

assert.deepEqual(
	breadcrumb.foo(),
	['foo']
);

assert.deepEqual(
	breadcrumb.foo.bar(),
	['foo', 'bar']
);

assert.deepEqual(
	breadcrumb.hoge.fuga.piyo(),
	['hoge', 'fuga', 'piyo']
);

const breadcrumb_cb = new Breadcrumb( (arr)=>{
	return arr.join('.');
});
assert.deepEqual(
	breadcrumb_cb.foo.bar(),
	'foo.bar'
);

const breadcrumb_cb_args = new Breadcrumb( (logs, args)=>{
	return [...args, ...logs].join('.');
});
assert.deepEqual(
	breadcrumb_cb_args.Hans.Grete('🍞'),
	'🍞.Hans.Grete'
);
