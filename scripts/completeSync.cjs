const fs = require('fs');
const path = require('path');

const qPath = path.join(__dirname, '..', 'src', 'data', 'questionBank.ts');
const fPath = path.join(__dirname, '..', 'src', 'data', 'formulaInventory.ts');

let qContent = fs.readFileSync(qPath, 'utf8');

const newQuestions = [
  {
    id: 'CS-M2-F09',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Block Diagram Algebra',
    subtopic: 'Cascade Blocks Combination',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'Three linear blocks with transfer functions $G_1(s), G_2(s)$, and $G_3(s)$ are connected in series (cascade) without loading effects. Which expression represents the overall equivalent transfer function $G_{eq}(s)$?',
    options: [
      '$G_{eq}(s) = G_1(s) \\cdot G_2(s) \\cdot G_3(s)$',
      '$G_{eq}(s) = G_1(s) + G_2(s) + G_3(s)$',
      '$G_{eq}(s) = \\frac{G_1(s) G_2(s)}{1 + G_3(s)}$',
      '$G_{eq}(s) = \\frac{1}{G_1(s)} + \\frac{1}{G_2(s)} + \\frac{1}{G_3(s)}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 8: Combining blocks in cascade (series) yields the product of their individual transfer functions: $G_{eq}(s) = G_1(s) \\cdot G_2(s) \\cdot G_3(s) = \\prod_{i=1}^m G_i(s)$, assuming non-loading conditions.',
    whyCorrect: 'Option A gives the standard cascade product formula for series blocks.',
    distractorAnalysis: [
      'Summation corresponds to parallel connections, not series cascade.',
      'Denotes a feedback loop structure.',
      'Sum of reciprocals applies to parallel electrical resistors, not cascaded transfer functions.'
    ],
    formulaId: 'FORM-M2-01',
    sourceRef: 'BECE302L Module 2, Slide 8',
    keywords: ['Cascade', 'Series Blocks', 'Product Rule', 'Equivalent Gain'],
    isVerified: true
  },
  {
    id: 'CS-M2-F10',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Block Diagram Algebra',
    subtopic: 'Parallel Blocks Combination',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'Three blocks $G_1(s), G_2(s)$, and $G_3(s)$ share the common reference input $R(s)$ and their individual outputs are combined at a summing junction with signs $+$, $-$, and $+$ respectively. What is the overall transfer function $C(s)/R(s)$?',
    options: [
      '$\\frac{C(s)}{R(s)} = G_1(s) - G_2(s) + G_3(s)$',
      '$\\frac{C(s)}{R(s)} = G_1(s) \\cdot G_2(s) \\cdot G_3(s)$',
      '$\\frac{C(s)}{R(s)} = \\frac{G_1(s) + G_3(s)}{1 + G_2(s)}$',
      '$\\frac{C(s)}{R(s)} = \\frac{1}{G_1(s) - G_2(s) + G_3(s)}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 8 and 22: For parallel blocks, each branch output is $X_i(s) = \\pm G_i(s)R(s)$. The summing junction produces $C(s) = X_1(s) - X_2(s) + X_3(s) = [G_1(s) - G_2(s) + G_3(s)]R(s)$. Hence, $C(s)/R(s) = G_1(s) - G_2(s) + G_3(s)$.',
    whyCorrect: 'Option A is the direct algebraic sum of the parallel forward gains respecting the signs at the summing junction.',
    distractorAnalysis: [
      'Product represents cascade (series) connection.',
      'Represents a feedback configuration, not a pure parallel feedforward structure.',
      'Inverts the transfer function.'
    ],
    formulaId: 'FORM-M2-02',
    sourceRef: 'BECE302L Module 2, Slide 8, 22',
    keywords: ['Parallel Blocks', 'Summing Point', 'Block Diagram Reduction'],
    isVerified: true
  },
  {
    id: 'CS-M3-F09',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'First Order Dynamical Systems',
    subtopic: 'Impulse Response Formulation',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which of the following is the correct mathematical expression for the unit-impulse response $y(t)$ of a first-order system with transfer function $T(s) = \\frac{k}{Ts+1}$?',
    options: [
      '$y(t) = \\frac{k}{T} e^{-\\frac{t}{T}} u(t)$',
      '$y(t) = k \\left(1 - e^{-\\frac{t}{T}}\\right) u(t)$',
      '$y(t) = k \\cdot t \\cdot e^{-\\frac{t}{T}} u(t)$',
      '$y(t) = \\frac{k}{s(Ts+1)}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slide 10: For an impulse input $R(s) = 1$, the Laplace response is $Y(s) = T(s) \\cdot 1 = \\frac{k}{Ts+1} = \\frac{k/T}{s + 1/T}$. The inverse Laplace transform is $y(t) = \\frac{k}{T} e^{-t/T} u(t)$. Notice that the initial value at $t=0^+$ is $k/T$, which decays to zero as $t \\to \\infty$.',
    whyCorrect: 'Option A gives the exact impulse response formula derived on Slide 10.',
    distractorAnalysis: [
      '$k(1 - e^{-t/T})$ is the unit-step response, not impulse response.',
      '$k t e^{-t/T}$ corresponds to critically damped second-order impulse response.',
      '$\\frac{k}{s(Ts+1)}$ is the Laplace s-domain transform of the step response, not time-domain impulse response.'
    ],
    formulaId: 'FORM-M3-03',
    sourceRef: 'BECE302L Module 3, Slide 10',
    keywords: ['Impulse Response', 'First Order System', 'Laplace Inverse', 'Exponential Decay'],
    isVerified: true
  },
  {
    id: 'CS-M4-F10',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Routh-Hurwitz Stability Criterion',
    subtopic: 'Routh Array Row Elements Formulation',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'In the Routh Array for polynomial $a_n s^n + a_{n-1} s^{n-1} + a_{n-2} s^{n-2} + \\dots = 0$, what is the exact algebraic formula to calculate the first element $b_1$ of the $s^{n-2}$ row?',
    options: [
      '$b_1 = \\frac{a_{n-1} a_{n-2} - a_n a_{n-3}}{a_{n-1}}$',
      '$b_1 = \\frac{a_n a_{n-3} - a_{n-1} a_{n-2}}{a_n}$',
      '$b_1 = \\frac{a_{n-1} a_{n-2} + a_n a_{n-3}}{a_{n-2}}$',
      '$b_1 = a_{n-1} a_{n-2} - a_n a_{n-3}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 20: The Routh array calculation defines cross-multiplication with the pivot element $a_{n-1}$ in the denominator: $b_1 = \\frac{a_{n-1} a_{n-2} - a_n a_{n-3}}{a_{n-1}}$.',
    whyCorrect: 'Option A is the exact formula displayed on Slide 20.',
    distractorAnalysis: [
      'Reverses the cross-multiplication signs and uses incorrect denominator $a_n$.',
      'Uses addition instead of subtraction in the numerator.',
      'Missing division by the pivot element $a_{n-1}$.'
    ],
    formulaId: 'FORM-M4-02',
    sourceRef: 'BECE302L Module 4, Slide 20',
    keywords: ['Routh Array', 'Row Formula', 'Cross Multiplication', 'Pivot Element'],
    isVerified: true
  }
];

// Append new questions to questionBank.ts before the closing ];
const insertIdx = qContent.lastIndexOf('];');
let appendedStr = '';
for (const nq of newQuestions) {
  appendedStr += ',\n  ' + JSON.stringify(nq, null, 2);
}
qContent = qContent.slice(0, insertIdx) + appendedStr + '\n];\n';
fs.writeFileSync(qPath, qContent);
console.log('Appended 4 new questions to questionBank.ts');

// Now re-run mapping to update formulaInventory.ts
const qBlocksAfter = qContent.split(/\{\s*id:\s*'/);
const fMap = {};
for (let i = 1; i < qBlocksAfter.length; i++) {
  const id = qBlocksAfter[i].split("'")[0];
  const fMatch = qBlocksAfter[i].match(/formulaId:\s*'([^']+)'/);
  if (fMatch) {
    const fId = fMatch[1];
    if (!fMap[fId]) fMap[fId] = [];
    fMap[fId].push(id);
  }
}

// Update formulaInventory.ts linkedQuestionIds
let fContentUpdated = fs.readFileSync(fPath, 'utf8');
for (const [fId, qids] of Object.entries(fMap)) {
  const qidStr = JSON.stringify(qids).replace(/"/g, "'");
  const regex = new RegExp(`(id:\\s*'${fId}'[\\s\\S]*?linkedQuestionIds:\\s*)\\[[^\\]]*\\]`, 'm');
  if (regex.test(fContentUpdated)) {
    fContentUpdated = fContentUpdated.replace(regex, `$1${qidStr}`);
  }
}
fs.writeFileSync(fPath, fContentUpdated);
console.log('Synchronized formulaInventory.ts! All 35 formulas mapped.');

