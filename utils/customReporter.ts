import { Reporter, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class CustomReporter implements Reporter {
    private config!: FullConfig;
    private logs: string[] = [];
    private startTime: number;

    constructor() {
        this.startTime = Date.now();
    }

    onBegin(config: FullConfig, suite: Suite) {
        this.config = config;
        this.logs.push(`Test execution started at ${new Date().toISOString()}`);
        this.logs.push(`Running ${suite.allTests().length} tests`);
    }

    onTestBegin(test: TestCase) {
        this.logs.push(`Starting test: ${test.title}`);
        
        // Add Allure labels and metadata
        test.annotations.push({ type: 'feature', description: test.parent.title });
        test.annotations.push({ type: 'story', description: test.title });
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.logs.push(`Finished test: ${test.title}`);
        this.logs.push(`Status: ${result.status}`);
        
        // Add additional metadata for Allure
        const testInfo = {
            title: test.title,
            duration: result.duration,
            status: result.status,
            browser: this.config.projects[0]?.name || 'unknown',
            timestamp: new Date().toISOString()
        };
        
        if (result.status === 'failed') {
            this.logs.push(`Error: ${result.error?.message || 'Unknown error'}`);
            testInfo['error'] = result.error?.message || 'Unknown error';
            testInfo['stack'] = result.error?.stack;
        }
        
        // Store test metadata for Allure
        test.annotations.push({ type: 'metadata', description: JSON.stringify(testInfo) });
    }

    onEnd(result: { status?: string }) {
        const duration = Date.now() - this.startTime;
        this.logs.push(`Test execution finished at ${new Date().toISOString()}`);
        this.logs.push(`Total duration: ${duration}ms`);
        this.logs.push(`Final status: ${result.status}`);
        
        // Create logs directory if it doesn't exist
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }

        // Write logs to file
        const logFile = path.join(logsDir, `test-run-${Date.now()}.log`);
        fs.writeFileSync(logFile, this.logs.join('\n'));
    }
}

export default CustomReporter;
