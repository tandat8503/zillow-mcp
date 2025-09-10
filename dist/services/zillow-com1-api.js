import { config } from "./config.js";
export class ZillowCom1APIService {
    rapidApiKey = config.rapidApiKey;
    rapidApiHost = config.rapidApiHost;
    baseUrl = config.baseUrl;
    timeout = config.timeoutSeconds * 1000;
    async makeRequest(endpoint, params = {}) {
        try {
            const url = new URL(`${this.baseUrl}${endpoint}`);
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null)
                    url.searchParams.append(k, v.toString());
            });
            const res = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": this.rapidApiKey,
                    "X-RapidAPI-Host": this.rapidApiHost,
                },
                signal: AbortSignal.timeout(this.timeout),
            });
            if (!res.ok) {
                return { success: false, error: `API ${res.status}: ${await res.text()}`, endpoint, timestamp: Date.now() };
            }
            return { success: true, data: await res.json(), endpoint, timestamp: Date.now() };
        }
        catch (e) {
            return { success: false, error: e instanceof Error ? e.message : String(e), endpoint, timestamp: Date.now() };
        }
    }
    // Property details
    async getPropertyDetails(params) {
        if (params.address)
            return this.makeRequest("/property", { address: params.address });
        if (params.zpid)
            return this.makeRequest("/property", { zpid: params.zpid });
        if (params.url)
            return this.makeRequest("/property", { url: params.url });
        return { success: false, error: "Provide address, zpid, or url", endpoint: "/property", timestamp: Date.now() };
    }
    // Market data
    async getMarketData(params) {
        return this.makeRequest("/marketData", params);
    }
    // Estimates
    async getZestimate(params) {
        return this.makeRequest("/zestimate", params);
    }
    async getRentEstimate(params) {
        return this.makeRequest("/rentEstimate", params);
    }
    // Comps
    async getPropertyComps(params) {
        return this.makeRequest("/propertyComps", params);
    }
    // Price & Tax history
    async getPriceAndTaxHistory(params) {
        return this.makeRequest("/priceAndTaxHistory", params);
    }
    // Searches
    async searchByCoordinates(params) {
        return this.makeRequest("/search/byCoordinates", params);
    }
    async searchByPolygon(params) {
        // coords as encoded string or geojson depending on API; accept raw string from caller
        return this.makeRequest("/search/byPolygon", params);
    }
    async searchByUrl(url) {
        return this.makeRequest("/search/byUrl", { url });
    }
    async searchByMls(mlsId) {
        return this.makeRequest("/search/byMls", { mlsId });
    }
}
export const zillowCom1API = new ZillowCom1APIService();
