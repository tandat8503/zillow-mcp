import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {
  PropertyQuerySchema,
  MarketDataSchema,
  EstimateSchema,
  CompsSchema,
  PriceTaxSchema,
  ByCoordinatesSchema,
  ByPolygonSchema,
  ByUrlSchema,
  ByMlsSchema,
} from "../types/index.js";
import { zillowCom1API } from "../services/zillow-com1-api.js";

export class Tools {
  constructor(private server: Server) {
    this.setup();
  }

  private setup() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        { name: "zcom1_property_details", description: "Get property details by address/zpid/url", inputSchema: { type: "object", properties: { address: { type: "string" }, zpid: { type: "string" }, url: { type: "string" } } } },
        { name: "zcom1_market_data", description: "Get market data for resourceId", inputSchema: { type: "object", properties: { resourceId: { type: "string" }, beds: { type: "number" }, baths: { type: "number" }, propertyTypes: { type: "string" } }, required: ["resourceId"] } },
        { name: "zcom1_zestimate", description: "Get property zestimate", inputSchema: { type: "object", properties: { address: { type: "string" }, zpid: { type: "string" } } } },
        { name: "zcom1_rent_estimate", description: "Get rent estimate", inputSchema: { type: "object", properties: { address: { type: "string" }, zpid: { type: "string" } } } },
        { name: "zcom1_comps", description: "Get comparable properties", inputSchema: { type: "object", properties: { zpid: { type: "string" }, address: { type: "string" }, limit: { type: "number" } } } },
        { name: "zcom1_price_tax_history", description: "Get price and tax history", inputSchema: { type: "object", properties: { zpid: { type: "string" }, address: { type: "string" } } } },
        { name: "zcom1_search_by_coordinates", description: "Search by coordinates", inputSchema: { type: "object", properties: { latitude: { type: "number" }, longitude: { type: "number" }, radius: { type: "number" } }, required: ["latitude", "longitude"] } },
        { name: "zcom1_search_by_polygon", description: "Search by polygon (encoded)", inputSchema: { type: "object", properties: { coordinates: { type: "string" } }, required: ["coordinates"] } },
        { name: "zcom1_search_by_url", description: "Search by Zillow URL", inputSchema: { type: "object", properties: { url: { type: "string" } }, required: ["url"] } },
        { name: "zcom1_search_by_mls", description: "Search by MLS ID", inputSchema: { type: "object", properties: { mlsId: { type: "string" } }, required: ["mlsId"] } },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (req) => {
      const { name, arguments: args } = req.params;
      try {
        switch (name) {
          case "zcom1_property_details": {
            const input = PropertyQuerySchema.parse(args ?? {});
            const res = await zillowCom1API.getPropertyDetails(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_market_data": {
            const input = MarketDataSchema.parse(args ?? {});
            const res = await zillowCom1API.getMarketData(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_zestimate": {
            const input = EstimateSchema.parse(args ?? {});
            const res = await zillowCom1API.getZestimate(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_rent_estimate": {
            const input = EstimateSchema.parse(args ?? {});
            const res = await zillowCom1API.getRentEstimate(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_comps": {
            const input = CompsSchema.parse(args ?? {});
            const res = await zillowCom1API.getPropertyComps(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_price_tax_history": {
            const input = PriceTaxSchema.parse(args ?? {});
            const res = await zillowCom1API.getPriceAndTaxHistory(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_search_by_coordinates": {
            const input = ByCoordinatesSchema.parse(args ?? {});
            const res = await zillowCom1API.searchByCoordinates(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_search_by_polygon": {
            const input = ByPolygonSchema.parse(args ?? {});
            const res = await zillowCom1API.searchByPolygon(input);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_search_by_url": {
            const input = ByUrlSchema.parse(args ?? {});
            const res = await zillowCom1API.searchByUrl(input.url);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          case "zcom1_search_by_mls": {
            const input = ByMlsSchema.parse(args ?? {});
            const res = await zillowCom1API.searchByMls(input.mlsId);
            return { content: [{ type: "text", text: JSON.stringify(res.data ?? { error: res.error }, null, 2) }], isError: !res.success };
          }
          default:
            return { content: [{ type: "text", text: `Unknown tool ${name}` }], isError: true };
        }
      } catch (e) {
        return { content: [{ type: "text", text: `Error: ${e instanceof Error ? e.message : String(e)}` }], isError: true };
      }
    });
  }
}
