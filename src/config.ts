import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const PORT: number = parseInt(checkEnv("PORT"), 10);
export const DBURL: string = checkEnv("DBURL");
export const JWT_SECRET: string = checkEnv("JWT_SECRET");
export const CORS_ORIGINS: Array<string> = [ checkEnv("CORS_ORIGIN", "http://localhost:3000") ];
