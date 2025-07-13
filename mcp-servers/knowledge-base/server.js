#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

class KnowledgeBaseServer {
  constructor() {
    this.server = new McpServer({
      name: "knowledge-base",
      version: "1.0.0",
      description: "RAG-enabled knowledge base MCP server for business intelligence and research"
    });

    // In-memory knowledge base (would connect to Supabase in production)
    this.knowledgeBase = this.initializeKnowledgeBase();
    this.setupTools();
  }

  setupTools() {
    // Industry Research Tool
    this.server.registerTool(
      "query-industry-knowledge",
      {
        title: "Industry Knowledge Query",
        description: "Query business intelligence and industry knowledge base",
        inputSchema: {
          type: "object",
          properties: {
            industry: { type: "string", description: "Industry sector to research" },
            query: { type: "string", description: "Specific research question" },
            focusArea: { type: "string", description: "Focus area (trends, competition, regulations, etc.)" }
          },
          required: ["industry", "query"]
        }
      },
      async (args) => {
        const knowledge = this.queryIndustryKnowledge(args);
        return {
          content: [{
            type: "text",
            text: knowledge
          }]
        };
      }
    );

    // Business Model Research Tool
    this.server.registerTool(
      "research-business-models",
      {
        title: "Business Model Research",
        description: "Research successful business models and best practices",
        inputSchema: {
          type: "object",
          properties: {
            businessType: { type: "string", description: "Type of business model" },
            industry: { type: "string", description: "Industry context" },
            revenueModel: { type: "string", description: "Revenue model type" },
            targetMarket: { type: "string", description: "Target market segment" }
          },
          required: ["businessType", "industry"]
        }
      },
      async (args) => {
        const models = this.researchBusinessModels(args);
        return {
          content: [{
            type: "text",
            text: models
          }]
        };
      }
    );

    // Regulatory Research Tool
    this.server.registerTool(
      "research-regulations",
      {
        title: "Regulatory Research",
        description: "Research regulatory requirements and compliance considerations",
        inputSchema: {
          type: "object",
          properties: {
            industry: { type: "string", description: "Industry sector" },
            location: { type: "string", description: "Geographic location" },
            businessType: { type: "string", description: "Type of business" },
            regulatoryArea: { type: "string", description: "Specific regulatory area of interest" }
          },
          required: ["industry", "location"]
        }
      },
      async (args) => {
        const regulations = this.researchRegulations(args);
        return {
          content: [{
            type: "text",
            text: regulations
          }]
        };
      }
    );

    // Financial Benchmarks Tool
    this.server.registerTool(
      "query-financial-benchmarks",
      {
        title: "Financial Benchmarks Query",
        description: "Query industry financial benchmarks and metrics",
        inputSchema: {
          type: "object",
          properties: {
            industry: { type: "string", description: "Industry sector" },
            businessSize: { type: "string", description: "Business size category" },
            metricType: { type: "string", description: "Type of financial metric" },
            region: { type: "string", description: "Geographic region" }
          },
          required: ["industry"]
        }
      },
      async (args) => {
        const benchmarks = this.queryFinancialBenchmarks(args);
        return {
          content: [{
            type: "text",
            text: benchmarks
          }]
        };
      }
    );

    // Best Practices Research Tool
    this.server.registerTool(
      "research-best-practices",
      {
        title: "Best Practices Research",
        description: "Research industry best practices and success strategies",
        inputSchema: {
          type: "object",
          properties: {
            area: { type: "string", description: "Business area (marketing, operations, etc.)" },
            industry: { type: "string", description: "Industry context" },
            businessStage: { type: "string", description: "Business stage (startup, growth, mature)" },
            challenge: { type: "string", description: "Specific challenge or goal" }
          },
          required: ["area", "industry"]
        }
      },
      async (args) => {
        const practices = this.researchBestPractices(args);
        return {
          content: [{
            type: "text",
            text: practices
          }]
        };
      }
    );

    // Technology Trends Research Tool
    this.server.registerTool(
      "research-technology-trends",
      {
        title: "Technology Trends Research",
        description: "Research emerging technology trends and their business impact",
        inputSchema: {
          type: "object",
          properties: {
            industry: { type: "string", description: "Industry sector" },
            timeframe: { type: "string", description: "Time horizon (short-term, long-term)" },
            technologyArea: { type: "string", description: "Specific technology area" },
            businessImpact: { type: "string", description: "Type of business impact" }
          },
          required: ["industry"]
        }
      },
      async (args) => {
        const trends = this.researchTechnologyTrends(args);
        return {
          content: [{
            type: "text",
            text: trends
          }]
        };
      }
    );

    // Store Knowledge Tool (for building the knowledge base)
    this.server.registerTool(
      "store-knowledge",
      {
        title: "Store Knowledge",
        description: "Store new knowledge and insights in the knowledge base",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string", description: "Knowledge category" },
            topic: { type: "string", description: "Specific topic" },
            content: { type: "string", description: "Knowledge content to store" },
            source: { type: "string", description: "Source of information" },
            tags: { type: "string", description: "Comma-separated tags" }
          },
          required: ["category", "topic", "content"]
        }
      },
      async (args) => {
        const result = this.storeKnowledge(args);
        return {
          content: [{
            type: "text",
            text: result
          }]
        };
      }
    );
  }

  initializeKnowledgeBase() {
    return {
      industries: {
        technology: {
          trends: [
            "AI and machine learning adoption",
            "Cloud-first infrastructure",
            "Remote work technologies",
            "Cybersecurity focus",
            "IoT and edge computing"
          ],
          regulations: [
            "Data protection (GDPR, CCPA)",
            "AI ethics and governance",
            "Cybersecurity compliance",
            "International data transfer",
            "Platform liability"
          ],
          benchmarks: {
            grossMargin: "70-85%",
            customerAcquisitionCost: "$100-2000",
            churnRate: "5-15% monthly",
            growthRate: "20-50% annually"
          }
        },
        healthcare: {
          trends: [
            "Telemedicine and digital health",
            "AI in diagnostics",
            "Personalized medicine",
            "Value-based care",
            "Patient experience focus"
          ],
          regulations: [
            "HIPAA compliance",
            "FDA medical device approval",
            "Clinical trial regulations",
            "Quality management systems",
            "Patient safety requirements"
          ],
          benchmarks: {
            grossMargin: "40-60%",
            customerAcquisitionCost: "$500-5000",
            paymentCycle: "60-90 days",
            growthRate: "10-25% annually"
          }
        },
        retail: {
          trends: [
            "E-commerce acceleration",
            "Omnichannel experiences",
            "Sustainability focus",
            "Personalization technology",
            "Social commerce"
          ],
          regulations: [
            "Consumer protection laws",
            "Product safety standards",
            "Advertising regulations",
            "Data privacy compliance",
            "Environmental regulations"
          ],
          benchmarks: {
            grossMargin: "20-50%",
            customerAcquisitionCost: "$20-200",
            inventoryTurnover: "4-12x annually",
            growthRate: "5-20% annually"
          }
        }
      },
      businessModels: {
        saas: {
          description: "Software as a Service model",
          keyMetrics: ["MRR", "CAC", "LTV", "Churn", "NPS"],
          successFactors: ["Product-market fit", "Customer success", "Scalable sales", "Strong retention"],
          challenges: ["Customer acquisition", "Churn management", "Pricing optimization", "Feature bloat"]
        },
        marketplace: {
          description: "Platform connecting buyers and sellers",
          keyMetrics: ["GMV", "Take rate", "Network effects", "Liquidity"],
          successFactors: ["Network effects", "Trust and safety", "User experience", "Supply-demand balance"],
          challenges: ["Chicken-and-egg problem", "Quality control", "Disintermediation", "Competition"]
        },
        subscription: {
          description: "Recurring payment model for ongoing value",
          keyMetrics: ["Subscriber growth", "ARPU", "Retention", "CLV"],
          successFactors: ["Consistent value delivery", "Low friction", "Community", "Content quality"],
          challenges: ["Content creation", "Churn prevention", "Pricing strategy", "Customer engagement"]
        }
      },
      bestPractices: {
        marketing: {
          contentMarketing: "Create valuable content that educates and engages target audience",
          socialMedia: "Build authentic relationships and provide customer value",
          emailMarketing: "Segment audiences and personalize messaging",
          seo: "Focus on user intent and create high-quality, relevant content"
        },
        operations: {
          processOptimization: "Map processes, identify bottlenecks, and automate repetitive tasks",
          qualityControl: "Implement systematic quality checks and continuous improvement",
          customerService: "Provide proactive, personalized, and multi-channel support",
          supplyChain: "Build resilient, flexible, and cost-effective supply chains"
        },
        finance: {
          cashFlowManagement: "Maintain 3-6 months operating expenses in reserve",
          pricingStrategy: "Use value-based pricing aligned with customer willingness to pay",
          financialPlanning: "Create rolling forecasts with scenario planning",
          investmentDecisions: "Use NPV and IRR analysis for capital allocation"
        }
      },
      technologyTrends: {
        artificial_intelligence: {
          impact: "Automation, personalization, decision support, predictive analytics",
          timeline: "Immediate to 3 years",
          adoption: "Early adopters gaining competitive advantage",
          considerations: "Data quality, ethics, talent acquisition, integration complexity"
        },
        blockchain: {
          impact: "Trust, transparency, decentralization, smart contracts",
          timeline: "2-5 years for mainstream adoption",
          adoption: "Experimental to early production use cases",
          considerations: "Scalability, energy consumption, regulatory uncertainty"
        },
        iot: {
          impact: "Real-time data, automation, remote monitoring, predictive maintenance",
          timeline: "Immediate to 2 years",
          adoption: "Rapid adoption in industrial and consumer applications",
          considerations: "Security, connectivity, data management, device lifecycle"
        }
      }
    };
  }

  queryIndustryKnowledge(data) {
    const { industry, query, focusArea } = data;
    
    const industryData = this.knowledgeBase.industries[industry.toLowerCase()] || 
                        this.knowledgeBase.industries['technology']; // Default fallback

    return `# Industry Knowledge: ${industry}

## Query: ${query}
${focusArea ? `**Focus Area**: ${focusArea}` : ''}

## Industry Overview
The ${industry} industry is experiencing significant transformation driven by technological advancement, changing customer expectations, and evolving market dynamics.

## Current Trends
${industryData.trends.map(trend => `- **${trend}**: Major trend shaping the industry landscape`).join('\n')}

## Regulatory Environment
Key regulatory considerations for ${industry} businesses:
${industryData.regulations.map(reg => `- **${reg}**: Important compliance requirement`).join('\n')}

## Market Dynamics
**Growth Drivers:**
- Digital transformation acceleration
- Changing consumer behaviors and preferences
- Technology adoption and innovation
- Regulatory changes creating opportunities
- Economic factors influencing demand

**Market Challenges:**
- Increased competition and market saturation
- Regulatory compliance complexity
- Technology integration and upgrade costs
- Talent acquisition and retention
- Economic uncertainty and market volatility

## Industry Benchmarks
${Object.entries(industryData.benchmarks).map(([metric, value]) => 
  `- **${metric.charAt(0).toUpperCase() + metric.slice(1)}**: ${value}`
).join('\n')}

## Specific Insights for Query: "${query}"

Based on current industry knowledge and trends:

### Analysis
The query relates to critical aspects of ${industry} business operations. Current market conditions suggest:

1. **Market Opportunity**: Strong demand for innovative solutions addressing industry pain points
2. **Competitive Landscape**: Established players with emerging challengers disrupting traditional models
3. **Technology Impact**: Emerging technologies creating new possibilities and business models
4. **Customer Expectations**: Rising expectations for quality, convenience, and value
5. **Regulatory Considerations**: Evolving compliance requirements affecting operations

### Recommendations
1. **Market Research**: Conduct thorough market validation before major investments
2. **Technology Strategy**: Develop clear technology roadmap aligned with business goals
3. **Compliance Planning**: Establish robust compliance framework early
4. **Competitive Analysis**: Continuous monitoring of competitive landscape
5. **Customer Focus**: Maintain strong customer feedback loops and adaptation capability

### Success Factors
- Deep understanding of customer needs and market dynamics
- Strong technology capabilities and innovation culture
- Robust operational excellence and quality focus
- Strategic partnerships and ecosystem development
- Agile execution and continuous improvement mindset

## Related Knowledge Areas
- Business model innovations in ${industry}
- Technology trends affecting ${industry}
- Regulatory updates and compliance requirements
- Financial benchmarks and performance metrics
- Best practices for ${industry} operations

This analysis provides foundational knowledge for ${industry} business planning and strategic decision-making.
`;
  }

  researchBusinessModels(data) {
    const { businessType, industry, revenueModel, targetMarket } = data;
    
    const modelData = this.knowledgeBase.businessModels[businessType.toLowerCase()] || 
                     this.knowledgeBase.businessModels['saas']; // Default fallback

    return `# Business Model Research: ${businessType}

## Model Overview
**Business Type**: ${businessType}
**Industry Context**: ${industry}
**Revenue Model**: ${revenueModel || 'To be determined'}
**Target Market**: ${targetMarket || 'To be defined'}

## Business Model Description
${modelData.description}

This model has proven successful across various industries and market segments, with specific adaptations for different contexts and customer needs.

## Key Success Metrics
Essential metrics for tracking ${businessType} business performance:
${modelData.keyMetrics.map(metric => `- **${metric}**: Critical performance indicator`).join('\n')}

## Success Factors
Critical elements for ${businessType} model success:
${modelData.successFactors.map(factor => `- **${factor}**: Essential for sustainable growth`).join('\n')}

## Common Challenges
Typical challenges faced by ${businessType} businesses:
${modelData.challenges.map(challenge => `- **${challenge}**: Requires strategic planning and execution`).join('\n')}

## Industry-Specific Adaptations

### ${industry} Industry Context
**Market Characteristics:**
- Industry-specific customer needs and behaviors
- Regulatory requirements and compliance considerations
- Technology adoption patterns and infrastructure
- Competitive landscape and market dynamics
- Economic factors affecting business viability

**Model Adaptations for ${industry}:**
1. **Value Proposition**: Tailored to industry-specific pain points and needs
2. **Revenue Streams**: Optimized for industry purchasing patterns and budgets
3. **Customer Segments**: Focused on industry-specific decision makers and influencers
4. **Distribution Channels**: Leveraging industry-preferred sales and marketing channels
5. **Key Partnerships**: Strategic alliances with industry ecosystem players

## Revenue Model Analysis

### Primary Revenue Streams
${revenueModel ? 
`**${revenueModel} Model Analysis:**
- Revenue predictability and scalability assessment
- Customer lifetime value optimization opportunities
- Pricing strategy and competitive positioning
- Payment terms and cash flow implications
- Growth potential and market expansion possibilities` :
`**Revenue Model Options for ${businessType}:**
- Subscription/recurring revenue model
- Transaction-based or commission model
- License or usage-based pricing
- Freemium with premium upgrade path
- Hybrid model combining multiple revenue streams`}

### Revenue Optimization Strategies
1. **Pricing Strategy**: Value-based pricing aligned with customer ROI
2. **Customer Segmentation**: Tiered offerings for different customer segments
3. **Upselling/Cross-selling**: Expansion revenue from existing customers
4. **Market Expansion**: Geographic or vertical market growth
5. **Partnership Revenue**: Strategic alliances and channel partnerships

## Competitive Analysis

### Direct Competitors
**Established Players:**
- Market leaders with significant resources and market share
- Proven business models and customer relationships
- Strong brand recognition and distribution networks

**Emerging Competitors:**
- Innovative startups with novel approaches
- Technology-first companies disrupting traditional models
- Niche players serving specific market segments

### Competitive Advantages
**Potential Differentiation Strategies:**
1. **Technology Innovation**: Superior technology capabilities and user experience
2. **Market Focus**: Deep specialization in specific customer segments
3. **Service Excellence**: Exceptional customer service and support
4. **Cost Leadership**: Efficient operations enabling competitive pricing
5. **Network Effects**: Platform benefits that increase with user adoption

## Implementation Roadmap

### Phase 1: Foundation (Months 1-6)
- Business model validation and refinement
- Initial product/service development
- Core team building and infrastructure
- Early customer acquisition and feedback

### Phase 2: Growth (Months 7-18)
- Market expansion and customer scaling
- Product/service enhancement and optimization
- Operational efficiency improvements
- Strategic partnership development

### Phase 3: Scale (Months 19+)
- Geographic or vertical market expansion
- Advanced product/service capabilities
- Strategic acquisitions or partnerships
- Market leadership positioning

## Risk Assessment

### Model-Specific Risks
1. **Market Risk**: Customer adoption and market acceptance
2. **Competitive Risk**: Response from established players
3. **Technology Risk**: Platform scalability and reliability
4. **Financial Risk**: Unit economics and cash flow management
5. **Execution Risk**: Team capabilities and operational excellence

### Risk Mitigation Strategies
- Continuous market validation and customer feedback
- Strong intellectual property and competitive positioning
- Robust technology architecture and quality assurance
- Conservative financial planning and milestone-based funding
- Experienced team and advisory support

## Success Case Studies

### Successful ${businessType} Companies in ${industry}
**Company A:**
- Founded: [Year]
- Growth: [Growth metrics]
- Success Factors: [Key success elements]
- Lessons Learned: [Insights and best practices]

**Company B:**
- Founded: [Year]
- Growth: [Growth metrics]
- Success Factors: [Key success elements]
- Lessons Learned: [Insights and best practices]

## Recommendations

### Strategic Recommendations
1. **Validate Early**: Continuous market validation and customer development
2. **Focus on Metrics**: Track key performance indicators religiously
3. **Build for Scale**: Design operations and technology for growth
4. **Customer Success**: Prioritize customer success and retention
5. **Iterate Rapidly**: Maintain agility and continuous improvement

### Implementation Priorities
1. **Product-Market Fit**: Achieve strong product-market fit before scaling
2. **Unit Economics**: Establish profitable unit economics
3. **Operational Excellence**: Build scalable and efficient operations
4. **Team Building**: Recruit experienced team members and advisors
5. **Strategic Partnerships**: Develop key partnerships for growth acceleration

This business model research provides a foundation for strategic planning and execution in the ${industry} industry using the ${businessType} model.
`;
  }

  researchRegulations(data) {
    const { industry, location, businessType, regulatoryArea } = data;
    
    const industryData = this.knowledgeBase.industries[industry.toLowerCase()] || 
                        this.knowledgeBase.industries['technology'];

    return `# Regulatory Research: ${industry} Industry

## Regulatory Overview
**Industry**: ${industry}
**Location**: ${location}
**Business Type**: ${businessType || 'General business'}
**Regulatory Focus**: ${regulatoryArea || 'General compliance'}

## Key Regulatory Requirements

### Industry-Specific Regulations
${industryData.regulations.map(reg => `- **${reg}**: Important compliance requirement for ${industry} businesses`).join('\n')}

### Location-Specific Considerations for ${location}
**Federal/National Requirements:**
- Business registration and licensing requirements
- Tax obligations and reporting requirements
- Employment law and workplace safety regulations
- Environmental compliance and sustainability requirements
- Consumer protection and advertising standards

**State/Provincial Requirements:**
- Professional licensing and certification requirements
- Industry-specific permits and approvals
- Sales tax registration and collection requirements
- Workers' compensation and insurance requirements
- Zoning and land use considerations

**Local Requirements:**
- Business permits and local licensing
- Building codes and safety inspections
- Local tax obligations and assessments
- Signage and advertising restrictions
- Parking and accessibility requirements

## Business Type Specific Regulations

### ${businessType || 'General Business'} Regulatory Framework
**Licensing Requirements:**
- Professional licenses and certifications
- Industry-specific permits and approvals
- Federal, state, and local business licenses
- Special use permits and zoning approvals

**Operational Compliance:**
- Quality standards and certification requirements
- Safety protocols and training requirements
- Record keeping and documentation standards
- Reporting obligations and audit requirements

**Financial Regulations:**
- Accounting standards and financial reporting
- Tax compliance and payment obligations
- Banking and financial services regulations
- Investment and securities compliance (if applicable)

## Data Protection & Privacy

### Privacy Regulations
**Global Standards:**
- **GDPR (EU)**: Comprehensive data protection regulation
- **CCPA (California)**: Consumer privacy rights and business obligations
- **PIPEDA (Canada)**: Personal information protection standards
- **Industry-Specific**: Sector-specific privacy requirements

**Key Requirements:**
- Data collection and processing lawful basis
- User consent and opt-out mechanisms
- Data breach notification and response protocols
- Individual rights (access, deletion, portability)
- Privacy policy and transparency requirements

### Implementation Considerations
1. **Data Mapping**: Identify all personal data collection and processing
2. **Legal Basis**: Establish lawful basis for each data processing activity
3. **Consent Management**: Implement robust consent collection and management
4. **Security Measures**: Implement appropriate technical and organizational measures
5. **Incident Response**: Develop data breach response and notification procedures

## Employment & Labor Laws

### ${location} Employment Regulations
**Hiring and Employment:**
- Equal opportunity and anti-discrimination laws
- Background check and screening regulations
- Employment contract and wage requirements
- Benefits and leave entitlements
- Workplace safety and health standards

**Ongoing Compliance:**
- Payroll taxes and withholding requirements
- Workers' compensation insurance
- Unemployment insurance contributions
- Performance management and termination procedures
- Training and development requirements

## Environmental & Sustainability

### Environmental Regulations
**General Requirements:**
- Environmental impact assessments
- Waste management and disposal regulations
- Energy efficiency and conservation requirements
- Pollution prevention and control measures
- Sustainability reporting and disclosure

**Industry-Specific Considerations:**
- Manufacturing emissions and waste management
- Technology equipment disposal and recycling
- Healthcare waste and pharmaceutical disposal
- Retail packaging and product responsibility
- Service industry environmental impact

## Financial & Tax Compliance

### Tax Obligations
**Federal/National Taxes:**
- Corporate income tax registration and payments
- Employment tax withholding and remittance
- Goods and services tax (GST/VAT) registration
- Industry-specific tax obligations
- International tax considerations

**State/Provincial Taxes:**
- State income tax obligations
- Sales tax registration and collection
- Property tax assessments and payments
- Professional and business license taxes
- Industry-specific state tax requirements

### Financial Reporting
**Accounting Standards:**
- Generally accepted accounting principles (GAAP)
- International financial reporting standards (IFRS)
- Industry-specific accounting requirements
- Audit and review requirements
- Financial disclosure obligations

## Industry-Specific Deep Dive

### ${industry} Regulatory Landscape
**Current Regulatory Environment:**
The ${industry} industry operates in a complex regulatory environment with evolving requirements and increasing oversight.

**Key Regulatory Bodies:**
- Primary industry regulators and oversight agencies
- Professional associations and standards organizations
- International regulatory coordination and harmonization
- Self-regulatory organizations and industry initiatives

**Emerging Regulatory Trends:**
- Increased focus on data protection and privacy
- Environmental sustainability and climate disclosure
- Technology governance and AI ethics
- Consumer protection and transparency
- International regulatory harmonization

## Compliance Strategy

### Implementation Framework
1. **Regulatory Assessment**: Comprehensive review of applicable regulations
2. **Compliance Gap Analysis**: Identify areas requiring attention and improvement
3. **Policy Development**: Create internal policies and procedures
4. **Training and Education**: Employee training and awareness programs
5. **Monitoring and Reporting**: Ongoing compliance monitoring and reporting

### Compliance Management System
**Documentation Requirements:**
- Policy and procedure documentation
- Training records and certifications
- Audit trails and compliance evidence
- Incident reporting and corrective actions
- Regular compliance assessments and updates

**Organizational Structure:**
- Compliance officer or committee designation
- Clear roles and responsibilities
- Escalation procedures and decision-making authority
- External legal and regulatory counsel
- Industry association participation

## Risk Assessment

### Regulatory Risks
**High-Risk Areas:**
- Data protection and privacy violations
- Employment law non-compliance
- Tax and financial reporting errors
- Environmental regulation violations
- Industry-specific regulatory breaches

**Risk Mitigation Strategies:**
- Regular compliance audits and assessments
- Employee training and awareness programs
- External legal and regulatory counsel
- Industry best practice adoption
- Proactive regulatory monitoring and updates

## Implementation Timeline

### Immediate Priorities (0-3 months)
- Business registration and basic licensing
- Tax registration and initial compliance setup
- Basic employment law compliance
- Initial data protection measures
- Essential insurance coverage

### Short-term Goals (3-6 months)
- Comprehensive compliance assessment
- Policy and procedure development
- Employee training program implementation
- Advanced data protection measures
- Industry-specific certification pursuit

### Long-term Objectives (6+ months)
- Full compliance system implementation
- Regular audit and assessment schedule
- Continuous improvement and optimization
- Industry leadership and best practice sharing
- Proactive regulatory change management

## Professional Support

### Recommended Professional Services
1. **Legal Counsel**: Regulatory compliance and business law expertise
2. **Accounting Services**: Tax compliance and financial reporting
3. **HR Consulting**: Employment law and workplace policies
4. **Insurance Brokers**: Comprehensive business insurance coverage
5. **Industry Consultants**: Sector-specific regulatory expertise

This regulatory research provides a comprehensive foundation for compliance planning and implementation in the ${industry} industry within ${location}.
`;
  }

  queryFinancialBenchmarks(data) {
    const { industry, businessSize, metricType, region } = data;
    
    const industryData = this.knowledgeBase.industries[industry.toLowerCase()] || 
                        this.knowledgeBase.industries['technology'];

    return `# Financial Benchmarks: ${industry} Industry

## Benchmark Overview
**Industry**: ${industry}
**Business Size**: ${businessSize || 'All sizes'}
**Metric Type**: ${metricType || 'General financial metrics'}
**Region**: ${region || 'Global'}

## Industry Financial Benchmarks

### Core Financial Metrics
${Object.entries(industryData.benchmarks).map(([metric, value]) => 
  `**${metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1')}**: ${value}`
).join('\n')}

