import { ApiCallResult } from "../types/index.js";
export declare class ZillowCom1APIService {
    private rapidApiKey;
    private rapidApiHost;
    private baseUrl;
    private timeout;
    private makeRequest;
    getPropertyDetails(params: {
        address?: string;
        zpid?: string;
        url?: string;
    }): Promise<ApiCallResult>;
    getMarketData(params: {
        resourceId: string;
        beds?: number;
        baths?: number;
        propertyTypes?: string;
    }): Promise<ApiCallResult>;
    getZestimate(params: {
        address?: string;
        zpid?: string;
    }): Promise<ApiCallResult>;
    getRentEstimate(params: {
        address?: string;
        zpid?: string;
    }): Promise<ApiCallResult>;
    getPropertyComps(params: {
        zpid?: string;
        address?: string;
        limit?: number;
    }): Promise<ApiCallResult>;
    getPriceAndTaxHistory(params: {
        zpid?: string;
        address?: string;
    }): Promise<ApiCallResult>;
    searchByCoordinates(params: {
        latitude: number;
        longitude: number;
        radius?: number;
    }): Promise<ApiCallResult>;
    searchByPolygon(params: {
        coordinates: string;
    }): Promise<ApiCallResult>;
    searchByUrl(url: string): Promise<ApiCallResult>;
    searchByMls(mlsId: string): Promise<ApiCallResult>;
}
export declare const zillowCom1API: ZillowCom1APIService;
