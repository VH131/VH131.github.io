const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  // Determine if the build mode is "production".
  const isProduction = argv.mode === "production";

  return {
    // Use the mode passed from the command line ('development' or 'production').
    mode: argv.mode || "development",

    // Specifies which webpack file the project should start collecting from
    entry: "./scripts/main.js",

    // Output settings for the bundled files.
    output: {
      // In production, add a content hash to the filename to prevent caching.
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true, //Clears the 'dist' folder before each new build
    },

    //Settings for debugging:
    // 'eval-source-map' for quick debugging in development mode.
    // 'source-map' for debugging in production mode (ensures code compliance).
    devtool: isProduction ? "source-map" : "eval-source-map",

    //Plugins to extend webpack functionality
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html", //Use this file as a template
        filename: "index.html", //Source file name
        inject: "body", //input script in the end of <body>
      }),
    ],

    //Rules for handling different types of files
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    //Webpack-dev-server settings for local development
    ...(isProduction
      ? {}
      : {
          devServer: {
            static: "./dist", //Folder from which the server will give files
            hot: true,
            port: "9005",
            open: ["/"],
            headers: {
              // Enable wide open CORS
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PUT, DELETE, PATCH, OPTIONS",
              "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
            },
          },
        }),
  };
};