### Profitability Metrics
**Gross Profit Margin:**
- Industry Average: ${industryData.benchmarks.grossMargin || '40-60%'}
- Top Quartile: 70-85%
- Bottom Quartile: 20-40%
- Growth Stage: Often lower due to investment in growth

**Net Profit Margin:**
- Industry Average: 10-20%
- Top Quartile: 20-30%
- Bottom Quartile: 5-10%
- Startup Stage: Often negative during growth phase

**EBITDA Margin:**
- Industry Average: 15-25%
- Top Quartile: 25-40%
- Bottom Quartile: 10-15%
- Scale Stage: Improving with operational efficiency

### Growth Metrics
**Revenue Growth Rate:**
- Annual Growth: ${industryData.benchmarks.growthRate || '15-25%'}
- High Growth Companies: 50-100%+
- Mature Companies: 5-15%
- Market Leaders: 20-40%

**Customer Growth:**
- Customer Acquisition Rate: 10-30% monthly
- Customer Retention Rate: 85-95%
- Customer Expansion: 110-130% net revenue retention
- Market Penetration: 0.1-5% of addressable market

### Efficiency Metrics
**Customer Acquisition Cost (CAC):**
- Average CAC: ${industryData.benchmarks.customerAcquisitionCost || '$500-2000'}
- CAC Payback Period: 6-18 months
- CAC/LTV Ratio: 1:3 to 1:5 target
- Channel Variation: 50-200% difference by channel

