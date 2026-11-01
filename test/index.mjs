/*
	Test
*/

// Mod
import assert from 'assert';
import Breadcrumb from '../index.mjs';

// Main
const breadcrumb = new Breadcrumb();

assert.deepEqual(
	breadcrumb(),
	[]
);

// 基本
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


// callback
{
	const breadcrumb_cb = new Breadcrumb( (arr)=>{
		return arr.join('.');
	});
	assert.deepEqual(
		breadcrumb_cb.foo.bar(),
		'foo.bar'
	);
}

// callback(arg)
{
	const breadcrumb_cb_args = new Breadcrumb( (logs, args)=>{
		return [...logs, ...args].join('.');
	});
	assert.deepEqual(
		breadcrumb_cb_args.Hans.Grete('🍞'),
		'Hans.Grete.🍞'
	);
}

// Symbol
{
	const breadcrumb_symbol = new Breadcrumb();
	const symbol_value = breadcrumb_symbol[Symbol.iterator];
	assert.strictEqual(
		symbol_value,
		breadcrumb_symbol
	);
	assert.deepEqual(
		breadcrumb_symbol(),
		[Symbol.iterator]
	);
}

// 既存プロパティ
{
	const breadcrumb_existing = new Breadcrumb();
	const existing_value = breadcrumb_existing.toString;
	assert.strictEqual(
		existing_value,
		breadcrumb_existing
	);
	assert.deepEqual(
		breadcrumb_existing(),
		['toString']
	);
}

// 自前プロパティ
{
	const breadcrumb_own = new Breadcrumb();
	breadcrumb_own.foo = 1;
	const own_value = breadcrumb_own.foo;
	assert.strictEqual(
		own_value,
		breadcrumb_own
	);
	assert.deepEqual(
		breadcrumb_own(),
		['foo']
	);
}
