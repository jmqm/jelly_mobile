module.exports = function(api) {
    api.cache(true); // same as api.cache.forever();

    return {
        presets: [
            ['babel-preset-expo', {
                // https://www.npmjs.com/package/babel-preset-expo
                jsxRuntime: 'automatic', // jsx transform
                lazyImports: true, // imports are lazy-loaded
                web: { disableImportExportTransform: true } // prevent module.exports
            }
            ],
            '@babel/preset-typescript'],

        plugins: [
            ['module-resolver', {
                root: ['./'],
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                alias: {
                    src: './src'
                }
            }]
        ],

        env: {
            production: {
                plugins: ['react-native-paper/babel']
            }
        }
    };
};
