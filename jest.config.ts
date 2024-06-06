import {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './',
    setupFilesAfterEnv: ['./test/jest.setup.ts'],
    globalSetup: './test/jest.global-setup.ts',
    globalTeardown: './test/jest.global-teardown.ts',
    testMatch: ['**/test/routes/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    //testPathIgnorePatterns: ['webapp/**/*.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
}

export default config;