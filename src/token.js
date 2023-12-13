class Config {
    static values = {
      token: null,
      // add other config values as needed
    };
  
    static setToken(token) {
      Config.values.token = token;
    }
  
    static getToken() {
      return Config.values.token;
    }
  
    // add other static getters and setters as needed
  }
  
  export default Config;