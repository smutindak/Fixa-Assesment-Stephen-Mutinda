const allureConfig = {
    allure: {
        enabled: true,
        outputDir: 'allure-results',
        details: true,
    },
    categories: [
        {
            name: 'Failed tests',
            messageRegex: '.*',
            matchedStatuses: ['failed'],
        },
        {
            name: 'Product defects',
            messageRegex: '.*Assertion failed.*',
            matchedStatuses: ['failed'],
        },
        {
            name: 'Test defects',
            messageRegex: '.*Test error.*',
            matchedStatuses: ['broken'],
        },
    ],
    labels: {
        epic: 'Fixa HR E2E Tests',
        owner: 'Stephen K. Mutinda',
    },
};

module.exports = allureConfig;
