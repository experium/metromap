module.exports = api => {
    api.cache(true);

    return {
        presets: [
            '@babel/preset-react',
            ['@babel/preset-env', {
                targets: {
                    ie: '11',
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1',
                },
                useBuiltIns: 'usage',
                corejs: '2'
            }]
        ],
        plugins: [
            ['@babel/plugin-transform-runtime', {
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: false
            }],
            ['@babel/plugin-proposal-class-properties', {
                'loose': true
            }],
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-transform-arrow-functions',
            '@babel/plugin-transform-spread',
            '@babel/plugin-transform-classes',
        ]
    }
}
