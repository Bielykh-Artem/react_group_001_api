const { NODE_ENV = "development", HOST = "0.0.0.0", PORT = 4001 } = process.env;

const common = {
  env: NODE_ENV,
  // host: HOST,
  port: PORT,
  app_url: "http://localhost:3000"
};

const development = {
  ...common,
  jwt_secret: "bbrMHa5MHBXxI2QvoTOkyqNoviiSPcFW",
};

const production = {
  ...common,
  jwt_secret: "bbrMHa5MHBXxI2QvoTOkyqNoviiSPcFW",
};

const config = {
  development,
  production
};

// @ts-ignore
export default config[NODE_ENV];
