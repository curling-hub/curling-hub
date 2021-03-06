const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

module.exports = createJestConfig({
    setupFilesAfterEnv: ['./jest.setup.js'],
    testRegex: '(/__tests__/.*)\\.[jt]sx?$',
})
