import { z } from "zod";
export interface ApiCallResult {
    success: boolean;
    data?: any;
    error?: string;
    endpoint: string;
    timestamp: number;
}
export declare const PropertyQuerySchema: z.ZodObject<{
    address: z.ZodOptional<z.ZodString>;
    zpid: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address?: string | undefined;
    zpid?: string | undefined;
    url?: string | undefined;
}, {
    address?: string | undefined;
    zpid?: string | undefined;
    url?: string | undefined;
}>;
export declare const MarketDataSchema: z.ZodObject<{
    resourceId: z.ZodString;
    beds: z.ZodOptional<z.ZodNumber>;
    baths: z.ZodOptional<z.ZodNumber>;
    propertyTypes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    resourceId: string;
    beds?: number | undefined;
    baths?: number | undefined;
    propertyTypes?: string | undefined;
}, {
    resourceId: string;
    beds?: number | undefined;
    baths?: number | undefined;
    propertyTypes?: string | undefined;
}>;
export declare const EstimateSchema: z.ZodObject<{
    address: z.ZodOptional<z.ZodString>;
    zpid: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address?: string | undefined;
    zpid?: string | undefined;
}, {
    address?: string | undefined;
    zpid?: string | undefined;
}>;
export declare const CompsSchema: z.ZodObject<{
    zpid: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    address?: string | undefined;
    zpid?: string | undefined;
    limit?: number | undefined;
}, {
    address?: string | undefined;
    zpid?: string | undefined;
    limit?: number | undefined;
}>;
export declare const PriceTaxSchema: z.ZodObject<{
    zpid: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address?: string | undefined;
    zpid?: string | undefined;
}, {
    address?: string | undefined;
    zpid?: string | undefined;
}>;
export declare const ByCoordinatesSchema: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    radius: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    latitude: number;
    longitude: number;
    radius?: number | undefined;
}, {
    latitude: number;
    longitude: number;
    radius?: number | undefined;
}>;
export declare const ByPolygonSchema: z.ZodObject<{
    coordinates: z.ZodString;
}, "strip", z.ZodTypeAny, {
    coordinates: string;
}, {
    coordinates: string;
}>;
export declare const ByUrlSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
export declare const ByMlsSchema: z.ZodObject<{
    mlsId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    mlsId: string;
}, {
    mlsId: string;
}>;
