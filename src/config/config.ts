import { Config } from "../type/config";

const defaultConfig: Config = {
  API_BASE_URL: "http://localhost:3001"
}

const config: Config = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || defaultConfig.API_BASE_URL
};

export default config;