module.exports = {
  target: "serverless",
  webpack: config => {
    // Fixes absolute imports in typescripts
    config.resolve.modules.push(__dirname);
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    return config;
  }
};
