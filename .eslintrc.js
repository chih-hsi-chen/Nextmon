module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:jsx-a11y/recommended"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/display-name": "warn",
        "react/jsx-no-undef": ["warn", { "allowGlobals": true }],
        "jsx-a11y/anchor-is-valid": [
            "warn",
            {
              "components": [
                "Link"
              ],
              "specialLink": [
                "hrefLeft",
                "hrefRight"
              ],
              "aspects": [
                "invalidHref",
                "preferButton"
              ]
            }
          ],
          "jsx-a11y/click-events-have-key-events": "off",
          "react/prop-types": "off",
          "react/jsx-props-no-spreading": "off"
    },
    "plugins": [],
    "globals": {
        // NextJs does not require you to import React into each component. so suppress errors for missing 'import React' in files.
        "React": "writable",
    }
};