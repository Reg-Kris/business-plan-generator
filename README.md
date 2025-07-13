# Business Plan Generator with MCP Integration

> **AI-Powered Business Consulting** - Transform Claude into an expert business consultant with comprehensive analysis tools via Model Context Protocol (MCP)

A modern business planning solution that combines **traditional web-based business plan generation** with **AI-powered strategic consulting** through Claude's Model Context Protocol integration.

## 🤖 **MCP Integration - AI Business Consultant**

This project includes a **Model Context Protocol (MCP) server** that gives Claude access to professional business consulting tools. When connected to Claude Desktop, you get an AI business consultant that can perform real analyses, not just provide general advice.

### **Why MCP?**
Instead of asking Claude for generic business advice, MCP allows Claude to:
- **Run actual SWOT analyses** with your specific business data
- **Calculate precise financial projections** with break-even analysis and ROI
- **Generate detailed market research** reports tailored to your industry
- **Identify specific innovation opportunities** for your business model
- **Analyze supply chain risks** and optimization strategies

### **Available AI Business Tools**

| Tool | Description | Key Features |
|------|-------------|--------------|
| 🔍 **SWOT Analysis** | Comprehensive strengths, weaknesses, opportunities, threats analysis | Strategic recommendations, industry-specific insights |
| 📊 **PEST Analysis** | Political, economic, social, technological factor analysis | Market environment assessment, regulatory considerations |
| 💰 **Financial Projections** | Detailed financial modeling and analysis | Break-even analysis, ROI calculations, cash flow projections |
| 🎯 **Market Research** | Competitive landscape and opportunity analysis | TAM/SAM/SOM analysis, customer segmentation, growth strategies |
| 💡 **Innovation Finder** | Technology and business model innovation opportunities | Digital transformation, sustainability, competitive advantages |
| 🔗 **Supply Chain Analysis** | Operations optimization and risk assessment | Cost reduction, efficiency improvements, risk mitigation |

## 🚀 **Quick Start - MCP Setup**

### 1. Install Dependencies
```bash
cd business-plan-generator
npm install
```

### 2. Start the MCP Server
```bash
npm run mcp
```

### 3. Configure Claude Desktop
Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "business-consultant": {
      "command": "node",
      "args": ["/FULL/PATH/TO/business-plan-generator/src/server.js"],
      "env": {}
    }
  }
}
```

### 4. Restart Claude Desktop
Once configured, restart Claude Desktop to load the business consulting capabilities.

## 💬 **How to Use with Claude**

After setup, simply talk to Claude naturally:

```
"Can you perform a SWOT analysis for my SaaS startup called 'DataFlow' 
targeting small businesses in the healthcare industry?"
```

```
"Generate financial projections for a business with $50,000 startup costs, 
$8,000 monthly expenses, and projected $120,000 first-year revenue"
```

```
"What innovation opportunities exist for a retail business 
in the sustainable fashion industry?"
```

Claude will automatically use the appropriate MCP tools and provide detailed, professional analyses.

## 📋 **Traditional Web Interface**

In addition to the AI consulting capabilities, this project includes a complete web-based business plan generator:

### Features
- **Interactive Form Interface**: Easy-to-use form covering all business planning aspects
- **PDF Generation**: Professional PDF documents with formatted content
- **Financial Visualizations**: Automatic revenue projection charts
- **Responsive Design**: Works on desktop and mobile devices

### Web App Usage

1. **Start the Web Application**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser

2. **Complete the Form**: Fill out business details, market analysis, financials
3. **Preview**: Review generated content and charts
4. **Generate PDF**: Download professional business plan document

## 🔄 **Integrated Workflow**

**Combine AI consulting with document generation:**

1. **Strategic Analysis**: Use Claude with MCP tools for expert business analysis
2. **Document Creation**: Input insights into the web-based generator
3. **Professional Output**: Generate polished PDF business plans

This creates a powerful workflow: **AI-powered strategic consulting** → **Professional document generation**

## 🏗️ **Technical Architecture**

```
business-plan-generator/
├── src/
│   └── server.js           # MCP server implementation
├── index.html              # Web app interface
├── script.js               # Web app functionality
├── style.css               # Web app styling
├── package.json            # Dependencies & scripts
├── MCP_SETUP.md           # Detailed MCP documentation
└── README.md              # This file
```

### Tech Stack
- **MCP Server**: Node.js with Model Context Protocol SDK
- **Web Frontend**: Pure HTML, CSS, JavaScript
- **PDF Generation**: jsPDF library
- **Charts**: Chart.js for visualizations
- **Transport**: stdio for MCP communication

## 🛠️ **Development**

### Adding New MCP Tools
1. Register new tool in `src/server.js`
2. Define input schema and parameters
3. Implement analysis logic
4. Return formatted results

### Extending Web App
1. **Form Fields**: Update `index.html`
2. **Styling**: Modify `style.css`
3. **Functionality**: Extend `script.js`
4. **PDF Layout**: Customize `generatePDF()` method

## 📖 **Documentation**

- **[MCP_SETUP.md](./MCP_SETUP.md)** - Detailed MCP setup and troubleshooting
- **[Claude MCP Documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)** - Official MCP guide

## 🌟 **Use Cases**

- **Entrepreneurs**: Get AI business consulting + generate professional business plans
- **Consultants**: Use as a starting point for client analysis and documentation
- **Students**: Learn business planning with AI-guided strategic analysis
- **Small Businesses**: Strategic planning with professional documentation

## 🔧 **Requirements**

- **Node.js** v18+ for MCP server
- **Claude Desktop** for AI integration
- **Modern browser** for web interface

## 📄 **License**

MIT License - Feel free to use and modify for your needs.

## 🚀 **Getting Started**

1. **Clone the repository**
2. **Follow MCP setup** in the Quick Start section above
3. **Start consulting** with your new AI business advisor!

---

*Transform your business planning with AI-powered strategic consulting and professional document generation.*