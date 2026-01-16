/*
	Test
*/

// Mod
import assert from 'assert';
import Breadcrumb from '../index.mjs';
import { readFileSync } from 'fs';

const json = JSON.parse(readFileSync('../package.json', 'utf8'));
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

const symbol = Symbol('test');
assert.deepEqual(
	breadcrumb[symbol](),
	[symbol]
);
