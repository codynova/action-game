module.exports = {
    "sourceMaps": true,
    "plugins": [ "react-hot-loader/babel" ],
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": "commonjs",
                "useBuiltIns": "entry",
                "corejs": 3
            }
        ],
        [ "@babel/preset-typescript" ],
        [ "@babel/preset-react" ]
    ]
}