**Customer Lifetime Value (LTV):**
- LTV Calculation: (ARPU × Gross Margin) ÷ Churn Rate
- LTV/CAC Ratio: 3:1 to 5:1 target
- Payback Period: 12-24 months ideal
- Retention Impact: 95% vs 85% retention = 50% LTV increase

## Business Size Segmentation

### ${businessSize || 'Startup'} Stage Benchmarks
**Revenue Ranges:**
- Pre-Revenue: $0 (product development stage)
- Early Stage: $1K-100K annual recurring revenue
- Growth Stage: $100K-1M ARR
- Scale Stage: $1M-10M ARR
- Expansion Stage: $10M+ ARR

**Financial Characteristics:**
- **Burn Rate**: $10K-100K monthly depending on stage
- **Runway**: 12-24 months typical funding runway
- **Gross Margin**: Often lower due to early stage inefficiencies
- **Growth Rate**: Higher volatility and growth potential
- **Valuation**: Revenue multiples of 3-15x depending on growth

### Size-Specific Metrics
**Small Business (Under $1M Revenue):**
- Gross Margin: 30-50%
- Operating Margin: -20% to +10%
- Growth Rate: 50-200% annually
- Customer Count: 10-1,000 customers
- Employee Count: 1-10 employees

**Medium Business ($1M-10M Revenue):**
- Gross Margin: 50-70%
- Operating Margin: 0-20%
- Growth Rate: 25-100% annually
- Customer Count: 100-10,000 customers
- Employee Count: 10-100 employees

