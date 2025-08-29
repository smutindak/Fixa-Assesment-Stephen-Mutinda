import { faker } from '@faker-js/faker';

export interface EmployeeData {
    passportNum: string;
    firstName: string;
    lastName: string;
    phoneNum: string;
    nationality: string;
    rate: string;
    accountNum: string;
    fileName: string;
    gender: 'Male' | 'Female';
}

export class TestDataGenerator {
    static generatePhoneNumber(countryCode: string = '2547'): string {
        const prefix = countryCode;
        const totalLength = 12;
        const remainingLength = totalLength - prefix.length;

        let number = '';
        for (let i = 0; i < remainingLength; i++) {
            number += Math.floor(Math.random() * 10);
        }

        return prefix + number;
    }

    static generateRandomID(length: number = 8): string {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    }

    static generateEmployeeData(overrides: Partial<EmployeeData> = {}): EmployeeData {
        return {
            passportNum: this.generateRandomID(8),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phoneNum: this.generatePhoneNumber(),
            nationality: 'Kenya',
            rate: '500',
            accountNum: '00145628',
            fileName: 'FixaUpload.pdf',
            gender: 'Female',
            ...overrides
        };
    }
}
