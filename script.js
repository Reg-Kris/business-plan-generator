class BusinessPlanGenerator {
    constructor() {
        this.form = document.getElementById('businessPlanForm');
        this.aiAnalysisBtn = document.getElementById('aiAnalysisBtn');
        this.previewBtn = document.getElementById('previewBtn');
        this.generateBtn = document.getElementById('generateBtn');
        this.aiAnalysisSection = document.getElementById('aiAnalysisSection');
        this.previewSection = document.getElementById('previewSection');
        this.previewContent = document.getElementById('previewContent');
        this.copyPromptBtn = document.getElementById('copyPromptBtn');
        this.processAnalysisBtn = document.getElementById('processAnalysisBtn');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.aiAnalysisBtn.addEventListener('click', () => this.showAIAnalysis());
        this.previewBtn.addEventListener('click', () => this.generatePreview());
        this.generateBtn.addEventListener('click', () => this.generatePDF());
        this.copyPromptBtn.addEventListener('click', () => this.copyPrompt());
        this.processAnalysisBtn.addEventListener('click', () => this.processAIAnalysis());
        
        this.form.addEventListener('input', () => this.validateForm());
        
        // Initialize tabs
        this.initializeTabs();
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        return data;
    }

    validateForm() {
        const requiredFields = ['businessName', 'businessType', 'industry', 'businessDescription', 'targetMarket'];
        const data = this.collectFormData();
        
        const isValid = requiredFields.every(field => data[field] && data[field].length > 0);
        
        this.previewBtn.disabled = !isValid;
        this.generateBtn.disabled = !isValid;
        
        return isValid;
    }

    generatePreview() {
        const data = this.collectFormData();
        const businessPlanHTML = this.createBusinessPlanHTML(data);
        
        this.previewContent.innerHTML = businessPlanHTML;
        this.previewSection.style.display = 'block';
        this.previewSection.scrollIntoView({ behavior: 'smooth' });
        
        this.createFinancialChart(data);
    }

    createBusinessPlanHTML(data) {
        return `
            <div class="business-plan">
                <h1>${data.businessName || 'Business Name'} - Business Plan</h1>
                
                <h2>Executive Summary</h2>
                <p><strong>Business Name:</strong> ${data.businessName}</p>
                <p><strong>Business Type:</strong> ${this.formatBusinessType(data.businessType)}</p>
                <p><strong>Industry:</strong> ${data.industry}</p>
                <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
                <p>${data.businessDescription}</p>
                
                <h2>Business Overview</h2>
                <h3>Mission Statement</h3>
                <p>${data.businessDescription}</p>
                
                <h3>Unique Value Proposition</h3>
                <p>${data.uniqueValue || 'To be developed based on market analysis and competitive positioning.'}</p>
                
                <h2>Market Analysis</h2>
                <h3>Target Market</h3>
                <p>${data.targetMarket}</p>
                
                <h3>Market Size</h3>
                <p>${data.marketSize ? `Estimated market size: ${data.marketSize}` : 'Market size analysis to be conducted.'}</p>
                
                <h3>Competitive Analysis</h3>
                <p>${data.competitors || 'Competitive analysis to be developed through market research.'}</p>
                
                <h2>Organization & Management</h2>
                <h3>Business Structure</h3>
                <p>This business will be organized as a <strong>${this.formatBusinessType(data.businessType)}</strong>.</p>
                
                <h3>Management Team</h3>
                <p>${data.teamMembers || 'Management team structure to be defined.'}</p>
                
                <h2>Operations Plan</h2>
                <p>${data.operations || 'Detailed operations plan to be developed.'}</p>
                
                <h2>Marketing & Sales Strategy</h2>
                <p>${data.marketingStrategy || 'Marketing strategy will focus on identifying and reaching target customers through appropriate channels.'}</p>
                
                <h2>Financial Projections</h2>
                <div id="financialChart" class="chart-container">
                    <canvas id="revenueChart" width="400" height="200"></canvas>
                </div>
                
                ${this.createFinancialTable(data)}
                
                <h2>Funding Requirements</h2>
                <p>${data.fundingNeeded ? `Total funding required: $${parseInt(data.fundingNeeded).toLocaleString()}` : 'Funding requirements to be determined based on detailed financial analysis.'}</p>
                
                <h2>Risk Analysis</h2>
                <p>Key risks and mitigation strategies will be identified through comprehensive market and operational analysis.</p>
                
                <h2>Growth Strategy</h2>
                <p>Long-term growth plans will be developed based on market response and operational efficiency.</p>
            </div>
        `;
    }

    formatBusinessType(type) {
        const types = {
            'sole-proprietorship': 'Sole Proprietorship',
            'partnership': 'Partnership',
            'llc': 'Limited Liability Company (LLC)',
            'corporation': 'Corporation',
            'nonprofit': 'Nonprofit Organization'
        };
        return types[type] || type;
    }

    createFinancialTable(data) {
        const hasFinancialData = data.startupCosts || data.monthlyExpenses || data.year1Revenue || data.year2Revenue;
        
        if (!hasFinancialData) {
            return '<p><em>Financial projections to be developed based on detailed cost analysis and market research.</em></p>';
        }

        return `
            <table class="financial-table">
                <thead>
                    <tr>
                        <th>Financial Item</th>
                        <th>Amount (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.startupCosts ? `<tr><td>Startup Costs</td><td>$${parseInt(data.startupCosts).toLocaleString()}</td></tr>` : ''}
                    ${data.monthlyExpenses ? `<tr><td>Monthly Operating Expenses</td><td>$${parseInt(data.monthlyExpenses).toLocaleString()}</td></tr>` : ''}
                    ${data.year1Revenue ? `<tr><td>Year 1 Revenue Projection</td><td>$${parseInt(data.year1Revenue).toLocaleString()}</td></tr>` : ''}
                    ${data.year2Revenue ? `<tr><td>Year 2 Revenue Projection</td><td>$${parseInt(data.year2Revenue).toLocaleString()}</td></tr>` : ''}
                    ${data.fundingNeeded ? `<tr><td>Funding Required</td><td>$${parseInt(data.fundingNeeded).toLocaleString()}</td></tr>` : ''}
                </tbody>
            </table>
        `;
    }

    createFinancialChart(data) {
        const canvas = document.getElementById('revenueChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }

        const year1 = parseInt(data.year1Revenue) || 0;
        const year2 = parseInt(data.year2Revenue) || year1 * 1.2;
        const year3 = year2 * 1.15;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3 (Projected)'],
                datasets: [{
                    label: 'Revenue Projections',
                    data: [year1, year2, year3],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Revenue Projections',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    async generatePDF() {
        const data = this.collectFormData();
        
        if (!this.validateForm()) {
            alert('Please fill in all required fields before generating the PDF.');
            return;
        }

        try {
            this.generateBtn.innerHTML = 'Generating PDF...';
            this.generateBtn.disabled = true;

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            let currentY = margin;

            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text(`${data.businessName} - Business Plan`, margin, currentY);
            currentY += 20;

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, currentY);
            currentY += 20;

            const sections = [
                {
                    title: 'Executive Summary',
                    content: [
                        `Business Name: ${data.businessName}`,
                        `Business Type: ${this.formatBusinessType(data.businessType)}`,
                        `Industry: ${data.industry}`,
                        `Location: ${data.location || 'Not specified'}`,
                        '',
                        data.businessDescription
                    ]
                },
                {
                    title: 'Market Analysis',
                    content: [
                        'Target Market:',
                        data.targetMarket,
                        '',
                        data.marketSize ? `Market Size: ${data.marketSize}` : '',
                        '',
                        'Competitive Analysis:',
                        data.competitors || 'To be developed through market research.'
                    ]
                },
                {
                    title: 'Organization & Management',
                    content: [
                        `Business Structure: ${this.formatBusinessType(data.businessType)}`,
                        '',
                        'Management Team:',
                        data.teamMembers || 'Management structure to be defined.'
                    ]
                },
                {
                    title: 'Operations Plan',
                    content: [
                        data.operations || 'Detailed operations plan to be developed.'
                    ]
                },
                {
                    title: 'Marketing Strategy',
                    content: [
                        data.marketingStrategy || 'Marketing strategy to be developed.',
                        '',
                        'Unique Value Proposition:',
                        data.uniqueValue || 'To be defined through competitive analysis.'
                    ]
                },
                {
                    title: 'Financial Projections',
                    content: [
                        data.startupCosts ? `Startup Costs: $${parseInt(data.startupCosts).toLocaleString()}` : '',
                        data.monthlyExpenses ? `Monthly Expenses: $${parseInt(data.monthlyExpenses).toLocaleString()}` : '',
                        data.year1Revenue ? `Year 1 Revenue: $${parseInt(data.year1Revenue).toLocaleString()}` : '',
                        data.year2Revenue ? `Year 2 Revenue: $${parseInt(data.year2Revenue).toLocaleString()}` : '',
                        data.fundingNeeded ? `Funding Required: $${parseInt(data.fundingNeeded).toLocaleString()}` : ''
                    ].filter(item => item !== '')
                }
            ];

            for (const section of sections) {
                if (currentY > pageHeight - 40) {
                    doc.addPage();
                    currentY = margin;
                }

                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text(section.title, margin, currentY);
                currentY += 10;

                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');

                for (const line of section.content) {
                    if (line === '') {
                        currentY += 5;
                        continue;
                    }

                    const lines = doc.splitTextToSize(line, pageWidth - 2 * margin);
                    for (const splitLine of lines) {
                        if (currentY > pageHeight - 20) {
                            doc.addPage();
                            currentY = margin;
                        }
                        doc.text(splitLine, margin, currentY);
                        currentY += 6;
                    }
                }
                currentY += 10;
            }

            const fileName = `${data.businessName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_business_plan.pdf`;
            doc.save(fileName);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            this.generateBtn.innerHTML = 'Generate Business Plan PDF';
            this.generateBtn.disabled = false;
        }
    }

    initializeTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateAnalysisPrompt(btn.dataset.tab);
            });
        });
    }

    showAIAnalysis() {
        const data = this.collectFormData();
        
        if (!this.validateBasicInfo()) {
            alert('Please fill in the basic business information first.');
            return;
        }

        this.updateAnalysisPrompt('swot');
        this.aiAnalysisSection.style.display = 'block';
        this.aiAnalysisSection.scrollIntoView({ behavior: 'smooth' });
    }

    validateBasicInfo() {
        const basicFields = ['businessName', 'industry', 'businessDescription'];
        const data = this.collectFormData();
        return basicFields.every(field => data[field] && data[field].length > 0);
    }

    updateAnalysisPrompt(type) {
        const data = this.collectFormData();
        const prompts = {
            swot: this.generateSWOTPrompt(data),
            financial: this.generateFinancialPrompt(data),
            market: this.generateMarketPrompt(data),
            strategy: this.generateStrategyPrompt(data)
        };
        
        document.getElementById('generatedPrompt').textContent = prompts[type];
    }

    generateSWOTPrompt(data) {
        return `Please perform a comprehensive SWOT analysis for my business:

Business Name: ${data.businessName}
Industry: ${data.industry}
Business Type: ${data.businessType || 'Not specified'}
Target Market: ${data.targetMarket || 'Not specified'}
Location: ${data.location || 'Not specified'}

Business Description:
${data.businessDescription}

Please provide:
1. 🟢 STRENGTHS: Internal positive factors that give competitive advantage
2. 🔴 WEAKNESSES: Internal negative factors that need improvement
3. 🟡 OPPORTUNITIES: External positive factors that can be leveraged
4. ⚫ THREATS: External negative factors that could pose risks

For each category, provide 4-6 specific, actionable points with brief explanations. Focus on realistic assessment based on the business type and industry.`;
    }

    generateFinancialPrompt(data) {
        const financialInfo = [
            data.startupCosts ? `Startup Costs: $${data.startupCosts}` : '',
            data.monthlyExpenses ? `Monthly Expenses: $${data.monthlyExpenses}` : '',
            data.year1Revenue ? `Year 1 Revenue Target: $${data.year1Revenue}` : '',
            data.year2Revenue ? `Year 2 Revenue Target: $${data.year2Revenue}` : '',
            data.fundingNeeded ? `Funding Needed: $${data.fundingNeeded}` : ''
        ].filter(item => item !== '').join('\n');

        return `Please analyze the financial projections and provide detailed insights for my business:

Business: ${data.businessName} (${data.industry})
${data.businessDescription}

Current Financial Information:
${financialInfo || 'No specific financial data provided - please provide general industry benchmarks'}

Please provide:
1. 💰 FINANCIAL ANALYSIS: Break-even analysis, cash flow projections, ROI calculations
2. 📊 INDUSTRY BENCHMARKS: How these numbers compare to industry standards
3. 🎯 KEY METRICS: Important KPIs to track for this business type
4. ⚠️ FINANCIAL RISKS: Potential financial challenges and mitigation strategies
5. 💡 OPTIMIZATION: Recommendations for improving financial performance

Include specific numbers and actionable recommendations.`;
    }

    generateMarketPrompt(data) {
        return `Please conduct comprehensive market research for my business:

Business: ${data.businessName}
Industry: ${data.industry}
Target Market: ${data.targetMarket || 'To be defined'}
Business Description: ${data.businessDescription}
Location: ${data.location || 'Not specified'}
Competitors: ${data.competitors || 'Not specified'}

Please analyze:
1. 🎯 MARKET SIZE: TAM, SAM, SOM analysis for this industry
2. 🏢 COMPETITIVE LANDSCAPE: Key competitors, market positioning, competitive advantages
3. 👥 CUSTOMER PERSONAS: Detailed target customer profiles and buying behavior
4. 📈 MARKET TRENDS: Current trends, growth opportunities, emerging technologies
5. 🚀 MARKET ENTRY: Recommended go-to-market strategy and market penetration approach
6. 📊 VALIDATION: Methods to validate market demand and product-market fit

Provide specific, actionable insights with industry data where possible.`;
    }

    generateStrategyPrompt(data) {
        return `Please develop a comprehensive business strategy for:

Business: ${data.businessName} (${data.industry})
${data.businessDescription}

Current Information:
- Target Market: ${data.targetMarket || 'To be defined'}
- Marketing Strategy: ${data.marketingStrategy || 'To be developed'}
- Unique Value Prop: ${data.uniqueValue || 'To be defined'}
- Operations: ${data.operations || 'To be planned'}
- Team: ${data.teamMembers || 'To be built'}

Please provide strategic recommendations for:
1. 🎯 POSITIONING: Unique value proposition and market positioning strategy
2. 🚀 GROWTH STRATEGY: Short-term (6-12 months) and long-term (2-3 years) growth plans
3. 📱 MARKETING & SALES: Customer acquisition channels and sales strategy
4. ⚙️ OPERATIONS: Operational efficiency and scalability recommendations
5. 🤝 PARTNERSHIPS: Strategic partnership opportunities
6. 🛡️ RISK MANAGEMENT: Key risks and mitigation strategies
7. 📈 SUCCESS METRICS: KPIs and milestones to track progress

Focus on actionable, specific recommendations that can be implemented immediately.`;
    }

    async copyPrompt() {
        const promptText = document.getElementById('generatedPrompt').textContent;
        
        try {
            await navigator.clipboard.writeText(promptText);
            this.copyPromptBtn.innerHTML = '✅ Copied!';
            setTimeout(() => {
                this.copyPromptBtn.innerHTML = '📋 Copy Prompt';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = promptText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            this.copyPromptBtn.innerHTML = '✅ Copied!';
            setTimeout(() => {
                this.copyPromptBtn.innerHTML = '📋 Copy Prompt';
            }, 2000);
        }
    }

    processAIAnalysis() {
        const aiResults = document.getElementById('aiResults').value.trim();
        
        if (!aiResults) {
            alert('Please paste Claude\'s analysis results first.');
            return;
        }

        // Store AI analysis results
        this.aiAnalysisResults = aiResults;
        
        // Update preview with AI insights
        this.generateEnhancedPreview();
        
        // Show success message
        alert('AI analysis processed! Your business plan preview has been updated with AI insights.');
        
        // Clear the textarea
        document.getElementById('aiResults').value = '';
    }

    generateEnhancedPreview() {
        const data = this.collectFormData();
        const enhancedHTML = this.createEnhancedBusinessPlanHTML(data);
        
        this.previewContent.innerHTML = enhancedHTML;
        this.previewSection.style.display = 'block';
        this.previewSection.scrollIntoView({ behavior: 'smooth' });
        
        this.createFinancialChart(data);
    }

    createEnhancedBusinessPlanHTML(data) {
        const baseHTML = this.createBusinessPlanHTML(data);
        
        if (this.aiAnalysisResults) {
            const aiSection = `
                <h2>🤖 AI-Powered Strategic Analysis</h2>
                <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                    <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${this.aiAnalysisResults}</pre>
                </div>
            `;
            
            // Insert AI analysis after the executive summary
            return baseHTML.replace('<h2>Business Overview</h2>', aiSection + '<h2>Business Overview</h2>');
        }
        
        return baseHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BusinessPlanGenerator();
});