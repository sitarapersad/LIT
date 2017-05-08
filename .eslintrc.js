module.exports = {
    "env": {
        "es6": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
    },
    "rules": {
        "indent": ["error", "tab", { "SwitchCase": 1, "ObjectExpression": "first" }],
        "linebreak-style": ["error", "unix"],
        "no-undef": "off",
        "padded-blocks": ["warn", "never"],
        "quotes": ["error", "double", "avoid-escape"],
        "semi": ["error","always"],
        "space-before-blocks": ["warn", "always"],
        "space-before-function-paren": ["warn", {
               "anonymous": "always",
               "named": "never",
               "asyncArrow": "ignore"
           }],
        "space-infix-ops": "warn",
    }
};
