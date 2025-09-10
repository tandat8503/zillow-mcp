import { config as dotenvConfig } from "dotenv";
dotenvConfig();
export const config = {
    rapidApiKey: process.env.RAPIDAPI_KEY || "",
    rapidApiHost: process.env.RAPIDAPI_HOST || "zillow-com1.p.rapidapi.com",
    baseUrl: process.env.ZILLOW_COM1_BASE_URL || "https://zillow-com1.p.rapidapi.com",
    timeoutSeconds: parseInt(process.env.API_TIMEOUT_SECONDS || "30"),
};
if (!config.rapidApiKey) {
    console.error("Error: RAPIDAPI_KEY is required for Zillow Com1 MCP");
    process.exit(1);
}
