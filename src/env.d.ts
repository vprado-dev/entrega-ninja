declare namespace NodeJS {
  export interface ProcessEnv {
    // Enviroment
    NODE_ENV: "development" | "test" | "production" | "staging";
    // Discord
    AUTH_TOKEN: string;
    GUILD_ID: string;
    CLIENT_ID: string;
    REQUEST_TOKEN: string;

    // Docker
    APP_IMAGE: string;

    // Redis
    CACHE_HOST: string;
    CACHE_PORT: string;
    CACHE_PASSWORD: string;

    // Correios
    CORREIOS_USER: string;
    CORREIOS_TOKEN: string;
  }
}
