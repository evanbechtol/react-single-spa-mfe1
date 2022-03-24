const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
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

  const externals = [/^rxjs\/?.*$/];

  if (webpackConfigEnv.standalone) {
    externals.push("react", "react-dom");
  }

  return merge(defaultConfig, {
    // customizations go here
    externals,
    plugins: [
      new HtmlWebpackPlugin(),

      new StandaloneSingleSpaPlugin({
        // required
        appOrParcelName: "mfe1",

        // optional - strongly encouraged for single-spa applications
        activeWhen: ["/route-prefix"],

        // optional - useful for enabling cross-microfrontend imports
        importMapUrl: new URL(
          "https://react.microfrontends.app/importmap.json"
        ),

        // optional - the standalone plugin relies on optionalDependencies in the
        // package.json. If this doesn't work for you, pass in your HtmlWebpackPlugin
        // to ensure the correct one is being referenced
        HtmlWebpackPlugin,

        // optional - defaults to true - turns on or off import-map-overrides.
        importMapOverrides: true,

        // optional - defaults to null. This allows you to hide the import-map-overrides UI
        // unless a local storage key is set. See more info at https://github.com/joeldenning/import-map-overrides/blob/master/docs/ui.md#enabling-the-ui
        importMapOverridesLocalStorageKey: null,

        // optional - defaults to {}. The single-spa custom props passed to the application
        // Note that these props are stringified into the HTML file
        customProps: {
          authToken: "sadf7889fds8u70df9s8fsd",
        },

        // optional - defaults to turning urlRerouteOnly on
        // The options object passed into single-spa's start() function.
        // See https://single-spa.js.org/docs/api#start
        startOptions: {
          urlRerouteOnly: true,
        },
      }),
    ],
  });
};
