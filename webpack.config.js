const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "my-react-mf";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "mfe1",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const standalonePlugin = defaultConfig.plugins.find(
    (p) => p.constructor.name === "StandaloneSingleSpaPlugin"
  );

  standalonePlugin.options.importMapUrl = new URL(
    "https://react.microfrontends.app/importmap.json"
  );

  const externals = [/^rxjs\/?.*$/];

  if (webpackConfigEnv.standalone) {
    externals.push("react", "react-dom");
  }

  return merge(defaultConfig, {
    // customizations go here
    externals,
  });
};