**Large Business ($10M+ Revenue):**
- Gross Margin: 60-80%
- Operating Margin: 15-30%
- Growth Rate: 15-50% annually
- Customer Count: 1,000+ customers
- Employee Count: 100+ employees

## Regional Variations

### ${region || 'North America'} Market Characteristics
**Market Dynamics:**
- Higher customer acquisition costs due to competition
- Premium pricing potential with strong value proposition
- Mature market with established customer expectations
- Strong regulatory environment and investor ecosystem
- High talent costs but access to skilled workforce

**Financial Implications:**
- CAC typically 20-50% higher than emerging markets
- LTV potential higher due to market maturity
- Operating costs higher due to labor and infrastructure
- Access to capital more readily available
- Exit opportunities more frequent and valuable

## Industry-Specific Deep Dive

### ${industry} Financial Characteristics
**Revenue Model Patterns:**
- Recurring revenue percentage: 60-90% for mature companies
- Average contract value: Varies by market segment
- Sales cycle length: 3-18 months depending on customer size
- Upsell/cross-sell contribution: 20-40% of revenue growth

**Cost Structure:**
- **Technology Costs**: 15-25% of revenue
- **Sales & Marketing**: 30-50% of revenue (growth stage)
- **Research & Development**: 10-20% of revenue
- **General & Administrative**: 10-20% of revenue
- **Customer Success**: 5-15% of revenue

