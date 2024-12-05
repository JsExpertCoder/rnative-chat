module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@utils": "./src/utils",
            "@assets": "./src/assets",
            "@services": "./src/services",
            "@tempStore": "./src/store/temp",
            "@components": "./src/components",
            "@persistentStore": "./src/store/persist",
          },
        },
      ],
    ],
  };
};
