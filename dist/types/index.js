import { z } from "zod";
export const PropertyQuerySchema = z.object({
    address: z.string().optional(),
    zpid: z.string().optional(),
    url: z.string().optional(),
});
export const MarketDataSchema = z.object({
    resourceId: z.string(),
    beds: z.number().optional(),
    baths: z.number().optional(),
    propertyTypes: z.string().optional(),
});
export const EstimateSchema = z.object({
    address: z.string().optional(),
    zpid: z.string().optional(),
});
export const CompsSchema = z.object({
    zpid: z.string().optional(),
    address: z.string().optional(),
    limit: z.number().optional(),
});
export const PriceTaxSchema = z.object({
    zpid: z.string().optional(),
    address: z.string().optional(),
});
export const ByCoordinatesSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    radius: z.number().optional(),
});
export const ByPolygonSchema = z.object({
    coordinates: z.string().describe("Polygon coordinates encoding per API spec"),
});
export const ByUrlSchema = z.object({ url: z.string() });
export const ByMlsSchema = z.object({ mlsId: z.string() });
