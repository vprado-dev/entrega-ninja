declare namespace NodeJS {
  export interface ProcessEnv {
    // Enviroment
    NODE_ENV: "development" | "test" | "production" | "staging";

    AUTH_TOKEN: string;
    GUILD_ID: string;
    CLIENT_ID: string;
    REQUEST_TOKEN: string;

    // Database
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;

    // Migrations
    MIGRATIONS_ENABLED: "0" | "1";
  }
}
