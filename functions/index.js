const functions = require("firebase-functions");
const { Nuxt } = require("nuxt");

const nuxt = new Nuxt({
  dev: false,
  buildDir: "dist",
  build: {
    publicPath: "/",
  },
});

exports.ssr = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
});
