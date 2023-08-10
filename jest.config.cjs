module.exports = {
    preset: 'ts-jest',
    experimentalModules: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testTimeout: 30000
};