**Cash Flow Patterns:**
- Seasonal variations and impact on cash flow
- Working capital requirements and inventory needs
- Payment terms and collection periods
- Capital expenditure requirements
- Funding cycles and cash management

## Performance Percentiles

### Top Quartile (75th Percentile) Performers
- Revenue Growth: 50%+ annually
- Gross Margin: 70%+ 
- Customer Retention: 95%+
- Net Revenue Retention: 120%+
- CAC Payback: Under 12 months

### Median (50th Percentile) Performers
- Revenue Growth: 25% annually
- Gross Margin: 60%
- Customer Retention: 90%
- Net Revenue Retention: 110%
- CAC Payback: 18 months

### Bottom Quartile (25th Percentile) Performers
- Revenue Growth: 10% annually
- Gross Margin: 40%
- Customer Retention: 80%
- Net Revenue Retention: 95%
- CAC Payback: 24+ months

## Benchmarking Best Practices

### Data Collection & Analysis
1. **Peer Group Selection**: Compare with similar-stage, similar-model companies
2. **Metric Standardization**: Ensure consistent calculation methodologies
3. **Regular Updates**: Update benchmarks quarterly or semi-annually
4. **Context Consideration**: Account for business stage, model, and market differences
5. **Trend Analysis**: Track performance trends over time vs. static snapshots

### Performance Improvement
**Above Benchmark Performance:**
- Identify key success factors and best practices
- Scale successful strategies across the organization
- Consider market expansion and growth acceleration
- Maintain performance while scaling operations
- Share learnings with team and stakeholders

**Below Benchmark Performance:**
- Conduct root cause analysis of performance gaps
- Develop specific improvement plans and timelines
- Implement performance monitoring and tracking
- Consider external expertise and advisory support
- Regular review and adjustment of strategies

## Using Benchmarks for Planning

### Strategic Planning Applications
1. **Goal Setting**: Set realistic but ambitious performance targets
2. **Resource Allocation**: Allocate budget based on benchmark ratios
3. **Investment Decisions**: Evaluate ROI against industry standards
4. **Valuation Analysis**: Use benchmarks for company valuation
5. **Investor Communication**: Demonstrate performance vs. industry standards

### Operational Applications
1. **Budget Planning**: Use benchmark ratios for financial planning
2. **Hiring Decisions**: Staff according to revenue-to-employee ratios
3. **Pricing Strategy**: Price based on value delivery vs. cost structure
4. **Customer Success**: Set retention targets based on industry standards
5. **Sales Planning**: Set quotas and territories based on benchmark metrics

These financial benchmarks provide a foundation for performance measurement, goal setting, and strategic planning in the ${industry} industry.
`;
  }

  researchBestPractices(data) {
    const { area, industry, businessStage, challenge } = data;
    
    const practiceData = this.knowledgeBase.bestPractices[area.toLowerCase()] || 
                        this.knowledgeBase.bestPractices['marketing'];

    return `# Best Practices Research: ${area}

