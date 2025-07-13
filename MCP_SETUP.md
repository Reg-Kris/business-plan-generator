# Business Consultant MCP Server Setup Guide

## Overview

This project includes a comprehensive **Model Context Protocol (MCP) server** that acts as an expert business consultant, providing:

- **SWOT Analysis** (Strengths, Weaknesses, Opportunities, Threats)
- **PEST Analysis** (Political, Economic, Social, Technological)
- **Financial Projections** with detailed calculations and recommendations
- **Market Research** insights and competitive analysis
- **Innovation Opportunities** identification
- **Supply Chain Analysis** and optimization recommendations

## What is MCP?

Model Context Protocol (MCP) is an open protocol that enables LLMs like Claude to connect to external tools and data sources. It allows Claude to access specialized business consulting capabilities through a standardized interface.

## Quick Start

### 1. Prerequisites

- Node.js v18+ 
- npm or yarn package manager

### 2. Install Dependencies

```bash
cd business-plan-generator
npm install
```

### 3. Start the MCP Server

```bash
npm run mcp
```

The server will start and listen for connections via stdio transport.

### 4. Add to Claude Desktop

To connect this MCP server to Claude Desktop, add the following configuration to your Claude Desktop MCP settings:

**On macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**On Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "business-consultant": {
      "command": "node",
      "args": ["/full/path/to/business-plan-generator/src/server.js"],
      "env": {}
    }
  }
}
```

Replace `/full/path/to/business-plan-generator/` with the actual absolute path to your project.

### 5. Restart Claude Desktop

After adding the configuration, restart Claude Desktop to load the MCP server.

## Available Tools

Once connected, you'll have access to these business consulting tools:

### 🔍 SWOT Analysis (`perform-swot-analysis`)
Generate comprehensive SWOT analysis for any business.

**Required Parameters:**
- `businessName`: Name of the business
- `industry`: Industry sector

**Optional Parameters:**
- `businessType`: Type of business (e.g., retail, SaaS, manufacturing)
- `targetMarket`: Target market description
- `location`: Business location

### 📊 PEST Analysis (`perform-pest-analysis`)
Generate strategic PEST analysis covering political, economic, social, and technological factors.

**Required Parameters:**
- `businessName`: Name of the business
- `industry`: Industry sector

**Optional Parameters:**
- `location`: Business location/market
- `targetMarket`: Target market description

### 💰 Financial Projections (`generate-financial-projections`)
Calculate detailed financial projections with break-even analysis and ROI.

**Required Parameters:**
- `startupCosts`: Initial startup costs (number)
- `monthlyExpenses`: Monthly operating expenses (number)
- `year1Revenue`: Year 1 revenue projection (number)

**Optional Parameters:**
- `year2Revenue`: Year 2 revenue projection (number)
- `industryGrowthRate`: Expected industry growth rate in % (default: 15)
- `profitMargin`: Expected profit margin in % (default: 20)

### 🎯 Market Research (`generate-market-research`)
Generate comprehensive market research and competitive analysis.

**Required Parameters:**
- `industry`: Industry sector
- `targetMarket`: Target market description

**Optional Parameters:**
- `location`: Geographic market
- `businessType`: Type of business

### 💡 Innovation Opportunities (`suggest-innovations`)
Identify innovation opportunities and competitive advantages.

**Required Parameters:**
- `industry`: Industry sector
- `businessType`: Type of business

**Optional Parameters:**
- `targetMarket`: Target market
- `currentOffering`: Current product/service offering

### 🔗 Supply Chain Analysis (`analyze-supply-chain`)
Analyze supply chain operations and identify optimization opportunities.

**Required Parameters:**
- `industry`: Industry sector
- `businessType`: Type of business

**Optional Parameters:**
- `location`: Business location
- `productType`: Type of product/service

## Example Usage

Once the MCP server is connected to Claude, you can use it like this:

```
Hey Claude, can you perform a SWOT analysis for a tech startup called "DataFlow Solutions" in the SaaS industry targeting small businesses in San Francisco?
```

Claude will automatically use the `perform-swot-analysis` tool with the provided parameters and return a comprehensive SWOT analysis.

## Troubleshooting

### Server Won't Start
- Ensure Node.js v18+ is installed
- Check that all dependencies are installed: `npm install`
- Verify the server.js file exists in the src directory

### Claude Desktop Won't Connect
- Verify the absolute path in the configuration is correct
- Ensure Claude Desktop has been restarted after adding the configuration
- Check that the node command is available in your system PATH

### Tool Calls Not Working
- Confirm the MCP server is running and not showing errors
- Restart Claude Desktop to refresh the connection
- Check the Claude Desktop logs for connection errors

## Development

### Project Structure
```
business-plan-generator/
├── src/
│   ├── server.js          # Main MCP server implementation
│   └── server.ts          # TypeScript version (for reference)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── index.html             # Original business plan generator
├── script.js              # Original web app logic
├── style.css              # Web app styling
└── MCP_SETUP.md          # This documentation
```

### Adding New Tools
To add new business consulting tools:

1. Add a new `registerTool` call in the `setupTools()` method
2. Define the input schema with required/optional parameters
3. Implement the analysis logic as a new private method
4. Return formatted results in the tool handler

### Modifying Analysis Logic
The analysis methods (like `generateSWOTAnalysis`) contain the business logic. You can customize:
- Analysis categories and recommendations
- Output formatting and structure
- Calculation methods for financial projections
- Industry-specific insights

## Integration with Web App

This MCP server complements the existing web-based business plan generator. While the web app provides a user-friendly interface for creating complete business plans, the MCP server enables Claude to provide expert business consulting through conversation.

You can use both together:
1. Use Claude with MCP tools for strategic analysis and recommendations
2. Input the insights into the web-based business plan generator
3. Generate professional PDF business plans

This creates a powerful workflow combining AI-powered consulting with document generation.