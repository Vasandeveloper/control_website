const fs = require('fs');
const path = require('path');

const qPath = path.join(__dirname, '..', 'src', 'data', 'questionBank.ts');
const fPath = path.join(__dirname, '..', 'src', 'data', 'formulaInventory.ts');

let qContent = fs.readFileSync(qPath, 'utf8');
let fContent = fs.readFileSync(fPath, 'utf8');

const formulaRegex = /id:\s*['"]([^'"]+)['"]/g;
const allFormulas = [];
let fMatch;
while ((fMatch = formulaRegex.exec(fContent)) !== null) {
  allFormulas.push(fMatch[1]);
}

const qBlocks = qContent.split(/\{\s*["']?id["']?\s*:\s*['"]/);
const qList = [];
for (let i = 1; i < qBlocks.length; i++) {
  const id = qBlocks[i].split(/['"]/)[0];
  const fMatch = qBlocks[i].match(/["']?formulaId["']?\s*:\s*['"]([^'"]+)['"]/);
  qList.push({ id, formulaId: fMatch ? fMatch[1] : null });
}

const fMap = {};
qList.forEach(q => {
  if (q.formulaId) {
    if (!fMap[q.formulaId]) fMap[q.formulaId] = [];
    fMap[q.formulaId].push(q.id);
  }
});

const unmapped = allFormulas.filter(fId => !fMap[fId] || fMap[fId].length === 0);
console.log('Total questions:', qList.length);
console.log('Total formulas:', allFormulas.length);
console.log('Unmapped formulas count:', unmapped.length);
if (unmapped.length > 0) {
  console.log('Unmapped:', unmapped);
} else {
  console.log('100% FORMULA COVERAGE ACHIEVED! All formulas have corresponding questions in the bank.');
}

// Update formulaInventory.ts linkedQuestionIds
let fContentUpdated = fContent;
for (const [fId, qids] of Object.entries(fMap)) {
  const qidStr = JSON.stringify(qids).replace(/"/g, "'");
  const regex = new RegExp(`(id:\\s*'${fId}'[\\s\\S]*?linkedQuestionIds:\\s*)\\[[^\\]]*\\]`, 'm');
  if (regex.test(fContentUpdated)) {
    fContentUpdated = fContentUpdated.replace(regex, `$1${qidStr}`);
  }
}
fs.writeFileSync(fPath, fContentUpdated);
console.log('Successfully updated formulaInventory.ts with verified question IDs.');

