import { Reporter, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class CustomReporter implements Reporter {
    private config!: FullConfig;
    private logs: string[] = [];

    onBegin(config: FullConfig, suite: Suite) {
        this.config = config;
        this.logs.push(`Test execution started at ${new Date().toISOString()}`);
        this.logs.push(`Running ${suite.allTests().length} tests`);
    }

    onTestBegin(test: TestCase) {
        this.logs.push(`Starting test: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.logs.push(`Finished test: ${test.title}`);
        this.logs.push(`Status: ${result.status}`);
        if (result.status === 'failed') {
            this.logs.push(`Error: ${result.error?.message || 'Unknown error'}`);
        }
    }

    onEnd(result: { status?: string }) {
        this.logs.push(`Test execution finished at ${new Date().toISOString()}`);
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
