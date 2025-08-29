const allureConfig = {
    allure: {
        enabled: true,
        outputDir: 'allure-results',
        details: true,
        reportDir: 'allure-report',
    },
    categories: [
        {
            name: 'Passed Tests',
            messageRegex: '.*',
            matchedStatuses: ['passed'],
            traceRegex: '.*'
        },
        {
            name: 'Failed Tests',
            messageRegex: '.*',
            matchedStatuses: ['failed'],
            traceRegex: '.*'
        },
        {
            name: 'Skipped Tests',
            messageRegex: '.*',
            matchedStatuses: ['skipped'],
            traceRegex: '.*'
        },
        {
            name: 'Product Defects',
            messageRegex: '.*Assertion failed.*|.*Element not found.*|.*Timeout.*',
            matchedStatuses: ['failed'],
            traceRegex: '.*'
        },
        {
            name: 'Test Defects',
            messageRegex: '.*Test error.*|.*TypeError.*|.*ReferenceError.*',
            matchedStatuses: ['broken'],
            traceRegex: '.*'
        },
        {
            name: 'Flaky Tests',
            messageRegex: '.*',
            matchedStatuses: ['passed', 'failed', 'broken'],
            traceRegex: '.*retry.*'
        }
    ],
    labels: {
        epic: 'Fixa HR E2E Tests',
        owner: 'Stephen K. Mutinda',
    },
    reportOptions: {
        markdown: true,
        embedVideo: true,
        hierarchy: true,
        charts: true,
        reportName: "Fixa HR Automation Test Report",
        showAllAttachments: true
    },
    // Status priorities for better categorization
    statusMapping: {
        passed: 'passed',
        failed: 'failed',
        broken: 'broken',
        skipped: 'skipped',
        unknown: 'unknown'
    }
};

module.exports = allureConfig;
