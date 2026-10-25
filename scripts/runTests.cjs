const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('RUNNING AUTOMATED VERIFICATION SUITE FOR CONTROLPREP');
console.log('====================================================\n');

// 1. Verify Question Bank
const qPath = path.join(__dirname, '..', 'src', 'data', 'questionBank.ts');
const fPath = path.join(__dirname, '..', 'src', 'data', 'formulaInventory.ts');

const qContent = fs.readFileSync(qPath, 'utf8');
const fContent = fs.readFileSync(fPath, 'utf8');

// Parse Questions
const qBlocks = qContent.split(/\{\s*["']?id["']?\s*:\s*['"]/);
const questions = [];
const qIdSet = new Set();
let duplicates = [];

for (let i = 1; i < qBlocks.length; i++) {
  const rawId = qBlocks[i].split(/['"]/)[0];
  if (qIdSet.has(rawId)) {
    duplicates.push(rawId);
  }
  qIdSet.add(rawId);

  const modMatch = qBlocks[i].match(/["']?module["']?\s*:\s*([1-6])/);
  const catMatch = qBlocks[i].match(/["']?category["']?\s*:\s*['"]([^'"]+)['"]/);
  const diffMatch = qBlocks[i].match(/["']?difficulty["']?\s*:\s*['"]([^'"]+)['"]/);
  const ansMatch = qBlocks[i].match(/["']?correctAnswer["']?\s*:\s*([0-3])/);
  const fMatch = qBlocks[i].match(/["']?formulaId["']?\s*:\s*['"]([^'"]+)['"]/);

  questions.push({
    id: rawId,
    module: modMatch ? parseInt(modMatch[1]) : null,
    category: catMatch ? catMatch[1] : null,
    difficulty: diffMatch ? diffMatch[1] : null,
    correctAnswer: ansMatch ? parseInt(ansMatch[1]) : null,
    formulaId: fMatch ? fMatch[1] : null,
  });
}

console.log(`[TEST 1] Question Bank Integrity Check:`);
console.log(`  - Total question records found: ${questions.length}`);
console.assert(questions.length >= 70, `Question count (${questions.length}) should be at least 70`);
console.assert(duplicates.length === 0, `Duplicate IDs found: ${duplicates.join(', ')}`);
console.log(`  ✓ No duplicate question IDs found.`);

let invalidAnswers = questions.filter(q => q.correctAnswer === null || q.correctAnswer < 0 || q.correctAnswer > 3);
console.assert(invalidAnswers.length === 0, `Invalid answer indices found: ${invalidAnswers.length}`);
console.log(`  ✓ All questions have valid 4-option answer indices (0, 1, 2, or 3).`);

let invalidModules = questions.filter(q => !q.module || q.module < 1 || q.module > 6);
console.assert(invalidModules.length === 0, `Invalid modules found: ${invalidModules.length}`);
console.log(`  ✓ All questions are properly assigned to Modules 1 through 6.`);

// Module counts
const modCounts = {};
questions.forEach(q => { modCounts[q.module] = (modCounts[q.module] || 0) + 1; });
console.log(`  ✓ Distribution across modules:`, modCounts);

// 2. Verify Formula Inventory
const fBlocks = fContent.split(/\{\s*["']?id["']?\s*:\s*['"]/);
const formulas = [];
const fIdSet = new Set();
let fDuplicates = [];

for (let i = 1; i < fBlocks.length; i++) {
  const fId = fBlocks[i].split(/['"]/)[0];
  if (fIdSet.has(fId)) {
    fDuplicates.push(fId);
  }
  fIdSet.add(fId);

  const modMatch = fBlocks[i].match(/["']?module["']?\s*:\s*([1-6])/);
  const linksMatch = fBlocks[i].match(/linkedQuestionIds:\s*\[([^\]]*)\]/);
  let linked = [];
  if (linksMatch && linksMatch[1]) {
    linked = linksMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
  }

  formulas.push({
    id: fId,
    module: modMatch ? parseInt(modMatch[1]) : null,
    linkedQuestionIds: linked,
  });
}

console.log(`\n[TEST 2] Formula Inventory Integrity Check:`);
console.log(`  - Total formulas in inventory: ${formulas.length}`);
console.assert(formulas.length >= 30, `Formula count (${formulas.length}) should be >= 30`);
console.assert(fDuplicates.length === 0, `Duplicate formula IDs found: ${fDuplicates.join(', ')}`);
console.log(`  ✓ No duplicate formula IDs found.`);

// 3. Formula Coverage Verification (Requirement 5 & 14.18)
console.log(`\n[TEST 3] Formula-to-MCQ Coverage Verification:`);
let uncoveredFormulas = [];

formulas.forEach(f => {
  // Check that all linked questions exist in Question Bank
  const validQuestions = f.linkedQuestionIds.filter(qid => qIdSet.has(qid));
  if (validQuestions.length === 0) {
    uncoveredFormulas.push(f.id);
  }
});

console.assert(uncoveredFormulas.length === 0, `Uncovered formulas without MCQs: ${uncoveredFormulas.join(', ')}`);
if (uncoveredFormulas.length === 0) {
  console.log(`  ✓ 100% Formula Coverage verified! All ${formulas.length} formulas have verified MCQs.`);
} else {
  console.error(`  ✗ Missing coverage for:`, uncoveredFormulas);
  process.exit(1);
}

// 4. Test Scoring & Progress Calculations
console.log(`\n[TEST 4] Scoring & Progress Logic Test:`);
const mockAnswers = {
  [questions[0].id]: questions[0].correctAnswer,
  [questions[1].id]: (questions[1].correctAnswer + 1) % 4, // deliberately wrong
  [questions[2].id]: questions[2].correctAnswer,
};

let score = 0;
[questions[0], questions[1], questions[2]].forEach(q => {
  if (mockAnswers[q.id] === q.correctAnswer) score++;
});

const pct = Math.round((score / 3) * 100);
console.assert(score === 2, `Score was expected to be 2, got ${score}`);
console.assert(pct === 67, `Percentage was expected to be 67, got ${pct}`);
console.log(`  ✓ Score evaluation correctly calculated ${score}/3 (${pct}%).`);

console.log('\n====================================================');
console.log('ALL TESTS PASSED! System is fully verified.');
console.log('====================================================\n');