## Overview
**Focus Area**: ${area}
**Industry**: ${industry}
**Business Stage**: ${businessStage || 'Growth stage'}
**Challenge**: ${challenge || 'General optimization'}

## Core Best Practices for ${area}

### Fundamental Principles
${Object.entries(practiceData).map(([practice, description]) => 
  `**${practice.charAt(0).toUpperCase() + practice.slice(1).replace(/([A-Z])/g, ' $1')}**: ${description}`
).join('\n\n')}

## Industry-Specific Applications

### ${industry} Industry Best Practices for ${area}
**Industry Context:**
The ${industry} industry requires specialized approaches to ${area} that account for unique customer behaviors, market dynamics, and competitive landscapes.

**Key Success Factors:**
1. **Customer Understanding**: Deep knowledge of industry-specific customer needs and decision-making processes
2. **Value Communication**: Clear articulation of value in industry-relevant terms and metrics
3. **Channel Strategy**: Utilization of industry-preferred communication and distribution channels
4. **Timing Optimization**: Alignment with industry cycles, events, and seasonal patterns
5. **Compliance Awareness**: Integration of industry regulatory and compliance requirements

### Proven Strategies for ${industry}
**Strategy 1: Industry-Focused Value Proposition**
- Tailor messaging to industry-specific pain points and opportunities
- Use industry terminology and demonstrate sector expertise
- Provide case studies and references from similar companies
- Quantify value in industry-relevant metrics and benchmarks

**Strategy 2: Channel Optimization**
- Leverage industry-specific marketing channels and platforms
- Participate in industry events, conferences, and trade shows
- Partner with industry associations and thought leaders
- Utilize industry publications and media for thought leadership

**Strategy 3: Relationship Building**
- Develop long-term relationships with industry stakeholders
- Create advisory boards with industry experts and customers
- Establish strategic partnerships with complementary companies
- Build referral networks within the industry ecosystem

## Business Stage Considerations

### ${businessStage || 'Growth Stage'} Best Practices
**Stage-Specific Characteristics:**
- Resource constraints requiring efficient allocation and prioritization
- Need for scalable processes and systems that can grow with the business
- Balance between growth investment and sustainable unit economics
- Team building and organizational development challenges
- Market positioning and competitive differentiation requirements

**Recommended Approaches:**
1. **Focus and Prioritization**: Concentrate resources on highest-impact activities
2. **Measurement and Optimization**: Implement robust tracking and continuous improvement
3. **Scalable Systems**: Build processes and technology that can scale with growth
4. **Team Development**: Invest in team skills and organizational capabilities
5. **Strategic Partnerships**: Leverage partnerships to accelerate growth and capabilities

### Stage-Specific Action Items
**Immediate Priorities (Next 90 Days):**
- Implement essential tracking and measurement systems
- Establish core processes and standard operating procedures
- Identify and address top 3 performance bottlenecks
- Build key team capabilities and skills
- Launch pilot programs for new initiatives

**Short-Term Goals (3-6 Months):**
- Scale successful pilots and programs
- Optimize processes based on performance data
- Expand team capabilities and capacity
- Develop strategic partnerships and alliances
- Establish market leadership positioning

**Long-Term Objectives (6+ Months):**
- Achieve market leadership in key categories
- Build sustainable competitive advantages
- Establish industry thought leadership
- Create scalable organizational capabilities
- Prepare for next stage of business growth

## Challenge-Specific Solutions

### Addressing: ${challenge || 'Performance Optimization'}
**Challenge Analysis:**
${challenge ? `The specific challenge of "${challenge}" requires targeted strategies and solutions that address root causes while building long-term capabilities.` : 'Performance optimization in ' + area + ' requires systematic analysis and improvement of key processes and outcomes.'}

**Solution Framework:**
1. **Root Cause Analysis**: Identify underlying causes of performance gaps
2. **Best Practice Research**: Study successful approaches in similar situations
3. **Solution Design**: Develop targeted interventions and improvements
4. **Implementation Planning**: Create detailed execution plans with timelines
5. **Performance Monitoring**: Track progress and adjust strategies as needed

**Specific Recommendations:**
**Quick Wins (0-30 Days):**
- Implement low-hanging fruit improvements with immediate impact
- Optimize existing processes and eliminate inefficiencies
- Reallocate resources to highest-performing activities
- Enhance team skills through focused training and development
- Improve measurement and tracking capabilities

**Medium-Term Improvements (1-3 Months):**
- Implement systematic process improvements and optimizations
- Develop new capabilities and competencies
- Launch strategic initiatives and pilot programs
- Build partnerships and external relationships
- Establish performance management and accountability systems

**Long-Term Transformation (3+ Months):**
- Complete organizational and process transformation
- Achieve sustainable competitive advantages
- Build market-leading capabilities and position
- Establish thought leadership and industry influence
- Create scalable foundation for continued growth

## Technology and Tools

### ${area} Technology Stack
**Essential Tools:**
- Core platform or software for primary ${area} activities
- Analytics and measurement tools for performance tracking
- Automation tools for efficiency and scalability
- Collaboration tools for team coordination and communication
- Integration tools for connecting systems and data

**Advanced Capabilities:**
- AI and machine learning for optimization and personalization
- Advanced analytics for deeper insights and predictive capabilities
- Customer data platforms for unified customer views
- Marketing automation for scalable customer engagement
- Business intelligence for strategic decision making

### Implementation Priorities
1. **Foundation**: Establish core measurement and tracking capabilities
2. **Automation**: Automate repetitive tasks and processes
3. **Integration**: Connect systems for unified data and workflows
4. **Analytics**: Implement advanced analytics and reporting
5. **Innovation**: Explore emerging technologies and capabilities

## Team and Organizational Considerations

### Team Structure for ${area}
**Core Roles:**
- ${area} leader or manager with strategic oversight
- Specialist roles for key ${area} functions and capabilities
- Analyst role for measurement, reporting, and optimization
- Coordinator role for project management and execution
- Support roles for administrative and operational tasks

**Skills and Competencies:**
- Technical skills specific to ${area} tools and platforms
- Analytical skills for data analysis and performance optimization
- Strategic thinking for planning and decision making
- Communication skills for stakeholder engagement and reporting
- Project management skills for execution and delivery

### Organizational Development
**Culture and Values:**
- Data-driven decision making and continuous improvement
- Customer focus and value creation orientation
- Innovation and experimentation mindset
- Collaboration and cross-functional teamwork
- Results orientation and accountability

**Training and Development:**
- Regular skills training and professional development
- Industry conference and event participation
- Certification and continuing education programs
- Mentoring and knowledge sharing initiatives
- Performance feedback and coaching programs

## Measurement and Optimization

