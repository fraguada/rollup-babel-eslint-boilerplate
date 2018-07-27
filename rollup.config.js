import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import pkg from './package.json';

export default [
  /* {
  input: 'src/main.js',
  output: {
    file: 'build/js/main.min.js',
    format: 'iife', 
    sourceMap: 'inline',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.SERVE != undefined && serve({
      port: 11112,
      contentBase: 'build',
    })),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
}, */

// browser-friendly UMD build
{
  input: 'src/main.js',
  output:{
    file: pkg.browser,
    format: 'umd',
    name: 'howLongUntilLunch'
  },
  plugins: [
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    eslint(),
    babel({
      exclude: ['node_modules/**']
    })
  ]
},

// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		input: 'src/main.js',
		external: [],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
      eslint(),
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
