// PHASE 1 — RED TEST
// Validates current state BEFORE changes. All assertions should PASS now.

import { readFileSync, existsSync } from 'fs'

let passed = 0
let failed = 0

function assert(condition, label) {
  if (condition) {
    console.log(`  ✅ PASS: ${label}`)
    passed++
  } else {
    console.log(`  ❌ FAIL: ${label}`)
    failed++
  }
}

function assertNot(condition, label) {
  if (!condition) {
    console.log(`  ✅ PASS: ${label}`)
    passed++
  } else {
    console.log(`  ❌ FAIL: ${label}`)
    failed++
  }
}

// --- Load package.json ---
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))
const devDeps = pkg.devDependencies || {}
const scripts = pkg.scripts || {}

console.log('\n📋 Task 1.1 — package.json RED tests\n')

// @commitlint/cli should NOT be present yet
assertNot(devDeps['@commitlint/cli'], '@commitlint/cli NOT in devDependencies')

// @commitlint/config-conventional should NOT be present yet
assertNot(devDeps['@commitlint/config-conventional'], '@commitlint/config-conventional NOT in devDependencies')

// changelogen should NOT be present yet
assertNot(devDeps['changelogen'], 'changelogen NOT in devDependencies')

// gh-pages SHOULD be present
assert(devDeps['gh-pages'], 'gh-pages IS in devDependencies')

// lint-staged key SHOULD exist
assert(pkg['lint-staged'], 'lint-staged key exists in package.json')

// predeploy script SHOULD exist
assert(scripts['predeploy'], 'predeploy script exists')

// deploy script SHOULD exist
assert(scripts['deploy'], 'deploy script exists')

// New scripts should NOT exist yet
assertNot(scripts['release:bump'], 'release:bump script NOT present yet')
assertNot(scripts['release:tag'], 'release:tag script NOT present yet')
assertNot(scripts['changelog:preview'], 'changelog:preview script NOT present yet')

console.log('\n📋 Task 1.2 — commitlint.config.js RED tests\n')

assertNot(existsSync('./commitlint.config.js'), 'commitlint.config.js does NOT exist yet')

console.log('\n📋 Task 1.3 — .changelogenrc RED tests\n')

assertNot(existsSync('./.changelogenrc'), '.changelogenrc does NOT exist yet')

console.log('\n📋 Task 1.4 — .husky/commit-msg RED tests\n')

assertNot(existsSync('./.husky/commit-msg'), '.husky/commit-msg does NOT exist yet')

console.log('\n📋 Task 1.5 — .pre-commit-config.yaml RED tests\n')

assert(existsSync('./.pre-commit-config.yaml'), '.pre-commit-config.yaml EXISTS (will be removed)')

// --- Summary ---
console.log(`\n${'='.repeat(50)}`)
console.log(`RED TEST SUMMARY: ${passed} passed, ${failed} failed`)
console.log(`${'='.repeat(50)}\n`)

process.exit(failed > 0 ? 1 : 0)