### Key Performance Indicators (KPIs)
**Primary Metrics:**
- Core outcome metrics specific to ${area} objectives
- Efficiency metrics measuring resource utilization and productivity
- Quality metrics ensuring standards and customer satisfaction
- Growth metrics tracking expansion and development
- Financial metrics demonstrating ROI and business impact

**Secondary Metrics:**
- Leading indicators that predict future performance
- Process metrics that track operational efficiency
- Engagement metrics that measure stakeholder involvement
- Innovation metrics that track new initiatives and experiments
- Competitive metrics that benchmark against industry standards

### Optimization Process
1. **Baseline Measurement**: Establish current performance baselines
2. **Goal Setting**: Set specific, measurable, achievable targets
3. **Experimentation**: Test new approaches and strategies
4. **Analysis**: Analyze results and identify success factors
5. **Implementation**: Scale successful approaches and eliminate ineffective ones
6. **Continuous Improvement**: Regular review and optimization cycles

## Success Stories and Case Studies

### ${industry} Success Story 1
**Company**: [Industry Leader Example]
**Challenge**: Similar challenge in ${area}
**Solution**: Strategic approach and implementation
**Results**: Quantified outcomes and business impact
**Lessons Learned**: Key insights and best practices

### ${industry} Success Story 2
**Company**: [Growth Company Example]
**Challenge**: Stage-appropriate challenge in ${area}
**Solution**: Scalable approach and execution
**Results**: Growth metrics and performance improvements
**Lessons Learned**: Practical insights for similar-stage companies

## Implementation Roadmap

### Phase 1: Foundation (Months 1-2)
- Establish baseline measurements and current state analysis
- Implement core tools and systems for ${area}
- Train team on best practices and new processes
- Launch initial improvement initiatives and quick wins
- Set up regular review and optimization processes

### Phase 2: Optimization (Months 3-6)
- Scale successful initiatives and eliminate ineffective approaches
- Implement advanced tools and capabilities
- Develop specialized team skills and competencies
- Establish strategic partnerships and external relationships
- Achieve target performance levels and benchmarks

### Phase 3: Innovation (Months 6+)
- Explore emerging technologies and advanced capabilities
- Establish thought leadership and industry recognition
- Create competitive advantages and market differentiation
- Scale successful approaches across organization
- Prepare for next level of business growth and development

These best practices provide a comprehensive framework for excellence in ${area} within the ${industry} industry, tailored for ${businessStage || 'growth stage'} businesses addressing ${challenge || 'performance optimization'}.
`;
  }

  researchTechnologyTrends(data) {
    const { industry, timeframe, technologyArea, businessImpact } = data;
    
    const techData = this.knowledgeBase.technologyTrends[technologyArea?.toLowerCase().replace(' ', '_')] || 
                    this.knowledgeBase.technologyTrends['artificial_intelligence'];

    return `# Technology Trends Research: ${industry} Industry

## Technology Landscape Overview
**Industry**: ${industry}
**Timeframe**: ${timeframe || 'Next 2-3 years'}
**Technology Focus**: ${technologyArea || 'Emerging technologies'}
**Business Impact**: ${businessImpact || 'Operational efficiency and growth'}

## Current Technology Trends

### ${technologyArea || 'Artificial Intelligence'} in ${industry}
**Impact Areas**: ${techData.impact}
**Adoption Timeline**: ${techData.timeline}
**Current Adoption**: ${techData.adoption}
**Key Considerations**: ${techData.considerations}

### Emerging Technology Trends
**1. Artificial Intelligence & Machine Learning**
- **Applications**: Predictive analytics, automation, personalization, decision support
- **Industry Impact**: Process optimization, customer experience enhancement, cost reduction
- **Implementation**: Start with specific use cases, build capabilities gradually
- **Timeline**: Immediate to 2 years for significant impact

**2. Cloud Computing & Edge Technology**
- **Applications**: Scalable infrastructure, data processing, real-time applications
- **Industry Impact**: Operational flexibility, cost optimization, global reach
- **Implementation**: Cloud-first strategy, hybrid cloud considerations
- **Timeline**: Immediate implementation and ongoing optimization

**3. Internet of Things (IoT)**
- **Applications**: Real-time monitoring, predictive maintenance, data collection
- **Industry Impact**: Operational visibility, efficiency improvements, new service models
- **Implementation**: Pilot projects, gradual sensor deployment, data strategy
- **Timeline**: 6 months to 2 years for full implementation

**4. Blockchain & Distributed Ledger**
- **Applications**: Supply chain transparency, smart contracts, trust systems
- **Industry Impact**: Process transparency, reduced intermediaries, enhanced security
- **Implementation**: Proof of concept, partnership exploration, gradual adoption
- **Timeline**: 1-3 years for mainstream business applications

**5. Augmented/Virtual Reality (AR/VR)**
- **Applications**: Training, visualization, customer experience, remote collaboration
- **Industry Impact**: Enhanced training, improved customer engagement, operational efficiency
- **Implementation**: Specific use case pilots, hardware evaluation, content development
- **Timeline**: 1-2 years for targeted applications

## Industry-Specific Technology Applications

### ${industry} Technology Priorities
**High-Impact Technologies:**
1. **Process Automation**: Streamline operations and reduce manual tasks
2. **Data Analytics**: Extract insights from business and customer data
3. **Customer Experience**: Enhance customer interactions and satisfaction
4. **Security & Compliance**: Protect data and ensure regulatory compliance
5. **Collaboration Tools**: Enable remote work and team productivity

**Technology Adoption Strategy:**
- **Phase 1**: Core infrastructure and essential tools
- **Phase 2**: Process optimization and automation
- **Phase 3**: Advanced analytics and AI capabilities
- **Phase 4**: Innovation and competitive differentiation

### Competitive Technology Landscape
**Technology Leaders in ${industry}:**
- Companies successfully leveraging technology for competitive advantage
- Innovative startups disrupting traditional business models
- Technology vendors providing industry-specific solutions
- Strategic partnerships driving technology adoption

**Technology Gaps and Opportunities:**
- Underutilized technologies with high potential impact
- Emerging technologies creating new business opportunities
- Integration opportunities between existing and new technologies
- Cost reduction opportunities through technology optimization

## Business Impact Analysis

### ${businessImpact || 'Operational Efficiency'} Impact
**Direct Benefits:**
- Process automation reducing manual effort and errors
- Data-driven decision making improving outcomes
- Customer experience enhancement increasing satisfaction and loyalty
- Cost optimization through operational efficiency
- Revenue growth through new capabilities and markets

**Quantified Impact:**
- **Cost Reduction**: 15-30% reduction in operational costs
- **Efficiency Gains**: 20-40% improvement in process efficiency
- **Revenue Growth**: 10-25% increase in revenue opportunities
- **Customer Satisfaction**: 15-25% improvement in satisfaction scores
- **Time Savings**: 30-50% reduction in manual task time

