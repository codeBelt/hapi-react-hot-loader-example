module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-apply': {},
        'postcss-cssnext': {
            browsers: ['last 2 versions'],
        },
        'cssnano': {
            autoprefixer: false,
            discardComments: {
                removeAll: true,
            },
        },
    },
};
