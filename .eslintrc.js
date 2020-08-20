module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-console": 0,
    indent: [2, "tab"],
    "no-tabs": 0,
    "max-len": "off",
    "no-continue": 2,
    camelcase: [2, { ignoreDestructuring: true }],
    "implicit-arrow-linebreak": ["error", "below"],
    "no-param-reassign": ["error", { props: false }],
  },
};