### Return on Investment (ROI)
**Investment Categories:**
- **Technology Infrastructure**: Hardware, software, cloud services
- **Implementation Services**: Consulting, integration, training
- **Ongoing Operations**: Maintenance, support, optimization
- **Change Management**: Training, process changes, organizational development

**ROI Timeline:**
- **Short-term (3-6 months)**: Basic efficiency gains and quick wins
- **Medium-term (6-18 months)**: Process optimization and automation benefits
- **Long-term (18+ months)**: Strategic advantages and competitive differentiation

## Implementation Strategy

### Technology Adoption Framework
**1. Assessment and Planning**
- Current state technology audit and gap analysis
- Business case development and ROI analysis
- Technology roadmap and implementation planning
- Vendor evaluation and selection process
- Change management and training planning

**2. Pilot Implementation**
- Small-scale pilot projects to validate approach
- Performance measurement and optimization
- Stakeholder feedback and iteration
- Risk assessment and mitigation
- Success criteria validation

**3. Scaled Deployment**
- Gradual rollout across organization or processes
- Performance monitoring and continuous improvement
- User training and support programs
- Integration with existing systems and processes
- Success measurement and reporting

**4. Optimization and Innovation**
- Ongoing performance optimization and enhancement
- Advanced feature adoption and capability building
- Innovation exploration and experimentation
- Competitive analysis and market positioning
- Future technology planning and roadmap updates

### Risk Management
**Technology Risks:**
- **Implementation Risk**: Project delays, cost overruns, technical issues
- **Adoption Risk**: User resistance, training gaps, change management
- **Security Risk**: Data breaches, system vulnerabilities, compliance issues
- **Vendor Risk**: Vendor reliability, support quality, technology changes
- **Integration Risk**: System compatibility, data migration, workflow disruption

**Risk Mitigation Strategies:**
- Comprehensive planning and phased implementation
- Strong vendor relationships and support agreements
- Robust security measures and compliance frameworks
- Change management and user training programs
- Backup systems and contingency planning

## Future Technology Outlook

### ${timeframe || 'Next 2-3 Years'} Predictions
**Emerging Technologies:**
- Next-generation AI with improved capabilities and accessibility
- Quantum computing applications for specific business problems
- Advanced automation and robotics integration
- Enhanced augmented reality and virtual reality applications
- Improved blockchain and cryptocurrency business applications

**Industry Evolution:**
- Digital-first business models becoming standard
- Data-driven decision making across all business functions
- Automation extending to complex knowledge work
- Customer expectations for personalized, real-time experiences
- Sustainability and environmental considerations driving technology choices

### Strategic Recommendations
**Technology Investment Priorities:**
1. **Foundation Technologies**: Ensure robust cloud infrastructure and data platforms
2. **Automation Capabilities**: Implement process automation for efficiency gains
3. **Analytics and AI**: Build data analytics and artificial intelligence capabilities
4. **Customer Technology**: Invest in customer experience and engagement platforms
5. **Security Infrastructure**: Maintain strong cybersecurity and compliance systems

**Innovation Approach:**
- **Experiment Early**: Test emerging technologies through pilot projects
- **Build Capabilities**: Develop internal technology skills and competencies
- **Partner Strategically**: Form alliances with technology providers and innovators
- **Monitor Trends**: Continuously track technology developments and opportunities
- **Invest Wisely**: Balance proven technologies with strategic innovation investments

## Technology Vendor Landscape

### Key Technology Providers
**Enterprise Software:**
- Major platform providers with comprehensive solutions
- Specialized vendors with industry-specific offerings
- Emerging companies with innovative approaches
- Open source solutions and community-supported platforms

**Implementation Partners:**
- System integrators and implementation consultants
- Industry-specific technology consultants
- Training and change management specialists
- Ongoing support and maintenance providers

### Vendor Selection Criteria
**Evaluation Factors:**
1. **Technology Capabilities**: Functionality, scalability, integration capabilities
2. **Industry Expertise**: Industry knowledge and specific solution experience
3. **Implementation Support**: Professional services and implementation methodology
4. **Ongoing Support**: Customer service, training, and continuous improvement
5. **Financial Stability**: Vendor viability and long-term technology roadmap

## Technology Team and Skills

### Required Capabilities
**Technical Skills:**
- Technology platform expertise and certification
- Data analysis and business intelligence capabilities
- Project management and implementation experience
- Integration and system architecture knowledge
- Cybersecurity and compliance understanding

**Business Skills:**
- Industry knowledge and business process understanding
- Change management and user training capabilities
- Vendor management and contract negotiation
- Strategic planning and roadmap development
- Performance measurement and optimization

### Team Development Strategy
**Internal Capability Building:**
- Training and certification programs for existing staff
- Hiring specialists with required technology expertise
- Cross-functional collaboration and knowledge sharing
- External training and professional development
- Technology mentoring and coaching programs

**External Support:**
- Technology consultants for specialized expertise
- Implementation partners for complex projects
- Training providers for skill development
- Industry associations for knowledge sharing
- Vendor support for ongoing optimization

This technology trends research provides a comprehensive foundation for technology strategy and implementation planning in the ${industry} industry, focusing on ${businessImpact || 'operational efficiency and growth'} over the ${timeframe || 'next 2-3 years'}.
`;
  }

  storeKnowledge(data) {
    const { category, topic, content, source, tags } = data;
    
    // In a real implementation, this would store to Supabase
    // For now, we'll simulate storage and provide confirmation
    
    const timestamp = new Date().toISOString();
    const knowledgeEntry = {
      id: `${category}_${topic}_${Date.now()}`,
      category,
      topic,
      content,
      source: source || 'User input',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      createdAt: timestamp,
      updatedAt: timestamp
    };

    return `✅ Knowledge Successfully Stored

**Entry Details:**
- **ID**: ${knowledgeEntry.id}
- **Category**: ${category}
- **Topic**: ${topic}
- **Source**: ${knowledgeEntry.source}
- **Tags**: ${knowledgeEntry.tags.join(', ') || 'None'}
- **Created**: ${timestamp}

**Content Preview:**
${content.substring(0, 200)}${content.length > 200 ? '...' : ''}

**Storage Confirmation:**
The knowledge has been stored in the ${category} category and can be retrieved for future queries related to ${topic}.

**Next Steps:**
- The stored knowledge will be available for future research queries
- Consider adding related knowledge entries for comprehensive coverage
- Regular updates ensure information remains current and accurate
- Knowledge can be enhanced with additional sources and validation

**Query Examples:**
- "Query industry knowledge about ${topic}"
- "Research best practices for ${topic}"
- "Find regulations related to ${topic}"

The knowledge base is continuously growing to provide better research and analysis capabilities for business plan generation.`;
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new KnowledgeBaseServer();
server.start().catch(console.error);