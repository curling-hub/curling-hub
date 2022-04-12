const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

module.exports = createJestConfig({
    testRegex: '(/__tests__/.*)\\.[jt]sx?$',
})