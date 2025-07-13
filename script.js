class BusinessPlanGenerator {
    constructor() {
        this.form = document.getElementById('businessPlanForm');
        this.previewBtn = document.getElementById('previewBtn');
        this.generateBtn = document.getElementById('generateBtn');
        this.previewSection = document.getElementById('previewSection');
        this.previewContent = document.getElementById('previewContent');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.previewBtn.addEventListener('click', () => this.generatePreview());
        this.generateBtn.addEventListener('click', () => this.generatePDF());
        
        this.form.addEventListener('input', () => this.validateForm());
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
}

document.addEventListener('DOMContentLoaded', () => {
    new BusinessPlanGenerator();
});