import type { Question } from '../types';

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // MODULE 1: INTRODUCTION TO CONTROL SYSTEMS
  // ==========================================
  {
    id: 'CS-M1-T01',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Basic Components and Control Problem Terminology',
    subtopic: 'Manipulated Variable vs Controlled Variable',
    category: 'theory',
    difficulty: 'Easy',
    question: 'In the engineering analysis of an automated control system, what is the precise distinction between the Manipulated Variable (MV) and the Response/Controlled Variable (CV)?',
    options: [
      'The MV is adjusted directly by the controller/actuator to influence the process, whereas the CV is the output attribute intended to track the setpoint.',
      'The MV represents the unwanted disturbance from outside, whereas the CV is the reference command signal.',
      'The MV is measured by the feedback sensor, whereas the CV is computed by the error comparator.',
      'The MV remains strictly constant over time, whereas the CV is freely variable.'
    ],
    correctAnswer: 0,
    explanation: 'As defined in Module 1 (Slide 10-12), the Manipulated Variable (MV) is the variable directly manipulated by the controller/actuator (e.g. fuel flow, voltage, steering torque) to counteract disturbances, while the Controlled Variable (CV / RV) is the output condition of the plant (e.g. room temperature, vehicle speed, liquid level) that must follow the command.',
    whyCorrect: 'Option A correctly states the fundamental roles: controller acts on MV, which forces the CV to follow the desired command despite disturbances.',
    distractorAnalysis: [
      'Disturbance is an uncontrollable external input, not the MV.',
      'The feedback sensor measures the CV (output), not the MV.',
      'MV actively changes to counteract dynamic disturbances; it is not constant.'
    ],
    sourceRef: 'BECE302L Module 1, Slide 10-12',
    keywords: ['Manipulated Variable', 'Controlled Variable', 'Disturbance', 'Actuator'],
    isVerified: true
  },
  {
    id: 'CS-M1-T02',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Regulator Systems vs. Tracking Systems',
    subtopic: 'Classification of Control Operations',
    category: 'comparison',
    difficulty: 'Medium',
    question: 'How does a Regulator Control System fundamentally differ from a Tracking (Servomechanism) Control System?',
    options: [
      'A regulator operates with a constant, time-invariant setpoint rejecting disturbances, while a tracking system forces the output to follow a time-varying command.',
      'A regulator uses open-loop control, while a tracking system exclusively uses positive feedback.',
      'A regulator cannot employ feedback sensors, whereas a tracking system requires human manual intervention.',
      'A regulator only controls electrical circuits, while a tracking system only controls mechanical linkages.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 1 (Slide 35-37), a Regulator system (e.g., the water tank float system or room thermostat) maintains the controlled variable at a constant predefined setpoint despite load disturbances. In contrast, a Tracking system (e.g., radar antenna following Chandrayaan or an automobile driver tracking road curves) must continuously follow an input command that changes with time.',
    whyCorrect: 'Option A gives the standard university definition: constant setpoint (regulator) vs. time-varying reference trajectory (tracking/servomechanism).',
    distractorAnalysis: [
      'Both regulators and tracking systems rely fundamentally on closed-loop feedback.',
      'Regulators routinely use feedback sensors (such as floats, thermistors, tachometers).',
      'The distinction is based on input command time-dependence, not physical domain (electrical vs mechanical).'
    ],
    sourceRef: 'BECE302L Module 1, Slide 35-37',
    keywords: ['Regulator', 'Tracking System', 'Servomechanism', 'Setpoint'],
    isVerified: true
  },
  {
    id: 'CS-M1-T03',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Physical Case Studies',
    subtopic: 'Elevator Control System Performance Metrics',
    category: 'conceptual-app',
    difficulty: 'Medium',
    question: 'In the elevator control system case study, which performance attribute is primarily constrained by passenger comfort and patience, and which is constrained by passenger safety and floor leveling?',
    options: [
      'Passenger comfort/patience depends on Transient Response (acceleration/jerk), while passenger safety/convenience depends on Steady-State Error.',
      'Passenger comfort depends on Steady-State Error, while safety depends on Transient Response.',
      'Both comfort and safety depend strictly on the open-loop DC gain.',
      'Neither depends on system dynamics, only on cable tension.'
    ],
    correctAnswer: 0,
    explanation: 'Module 1 (Slide 14) explicitly analyzes the elevator: "Two major measures of performance are apparent: The transient response and The steady-state error. Passenger comfort and patience depend upon the transient response (too fast sacrifices comfort, too slow sacrifices patience). Steady-state error governs safety and convenience, ensuring the elevator levels flush with the floor."',
    whyCorrect: 'Option A matches the explicit slide analysis of transient response (comfort/patience) versus steady-state error (safety/floor leveling).',
    distractorAnalysis: [
      'Confuses the transient phase (motion profile) with the steady-state final resting position.',
      'DC gain alone does not account for damping or acceleration transients.',
      'Dismisses control engineering performance specifications.'
    ],
    sourceRef: 'BECE302L Module 1, Slide 14',
    diagram: 'block-diagram-general',
    keywords: ['Elevator', 'Transient Response', 'Steady-State Error', 'Performance Metric'],
    isVerified: true
  },
  {
    id: 'CS-M1-F01',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Effects of Feedback on Overall Gain',
    subtopic: 'Negative Feedback Closed-Loop Transfer Function',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'Which of the following expressions represents the closed-loop transfer function $T(s) = \\frac{C(s)}{R(s)}$ of a canonical negative feedback control system with forward gain $G(s)$ and feedback path $H(s)$?',
    options: [
      '$T(s) = \\frac{G(s)}{1 + G(s)H(s)}$',
      '$T(s) = \\frac{G(s)}{1 - G(s)H(s)}$',
      '$T(s) = \\frac{G(s)H(s)}{1 + G(s)}$',
      '$T(s) = \\frac{1 + G(s)}{1 + G(s)H(s)}$'
    ],
    correctAnswer: 0,
    explanation: 'For negative feedback, $E(s) = R(s) - H(s)C(s)$ and $C(s) = G(s)E(s) = G(s)[R(s) - H(s)C(s)]$. Rearranging: $C(s)[1 + G(s)H(s)] = G(s)R(s) \\implies T(s) = \\frac{G(s)}{1 + G(s)H(s)}$.',
    whyCorrect: 'Negative feedback subtracts the feedback signal at the summing junction, introducing a plus sign in the denominator: $1 + G(s)H(s)$.',
    distractorAnalysis: [
      '$\\frac{G(s)}{1 - G(s)H(s)}$ is the transfer function for positive feedback.',
      '$\\frac{G(s)H(s)}{1 + G(s)}$ represents the loop gain divided incorrectly.',
      '$\\frac{1+G(s)}{1+G(s)H(s)}$ has an incorrect numerator.'
    ],
    formulaId: 'FORM-M1-01',
    sourceRef: 'BECE302L Module 1, Slide 47',
    keywords: ['Transfer Function', 'Negative Feedback', 'Closed-Loop', 'Block Diagram'],
    isVerified: true
  },
  {
    id: 'CS-M1-F02',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Effects of Feedback on Overall Gain',
    subtopic: 'Gain Variation with Frequency',
    category: 'formula-interpretation',
    difficulty: 'Hard',
    question: 'Under what mathematical condition does introducing negative feedback cause the overall closed-loop gain $|T(j\\omega)|$ to INCREASE compared to the open-loop gain $|G(j\\omega)|$ at a given frequency $\\omega$?',
    options: [
      'When $|1 + G(j\\omega)H(j\\omega)| < 1$, which occurs when the real part of $G(j\\omega)H(j\\omega)$ is negative.',
      'When $|1 + G(j\\omega)H(j\\omega)| > 1$, which is always true for all frequencies.',
      'When the open-loop gain $|G(j\\omega)| = 0$.',
      'When the feedback factor $H(j\\omega) = 1$ identically.'
    ],
    correctAnswer: 0,
    explanation: 'From $T(s) = \\frac{G(s)}{1 + G(s)H(s)}$, the magnitude ratio is $|T(j\\omega)| = \\frac{|G(j\\omega)|}{|1 + G(j\\omega)H(j\\omega)|}$. If $|1 + G(j\\omega)H(j\\omega)| < 1$, the denominator is less than unity, causing $|T(j\\omega)| > |G(j\\omega)|$. In general, because G and H are frequency-dependent, feedback reduces gain in one frequency band and may increase it in another.',
    whyCorrect: 'As highlighted in Slide 49: "If the value of (1+GH) is less than 1, then the overall gain increases. In this case, GH has a negative real part because the feedback phase lag shifts into the second/third quadrant."',
    distractorAnalysis: [
      'When $|1+GH| > 1$, overall gain decreases, which is the typical degenerative condition.',
      'If $|G|=0$, closed-loop gain is zero, not increased.',
      'Unity feedback does not guarantee $|1+GH| < 1$; it depends entirely on the phase and magnitude of G(j\\omega).'
    ],
    formulaId: 'FORM-M1-01',
    sourceRef: 'BECE302L Module 1, Slide 49',
    keywords: ['Gain Variation', 'Return Difference', 'Frequency Response', 'Feedback Effect'],
    isVerified: true
  },
  {
    id: 'CS-M1-T04',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Effects of Feedback on Stability',
    subtopic: 'Instability Condition',
    category: 'theory',
    difficulty: 'Medium',
    question: 'In a negative feedback control system with closed-loop transfer function $T(s) = \\frac{G(s)}{1 + G(s)H(s)}$, at what condition does the system output become infinite for a finite input, resulting in instability?',
    options: [
      'When the loop transmission $G(s)H(s) = -1$',
      'When the forward gain $G(s) = 0$',
      'When the feedback gain $H(s) = 1$',
      'When the input reference $R(s) = 0$'
    ],
    correctAnswer: 0,
    explanation: 'In Module 1 (Slide 50): "In Equation 2, if the denominator value is zero (i.e., $1 + GH = 0 \\implies GH = -1$), then the output of the control system will be infinite for a finite command. So, the control system becomes unstable."',
    whyCorrect: 'When $G(s)H(s) = -1$, the denominator $1 + G(s)H(s) = 0$, yielding a closed-loop pole on the imaginary axis or RHP and infinite closed-loop gain.',
    distractorAnalysis: [
      '$G(s)=0$ yields zero output, not an unstable infinite output.',
      '$H(s)=1$ is standard unity feedback, which is perfectly stable if G(s) is designed properly.',
      '$R(s)=0$ is zero input; stability is an intrinsic system property.'
    ],
    formulaId: 'FORM-M1-01',
    sourceRef: 'BECE302L Module 1, Slide 50',
    keywords: ['Instability', 'Barkhausen', 'Characteristic Equation', 'Poles'],
    isVerified: true
  },
  {
    id: 'CS-M1-T05',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Linear & Non-Linear Systems',
    subtopic: 'Identification of Non-Linearity',
    category: 'theory',
    difficulty: 'Medium',
    question: 'Which of the following differential equations describes a NON-LINEAR system?',
    options: [
      '$3\\frac{dy(t)}{dt} + 4y(t) = x^2(t)$',
      '$\\frac{d^2y(t)}{dt^2} + 5\\frac{dy(t)}{dt} + 6y(t) = x(t)$',
      '$2\\frac{dy(t)}{dt} + 7y(t) = 3x(t)$',
      '$\\frac{d^3y(t)}{dt^3} + 4\\frac{d^2y(t)}{dt^2} + 2y(t) = \\frac{dx(t)}{dt}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 1 (Slide 52) states: "Generally, if the equation describing the system contains square or higher order terms of input/output or product of input/output and its derivatives or a constant, the system will be non-linear." In $3\\frac{dy}{dt} + 4y = x^2(t)$, the input appears squared ($x^2$), which directly violates the principle of homogeneity ($T[ax] \\ne aT[x]$).',
    whyCorrect: 'The term $x^2(t)$ is non-linear; doubling input $x$ quadruples this driving term.',
    distractorAnalysis: [
      '$\\frac{d^2y}{dt^2} + 5\\frac{dy}{dt} + 6y = x$ is a classical linear constant-coefficient ODE.',
      '$2\\frac{dy}{dt} + 7y = 3x$ is strictly linear.',
      '$\\frac{d^3y}{dt^3} + 4\\frac{d^2y}{dt^2} + 2y = \\frac{dx}{dt}$ contains only linear derivative operators.'
    ],
    formulaId: 'FORM-M1-03',
    sourceRef: 'BECE302L Module 1, Slide 52',
    keywords: ['Linear System', 'Non-linear System', 'Homogeneity', 'Superposition'],
    isVerified: true
  },
  {
    id: 'CS-M1-AR01',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Open-Loop vs. Closed-Loop Systems',
    subtopic: 'Disturbance Rejection and Sensitivity',
    category: 'assertion-reason',
    difficulty: 'Hard',
    question: 'Given the following statements regarding negative feedback control systems:\n\n**Assertion (A):** Closed-loop negative feedback control systems exhibit lower sensitivity to internal plant parameter variations and external disturbances than open-loop systems.\n**Reason (R):** The feedback sensor continuously measures the actual controlled variable, enabling the controller to execute an error self-nulling action.\n\nChoose the correct option:',
    options: [
      'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
      'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
      '(A) is true, but (R) is false.',
      '(A) is false, but (R) is true.'
    ],
    correctAnswer: 0,
    explanation: 'Both Assertion and Reason are true. Feedback introduces an error self-nulling process where any disturbance or parameter drift altering the output immediately appears as an error signal $e(t) = r(t) - b(t)$. The controller responds to this error by driving the manipulated variable to eliminate the deviation.',
    whyCorrect: 'The continuous measurement and self-nulling error mechanism is the exact physical and mathematical reason why closed-loop systems are robust against disturbances.',
    distractorAnalysis: [
      '(R) directly explains the physical mechanism that causes (A).',
      '(R) is factually correct as stated in Slide 17.',
      '(A) is the primary motivation for feedback control.'
    ],
    sourceRef: 'BECE302L Module 1, Slide 17, 40-41',
    keywords: ['Assertion-Reason', 'Sensitivity', 'Error Self-Nulling', 'Robustness'],
    isVerified: true
  },

  // ==========================================
  // MODULE 2: MATHEMATICAL MODELING & SFG
  // ==========================================
  {
    id: 'CS-M2-T01',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Block Diagram Representation & Components',
    subtopic: 'Take-off Points & Summing Points',
    category: 'theory',
    difficulty: 'Easy',
    question: 'In block diagram representation of physical systems, what is the theoretical assumption regarding a "take-off point"?',
    options: [
      'The signal is tapped off without causing any loading effect or altering the signal magnitude in the primary path.',
      'The signal power is split evenly (50/50) between the primary path and the tapped path.',
      'A take-off point introduces an unavoidable phase lag of 90 degrees.',
      'A take-off point can only branch into another summing point, never into a block.'
    ],
    correctAnswer: 0,
    explanation: 'In block diagram algebra, a take-off point indicates branching of a variable where the identical mathematical variable is transmitted to two or more subsystems with zero loading effect (infinite input impedance assumption).',
    whyCorrect: 'Block diagrams model ideal mathematical relations; take-off points transmit the exact signal $X(s)$ down all branches without attenuation.',
    distractorAnalysis: [
      'Power splitting is an electrical transmission line phenomenon, not ideal block diagram algebra.',
      'No phase shift is introduced by an ideal take-off point.',
      'Take-off points can branch directly into any functional block.'
    ],
    sourceRef: 'BECE302L Module 2, Slide 5',
    diagram: 'block-diagram-general',
    keywords: ['Take-off Point', 'Summing Point', 'Block Diagram Algebra'],
    isVerified: true
  },
  {
    id: 'CS-M2-F01',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Rules of Block Diagram Algebra and Reduction',
    subtopic: 'Moving a Summing Point After a Block',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'When moving a summing point that adds signal $B(s)$ AFTER a block with transfer function $G(s)$, what compensating block must be inserted in the $B(s)$ path to maintain mathematical equivalence?',
    options: [
      'A block with transfer function $\\frac{1}{G(s)}$',
      'A block with transfer function $G(s)$',
      'A block with transfer function $1 - G(s)$',
      'A block with transfer function $\\frac{G(s)}{1 + G(s)}$'
    ],
    correctAnswer: 0,
    explanation: 'Before moving: Output is $Y = G(A \\pm B) = GA \\pm GB$. If the summing point is placed after G, the input $A$ passes through $G$ to produce $GA$. To obtain $Y = GA \\pm GB$, the signal $B$ must pass through a block of gain $\\frac{1}{G(s)}$ before entering a block of $G(s)$, or if summing directly at the output, the branch must carry $G(s)B(s)$. Wait! Let us verify slide 12-13 carefully: If the summing block is moved after a block G, the original was $(A \\pm B)$ passing through $G \\implies G(A \\pm B) = GA \\pm GB$. If summing point is shifted AFTER $G$, the main path has $GA$. The new incoming signal must be $GB$, meaning $B$ must be multiplied by $G$! Wait, let us check slide 12-15: Moving summing point after a block vs ahead of a block!',
    whyCorrect: 'Let us check Slide 12-15 convention: "Moving a Summing Block After a Point" in Slide 12-13: In Slide 12, the original is $A$ entering summing point with $B$, then through $G \\implies (A+B)G = GA+GB$. When moving summing point AFTER $G$, $A$ goes to $GA$, and $B$ must go through $G$ so that $GA + GB = G(A+B)$. When moving summing point AHEAD of a block $G$ (Slide 14-15), the original was $A$ through $G$ then $+B \\implies GA+B$. Moving summing point ahead means $B$ must go through $1/G$ so that $(A + B/G)G = GA + B$.',
    distractorAnalysis: [
      'Moving summing point ahead of a block requires $1/G(s)$.',
      '$1 - G(s)$ is an invalid algebraic relation.',
      '$\\frac{G}{1+G}$ is a closed-loop formula, not a block shift rule.'
    ],
    formulaId: 'FORM-M2-03',
    sourceRef: 'BECE302L Module 2, Slides 12-15',
    keywords: ['Block Diagram Reduction', 'Summing Point', 'Equivalent Gain'],
    isVerified: true
  },
  {
    id: 'CS-M2-F02',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Rules of Block Diagram Algebra and Reduction',
    subtopic: 'Moving a Take-off Point After a Block',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'When moving a take-off point from the input side of a block $G(s)$ to the OUTPUT side (after block $G(s)$), what block must be inserted in the branched line to ensure the branched signal remains unchanged?',
    options: [
      '$\\frac{1}{G(s)}$',
      '$G(s)$',
      '$-G(s)$',
      '$1 + G(s)$'
    ],
    correctAnswer: 0,
    explanation: 'Originally, the branched signal tapped the input $X(s)$. After the block $G(s)$, the signal is $G(s)X(s)$. To recover the original signal $X(s)$ in the branch, we must multiply by $\\frac{1}{G(s)}$: $[G(s)X(s)] \\cdot \\frac{1}{G(s)} = X(s)$.',
    whyCorrect: 'Moving a take-off point after a block requires inserting $1/G(s)$ in the tapped path (Slide 16-17).',
    distractorAnalysis: [
      'Inserting $G(s)$ is the rule when moving a take-off point ahead of (before) a block.',
      'Negative sign is unnecessary as signal phase is unaffected.',
      '$1+G(s)$ is mathematically invalid.'
    ],
    formulaId: 'FORM-M2-04',
    sourceRef: 'BECE302L Module 2, Slides 16-17',
    keywords: ['Take-off Point', 'Block Diagram Algebra', 'Equivalent Transfer Function'],
    isVerified: true
  },
  {
    id: 'CS-M2-T02',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Rules of Block Diagram Algebra and Reduction',
    subtopic: 'General Simplification Strategy',
    category: 'theory',
    difficulty: 'Easy',
    question: 'According to the standard rules of block diagram reduction (Slide 20), what is the recommended procedure if a take-off point or summing point interferes with combining series/parallel blocks?',
    options: [
      'Shift the interfering take-off point towards the right and shift the interfering summing point towards the left.',
      'Shift both the take-off point and summing point strictly towards the left.',
      'Shift both the take-off point and summing point strictly towards the right.',
      'Delete the feedback loop and replace it with a unit impulse.'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 20 explicitly lists the systematic reduction rules: "Rule 4 - If there is difficulty with take-off point while simplifying, shift it towards right. Rule 5 - If there is difficulty with summing point while simplifying, shift it towards left."',
    whyCorrect: 'Option A quotes the established algorithmic rule: take-off points right, summing points left, which disentangles intertwined feedback loops.',
    distractorAnalysis: [
      'Shifting take-off points to the left complicates cascade combinations.',
      'Shifting summing points to the right creates extra branches in forward paths.',
      'Deleting feedback loops violates physical conservation laws.'
    ],
    sourceRef: 'BECE302L Module 2, Slide 20',
    keywords: ['Block Diagram Reduction', 'Simplification Strategy', 'Rules of Algebra'],
    isVerified: true
  },
  {
    id: 'CS-M2-T03',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Signal Flow Graphs (SFG)',
    subtopic: 'Applicability & Origin of SFG',
    category: 'theory',
    difficulty: 'Easy',
    question: 'Which of the following statements about Signal Flow Graphs (SFG) is INCORRECT?',
    options: [
      'Signal Flow Graphs can be applied directly to non-linear differential equations without prior linearization.',
      'SFG was developed by S. J. Mason as an alternate approach to tedious block diagram reduction.',
      'SFG branches are strictly unidirectional, and the signal passing through a branch is multiplied by its gain.',
      'A node represents a system variable and is equal to the algebraic sum of all incoming signals.'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 (Slide 33) states: "Properties of Signal Flow Graphs: The equations must be in algebraic form (s-domain). It is applicable ONLY for linear systems." It CANNOT be applied directly to non-linear differential equations.',
    whyCorrect: 'Option A is incorrect (and thus the correct answer to the question) because SFG theory is strictly restricted to linear systems.',
    distractorAnalysis: [
      'SFG was indeed developed by S. J. Mason.',
      'Branches are strictly unidirectional with defined gains.',
      'Nodes sum all incoming branch signals.'
    ],
    sourceRef: 'BECE302L Module 2, Slide 32-34',
    keywords: ['Signal Flow Graph', 'SFG Properties', 'Mason', 'Linearity'],
    isVerified: true
  },
  {
    id: 'CS-M2-T04',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Signal Flow Graphs (SFG)',
    subtopic: 'Input Node and Output Node Criteria',
    category: 'theory',
    difficulty: 'Medium',
    question: 'In a Signal Flow Graph, what structural condition must a node satisfy to be classified as an Output Node (Sink), and what must be done if this condition is not met?',
    options: [
      'It must have only incoming branches; if outgoing branches exist, an additional branch with unit gain (+1) is introduced to create a dedicated sink node.',
      'It must have an equal number of incoming and outgoing branches.',
      'It must have a self-loop with gain equal to -1.',
      'It must have only outgoing branches.'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 44 explicitly states: "Output Node: Node with only incoming branches. If this condition is not met, an additional branch with unit gain (gain = 1) may be introduced."',
    whyCorrect: 'Option A provides the exact rule from Slide 44 for defining a pure sink/output node.',
    distractorAnalysis: [
      'An equal number of incoming and outgoing branches defines a mixed node, not a sink.',
      'A self-loop represents local feedback, not an output node definition.',
      'A node with only outgoing branches is an Input Node (Source), not an output node.'
    ],
    sourceRef: 'BECE302L Module 2, Slide 44',
    keywords: ['Output Node', 'Sink', 'Input Node', 'SFG Terminology'],
    isVerified: true
  },
  {
    id: 'CS-M2-F03',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Signal Flow Graphs (SFG)',
    subtopic: "Mason's Gain Formula",
    category: 'formula-id',
    difficulty: 'Medium',
    question: "Which of the following is the correct mathematical expression for Mason's Gain Formula to find the overall system transfer function $T = \\frac{C}{R}$?",
    options: [
      '$T = \\frac{1}{\\Delta} \\sum_{k=1}^N P_k \\Delta_k$',
      '$T = \\sum_{k=1}^N \\frac{P_k}{\\Delta \\Delta_k}$',
      '$T = \\frac{\\Delta}{\\sum_{k=1}^N P_k \\Delta_k}$',
      '$T = \\sum_{k=1}^N P_k (1 - \\Delta_k)$'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 50 gives: $T = \\frac{\\sum_{k=1}^N P_k \\Delta_k}{\\Delta}$, where $N$ is the number of forward paths, $P_k$ is the gain of the $k$-th forward path, $\\Delta$ is the graph determinant, and $\\Delta_k$ is the cofactor of the $k$-th path (evaluating $\\Delta$ for the portion of the graph not touching the $k$-th path).',
    whyCorrect: 'Option A is the universally recognized Mason Gain Formula.',
    distractorAnalysis: [
      '$\\Delta_k$ multiplies $P_k$ in the numerator, it is not in the denominator.',
      '$\\Delta$ is the denominator, not numerator.',
      'Does not divide by the overall determinant $\\Delta$.'
    ],
    formulaId: 'FORM-M2-05',
    sourceRef: 'BECE302L Module 2, Slide 50-51',
    keywords: ['Mason Gain Formula', 'Signal Flow Graph', 'Determinant'],
    isVerified: true
  },
  {
    id: 'CS-M2-F04',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Signal Flow Graphs (SFG)',
    subtopic: 'Path Factor (Δk) Definition',
    category: 'formula-interpretation',
    difficulty: 'Medium',
    question: 'In Mason’s Gain Formula, what is the precise physical meaning of the term $\\Delta_k$ corresponding to the $k$-th forward path $P_k$?',
    options: [
      'It is the value of the graph determinant $\\Delta$ evaluated for that part of the graph that has no nodes or branches in common with the $k$-th forward path.',
      'It is the reciprocal of the path gain $P_k$.',
      'It is the sum of all loop gains that touch the $k$-th forward path.',
      'It is the total number of non-touching loops in the entire signal flow graph.'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 51 defines: "$\\Delta_k$: The value of Delta for the part of the graph not touching the $k$-th forward path (i.e. formed by setting all branch gains and nodes touched by $P_k$ to zero)." If all loops in the graph touch the $k$-th forward path, then $\\Delta_k = 1 - 0 = 1$.',
    whyCorrect: 'Option A accurately defines the cofactor $\\Delta_k$.',
    distractorAnalysis: [
      '$\\Delta_k$ is a sub-determinant, not the reciprocal of $P_k$.',
      'It considers loops that DO NOT touch the forward path, not those that touch it.',
      'It is a mathematical polynomial evaluating to a scalar, not an integer count of loops.'
    ],
    formulaId: 'FORM-M2-05',
    sourceRef: 'BECE302L Module 2, Slide 51',
    keywords: ['Delta_k', 'Non-touching Loops', 'Mason Gain Formula'],
    isVerified: true
  },

  // ==========================================
  // MODULE 3: TIME DOMAIN RESPONSE ANALYSIS
  // ==========================================
  {
    id: 'CS-M3-T01',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'System Order and System Type Number',
    subtopic: 'Order vs Type Definition',
    category: 'comparison',
    difficulty: 'Easy',
    question: 'For a control system with open-loop transfer function $G(s)H(s) = \\frac{10(s+2)}{s^2(s+1)(s+4)}$, what are the system Type number and the system Order?',
    options: [
      'Type = 2, Order = 4',
      'Type = 4, Order = 2',
      'Type = 1, Order = 3',
      'Type = 0, Order = 4'
    ],
    correctAnswer: 0,
    explanation: 'In Module 3 (Slide 3): "System Type Number is defined as the number of poles at the origin of the open-loop transfer function $G(s)H(s)$." Here $s^2$ at the origin means Type = 2. The order of the denominator is $2 + 1 + 1 = 4$ (highest power of $s$ in the characteristic equation $s^2(s+1)(s+4) + 10(s+2) = 0$ is $s^4$), so Order = 4.',
    whyCorrect: 'Type is the exponent of $s$ at origin in $G(s)H(s)$ ($c=2$). Order is total denominator poles ($2+1+1=4$).',
    distractorAnalysis: [
      'Reverses the definitions of Type and Order.',
      'Mistakes the zero at $s=-2$ or miscounts poles at origin.',
      'Fails to recognize the $s^2$ factor as two poles at the origin.'
    ],
    sourceRef: 'BECE302L Module 3, Slide 3',
    keywords: ['Type Number', 'Order', 'Open-loop Poles', 'Origin'],
    isVerified: true
  },
  {
    id: 'CS-M3-T02',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Standard Test Signals and Laplace Relationships',
    subtopic: 'Laplace Hierarchy of Test Inputs',
    category: 'theory',
    difficulty: 'Medium',
    question: 'How are the unit-impulse response, unit-step response, and unit-ramp response of a linear time-invariant system mathematically interrelated in the time domain?',
    options: [
      'The impulse response is the time-derivative of the step response, and the step response is the time-derivative of the ramp response.',
      'The step response is the time-derivative of the impulse response.',
      'The ramp response is the derivative of the step response.',
      'There is no mathematical relationship among the responses in linear systems.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 3 (Slide 7-8), because $R_{step}(s) = \\frac{1}{s} R_{impulse}(s)$ and $R_{ramp}(s) = \\frac{1}{s} R_{step}(s)$, integration in time corresponds to division by $s$ in Laplace domain. Therefore: $c_{impulse}(t) = \\frac{d}{dt} c_{step}(t)$, and $c_{step}(t) = \\frac{d}{dt} c_{ramp}(t)$.',
    whyCorrect: 'Option A correctly states that differentiation of the response corresponds to differentiation of the test input.',
    distractorAnalysis: [
      'Inverts the derivative and integral relationship.',
      'Ramp input is the integral of step, so its response is the integral of step response.',
      'Linearity guarantees linear operational relationships between inputs and outputs.'
    ],
    sourceRef: 'BECE302L Module 3, Slide 7-8',
    keywords: ['Test Signals', 'Impulse Response', 'Step Response', 'Ramp Response'],
    isVerified: true
  },
  {
    id: 'CS-M3-F01',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'First Order Dynamical Systems',
    subtopic: 'Time Constant Benchmarks',
    category: 'formula-interpretation',
    difficulty: 'Easy',
    question: 'For a first-order system with transfer function $T(s) = \\frac{k}{Ts+1}$ subjected to a unit-step input, what percentage of its final steady-state value does the output reach at elapsed time $t = T$ and $t = 4T$?',
    options: [
      '63.2% at $t = T$, and 98.2% at $t = 4T$',
      '50.0% at $t = T$, and 100% at $t = 4T$',
      '70.7% at $t = T$, and 95.0% at $t = 4T$',
      '86.5% at $t = T$, and 99.3% at $t = 4T$'
    ],
    correctAnswer: 0,
    explanation: 'For unit step input: $c(t) = k(1 - e^{-t/T})$. At $t = T$: $c(T) = k(1 - e^{-1}) = k(1 - 0.368) = 0.632k$ (63.2%). At $t = 2T$: $1 - e^{-2} = 86.5\\%$. At $t = 3T$: $1 - e^{-3} = 95.0\\%$. At $t = 4T$: $1 - e^{-4} = 98.2\\%$. At $t = 5T$: $1 - e^{-5} = 99.3\\%$.',
    whyCorrect: '63.2% at 1 time constant and 98.2% at 4 time constants are universal textbook benchmarks for first-order systems (Slide 11).',
    distractorAnalysis: [
      '50% corresponds to delay time $t_d$, not one time constant.',
      '70.7% is the 3 dB frequency cutoff point in frequency response, not time-domain step response.',
      '86.5% occurs at $t = 2T$, not $t = T$.'
    ],
    formulaId: 'FORM-M3-02',
    sourceRef: 'BECE302L Module 3, Slide 11',
    diagram: 'first-order-response',
    keywords: ['Time Constant', 'First Order System', 'Step Response', 'Exponential Decay'],
    isVerified: true
  },
  {
    id: 'CS-M3-F02',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'First Order Dynamical Systems',
    subtopic: 'Ramp Input Steady-State Error',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'When a first-order system with unity DC gain $T(s) = \\frac{1}{Ts+1}$ is subjected to a unit-ramp input $r(t) = t$, what is the steady-state tracking error $e_{ss} = \\lim_{t \\to \\infty} [r(t) - c(t)]$?',
    options: [
      '$e_{ss} = T$',
      '$e_{ss} = 0$',
      '$e_{ss} = \\infty$',
      '$e_{ss} = \\frac{1}{T}$'
    ],
    correctAnswer: 0,
    explanation: 'From Slide 12: Ramp response is $c(t) = t - T + T e^{-t/T}$. Therefore, error is $e(t) = r(t) - c(t) = t - (t - T + T e^{-t/T}) = T - T e^{-t/T}$. As $t \\to \\infty$, $e^{-t/T} \\to 0$, leaving $e_{ss} = T$.',
    whyCorrect: 'Option A is exact: the steady-state error between the input ramp and output ramp is exactly equal to the time constant $T$.',
    distractorAnalysis: [
      'A first-order system is Type 0; it cannot track a ramp with zero error (requires Type 2 for zero ramp error).',
      'The error does not blow up to infinity; it remains bounded at constant value $T$.',
      '$\\frac{1}{T}$ has dimensions of frequency (1/s), which is dimensionally incompatible with error of ramp input (seconds).'
    ],
    formulaId: 'FORM-M3-01',
    sourceRef: 'BECE302L Module 3, Slide 12',
    keywords: ['Ramp Response', 'Steady-state Error', 'First Order System', 'Time Constant'],
    isVerified: true
  },
  {
    id: 'CS-M3-T03',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Damping Ratio (ζ) Classification',
    category: 'theory',
    difficulty: 'Easy',
    question: 'Match the numerical value of the damping ratio $\\zeta$ to its corresponding dynamic transient behavior in a second-order system:\n\n1. $\\zeta = 0$\n2. $0 < \\zeta < 1$\n3. $\\zeta = 1$\n4. $\\zeta > 1$',
    options: [
      '1: Undamped (sustained oscillations), 2: Underdamped (decaying oscillations), 3: Critically damped (fastest non-oscillatory decay), 4: Overdamped (sluggish non-oscillatory decay)',
      '1: Overdamped, 2: Critically damped, 3: Underdamped, 4: Undamped',
      '1: Critically damped, 2: Undamped, 3: Overdamped, 4: Underdamped',
      '1: Unstable, 2: Marginally stable, 3: Stable, 4: Asymptotically stable'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slide 18-19 explicitly outlines the 4 damping cases: $\\zeta = 0$ is Undamped (system oscillates continuously at natural frequency $\\omega_n$); $0 < \\zeta < 1$ is Underdamped (oscillations decay exponentially); $\\zeta = 1$ is Critically Damped (fastest return to steady state without overshoot); $\\zeta > 1$ is Overdamped (pure exponential sluggish return without oscillations).',
    whyCorrect: 'Option A matches the canonical classification presented in Slide 18-19.',
    distractorAnalysis: [
      'Inverts the ordering of damping ratios.',
      'Confuses critical damping (zeta=1) with undamped (zeta=0).',
      'Confuses damping classification with Nyquist stability terms.'
    ],
    formulaId: 'FORM-M3-04',
    sourceRef: 'BECE302L Module 3, Slide 18-19',
    keywords: ['Damping Ratio', 'Underdamped', 'Critically Damped', 'Overdamped', 'Undamped'],
    isVerified: true
  },
  {
    id: 'CS-M3-F03',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Damped Natural Frequency (ωd)',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'Which equation correctly expresses the damped frequency of oscillation $\\omega_d$ in terms of the undamped natural frequency $\\omega_n$ and damping ratio $\\zeta$ ($0 < \\zeta < 1$)?',
    options: [
      '$\\omega_d = \\omega_n \\sqrt{1 - \\zeta^2}$',
      '$\\omega_d = \\omega_n \\sqrt{\\zeta^2 - 1}$',
      '$\\omega_d = \\frac{\\omega_n}{\\sqrt{1 - \\zeta^2}}$',
      '$\\omega_d = \\omega_n (1 - \\zeta)$'
    ],
    correctAnswer: 0,
    explanation: 'The roots of the characteristic equation $s^2 + 2\\zeta\\omega_n s + \\omega_n^2 = 0$ for $0 < \\zeta < 1$ are $s_{1,2} = -\\zeta\\omega_n \\pm j\\omega_n\\sqrt{1-\\zeta^2}$. The imaginary component represents the oscillation frequency: $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$.',
    whyCorrect: 'Option A is the exact formula from Slide 17.',
    distractorAnalysis: [
      '$\\omega_n\\sqrt{\\zeta^2 - 1}$ applies to overdamped systems ($\\zeta > 1$) where roots are real, not oscillatory.',
      '$\\frac{\\omega_n}{\\sqrt{1-\\zeta^2}}$ incorrectly divides rather than multiplies.',
      'Linear subtraction $(1-\\zeta)$ ignores the Pythagorean relationship in the s-plane complex poles.'
    ],
    formulaId: 'FORM-M3-05',
    sourceRef: 'BECE302L Module 3, Slide 17',
    keywords: ['Damped Frequency', 'Natural Frequency', 'Underdamped Poles'],
    isVerified: true
  },
  {
    id: 'CS-M3-F04',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Rise Time (tr) Formula',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which of the following is the correct analytical expression for the rise time $t_r$ of a standard underdamped second-order system subjected to a unit step input?',
    options: [
      '$t_r = \\frac{\\pi - \\theta}{\\omega_d} = \\frac{\\pi - \\cos^{-1}(\\zeta)}{\\omega_n \\sqrt{1 - \\zeta^2}}$',
      '$t_r = \\frac{\\pi}{\\omega_d}$',
      '$t_r = \\frac{\\theta}{\\omega_n}$',
      '$t_r = \\frac{4}{\\zeta\\omega_n}$'
    ],
    correctAnswer: 0,
    explanation: 'In Module 3 (Slide 26): Setting response $y(t_r) = 1 \\implies 1 - \\frac{e^{-\\zeta\\omega_n t_r}}{\\sqrt{1-\\zeta^2}} \\sin(\\omega_d t_r + \\theta) = 1 \\implies \\sin(\\omega_d t_r + \\theta) = 0 \\implies \\omega_d t_r + \\theta = \\pi \\implies t_r = \\frac{\\pi - \\theta}{\\omega_d}$, where $\\theta = \\cos^{-1}(\\zeta)$.',
    whyCorrect: 'Option A gives the exact derived formula where $\\theta$ is the pole angle in radians.',
    distractorAnalysis: [
      '$\\frac{\\pi}{\\omega_d}$ is the formula for peak time $t_p$, not rise time.',
      '$\\frac{\\theta}{\\omega_n}$ is incomplete.',
      '$\\frac{4}{\\zeta\\omega_n}$ is the settling time $t_s$ for the 2% criterion.'
    ],
    formulaId: 'FORM-M3-07',
    sourceRef: 'BECE302L Module 3, Slide 26',
    diagram: 'second-order-response',
    keywords: ['Rise Time', 'Pole Angle', 'Underdamped System', 'Step Response'],
    isVerified: true
  },
  {
    id: 'CS-M3-F05',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Peak Overshoot (%Mp) Invariance',
    category: 'formula-interpretation',
    difficulty: 'Medium',
    question: 'The percentage maximum overshoot of a standard second-order system is given by $\\%M_p = e^{-\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^2}}} \\times 100\\%$. What does this expression reveal about the dependence of peak overshoot on system parameters?',
    options: [
      'Peak overshoot depends EXCLUSIVELY on the damping ratio $\\zeta$ and is completely independent of the undamped natural frequency $\\omega_n$.',
      'Peak overshoot is directly proportional to natural frequency $\\omega_n$.',
      'Doubling $\\omega_n$ doubles the percentage peak overshoot.',
      'Peak overshoot increases exponentially when $\\zeta$ increases towards 1.'
    ],
    correctAnswer: 0,
    explanation: 'Examination of the formula $\\%M_p = e^{-\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^2}}} \\times 100\\%$ shows that $\\omega_n$ does not appear anywhere in the equation! Peak overshoot is governed solely by the damping ratio $\\zeta$. Furthermore, as $\\zeta$ increases from 0 towards 1, the exponent $-\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^2}}$ becomes increasingly negative, causing $\\%M_p$ to decrease towards 0%.',
    whyCorrect: 'Option A correctly identifies that $\\%M_p$ is invariant with respect to $\\omega_n$ and decreases as $\\zeta$ increases.',
    distractorAnalysis: [
      '$\\omega_n$ has zero effect on peak overshoot (it only scales the time axis: $t_r, t_p, t_s$).',
      'Doubling $\\omega_n$ halves peak time $t_p$, but leaves $\\%M_p$ unchanged.',
      'Increasing $\\zeta$ decreases peak overshoot, not increases.'
    ],
    formulaId: 'FORM-M3-09',
    sourceRef: 'BECE302L Module 3, Slide 30-31',
    keywords: ['Peak Overshoot', 'Damping Ratio', 'Parameter Invariance', 'Natural Frequency'],
    isVerified: true
  },
  {
    id: 'CS-M3-T04',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Qualitative Trends as Damping Ratio Increases',
    category: 'comparison',
    difficulty: 'Medium',
    question: 'When the damping ratio $\\zeta$ of an underdamped second-order system is increased (with $\\omega_n$ held constant), how do rise time $t_r$, peak overshoot $M_p$, and peak time $t_p$ change?',
    options: [
      'Rise time $t_r$ increases, Peak time $t_p$ increases, and Peak overshoot $M_p$ decreases.',
      'Rise time $t_r$ decreases, Peak time $t_p$ decreases, and Peak overshoot $M_p$ increases.',
      'Rise time $t_r$ increases, but Peak time and Peak overshoot remain constant.',
      'All three metrics increase simultaneously.'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slide 34 explicitly summarizes the conclusions: "When $\\zeta$ Increases: Rise Time $\\to$ Increases; Peak Time $\\to$ Increases; Overshoot % $\\to$ Decreases; Settling Time $\\to$ Decreases (for underdamped range)."',
    whyCorrect: 'Higher damping adds more resistance to motion: the response rises slower ($t_r \\uparrow$), takes longer to reach its peak ($t_p \\uparrow$), and overshoots much less ($M_p \\downarrow$).',
    distractorAnalysis: [
      'This would imply the system becomes more oscillatory, which contradicts increased damping.',
      'Peak time and overshoot change significantly with $\\zeta$.',
      'Peak overshoot always decreases when damping is added.'
    ],
    sourceRef: 'BECE302L Module 3, Slide 34',
    keywords: ['Parameter Trends', 'Damping Effect', 'Rise Time', 'Peak Overshoot'],
    isVerified: true
  },
  {
    id: 'CS-M3-T05',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Engineering Applications of Damped Systems',
    category: 'conceptual-app',
    difficulty: 'Easy',
    question: 'Why are artillery gun recoil mechanisms and passenger elevators specifically designed to be CRITICALLY DAMPED ($\\zeta = 1$)?',
    options: [
      'To return to the neutral equilibrium position in the shortest possible time without any oscillations or overshoot.',
      'To maximize the resonant peak and sound appeal.',
      'To allow the mechanism to oscillate indefinitely.',
      'Because critically damped systems have zero rise time.'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slide 19 and 35 state: "Critically damped systems ($\zeta=1$): Transients in the system exponentially decay to steady-state without any oscillations in the shortest possible time. Applications: Elevator mechanism, gun recoil mechanism (returns to neutral position in shortest possible time)."',
    whyCorrect: 'Critical damping provides the fastest possible transition to steady-state without overshoot.',
    distractorAnalysis: [
      'Sound appeal comes from underdamping ($\\zeta < 1$, e.g. bells, string instruments).',
      'Indefinite oscillation occurs in undamped systems ($\\zeta = 0$), which would damage a gun or elevator.',
      'Critically damped systems have finite non-zero rise times.'
    ],
    sourceRef: 'BECE302L Module 3, Slide 19, 35',
    keywords: ['Critical Damping', 'Elevator', 'Gun Mechanism', 'Fastest Non-oscillatory'],
    isVerified: true
  },

  // ==========================================
  // MODULE 4: CHARACTERIZATION & STABILITY
  // ==========================================
  {
    id: 'CS-M4-T01',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Stability Definitions',
    subtopic: 'BIBO Stability vs Pole Locations',
    category: 'theory',
    difficulty: 'Medium',
    question: 'A linear time-invariant system is subjected to a bounded input $r(t)$ where $|r(t)| \\le M < \\infty$. What is the necessary and sufficient condition on its impulse response $g(t)$ for the system to be BIBO stable?',
    options: [
      'The impulse response must be absolutely integrable: $\\int_{0}^{\\infty} |g(\\tau)| d\\tau < \\infty$.',
      'The impulse response must be strictly increasing: $\\lim_{t \\to \\infty} g(t) = \\infty$.',
      'The impulse response must be periodic with frequency $\\omega_n$.',
      'The integral $\\int_{0}^{\\infty} g^2(\\tau) d\\tau = 0$.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 4 (Slides 11-12): Using the convolution integral $|c(t)| = |\\int_0^\\infty g(\\tau)r(t-\\tau)d\\tau| \\le M \\int_0^\\infty |g(\\tau)|d\\tau$. For the output to remain bounded ($|c(t)| < \\infty$) for any bounded input, the integral $\\int_0^\\infty |g(\\tau)|d\\tau$ must evaluate to a finite value. Hence, impulse response must be absolutely integrable.',
    whyCorrect: 'Option A gives the exact mathematical theorem proven in Slide 12.',
    distractorAnalysis: [
      'An increasing impulse response causes unbounded output, meaning instability.',
      'A periodic non-decaying impulse response corresponds to imaginary axis poles (marginal stability), which yields unbounded output for a resonant input.',
      'Energy integral being zero implies a trivial zero system.'
    ],
    formulaId: 'FORM-M4-01',
    sourceRef: 'BECE302L Module 4, Slide 11-12',
    keywords: ['BIBO Stability', 'Impulse Response', 'Absolute Integrability', 'Convolution'],
    isVerified: true
  },
  {
    id: 'CS-M4-T02',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Location of Closed-Loop Poles in the s-Plane',
    subtopic: 'Poles on Imaginary Axis',
    category: 'comparison',
    difficulty: 'Medium',
    question: 'What is the stability classification of a system having: (i) a single pair of non-repeated complex conjugate poles on the imaginary axis, versus (ii) repeated (multiple) pairs of poles on the imaginary axis?',
    options: [
      '(i) Marginally Stable (sustained constant-amplitude oscillation); (ii) Unstable (response grows unbounded as $t \\sin(\\omega t)$).',
      '(i) Stable; (ii) Marginally Stable.',
      '(i) Unstable; (ii) Marginally Stable.',
      'Both cases are strictly stable.'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 45-46 explicitly proves: Distinct poles on the imaginary axis give sinusoidal terms $\\sin(\\omega t)$, whose amplitude is bounded (Marginally Stable). However, repeated roots on the imaginary axis (e.g., $(s^2+\\omega^2)^2 = 0$) produce inverse Laplace terms like $t \\sin(\\omega t)$, which grow linearly with time towards infinity, resulting in an UNSTABLE system.',
    whyCorrect: 'Option A reflects the classic Routh-Hurwitz and Laplace transform conclusion shown on Slide 45-46.',
    distractorAnalysis: [
      'Single pair is not asymptotically stable because transients never decay to zero.',
      'Single pair is not unstable because oscillations remain bounded.',
      'Repeated imaginary poles are strictly unstable, never stable.'
    ],
    sourceRef: 'BECE302L Module 4, Slide 45-46',
    keywords: ['Marginally Stable', 'Imaginary Axis', 'Repeated Roots', 'Instability'],
    isVerified: true
  },
  {
    id: 'CS-M4-T03',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Routh-Hurwitz Stability Criterion',
    subtopic: 'Routh-Hurwitz Sign Change Theorem',
    category: 'theory',
    difficulty: 'Easy',
    question: 'According to the Routh-Hurwitz Stability Criterion, the number of roots of the characteristic equation lying in the Right-Half of the $s$-plane (RHP) is equal to:',
    options: [
      'The number of sign changes in the first column of the Routh Array.',
      'The total number of rows in the Routh Array.',
      'The number of negative coefficients in the original characteristic polynomial.',
      'The number of zeros in the second column of the Routh Array.'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 17 states: "Routh Hurwitz Criterion states that: The number of roots of the characteristic equation with positive real parts (lying in RHP) is equal to the number of changes in the sign of the first column of the Routh Array."',
    whyCorrect: 'Option A is the fundamental theorem of Routh-Hurwitz stability analysis.',
    distractorAnalysis: [
      'The number of rows equals the order $n+1$, not the number of RHP roots.',
      'Polynomial coefficients alone do not reveal roots if sign changes cancel or occur internally.',
      'Second column zeros do not determine RHP pole counts.'
    ],
    sourceRef: 'BECE302L Module 4, Slide 17',
    keywords: ['Routh Hurwitz', 'Routh Array', 'Sign Changes', 'RHP Poles'],
    isVerified: true
  },
  {
    id: 'CS-M4-T04',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Special Routh Array Cases',
    subtopic: 'Entire Row of Zeros and Auxiliary Polynomial',
    category: 'theory',
    difficulty: 'Hard',
    question: 'When an entire row of zeros appears in the Routh Array during computation, what procedure must be followed, and what structural property of the roots does this row of zeros indicate?',
    options: [
      'Construct an Auxiliary Polynomial $A(s)$ from the row immediately above, differentiate it ($\\\\frac{dA}{ds}$), and replace the zero row with the coefficients; it indicates roots symmetrical about the origin.',
      'Replace the first zero with $\\epsilon$ and continue without differentiating.',
      'Terminate the calculation immediately and declare the system unconditionally stable.',
      'Divide all rows by $s$ and re-index the array from $s^{n-1}$.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 4 (Slides 34-38): "If an entire row is Zero: Form an auxiliary polynomial $A(s)$ with entries of the row immediately above. $A(s)$ is an even polynomial. Differentiate $A(s)$ with respect to $s$: $\\frac{dA(s)}{ds}$, and replace the row of zeros by the coefficients of the derivative. Symmetrical roots about the origin exist (real symmetric $\\pm\\sigma$, imaginary symmetric $\\pm j\\omega$, or quadrate quadruplets $\\pm\\sigma \\pm j\\omega$)."',
    whyCorrect: 'Option A accurately states the exact steps and root symmetry (quadrantal symmetry) taught in Slides 35-38.',
    distractorAnalysis: [
      'Replacing with $\\epsilon$ is used when only the FIRST element is zero, not when the ENTIRE row is zero.',
      'Declaring the system stable without testing roots of $A(s)$ is a dangerous mistake; roots may be repeated on the imaginary axis or in the RHP.',
      'Dividing by $s$ is mathematically invalid for characteristic polynomials.'
    ],
    sourceRef: 'BECE302L Module 4, Slides 34-38',
    keywords: ['Row of Zeros', 'Auxiliary Polynomial', 'Symmetry about Origin', 'Routh Special Case'],
    isVerified: true
  },
  {
    id: 'CS-M4-F02',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Evans Conditions for Root Locus Points',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which pair of Evans conditions must a complex number $s_0$ satisfy to be a point on the root locus of a negative feedback system with characteristic equation $1 + K G(s)H(s) = 0$ ($K > 0$)?',
    options: [
      'Magnitude: $|K G(s_0)H(s_0)| = 1$; \\quad Phase: $\\angle G(s_0)H(s_0) = \\pm(2q + 1)180^\\circ$ ($q = 0, 1, 2, \\dots$)',
      'Magnitude: $|K G(s_0)H(s_0)| = 0$; \\quad Phase: $\\angle G(s_0)H(s_0) = \\pm 360^\\circ$',
      'Magnitude: $|K G(s_0)H(s_0)| = \\infty$; \\quad Phase: $\\angle G(s_0)H(s_0) = 0^\\circ$',
      'Magnitude: $|K G(s_0)H(s_0)| = -1$; \\quad Phase: $\\angle G(s_0)H(s_0) = 90^\\circ$'
    ],
    correctAnswer: 0,
    explanation: 'From $1 + KG(s)H(s) = 0 \\implies KG(s)H(s) = -1 = 1 \\angle \\pm(2q+1)180^\\circ$. Therefore, the magnitude must equal 1 ($|KG(s)H(s)| = 1$), and the net phase angle must be an odd multiple of $180^\\circ$ ($\\angle G(s)H(s) = \\pm(2q+1)180^\\circ$).',
    whyCorrect: 'Option A gives the precise Evans magnitude and angle criteria from Slide 58-59.',
    distractorAnalysis: [
      'Magnitude is 1, not 0; phase must be odd multiple of 180°, not even multiple (360° is for positive feedback).',
      'Magnitude cannot be infinity on the root locus.',
      'Magnitudes are strictly positive real numbers; cannot be -1.'
    ],
    formulaId: 'FORM-M4-03',
    sourceRef: 'BECE302L Module 4, Slide 58-59',
    keywords: ['Evans Conditions', 'Angle Criterion', 'Magnitude Criterion', 'Root Locus'],
    isVerified: true
  },
  {
    id: 'CS-M4-T05',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Real Axis Segment Criterion (Rule 3)',
    category: 'theory',
    difficulty: 'Easy',
    question: 'According to Rule 3 of Root Locus construction, under what condition does a test point on the real axis lie on the root locus?',
    options: [
      'If the total sum of real open-loop poles and open-loop zeros to the RIGHT of the test point is an ODD number.',
      'If the total sum of real open-loop poles and open-loop zeros to the RIGHT of the test point is an EVEN number.',
      'If there are no open-loop poles on the real axis.',
      'If the test point lies strictly between the origin and the first zero.'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 70 states: "Rule 3: A point on the real axis lies on the root locus if the sum of the poles and zeros on the real axis to the right side of the point is an odd number." This is because each real pole/zero to the right contributes $180^\\circ$ phase lag, while those to the left contribute $0^\\circ$. An odd number of $180^\\circ$ contributions yields $\\pm(2q+1)180^\\circ$, satisfying the angle criterion.',
    whyCorrect: 'Option A matches Rule 3. Complex conjugate pairs to the right contribute $360^\\circ$ and thus do not affect the odd/even count.',
    distractorAnalysis: [
      'An even sum gives a net angle of $0^\\circ$ or $360^\\circ$, which violates the negative feedback angle criterion.',
      'Root locus frequently exists on the real axis between poles.',
      'Arbitrary restriction that ignores poles and zeros elsewhere on the real axis.'
    ],
    sourceRef: 'BECE302L Module 4, Slide 70',
    diagram: 'root-locus-basic',
    keywords: ['Real Axis Segment', 'Rule 3', 'Angle Criterion', 'Odd Sum'],
    isVerified: true
  },
  {
    id: 'CS-M4-F03',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Asymptote Centroid Formula (Rule 5)',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which expression correctly calculates the Centroid $\\sigma_A$ (the real axis intersection point of the root locus asymptotes)?',
    options: [
      '$\\sigma_A = \\frac{\\sum_{i=1}^n \\text{Re}(p_i) - \\sum_{j=1}^m \\text{Re}(z_j)}{n - m}$',
      '$\\sigma_A = \\frac{\\sum_{i=1}^n \\text{Re}(p_i) + \\sum_{j=1}^m \\text{Re}(z_j)}{n + m}$',
      '$\\sigma_A = \\frac{n - m}{\\sum \\text{Re}(p_i)}$',
      '$\\sigma_A = \\frac{\\sum |p_i| - \\sum |z_j|}{2}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 76, 80: The centroid of asymptotes is given by $\\sigma_A = \\frac{\\text{Sum of Real Part of Poles} - \\text{Sum of Real Part of Zeros}}{\\text{No. of Poles} - \\text{No. of Zeros}} = \\frac{\\sum \\text{Re}(p_i) - \\sum \\text{Re}(z_i)}{n - m}$.',
    whyCorrect: 'Option A gives the precise formula derived from the binomial expansion of the characteristic equation at large $|s|$.',
    distractorAnalysis: [
      'Zeros must be subtracted, not added, and denominator is $n-m$, not $n+m$.',
      'Inverts the numerator and denominator.',
      'Uses absolute magnitudes instead of signed real parts.'
    ],
    formulaId: 'FORM-M4-05',
    sourceRef: 'BECE302L Module 4, Slide 76, 80',
    keywords: ['Centroid', 'Asymptotes', 'Root Locus Rule 5'],
    isVerified: true
  },
  {
    id: 'CS-M4-F04',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Breakaway Point Formula (Rule 6)',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Breakaway and break-in points on the root locus represent points of multiple roots and are mathematically determined by solving:',
    options: [
      '$\\frac{dK}{ds} = 0$',
      '$\\frac{d^2K}{ds^2} = 1$',
      '$K(s) = 0$',
      '$\\lim_{s \\to \\infty} K(s) = 0$'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 87-89 proves: At a breakaway point, multiple roots exist, meaning $\\frac{d}{ds}[1 + K G(s)H(s)] = 0$. Since $K = -\\frac{1}{G(s)H(s)} = -\\frac{Q(s)}{P(s)}$, differentiating with respect to $s$ yields $\\frac{dK}{ds} = 0$.',
    whyCorrect: 'Option A is the universal condition for breakaway/break-in points on the root locus.',
    distractorAnalysis: [
      'Second derivative equals 1 is an arbitrary incorrect formula.',
      '$K=0$ gives the starting points (open loop poles), not the breakaway points.',
      'Limits at infinity locate asymptote endpoints, not breakaway points.'
    ],
    formulaId: 'FORM-M4-06',
    sourceRef: 'BECE302L Module 4, Slide 87-89',
    keywords: ['Breakaway Point', 'Multiple Roots', 'Derivative of Gain', 'Rule 6'],
    isVerified: true
  },

  // ==========================================
  // MODULE 5: FREQUENCY DOMAIN RESPONSE
  // ==========================================
  {
    id: 'CS-M5-T01',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Concept of Frequency Response',
    subtopic: 'Steady-State Sinusoidal Response',
    category: 'theory',
    difficulty: 'Easy',
    question: 'When a stable linear time-invariant (LTI) system with transfer function $G(s)$ is excited by a sinusoidal input $r(t) = A \\sin(\\omega t)$, what is the nature of the steady-state output response $c_{ss}(t)$?',
    options: [
      'A sinusoid of the EXACT SAME frequency $\\omega$, with amplitude scaled by $|G(j\\omega)|$ and phase shifted by $\\angle G(j\\omega)$.',
      'A sinusoid of double the frequency ($2\\omega$) due to power dissipation.',
      'An exponential waveform decaying asymptotically to zero.',
      'A square wave containing odd harmonics of $\\omega$.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 5 (Slides 2, 10-11): "For LTI systems, if the input is a sinusoidal signal, the steady-state output will be a sinusoidal signal of the identical frequency $\\omega$, modified only in amplitude by $|G(j\\omega)|$ and phase by $\\phi(\\omega) = \\angle G(j\\omega)$: $c_{ss}(t) = A|G(j\\omega)|\\sin(\\omega t + \\phi)$."',
    whyCorrect: 'LTI systems can never create new frequencies; only non-linear systems generate harmonics ($2\\omega$, square waves).',
    distractorAnalysis: [
      'Generating $2\\omega$ indicates non-linear harmonic distortion, impossible in an LTI system.',
      'Decaying exponential represents the transient response $y_{tr}(t)$, not the steady-state response.',
      'Square waves require infinite harmonic generation, violating linearity.'
    ],
    sourceRef: 'BECE302L Module 5, Slide 2, 10-11',
    keywords: ['Frequency Response', 'Sinusoidal Input', 'LTI System', 'Amplitude and Phase'],
    isVerified: true
  },
  {
    id: 'CS-M5-F01',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Frequency Domain Specifications',
    subtopic: 'Resonant Peak Formula',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which of the following is the correct formula for the Resonant Peak $M_r$ of a standard second-order closed-loop system, and under what condition does it exist?',
    options: [
      '$M_r = \\frac{1}{2\\zeta\\sqrt{1 - \\zeta^2}}$, valid for $\\zeta \\le \\frac{1}{\\sqrt{2}} \\approx 0.707$',
      '$M_r = \\frac{1}{\\zeta\\sqrt{1 - \\zeta^2}}$, valid for all $\\zeta > 1$',
      '$M_r = 2\\zeta\\omega_n$, valid for $\\zeta = 0$',
      '$M_r = \\frac{\\omega_n}{\\sqrt{1 - 2\\zeta^2}}$, valid for $\\zeta \\ge 1$'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 16 explicitly presents: $M_r = \\frac{1}{2\\zeta\\sqrt{1-\\zeta^2}}$. A resonant peak occurs only when the derivative of $|M(j\\omega)|$ with respect to $\\omega$ has a positive real root, which requires $1 - 2\\zeta^2 > 0 \\implies \\zeta < \\frac{1}{\\sqrt{2}} \\approx 0.707$. For $\\zeta > 0.707$, $|M(j\\omega)|$ decreases monotonically from its DC value $M=1$.',
    whyCorrect: 'Option A gives both the correct formula and its precise mathematical validity boundary ($\zeta \\le 0.707$).',
    distractorAnalysis: [
      'Missing the factor of 2 in denominator and cites an impossible validity range.',
      '$2\\zeta\\omega_n$ has dimensions of frequency, whereas $M_r$ is a dimensionless magnitude ratio.',
      'Confuses resonant frequency $\\omega_r$ with peak magnitude $M_r$.'
    ],
    formulaId: 'FORM-M5-01',
    sourceRef: 'BECE302L Module 5, Slide 16',
    keywords: ['Resonant Peak', 'Damping Ratio', 'Cutoff Boundary', 'Frequency Specifications'],
    isVerified: true
  },
  {
    id: 'CS-M5-F02',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Frequency Domain Specifications',
    subtopic: 'Resonant Frequency Formula',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which expression gives the correct Resonant Frequency $\\omega_r$ of a standard second-order system?',
    options: [
      '$\\omega_r = \\omega_n \\sqrt{1 - 2\\zeta^2}$',
      '$\\omega_r = \\omega_n \\sqrt{1 - \\zeta^2}$',
      '$\\omega_r = \\frac{\\omega_n}{\\sqrt{1 - 2\\zeta^2}}$',
      '$\\omega_r = \\omega_n (1 - 2\\zeta^2)$'
    ],
    correctAnswer: 0,
    explanation: 'In Module 5 (Slide 16): Differentiating the magnitude $|M(j\\omega)|$ with respect to $\\omega$ and equating to zero yields the resonant frequency: $\\omega_r = \\omega_n\\sqrt{1 - 2\\zeta^2}$. Notice that $\\omega_r < \\omega_d < \\omega_n$.',
    whyCorrect: 'Option A is the exact formula from Slide 16.',
    distractorAnalysis: [
      '$\\omega_n\\sqrt{1-\\zeta^2}$ is the damped natural frequency $\\omega_d$ in the time domain, not the resonant frequency $\\omega_r$.',
      'Incorrectly divides by the square root term.',
      'Omits the square root.'
    ],
    formulaId: 'FORM-M5-02',
    sourceRef: 'BECE302L Module 5, Slide 16',
    keywords: ['Resonant Frequency', 'Natural Frequency', 'Frequency Peak'],
    isVerified: true
  },
  {
    id: 'CS-M5-T02',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Relative Stability',
    subtopic: 'Crossover Frequencies and Stability Condition',
    category: 'comparison',
    difficulty: 'Medium',
    question: 'Let $\\omega_{gc}$ be the Gain Crossover Frequency ($|G(j\\omega)H(j\\omega)| = 1$) and $\\omega_{pc}$ be the Phase Crossover Frequency ($\\angle G(j\\omega)H(j\\omega) = -180^\\circ$). Which relationship guarantees that the closed-loop system is STABLE?',
    options: [
      '$\\omega_{gc} < \\omega_{pc}$, which corresponds to Gain Margin $> 0\\text{ dB}$ and Phase Margin $> 0^\\circ$',
      '$\\omega_{gc} > \\omega_{pc}$, which corresponds to Gain Margin $< 0\\text{ dB}$ and Phase Margin $< 0^\\circ$',
      '$\\omega_{gc} = \\omega_{pc}$, which corresponds to an over-damped stable system',
      '$\\omega_{pc} = 0$, regardless of $\\omega_{gc}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 68-69 explicitly summarizes: "If $\\omega_{gc} < \\omega_{pc} \\implies$ Stable System ($GM > 0\\text{ dB}, PM > 0^\\circ$). If $\\omega_{gc} = \\omega_{pc} \\implies$ Marginally Stable System ($GM = 0\\text{ dB}, PM = 0^\\circ$). If $\\omega_{gc} > \\omega_{pc} \\implies$ Unstable System ($GM < 0\\text{ dB}, PM < 0^\\circ$)."',
    whyCorrect: 'Option A matches the fundamental relative stability criterion of control theory.',
    distractorAnalysis: [
      '$\\omega_{gc} > \\omega_{pc}$ implies the system has gained unity amplification while having $-180^\\circ$ phase lag, making it unstable.',
      '$\\omega_{gc} = \\omega_{pc}$ implies marginal stability with sustained oscillations, not overdamped.',
      '$\\omega_{pc}=0$ is not a valid condition for physical stability.'
    ],
    formulaId: 'FORM-M5-04',
    sourceRef: 'BECE302L Module 5, Slide 68-69',
    diagram: 'nyquist-plot-basic',
    keywords: ['Gain Crossover', 'Phase Crossover', 'Gain Margin', 'Phase Margin', 'Stability'],
    isVerified: true
  },
  {
    id: 'CS-M5-T03',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Nyquist Stability Criterion',
    subtopic: 'Encirclement of (-1+j0) Theorem',
    category: 'theory',
    difficulty: 'Hard',
    question: 'According to the Nyquist Stability Criterion, if an open-loop system has $P = 1$ pole in the Right-Half $s$-plane (open-loop unstable), how many times and in which direction must the Nyquist plot of $G(s)H(s)$ encircle the critical point $(-1 + j0)$ for the closed-loop system to be STABLE?',
    options: [
      'Exactly ONCE in the COUNTERCLOCKWISE direction ($N = +1$)',
      'Exactly ONCE in the CLOCKWISE direction ($N = -1$)',
      'Zero times (must not encircle the critical point)',
      'Twice in the clockwise direction'
    ],
    correctAnswer: 0,
    explanation: 'In Module 5 (Slides 48, 54-55): Nyquist criterion is $N = P - Z$, where $N$ is counterclockwise encirclements of $(-1+j0)$, $P$ is open-loop RHP poles, and $Z$ is closed-loop RHP poles. For closed-loop stability, we must have $Z = 0$. Therefore, $N = P - 0 = P$. Since $P = 1$, the plot must encircle $(-1+j0)$ exactly $N = 1$ time in the counterclockwise direction.',
    whyCorrect: 'As shown in the example on Slide 54-55 for $G(s)H(s) = \\frac{s+2}{(s+1)(s-1)}$ ($P=1$), the Nyquist plot encircles $(-1+j0)$ once counterclockwise, proving the closed-loop system is stable!',
    distractorAnalysis: [
      'Clockwise encirclement ($N = -1$) gives $Z = P - N = 1 - (-1) = 2$ unstable closed-loop poles.',
      'Zero encirclements ($N=0$) would mean $Z = P = 1$, so the closed loop would remain unstable.',
      'Twice clockwise gives 3 unstable poles.'
    ],
    formulaId: 'FORM-M5-05',
    sourceRef: 'BECE302L Module 5, Slide 48, 54-55',
    keywords: ['Nyquist Criterion', 'Critical Point', 'Encirclement', 'Open Loop Unstable'],
    isVerified: true
  },
  {
    id: 'CS-M5-F03',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Bode Plots',
    subtopic: 'First-Order Factor Corner Frequency Error',
    category: 'formula-interpretation',
    difficulty: 'Medium',
    question: 'For a first-order factor $\\frac{1}{1 + j\\omega T}$, what is the exact error in magnitude between the actual frequency response and the asymptotic straight-line approximation at the corner frequency $\\omega_c = \\frac{1}{T}$?',
    options: [
      '$-3.01\\text{ dB}$ (the actual magnitude is $3\\text{ dB}$ below the $0\\text{ dB}$ asymptote)',
      '$-6.02\\text{ dB}$',
      '$0\\text{ dB}$ (the asymptote is exact at the corner frequency)',
      '$+3.01\\text{ dB}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 86 explicitly derives the error: $\\text{Actual} = -20\\log\\sqrt{1 + (\\omega T)^2}$. At $\\omega = 1/T$, $\\text{Actual} = -20\\log\\sqrt{1 + 1} = -20\\log\\sqrt{2} = -3.01\\text{ dB}$. The asymptotic approximation at $\\omega = 1/T$ is $0\\text{ dB}$. Therefore, $\\text{Error} = -3.01\\text{ dB}$.',
    whyCorrect: 'Option A is the fundamental $-3\\text{ dB}$ break-point rule taught in Slide 86.',
    distractorAnalysis: [
      '$-6\\text{ dB}$ occurs for a second-order critically damped double pole $(1+sT)^2$.',
      'The straight-line asymptote has its maximum error of $-3\\text{ dB}$ right at the corner frequency.',
      'The actual curve droops below the asymptote, so the error is negative, not positive.'
    ],
    formulaId: 'FORM-M5-06',
    sourceRef: 'BECE302L Module 5, Slide 86-87',
    diagram: 'bode-plot-first-order',
    keywords: ['Bode Plot', 'Corner Frequency', '-3dB Error', 'Asymptote'],
    isVerified: true
  },

  // ==========================================
  // MODULE 6: CONTROLLERS & COMPENSATORS
  // ==========================================
  {
    id: 'CS-M6-T01',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Proportional, Integral, and Derivative Controllers',
    subtopic: 'Integral Controller (Reset Mode)',
    category: 'theory',
    difficulty: 'Easy',
    question: 'What is the principal reason for adding an Integral (I) Controller ($G_c(s) = \\frac{K_i}{s}$) into the forward path of a control system, and what is its main drawback?',
    options: [
      'It adds a pole at the origin to eliminate steady-state error completely, but it introduces phase lag ($-90^\\circ$) which tends to reduce system stability.',
      'It adds a zero to improve stability, but it amplifies high-frequency sensor noise.',
      'It increases system speed without altering the steady-state error.',
      'It eliminates the need for feedback sensors.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 6 handwritten notes (Page 97-98): "Integral Controller (Reset mode): $p(t) = K_i \\int e(t)dt \\implies P(s) = \\frac{K_i}{s} E(s)$. Advantages: Eliminates steady-state error ($e_{ss}=0$), improves system accuracy, compensates for constant disturbances. Disadvantages: Slower response, reduces stability because it adds a pole at the origin ($s=0$)."',
    whyCorrect: 'Option A captures both the primary merit ($e_{ss} = 0$) and the classic demerit (adds pole at origin, reducing phase margin and stability).',
    distractorAnalysis: [
      'Adding a zero and amplifying noise describes a Derivative (D) controller, not Integral.',
      'Proportional controllers increase speed; integral controllers typically slow the response.',
      'Integral controllers operate on the feedback error signal and still require sensors.'
    ],
    sourceRef: 'BECE302L Module 6 Notes, Page 97-98',
    keywords: ['Integral Controller', 'Reset Mode', 'Steady-state Error', 'Stability Reduction'],
    isVerified: true
  },
  {
    id: 'CS-M6-T02',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Proportional, Integral, and Derivative Controllers',
    subtopic: 'Derivative Controller (Anticipatory Action)',
    category: 'theory',
    difficulty: 'Medium',
    question: 'Why is a pure Derivative Controller ($G_c(s) = K_d s$) NEVER used alone in practical industrial feedback control systems?',
    options: [
      'It produces zero control output when the error is constant (cannot eliminate steady-state error) and drastically amplifies high-frequency noise.',
      'It makes the system sluggish and introduces an additional pole at the origin.',
      'It cannot be physically implemented using operational amplifiers.',
      'It always causes the closed-loop system to become non-linear.'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Page 98-99): "Derivative Controller (Rate mode / Anticipatory controller): $p(t) = K_d \\frac{de}{dt}$. Since $\\frac{d(\\text{constant})}{dt} = 0$, it produces no control action for constant steady-state error. Furthermore, its gain $|K_d j\\omega| = K_d \\omega$ increases linearly with frequency, heavily amplifying high-frequency noise. Hence it is never used alone; it is always combined as PD or PID."',
    whyCorrect: 'Option A identifies both fundamental physical reasons: noise amplification ($\times \\omega$) and insensitivity to constant DC error.',
    distractorAnalysis: [
      'Derivative action speeds up response and adds a ZERO, not a pole.',
      'It is easily built with an op-amp differentiator circuit, but practical implementations add a roll-off resistor.',
      'Derivative operations are purely linear.'
    ],
    sourceRef: 'BECE302L Module 6 Notes, Page 98-99',
    keywords: ['Derivative Controller', 'Anticipatory Controller', 'Noise Amplification', 'Zero DC Action'],
    isVerified: true
  },
  {
    id: 'CS-M6-F01',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'PID Controller Working Principles',
    subtopic: 'Parallel PID Transfer Function',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'Which of the following equations represents the standard transfer function of an ideal PID controller with proportional gain $K_p$, integral time $T_i$, and derivative time $T_d$?',
    options: [
      '$G_c(s) = K_p \\left(1 + \\frac{1}{T_i s} + T_d s\\right) = \\frac{K_p T_i T_d s^2 + K_p T_i s + K_p}{T_i s}$',
      '$G_c(s) = K_p + T_i s + \\frac{T_d}{s}$',
      '$G_c(s) = \\frac{K_p (1 + T_i s)}{1 + T_d s}$',
      '$G_c(s) = K_p \\cdot \\frac{1}{T_i s} \\cdot T_d s$'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Page 106): The control signal is $p(t) = K_p e(t) + \\frac{K_p}{T_i}\\int e dt + K_p T_d \\frac{de}{dt}$. Taking the Laplace transform: $G_c(s) = K_p \\left(1 + \\frac{1}{T_i s} + T_d s\\right) = \\frac{K_d s^2 + K_p s + K_i}{s}$.',
    whyCorrect: 'Option A is the canonical representation of a parallel PID controller with 1 pole at origin and 2 zeros.',
    distractorAnalysis: [
      'Inverts the placement of $s$ between integral and derivative terms ($T_i$ belongs in denominator).',
      '$\\frac{K_p(1+T_is)}{1+T_ds}$ is a lead-lag compensator form, not PID.',
      'Multiplying the three terms is mathematically meaningless.'
    ],
    formulaId: 'FORM-M6-01',
    sourceRef: 'BECE302L Module 6 Notes, Page 106',
    diagram: 'opamp-pi-controller',
    keywords: ['PID Controller', 'Transfer Function', 'Integral Time', 'Derivative Time'],
    isVerified: true
  },
  {
    id: 'CS-M6-T03',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Lead Compensator',
    subtopic: 'Pole-Zero Placement on s-Plane',
    category: 'comparison',
    difficulty: 'Medium',
    question: 'How are the pole and zero positioned on the negative real axis of the $s$-plane for a PHASE LEAD compensator compared to a PHASE LAG compensator?',
    options: [
      'In a Lead compensator, the ZERO is closer to the origin than the pole; in a Lag compensator, the POLE is closer to the origin than the zero.',
      'In a Lead compensator, the POLE is closer to the origin than the zero; in a Lag compensator, the ZERO is closer to the origin.',
      'Both lead and lag compensators place their zeros at the origin.',
      'Both lead and lag compensators have identical pole-zero locations and differ only in gain.'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Pages 103, 105): "Lead compensator always has ZERO first, then POLE: zero at $-1/T$, pole at $-1/(\\alpha T)$ with $\\alpha < 1$. Because $|-1/T| < |-1/(\\alpha T)|$, the zero is closer to the origin! For Lag compensator: pole at $-1/(\\beta T_2)$, zero at $-1/T_2$ with $\\beta > 1$. Because $|-1/(\\beta T_2)| < |-1/T_2|$, the pole is closer to the origin!"',
    whyCorrect: 'Option A reflects the classic rule: Lead = Zero closer to origin (provides phase lead); Lag = Pole closer to origin (provides phase lag).',
    distractorAnalysis: [
      'Reverses the pole-zero placement between lead and lag.',
      'Neither places zeros at the origin (a zero at origin is a pure differentiator).',
      'Pole-zero configurations are opposites.'
    ],
    formulaId: 'FORM-M6-02',
    sourceRef: 'BECE302L Module 6 Notes, Page 103, 105',
    diagram: 'lead-lag-compensator',
    keywords: ['Lead Compensator', 'Lag Compensator', 'Pole Zero Placement', 'Phase Lead'],
    isVerified: true
  },
  {
    id: 'CS-M6-F02',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Lead Compensator',
    subtopic: 'Maximum Phase Lead Angle Formula',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which equation correctly expresses the maximum phase lead angle $\\phi_m$ provided by a lead compensator in terms of its attenuation factor $\\alpha$ (where $\\alpha < 1$)?',
    options: [
      '$\\sin(\\phi_m) = \\frac{1 - \\alpha}{1 + \\alpha}$',
      '$\\cos(\\phi_m) = \\frac{1 - \\alpha}{1 + \\alpha}$',
      '$\\tan(\\phi_m) = \\frac{1 + \\alpha}{1 - \\alpha}$',
      '$\\sin(\\phi_m) = \\frac{\\alpha}{1 + \\alpha}$'
    ],
    correctAnswer: 0,
    explanation: 'From the frequency response of the lead compensator $G_c(j\\omega) = \\frac{1 + j\\omega T}{1 + j\\omega \\alpha T}$, the phase is $\\phi(\\omega) = \\tan^{-1}(\\omega T) - \\tan^{-1}(\\alpha\\omega T)$. Differentiating $\\phi$ with respect to $\\omega$ and setting to zero yields $\\omega_m = \\frac{1}{T\\sqrt{\\alpha}}$ and the maximum phase lead: $\\sin(\\phi_m) = \\frac{1 - \\alpha}{1 + \\alpha}$.',
    whyCorrect: 'Option A is the universal relationship relating maximum lead angle $\\phi_m$ to attenuation $\\alpha$.',
    distractorAnalysis: [
      'The relationship is with $\\sin(\\phi_m)$, not $\\cos(\\phi_m)$.',
      '$\\tan(\\phi_m) = \\frac{1-\\alpha}{2\\sqrt{\\alpha}}$, not $\\frac{1+\\alpha}{1-\\alpha}$.',
      'Numerator must be $1 - \\alpha$.'
    ],
    formulaId: 'FORM-M6-04',
    sourceRef: 'BECE302L Module 6 Notes, Page 104-105',
    keywords: ['Lead Compensator', 'Maximum Phase Lead', 'Attenuation Factor', 'Sine Relationship'],
    isVerified: true
  },
  {
    id: 'CS-M6-T04',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Lag and Lead-Lag Compensators',
    subtopic: 'Engineering Performance Trade-offs',
    category: 'theory',
    difficulty: 'Medium',
    question: 'When is a Lag Compensator chosen over a Lead Compensator in feedback control design?',
    options: [
      'When the transient response is already satisfactory, but the steady-state error must be substantially reduced without increasing bandwidth or noise sensitivity.',
      'When the system is too sluggish and needs to be speeded up with wider bandwidth.',
      'When the phase margin must be increased by adding positive phase angle.',
      'When the high-frequency sensor noise must be amplified.'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Page 103-104): A lag compensator provides high gain at low frequencies to eliminate steady-state error ($e_{ss} \\approx 0$), while attenuating high frequencies. It is chosen when the transient response is already acceptable but steady-state accuracy must be improved without increasing bandwidth.',
    whyCorrect: 'Option A accurately states the design purpose of a lag compensator.',
    distractorAnalysis: [
      'Speeding up the response and increasing bandwidth is the exact purpose of a LEAD compensator.',
      'Adding positive phase angle is the definition of a LEAD compensator.',
      'Control engineers never desire to amplify high-frequency sensor noise.'
    ],
    formulaId: 'FORM-M6-03',
    sourceRef: 'BECE302L Module 6 Notes, Page 103-104',
    keywords: ['Lag Compensator', 'Steady-state Accuracy', 'Bandwidth', 'Compensator Selection'],
    isVerified: true
  },

  // ==========================================
  // ADDITIONAL IN-DEPTH QUESTIONS FOR THOROUGH COVERAGE
  // ==========================================
  {
    id: 'CS-M1-T06',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Physical Case Studies',
    subtopic: 'Antenna Azimuth Position Control',
    category: 'diagram',
    difficulty: 'Medium',
    question: 'In the ISRO Deep Space Network antenna azimuth positioning system (Slides 19-27), what is the specific role of the input and output potentiometers?',
    options: [
      'They act as input and output transducers that convert angular shaft positions $\\theta_i(t)$ and $\\theta_o(t)$ into proportional electrical voltages.',
      'They amplify the electric motor current to turn the heavy antenna dish.',
      'They measure the wind disturbance acting directly on the dish structure.',
      'They filter out high-frequency electromagnetic radar noise.'
    ],
    correctAnswer: 0,
    explanation: 'Module 1 Slides 21-27 illustrate the antenna position control case study: The input potentiometer converts the desired azimuth angle command $\\theta_i(t)$ into an electrical voltage, and the feedback potentiometer converts the actual antenna azimuth angle $\\theta_o(t)$ into a proportional voltage for comparison at the differential summing junction.',
    whyCorrect: 'Option A correctly identifies potentiometers as angular-to-voltage transducers.',
    distractorAnalysis: [
      'Amplification of motor current is performed by the power amplifier, not potentiometers.',
      'Potentiometers measure angular shaft rotation, not aerodynamic wind force.',
      'Radar noise filtering is done by low-pass filters, not potentiometers.'
    ],
    sourceRef: 'BECE302L Module 1, Slide 21-27',
    diagram: 'block-diagram-general',
    keywords: ['Potentiometer', 'Transducer', 'Antenna Azimuth', 'Angle to Voltage'],
    isVerified: true
  },
  {
    id: 'CS-M1-T07',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Physical Case Studies',
    subtopic: 'Phase Locked Loop (PLL) Architecture',
    category: 'theory',
    difficulty: 'Hard',
    question: 'In a Phase-Locked Loop (PLL) control system (Slide 39), which subsystem acts as the feedback comparator (error detector), and which subsystem serves as the controllable plant?',
    options: [
      'The Phase Detector acts as the comparator (error detector), and the Voltage-Controlled Oscillator (VCO) acts as the plant.',
      'The Low-Pass Filter acts as the comparator, and the Counter acts as the plant.',
      'The Counter acts as the comparator, and the Phase Detector acts as the plant.',
      'The Reference input acts as the plant, and the VCO acts as the controller.'
    ],
    correctAnswer: 0,
    explanation: 'In Slide 39, the Phase Detector compares the reference frequency $F_{REF}$ with the divided feedback signal from the $\\div N$ counter, outputting an error voltage. This error passes through a low-pass filter to the Voltage-Controlled Oscillator (VCO), whose output frequency varies in direct response to the error voltage. Thus, Phase Detector = Comparator, VCO = Plant/Actuator.',
    whyCorrect: 'Option A matches the architecture of the PLL shown in Slide 39.',
    distractorAnalysis: [
      'The Low-Pass Filter smooths high frequency ripple; it does not compute phase error.',
      'The $\\div N$ counter is in the feedback path as a frequency divider.',
      'The reference input is an external signal, not a controllable plant.'
    ],
    sourceRef: 'BECE302L Module 1, Slide 39',
    keywords: ['Phase Locked Loop', 'PLL', 'Phase Detector', 'VCO'],
    isVerified: true
  },
  {
    id: 'CS-M2-F05',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Block Diagram Algebra',
    subtopic: 'Interchanging Summing Points',
    category: 'theory',
    difficulty: 'Easy',
    question: 'Two consecutive summing junctions with inputs $A, B$, and $C$ can be interchanged directly because:',
    options: [
      'Addition and subtraction are commutative and associative algebraic operations: $(A \\pm B) \\pm C = (A \\pm C) \\pm B$.',
      'The block diagram assumes all signals are in the time domain.',
      'Summing junctions contain internal operational amplifiers that compensate for phase shifts.',
      'It is only permissible if both summing junctions have only plus signs.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 2 (Slides 10-11): "Interchanging the Summing Point: All these rules are derived by simple algebraic manipulations. Because $(A \\pm B \\pm C) = (A \\pm C \\pm B)$, two adjacent summing points with no intervening blocks can be swapped freely without altering any branch signal."',
    whyCorrect: 'Commutativity and associativity of linear summation allow direct transposition.',
    distractorAnalysis: [
      'Signals are analyzed in the s-domain, not purely time domain.',
      'Summing points are mathematical nodes, not physical op-amp circuits with phase lag.',
      'Signs (+ or -) are preserved on each incoming branch during transposition.'
    ],
    sourceRef: 'BECE302L Module 2, Slide 10-11',
    keywords: ['Summing Point', 'Commutative Property', 'Block Diagram Algebra'],
    isVerified: true
  },
  {
    id: 'CS-M2-F06',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Signal Flow Graphs (SFG)',
    subtopic: 'Non-Touching Loops Definition',
    category: 'theory',
    difficulty: 'Easy',
    question: 'In Signal Flow Graph theory, two feedback loops $L_1$ and $L_2$ are defined as "non-touching" if and only if:',
    options: [
      'They possess no common nodes whatsoever.',
      'They do not cross the same forward path.',
      'Their loop gains have opposite mathematical signs.',
      'They operate in different frequency bands.'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 45 explicitly defines: "Non-touching loops: Loops with no common nodes." If two loops share even a single node, they are touching and cannot be multiplied in the $\\sum L_i L_j$ term of the graph determinant $\\Delta$.',
    whyCorrect: 'Sharing zero common nodes is the strict mathematical definition of non-touching loops.',
    distractorAnalysis: [
      'Touching the forward path relates to $\\Delta_k$, not whether two loops touch each other.',
      'Mathematical signs (+ or -) have no bearing on topological node intersection.',
      'Frequency band is irrelevant to topological graph connectivity.'
    ],
    sourceRef: 'BECE302L Module 2, Slide 45, 49',
    keywords: ['Non-touching Loops', 'Common Nodes', 'Signal Flow Graph', 'Determinant'],
    isVerified: true
  },
  {
    id: 'CS-M3-F06',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Settling Time Tolerance Bands',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'What are the conventional settling time formulas $t_s$ for a second-order underdamped system corresponding to the $2\\%$ tolerance band and $5\\%$ tolerance band respectively?',
    options: [
      '$t_s(2\\%) \\approx \\frac{4}{\\zeta\\omega_n} = 4T, \\quad t_s(5\\%) \\approx \\frac{3}{\\zeta\\omega_n} = 3T$',
      '$t_s(2\\%) \\approx \\frac{2}{\\zeta\\omega_n}, \\quad t_s(5\\%) \\approx \\frac{5}{\\zeta\\omega_n}$',
      '$t_s(2\\%) \\approx \\frac{\\pi}{\\zeta\\omega_n}, \\quad t_s(5\\%) \\approx \\frac{2\\pi}{\\zeta\\omega_n}$',
      '$t_s(2\\%) \\approx \\frac{1}{\\omega_d}, \\quad t_s(5\\%) \\approx \\frac{2}{\\omega_d}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slide 33 and 51: The decay envelope is $e^{-\\zeta\\omega_n t}$. For 2% error: $e^{-\\zeta\\omega_n t_s} = 0.02 \\implies \\zeta\\omega_n t_s = \\ln(50) \\approx 3.91 \\approx 4 \\implies t_s \\approx \\frac{4}{\\zeta\\omega_n} = 4T$. For 5% error: $e^{-\\zeta\\omega_n t_s} = 0.05 \\implies \\zeta\\omega_n t_s = \\ln(20) \\approx 2.996 \\approx 3 \\implies t_s \\approx \\frac{3}{\\zeta\\omega_n} = 3T$.',
    whyCorrect: 'Option A matches the exact derivation and engineering formulas given on Slide 33 & 51.',
    distractorAnalysis: [
      'Inverts the logic: tighter tolerance (2%) requires MORE time (4T), not less time.',
      '$\\pi$ terms appear in peak time $t_p$, not exponential envelope decay.',
      'Settling time depends on the real part $\\sigma = \\zeta\\omega_n$, not the damped frequency $\\omega_d$.'
    ],
    formulaId: 'FORM-M3-10',
    sourceRef: 'BECE302L Module 3, Slide 33, 51',
    keywords: ['Settling Time', 'Tolerance Band', 'Envelope Decay', 'Time Constant'],
    isVerified: true
  },
  {
    id: 'CS-M4-T06',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Number of Branches & Asymptotes',
    category: 'theory',
    difficulty: 'Easy',
    question: 'Consider an open-loop transfer function $G(s)H(s) = \\frac{K(s+1)}{(s+2)(s+3)(s+4)}$. How many total root locus branches exist, and how many branches terminate at infinity as $K \\to \\infty$?',
    options: [
      'Total branches = 3; branches terminating at infinity = 2',
      'Total branches = 4; branches terminating at infinity = 1',
      'Total branches = 3; branches terminating at infinity = 3',
      'Total branches = 1; branches terminating at infinity = 0'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 90: Here $n = 3$ poles (at $-2, -3, -4$) and $m = 1$ finite zero (at $-1$). By Rule 1, the number of branches equals the number of poles: $n = 3$. By Rule 2, $m = 1$ branch terminates at the finite open-loop zero, and the remaining $n - m = 3 - 1 = 2$ branches terminate at infinity along asymptotes.',
    whyCorrect: 'Option A matches Slide 90: 3 total branches originating at open-loop poles; 2 branches terminating at infinity.',
    distractorAnalysis: [
      'Total branches is $n = 3$, not 4.',
      '3 branches terminating at infinity would only occur if there were zero finite zeros ($m=0$).',
      'A system with 3 poles must have 3 branches.'
    ],
    formulaId: 'FORM-M4-04',
    sourceRef: 'BECE302L Module 4, Slide 90',
    keywords: ['Root Locus Branches', 'Asymptotes', 'Poles and Zeros'],
    isVerified: true
  },
  {
    id: 'CS-M4-F05',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Asymptote Angle Formula',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'For a system with $n = 3$ poles and $m = 1$ zero ($n-m = 2$), along which angles $\\phi_A$ do the root locus branches travel to infinity?',
    options: [
      '$\\phi_A = 90^\\circ$ and $270^\\circ$',
      '$\\phi_A = 60^\\circ$ and $180^\\circ$',
      '$\\phi_A = 0^\\circ$ and $180^\\circ$',
      '$\\phi_A = 45^\\circ$ and $135^\\circ$'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 92: $\\phi_A = \\frac{\\pm(2q+1)180^\\circ}{n-m} = \\frac{\\pm(2q+1)180^\\circ}{2}$. For $q = 0$: $\\phi_A = \\frac{180^\\circ}{2} = 90^\\circ$. For $q = 1$: $\\phi_A = \\frac{3 \\times 180^\\circ}{2} = 270^\\circ$ (or $-90^\\circ$).',
    whyCorrect: 'Option A is identical to Slide 92: $\\phi_A = 90^\\circ$ and $270^\\circ$.',
    distractorAnalysis: [
      '$60^\\circ, 180^\\circ, 300^\\circ$ occurs for $n - m = 3$ asymptotes (Slide 81).',
      '$0^\\circ$ and $180^\\circ$ would be along the real axis.',
      '$45^\\circ$ occurs for $n - m = 4$.'
    ],
    formulaId: 'FORM-M4-04',
    sourceRef: 'BECE302L Module 4, Slide 92',
    keywords: ['Asymptote Angles', 'Root Locus', 'n-m'],
    isVerified: true
  },
  {
    id: 'CS-M5-T04',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Bode Plots',
    subtopic: 'Slope of Integral vs Derivative Factors',
    category: 'comparison',
    difficulty: 'Easy',
    question: 'In a Bode magnitude plot, what are the slopes contributed by a single pole at the origin ($\\frac{1}{s}$) and a single zero at the origin ($s$) respectively?',
    options: [
      'Pole at origin: $-20\\text{ dB/decade}$; Zero at origin: $+20\\text{ dB/decade}$',
      'Pole at origin: $+20\\text{ dB/decade}$; Zero at origin: $-20\\text{ dB/decade}$',
      'Pole at origin: $-40\\text{ dB/decade}$; Zero at origin: $+40\\text{ dB/decade}$',
      'Both contribute $0\\text{ dB/decade}$ with a phase shift of $180^\\circ$'
    ],
    correctAnswer: 0,
    explanation: 'In Module 5 (Slides 74-77): For an integral factor $\\frac{1}{j\\omega}$, magnitude in dB is $20\\log|1/(j\\omega)| = -20\\log\\omega$. As $\\omega$ increases by a decade (factor of 10), $-20\\log(10\\omega) = -20\\log\\omega - 20$, giving a slope of $-20\\text{ dB/decade}$ and constant phase $-90^\\circ$. For a derivative factor $j\\omega$, magnitude is $+20\\log\\omega$, giving a slope of $+20\\text{ dB/decade}$ and constant phase $+90^\\circ$.',
    whyCorrect: 'Option A correctly states the standard Bode logarithmic slopes.',
    distractorAnalysis: [
      'Inverts the signs: poles attenuate (negative slope), zeros boost (positive slope).',
      '$-40\\text{ dB/decade}$ corresponds to double poles/zeros at the origin ($s^2$ or $1/s^2$).',
      'Poles and zeros at the origin have non-zero slopes across all frequencies.'
    ],
    sourceRef: 'BECE302L Module 5, Slide 74-77',
    keywords: ['Bode Plot', 'Slope', 'dB/decade', 'Pole at Origin', 'Zero at Origin'],
    isVerified: true
  },
  {
    id: 'CS-M6-T05',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Proportional-Derivative (PD) Controller',
    subtopic: 'PD Controller Frequency Characteristics',
    category: 'theory',
    difficulty: 'Medium',
    question: 'How does a Proportional-Derivative (PD) Controller modify the frequency response and transient response of a control system?',
    options: [
      'It introduces phase lead $\\phi = \\tan^{-1}(\\omega T_d)$, which increases the phase margin, adds damping, and reduces peak overshoot.',
      'It introduces phase lag, which slows down the transient response.',
      'It adds a pole at the origin, eliminating steady-state error.',
      'It narrows the system bandwidth, making the system sluggish.'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Page 106-107): "PD Controller: $K(s) = K_p + K_d s = K_p(1 + T_d s)$. Frequency response phase is $\\phi = +\\tan^{-1}(\\omega T_d) > 0$ (Phase Lead). Effects: Anticipatory action, increases stability, increases bandwidth, increases damping factor, and reduces peak overshoot."',
    whyCorrect: 'Option A highlights the phase lead nature of PD control and its stabilizing effect on transient overshoot.',
    distractorAnalysis: [
      'Phase lag is produced by PI and integral controllers, not PD.',
      'A pole at origin is added by an integral controller; PD adds a ZERO at $-1/T_d$.',
      'PD widens the system bandwidth, speeding up the response.'
    ],
    sourceRef: 'BECE302L Module 6 Notes, Page 106-107',
    keywords: ['PD Controller', 'Phase Lead', 'Bandwidth', 'Damping Increase'],
    isVerified: true
  },
  {
    id: 'CS-M6-T06',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Lead-Lag Compensator',
    subtopic: 'Combined Compensator Architecture',
    category: 'comparison',
    difficulty: 'Medium',
    question: 'Why is a Lead-Lag Compensator chosen instead of an individual Lead or Lag compensator?',
    options: [
      'It simultaneously improves transient response (speed and damping via lead section) and steady-state accuracy (zero error via lag section).',
      'It is cheaper because it eliminates all capacitors.',
      'It is only used when the open-loop gain is negative.',
      'It converts a non-linear system into an ideal linear system.'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Page 104): "Lead-Lag Compensator: Final T.F. $= \\alpha \\frac{(1+T_1 s)(1+T_2 s)}{(1+\\alpha T_1 s)(1+\\beta T_2 s)}$. It is used for improving both steady-state error and transient response simultaneously."',
    whyCorrect: 'Option A accurately states the simultaneous dual performance benefit of the cascade lead-lag network.',
    distractorAnalysis: [
      'Lead-lag compensators require multiple capacitors and resistors.',
      'Open-loop gain must be positive for standard negative feedback control.',
      'Compensators cannot linearize an intrinsically non-linear system.'
    ],
    sourceRef: 'BECE302L Module 6 Notes, Page 104',
    diagram: 'lead-lag-compensator',
    keywords: ['Lead-Lag Compensator', 'Dual Benefit', 'Transient and Steady-State'],
    isVerified: true
  },
  {
    id: 'CS-M5-AR01',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Relative Stability',
    subtopic: 'Gain and Phase Margin Assertion-Reason',
    category: 'assertion-reason',
    difficulty: 'Hard',
    question: 'Given the following two statements regarding frequency domain stability:\n\n**Assertion (A):** In a stable feedback control system, the Gain Crossover Frequency $\\omega_{gc}$ must be strictly less than the Phase Crossover Frequency $\\omega_{pc}$.\n**Reason (R):** If $\\omega_{gc} < \\omega_{pc}$, the loop magnitude $|G(j\\omega)H(j\\omega)|$ has dropped below unity before the phase lag reaches $-180^\\circ$, ensuring a positive Gain Margin and positive Phase Margin.\n\nChoose the correct option:',
    options: [
      'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
      'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
      '(A) is true, but (R) is false.',
      '(A) is false, but (R) is true.'
    ],
    correctAnswer: 0,
    explanation: 'In Module 5 Slides 68-69: If $\\omega_{gc} < \\omega_{pc}$, by the time the phase reaches $-180^\\circ$, the magnitude is already below 1 ($< 0\\text{ dB}$), which means the gain margin is positive. Likewise, at $\\omega_{gc}$ (where magnitude is 1), the phase lag has not yet reached $-180^\\circ$, ensuring a positive phase margin.',
    whyCorrect: 'Both statements are factually true and the physical/mathematical reasoning in (R) directly explains why (A) is necessary for stability.',
    distractorAnalysis: [
      '(R) is indeed the exact mathematical reason why $\\omega_{gc} < \\omega_{pc}$ ensures stability.',
      '(R) is factually correct.',
      '(A) is a mandatory stability criterion.'
    ],
    sourceRef: 'BECE302L Module 5, Slide 68-69',
    keywords: ['Assertion-Reason', 'Gain Crossover', 'Phase Crossover', 'Relative Stability'],
    isVerified: true
  },
  {
    id: 'CS-M3-AR01',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Peak Overshoot Independence',
    category: 'assertion-reason',
    difficulty: 'Medium',
    question: 'Given the following statements regarding transient specifications:\n\n**Assertion (A):** The percentage maximum peak overshoot $\\%M_p$ of a prototype second-order underdamped system is unaffected by changes in the undamped natural frequency $\\omega_n$.\n**Reason (R):** The undamped natural frequency $\\omega_n$ scales the real and imaginary components of the closed-loop poles equally, altering the time scale of the response without changing the geometric pole angle $\\theta = \\cos^{-1}(\\zeta)$.\n\nChoose the correct option:',
    options: [
      'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
      'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
      '(A) is true, but (R) is false.',
      '(A) is false, but (R) is true.'
    ],
    correctAnswer: 0,
    explanation: 'From $\\%M_p = e^{-\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^2}}} \\times 100\\%$, the overshoot depends solely on $\\zeta$. In the s-plane, changing $\\omega_n$ moves poles radially along the constant $\\theta$ line (where $\\cos\\theta = \\zeta$). The shape of the normalized response remains identical, simply compressed or expanded in time.',
    whyCorrect: 'Both are true, and the geometric pole radial dilation explained in (R) is the exact physical reason why $\\%M_p$ is independent of $\\omega_n$.',
    distractorAnalysis: [
      '(R) directly explains (A).',
      'Neither statement is false.',
      'Both statements are textbook control engineering truths.'
    ],
    sourceRef: 'BECE302L Module 3, Slide 30-31',
    keywords: ['Assertion-Reason', 'Peak Overshoot', 'Pole Geometry', 'Radial Dilation'],
    isVerified: true
  },
  {
    id: 'CS-M4-AR02',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Routh-Hurwitz Stability Criterion',
    subtopic: 'Zero Element Epsilon Method',
    category: 'assertion-reason',
    difficulty: 'Hard',
    question: 'Given the following statements regarding Routh array calculations:\n\n**Assertion (A):** If the first element of a row in the Routh array is zero while the remaining elements in that row are non-zero, the zero must be replaced by a small positive quantity $\\epsilon > 0$ to continue the array generation.\n**Reason (R):** The elements of the subsequent row require division by the first element of the current row, which would otherwise result in division by zero.\n\nChoose the correct option:',
    options: [
      'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
      'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
      '(A) is true, but (R) is false.',
      '(A) is false, but (R) is true.'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 30: When the first element $b_1$ of a row is zero, the next row elements $c_1 = \\frac{b_1 a_{n-3} - a_{n-1} b_2}{b_1}$ require dividing by $b_1 = 0$, which is undefined. Replacing $b_1$ with $\\epsilon$ prevents division by zero and allows signs to be evaluated in the limit as $\\epsilon \\to 0^+$.',
    whyCorrect: 'Both are true, and (R) directly explains the mathematical necessity of the $\\epsilon$ substitution.',
    distractorAnalysis: [
      '(R) explains why division by zero prevents completing the array.',
      'Neither statement is false.',
      'Standard Routh array procedure.'
    ],
    sourceRef: 'BECE302L Module 4, Slide 30',
    keywords: ['Assertion-Reason', 'Routh Array', 'Epsilon Method', 'Division by Zero'],
    isVerified: true
  },

  // ==========================================
  // ADDITIONAL FORMULA IDENTIFICATION & INTERPRETATION MCQs
  // ==========================================
  {
    id: 'CS-M1-F03',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Effects of Feedback on Overall Gain',
    subtopic: 'Sensitivity Formulation',
    category: 'formula-id',
    difficulty: 'Hard',
    question: 'Which of the following expressions represents the sensitivity of the closed-loop transfer function $T(s) = \\frac{G(s)}{1 + G(s)H(s)}$ with respect to variations in the forward path transfer function $G(s)$?',
    options: [
      '$S_G^T = \\frac{\\partial T / T}{\\partial G / G} = \\frac{1}{1 + G(s)H(s)}$',
      '$S_G^T = \\frac{G(s)}{1 + G(s)H(s)}$',
      '$S_G^T = 1 + G(s)H(s)$',
      '$S_G^T = -\\frac{G(s)H(s)}{1 + G(s)H(s)}$'
    ],
    correctAnswer: 0,
    explanation: 'The sensitivity of $T$ with respect to $G$ is defined as $S_G^T = \\frac{\\partial T}{\\partial G} \\cdot \\frac{G}{T}$. Since $T = \\frac{G}{1+GH}$, $\\frac{\\partial T}{\\partial G} = \\frac{(1+GH) - G(H)}{(1+GH)^2} = \\frac{1}{(1+GH)^2}$. Multiplying by $\\frac{G}{T} = 1+GH$ gives $S_G^T = \\frac{1}{1+G(s)H(s)}$.',
    whyCorrect: 'Option A is the classical sensitivity formula: negative feedback reduces sensitivity to plant variations by the factor $\\frac{1}{1+GH}$.',
    distractorAnalysis: [
      '$\\frac{G}{1+GH}$ is the closed-loop transfer function $T(s)$, not sensitivity.',
      '$1+GH$ is the return difference.',
      '$-\\frac{GH}{1+GH}$ is the sensitivity with respect to feedback sensor $H(s)$, not forward gain $G(s)$.'
    ],
    formulaId: 'FORM-M1-01',
    sourceRef: 'BECE302L Module 1, Slide 49',
    keywords: ['Sensitivity', 'Feedback', 'Return Difference', 'Robustness'],
    isVerified: true
  },
  {
    id: 'CS-M1-F04',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Effects of Feedback on Overall Gain',
    subtopic: 'Positive Feedback Denominator',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'For a positive (regenerative) feedback system, which formula represents the overall closed-loop transfer function?',
    options: [
      '$T(s) = \\frac{G(s)}{1 - G(s)H(s)}$',
      '$T(s) = \\frac{G(s)}{1 + G(s)H(s)}$',
      '$T(s) = \\frac{1 - G(s)H(s)}{G(s)}$',
      '$T(s) = G(s) + H(s)$'
    ],
    correctAnswer: 0,
    explanation: 'In Slide 47: Positive feedback adds the reference input $R(s)$ and the feedback signal: $E(s) = R(s) + H(s)C(s)$. Substituting $C(s) = G(s)E(s) = G(s)[R(s) + H(s)C(s)] \\implies C(s)[1 - G(s)H(s)] = G(s)R(s) \\implies T(s) = \\frac{G(s)}{1 - G(s)H(s)}$.',
    whyCorrect: 'Positive feedback features a minus sign in the denominator: $1 - G(s)H(s)$.',
    distractorAnalysis: [
      'Denotes negative feedback.',
      'Inverted fraction.',
      'Parallel combination, not feedback.'
    ],
    formulaId: 'FORM-M1-02',
    sourceRef: 'BECE302L Module 1, Slide 47',
    keywords: ['Positive Feedback', 'Regenerative', 'Transfer Function'],
    isVerified: true
  },
  {
    id: 'CS-M2-F07',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Signal Flow Graphs (SFG)',
    subtopic: 'Determinant with Two Non-Touching Loops',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'A Signal Flow Graph contains three feedback loops with loop gains $L_1, L_2$, and $L_3$. If $L_1$ and $L_3$ share no common nodes (non-touching), but $L_2$ touches both $L_1$ and $L_3$, what is the exact expression for the graph determinant $\\Delta$?',
    options: [
      '$\\Delta = 1 - (L_1 + L_2 + L_3) + L_1 L_3$',
      '$\\Delta = 1 - (L_1 + L_2 + L_3) + (L_1 L_2 + L_2 L_3 + L_1 L_3)$',
      '$\\Delta = 1 - (L_1 + L_2 + L_3) - L_1 L_3$',
      '$\\Delta = 1 + L_1 + L_2 + L_3 - L_1 L_3$'
    ],
    correctAnswer: 0,
    explanation: 'By Mason determinant rule: $\\Delta = 1 - (\\text{sum of all loop gains}) + (\\text{sum of gain products of 2 non-touching loops}) - \\dots$. Here, individual loop sum is $(L_1 + L_2 + L_3)$. The only pair of non-touching loops is $L_1$ and $L_3$, so the second term is $+L_1 L_3$. Thus, $\\Delta = 1 - (L_1 + L_2 + L_3) + L_1 L_3$.',
    whyCorrect: 'Option A correctly includes $+L_1 L_3$ because $L_1$ and $L_3$ are the only pair with no common nodes.',
    distractorAnalysis: [
      'Includes $L_1 L_2$ and $L_2 L_3$, but $L_2$ touches both $L_1$ and $L_3$ and cannot form non-touching pairs.',
      'Uses an incorrect negative sign for the pair term (formula dictates $+ \\sum L_i L_j$).',
      'Uses incorrect plus signs for individual loops.'
    ],
    formulaId: 'FORM-M2-06',
    sourceRef: 'BECE302L Module 2, Slide 51',
    keywords: ['Non-touching Loops', 'Graph Determinant', 'Mason Formula'],
    isVerified: true
  },
  {
    id: 'CS-M3-F07',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Peak Time Formula',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'Which of the following is the correct expression for Peak Time $t_p$ in an underdamped second-order step response?',
    options: [
      '$t_p = \\frac{\\pi}{\\omega_d} = \\frac{\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}}$',
      '$t_p = \\frac{2\\pi}{\\omega_d}$',
      '$t_p = \\frac{\\pi}{2\\omega_n}$',
      '$t_p = \\frac{\\pi - \\zeta}{\\omega_d}$'
    ],
    correctAnswer: 0,
    explanation: 'In Module 3 Slide 28: Differentiating $y(t)$ and setting to zero yields $\\sin(\\omega_d t_p) = 0 \\implies \\omega_d t_p = \\pi \\implies t_p = \\frac{\\pi}{\\omega_d} = \\frac{\\pi}{\\omega_n \\sqrt{1 - \\zeta^2}}$.',
    whyCorrect: 'Option A is the exact peak time formula.',
    distractorAnalysis: [
      '$\\frac{2\\pi}{\\omega_d}$ is the time period of one full oscillation cycle, not the first peak (half cycle).',
      'Omits the damping factor square root $\\sqrt{1-\\zeta^2}$.',
      '$\\pi - \\zeta$ is a dimensionally inconsistent confusion with rise time.'
    ],
    formulaId: 'FORM-M3-08',
    sourceRef: 'BECE302L Module 3, Slide 28',
    diagram: 'second-order-response',
    keywords: ['Peak Time', 'Underdamped System', 'Damped Frequency'],
    isVerified: true
  },
  {
    id: 'CS-M3-F08',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Delay Time Formula',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which of the following is the standard empirical formula for the Delay Time $t_d$ (time to reach 50% of final step response)?',
    options: [
      '$t_d \\approx \\frac{1 + 0.7\\zeta}{\\omega_n}$',
      '$t_d \\approx \\frac{1 - 0.7\\zeta}{\\omega_n}$',
      '$t_d \\approx \\frac{0.5}{\\zeta\\omega_n}$',
      '$t_d \\approx \\frac{\\pi}{4\\omega_d}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slide 22 explicitly defines: "Delay Time $t_d$: Time required for the response to reach 50% of the final value at first instance: $t_d \\approx \\frac{1 + 0.7\\zeta}{\\omega_n}$."',
    whyCorrect: 'Option A is the exact formula from Slide 22.',
    distractorAnalysis: [
      'Uses a minus sign, which would imply delay time decreases as damping increases (physically false).',
      'Confuses 50% with half of settling time.',
      'Arbitrary fraction of peak time.'
    ],
    formulaId: 'FORM-M3-06',
    sourceRef: 'BECE302L Module 3, Slide 22',
    keywords: ['Delay Time', 'Time Domain Specifications', '50% Response'],
    isVerified: true
  },
  {
    id: 'CS-M5-F04',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Frequency Domain Specifications',
    subtopic: 'Closed-Loop Bandwidth Formula',
    category: 'formula-id',
    difficulty: 'Hard',
    question: 'Which of the following expressions represents the closed-loop Bandwidth $\\omega_b$ of a standard second-order system?',
    options: [
      '$\\omega_b = \\omega_n \\sqrt{(1 - 2\\zeta^2) + \\sqrt{4\\zeta^4 - 4\\zeta^2 + 2}}$',
      '$\\omega_b = \\omega_n \\sqrt{1 - 2\\zeta^2}$',
      '$\\omega_b = \\omega_n (1 + 2\\zeta^2)$',
      '$\\omega_b = \\frac{\\omega_n}{2\\zeta\\sqrt{1 - \\zeta^2}}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 16 explicitly gives the bandwidth formula: $\\omega_b = \\omega_n \\sqrt{(1 - 2\\zeta^2) + \\sqrt{4\\zeta^4 - 4\\zeta^2 + 2}}$, obtained by setting $|M(j\\omega)|^2 = 0.5$ (-3 dB point).',
    whyCorrect: 'Option A is the exact closed-loop bandwidth formula.',
    distractorAnalysis: [
      '$\\omega_n\\sqrt{1-2\\zeta^2}$ is the resonant frequency $\\omega_r$, not bandwidth $\\omega_b$.',
      'Linear approximation without radical roots.',
      'Confuses bandwidth with resonant peak $M_r$.'
    ],
    formulaId: 'FORM-M5-03',
    sourceRef: 'BECE302L Module 5, Slide 16',
    keywords: ['Bandwidth', 'Frequency Specifications', '-3dB Cutoff'],
    isVerified: true
  },
  {
    id: 'CS-M5-F05',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Relative Stability',
    subtopic: 'Phase Margin and Damping Ratio Relationship',
    category: 'formula-interpretation',
    difficulty: 'Medium',
    question: 'For an underdamped second-order system with $\\zeta \\le 0.7$, what is the widely used practical linear approximation relating Phase Margin (in degrees) to the damping ratio $\\zeta$?',
    options: [
      '$PM^\\circ \\approx 100\\zeta$',
      '$PM^\\circ \\approx 50\\zeta$',
      '$PM^\\circ \\approx 180\\zeta$',
      '$PM^\\circ \\approx \\frac{\\zeta}{100}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 67 derives the exact relation $\\phi = \\tan^{-1}\\left(\\frac{2\\zeta}{\\sqrt{\\sqrt{4\\zeta^4+1}-2\\zeta^2}}\\right)$ and concludes: "In this range for $\\zeta \\le 0.7$: a reasonably good approx. is $\\phi^\\circ = 100\\zeta$." For example, $\\zeta = 0.5 \\implies PM \\approx 50^\\circ$.',
    whyCorrect: 'Option A is the celebrated rule-of-thumb $PM \\approx 100\\zeta$ taught in Slide 67.',
    distractorAnalysis: [
      '$50\\zeta$ underestimates the phase margin by half.',
      '$180\\zeta$ overestimates and gives $180^\\circ$ for $\\zeta=1$.',
      'Inverts the multiplier.'
    ],
    formulaId: 'FORM-M5-04',
    sourceRef: 'BECE302L Module 5, Slide 67',
    keywords: ['Phase Margin', 'Damping Ratio', 'Approximation Rule', 'Relative Stability'],
    isVerified: true
  },
  {
    id: 'CS-M6-F03',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Lead Compensator',
    subtopic: 'Transfer Function and Pole-Zero Expression',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which of the following is the standard transfer function of a passive RC Lead Compensator with $R_1, R_2, C$, where $T = R_1 C$ and $\\alpha = \\frac{R_2}{R_1 + R_2} < 1$?',
    options: [
      '$G_c(s) = \\alpha \\frac{1 + T s}{1 + \\alpha T s} = \\frac{s + \\frac{1}{T}}{s + \\frac{1}{\\alpha T}}$',
      '$G_c(s) = \\frac{1 + \\alpha T s}{1 + T s}$',
      '$G_c(s) = \\frac{s + \\alpha T}{s + T}$',
      '$G_c(s) = \\frac{1}{1 + \\alpha T s}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 handwritten notes (Page 105): For the lead network: $\\frac{V_o(s)}{V_i(s)} = \\frac{R_2(R_1 C s + 1)}{R_1 + R_2 + R_1 R_2 C s} = \\alpha \\frac{1 + Ts}{1 + \\alpha Ts} = \\frac{s + 1/T}{s + 1/(\\alpha T)}$, where $\\alpha = \\frac{R_2}{R_1+R_2} < 1$. Because $\\alpha < 1$, the zero at $-1/T$ is closer to the origin than the pole at $-1/(\\alpha T)$.',
    whyCorrect: 'Option A gives the precise transfer function derived in the handwritten lecture notes on Page 105.',
    distractorAnalysis: [
      'Inverts the numerator and denominator, representing a lag network.',
      'Poles and zeros do not have dimensional units of $\\alpha T$.',
      'Represents a simple low-pass filter without a finite zero.'
    ],
    formulaId: 'FORM-M6-02',
    sourceRef: 'BECE302L Module 6 Notes, Page 105',
    diagram: 'lead-lag-compensator',
    keywords: ['Lead Compensator', 'Transfer Function', 'Pole Zero Form', 'Passive RC'],
    isVerified: true
  },
  {
    id: 'CS-M6-F04',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Lag Compensator',
    subtopic: 'Transfer Function and Pole-Zero Expression',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'Which of the following represents the transfer function of a passive Lag Compensator with $T_2 = R_2 C_2$ and $\\beta = \\frac{R_1 + R_2}{R_2} > 1$?',
    options: [
      '$G_c(s) = \\frac{1 + T_2 s}{\\beta(1 + \\beta T_2 s)} = \\frac{T_2 (s + \\frac{1}{T_2})}{\\beta T_2 (s + \\frac{1}{\\beta T_2})} = \\frac{s + \\frac{1}{T_2}}{s + \\frac{1}{\\beta T_2}}$ (normalized form)',
      '$G_c(s) = \\frac{1 + \\beta T_2 s}{1 + T_2 s}$',
      '$G_c(s) = \\beta \\frac{1 + T_2 s}{1 + \\beta T_2 s}$',
      '$G_c(s) = \\frac{s}{s + \\frac{1}{\\beta T_2}}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Page 103): $\\frac{V_o(s)}{V_i(s)} = \\frac{1 + R_2 C_2 s}{\\frac{R_1+R_2}{R_2} R_2 C_2 s + 1} = \\frac{1 + T_2 s}{1 + \\beta T_2 s}$. In pole-zero format: $\\frac{s + 1/T_2}{\\beta(s + 1/(\\beta T_2))}$. Because $\\beta > 1$, the pole at $-1/(\\beta T_2)$ is closer to the origin than the zero at $-1/T_2$.',
    whyCorrect: 'Option A matches the derivation on Page 103 of the notes.',
    distractorAnalysis: [
      'Inverts the placement of $\\beta$, which would create a lead network.',
      'Incorrect multiplier.',
      'Missing the zero term in numerator.'
    ],
    formulaId: 'FORM-M6-03',
    sourceRef: 'BECE302L Module 6 Notes, Page 103',
    diagram: 'lead-lag-compensator',
    keywords: ['Lag Compensator', 'Transfer Function', 'Pole Zero Placement', 'Beta Factor'],
    isVerified: true
  },
  {
    id: 'CS-M6-F05',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Controllers & Compensators',
    subtopic: 'Op-Amp Realization of PI Controller',
    category: 'diagram',
    difficulty: 'Hard',
    question: 'In the operational amplifier circuit realization of a PI controller (Notes Page 100-101), what components form the input impedance $Z_1(s)$ and feedback impedance $Z_2(s)$ across the first inverting op-amp?',
    options: [
      '$Z_1(s)$ is a pure resistor $R_1$, while $Z_2(s)$ is a series combination of resistor $R_2$ and capacitor $C$.',
      '$Z_1(s)$ is a capacitor $C$, while $Z_2(s)$ is a pure resistor $R_2$.',
      '$Z_1(s)$ is a parallel $R_1$-$C$ network, while $Z_2(s)$ is a short circuit.',
      'Both $Z_1(s)$ and $Z_2(s)$ are pure capacitors.'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes Page 100-101: The first op-amp has input resistor $R_1$ ($Z_1 = R_1$) and feedback impedance $Z_2 = R_2 + \\frac{1}{Cs}$. The gain is $-\\frac{Z_2}{Z_1} = -\\left(\\frac{R_2}{R_1} + \\frac{1}{R_1 C s}\\right)$. Followed by an inverting amplifier of unity gain ($-R/R = -1$), the overall output is $V_{out}(s) = \\left(\\frac{R_2}{R_1} + \\frac{1}{R_1 C s}\\right) V_i(s) = K_p e(t) + \\frac{K_p}{T_i}\\int e dt$.',
    whyCorrect: 'Option A correctly identifies $Z_1 = R_1$ and $Z_2 = R_2 + 1/(Cs)$ as the canonical op-amp PI circuit shown on Page 100.',
    distractorAnalysis: [
      'Input capacitor with feedback resistor produces a pure differentiator (D controller), not PI.',
      'Parallel RC input produces a PD controller, not PI.',
      'Capacitors alone cannot provide proportional DC gain.'
    ],
    sourceRef: 'BECE302L Module 6 Notes, Page 100-101',
    diagram: 'opamp-pi-controller',
    keywords: ['Op-Amp', 'PI Controller', 'Circuit Realization', 'Impedance'],
    isVerified: true
  },
  {
    id: 'CS-M2-F08',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Signal Flow Graphs (SFG)',
    subtopic: 'Conversion of Block Diagram to SFG',
    category: 'diagram',
    difficulty: 'Medium',
    question: 'When converting a canonical negative feedback block diagram into a Signal Flow Graph (Slide 38): What are the branch transmissions (gains) entering the error node $E$ from input $U$ and feedback node $B$?',
    options: [
      'Branch from $U$ to $E$ has gain $+1$; branch from $B$ to $E$ has gain $-1$.',
      'Branch from $U$ to $E$ has gain $G$; branch from $B$ to $E$ has gain $H$.',
      'Both branches have gain $+1$.',
      'Branch from $U$ to $E$ has gain $-1$; branch from $B$ to $E$ has gain $+1$.'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 38: In the block diagram, the summing point computes $E(s) = U(s) - B(s)$. In the SFG, node $E$ equals the algebraic sum of all incoming branch signals: $E = (1)U + (-1)B$. Hence, the branch transmission from $U$ to $E$ is $+1$, and from $B$ to $E$ is $-1$.',
    whyCorrect: 'Option A accurately translates the negative feedback summing point into SFG branch gains.',
    distractorAnalysis: [
      '$G$ and $H$ are the forward and feedback block gains, not the summing junction inputs.',
      'Both $+1$ represents positive feedback, not negative feedback.',
      'Reverses the reference and feedback signs.'
    ],
    sourceRef: 'BECE302L Module 2, Slide 38',
    keywords: ['SFG Conversion', 'Branch Gain', 'Summing Junction', 'Error Node'],
    isVerified: true
  },
  {
    id: 'CS-M4-F06',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Angle of Departure from Complex Poles',
    category: 'formula-id',
    difficulty: 'Hard',
    question: 'Which of the following is the correct formula to compute the Angle of Departure $\\theta_d$ of the root locus from a complex open-loop pole $p_k$?',
    options: [
      '$\\theta_d = 180^\\circ - \\left(\\sum \\text{angles from other poles to } p_k - \\sum \\text{angles from zeros to } p_k\\right)$',
      '$\\theta_d = 180^\\circ + \\sum \\text{angles from poles}$',
      '$\\theta_d = \\frac{180^\\circ}{n - m}$',
      '$\\theta_d = 90^\\circ - \\cos^{-1}(\\zeta)$'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 97, 100: By Evans angle criterion, for a point infinitesimally close to complex pole $p_k$ to lie on the root locus: $\\sum \\theta_z - \\sum \\theta_p - \\theta_d = \\pm 180^\\circ$. Rearranging: $\\theta_d = 180^\\circ - (\\sum \\theta_p - \\sum \\theta_z) = 180^\\circ - \\sum \\theta_p + \\sum \\theta_z$.',
    whyCorrect: 'Option A matches the formula applied on Slide 97: $\\text{Angle of departure} = 180^\\circ - (\\theta_1 + \\theta_2) + \\theta_3$.',
    distractorAnalysis: [
      'Omits the contribution of zeros and reverses signs.',
      '$\\frac{180^\\circ}{n-m}$ is the asymptote angle $\\phi_A$, not the departure angle from complex poles.',
      'Formula applies to damping angle, not departure angle.'
    ],
    formulaId: 'FORM-M4-03',
    sourceRef: 'BECE302L Module 4, Slide 97, 100',
    keywords: ['Angle of Departure', 'Complex Poles', 'Root Locus', 'Angle Criterion'],
    isVerified: true
  },
  {
    id: 'CS-M5-F06',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Relative Stability',
    subtopic: 'Gain Margin in Decibels (dB)',
    category: 'formula-id',
    difficulty: 'Easy',
    question: 'If the magnitude of the open-loop transfer function at the phase crossover frequency $\\omega_{pc}$ is $|G(j\\omega_{pc})H(j\\omega_{pc})| = 0.5$, what is the Gain Margin expressed in decibels (dB)?',
    options: [
      '$+6.02\\text{ dB}$',
      '$-6.02\\text{ dB}$',
      '$+2.0\\text{ dB}$',
      '$-0.5\\text{ dB}$'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 62, 69: Gain Margin is $GM = \\frac{1}{|G(j\\omega_{pc})H(j\\omega_{pc})|} = \\frac{1}{0.5} = 2$. In decibels: $GM_{\\text{dB}} = 20\\log_{10}(GM) = 20\\log_{10}(2) \\approx +6.02\\text{ dB}$. Since $GM > 0\\text{ dB}$, the system is stable with an allowable gain increase of factor 2.',
    whyCorrect: 'Option A is exact: $20\\log_{10}(1/0.5) = 20\\log_{10}(2) = +6.02\\text{ dB}$.',
    distractorAnalysis: [
      '$-6.02\\text{ dB}$ would mean the gain was 2, which indicates an unstable system.',
      '2.0 is the absolute linear factor, not decibels.',
      '-0.5 dB is an incorrect arithmetic error.'
    ],
    formulaId: 'FORM-M5-04',
    sourceRef: 'BECE302L Module 5, Slide 62, 69',
    keywords: ['Gain Margin', 'Decibels', 'Phase Crossover Frequency', 'Relative Stability'],
    isVerified: true
  },
  {
    id: 'CS-M1-T08',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Linear & Non-Linear Systems',
    subtopic: 'Superposition Test on Resistive Networks',
    category: 'conceptual-app',
    difficulty: 'Easy',
    question: 'Why are ideal resistive electrical networks (Ohm’s law $v(t) = R \\cdot i(t)$) considered linear systems?',
    options: [
      'Because they satisfy both Homogeneity ($R(ai) = a(Ri)$) and Additivity ($R(i_1 + i_2) = Ri_1 + Ri_2$).',
      'Because resistors dissipate thermal energy.',
      'Because resistance never varies with temperature in physical systems.',
      'Because they only operate with direct current (DC).'
    ],
    correctAnswer: 0,
    explanation: 'Module 1 Slide 51: A system is linear if it obeys the principle of homogeneity and superposition. For $v = Ri$: $T[ai] = R(ai) = a(Ri) = a v$, and $T[i_1 + i_2] = R(i_1 + i_2) = Ri_1 + Ri_2 = v_1 + v_2$. Thus, the weighted sum of inputs produces the weighted sum of outputs.',
    whyCorrect: 'Option A proves the definition of linearity via homogeneity and superposition.',
    distractorAnalysis: [
      'Thermal dissipation is thermodynamics, not a mathematical definition of linearity.',
      'Physical temperature variation causes non-linearity in real materials, but ideal resistors assume linearity.',
      'Linearity holds equally for AC, DC, and transient arbitrary signals.'
    ],
    formulaId: 'FORM-M1-03',
    sourceRef: 'BECE302L Module 1, Slide 51',
    keywords: ['Resistive Network', 'Linearity', 'Superposition', 'Homogeneity'],
    isVerified: true
  },
  {
    id: 'CS-M2-T05',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Rules of Block Diagram Algebra and Reduction',
    subtopic: 'Moving Take-off Point Ahead of Block',
    category: 'formula-id',
    difficulty: 'Medium',
    question: 'When moving a take-off point that taps signal $Y(s)$ from the output side of a block $G(s)$ to the INPUT side (ahead of block $G(s)$), what block must be inserted in the tapped path?',
    options: [
      '$G(s)$',
      '$\\frac{1}{G(s)}$',
      '$-G(s)$',
      '$1 - G(s)$'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 18-19: Originally, the branch was tapping the output $Y(s) = G(s)X(s)$. If the take-off point is relocated ahead of $G(s)$, it taps the input $X(s)$. To preserve the original branch signal $G(s)X(s)$, the branched path must be multiplied by $G(s)$.',
    whyCorrect: 'Moving a take-off point ahead of (before) a block requires multiplying the branch by $G(s)$.',
    distractorAnalysis: [
      '$\\frac{1}{G(s)}$ is required when moving a take-off point AFTER a block.',
      'Negative sign is incorrect.',
      '$1-G(s)$ is invalid.'
    ],
    formulaId: 'FORM-M2-04',
    sourceRef: 'BECE302L Module 2, Slide 18-19',
    keywords: ['Take-off Point', 'Ahead of Block', 'Block Diagram Algebra'],
    isVerified: true
  },
  {
    id: 'CS-M3-T06',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Step Response Expression in Time Domain',
    category: 'formula-id',
    difficulty: 'Hard',
    question: 'Which of the following is the complete closed-form analytical expression for the unit-step response $c(t)$ of an underdamped second-order system ($0 < \\zeta < 1$)?',
    options: [
      '$c(t) = 1 - \\frac{e^{-\\zeta\\omega_n t}}{\\sqrt{1 - \\zeta^2}} \\sin(\\omega_d t + \\theta), \\quad \\text{where } \\theta = \\tan^{-1}\\left(\\frac{\\sqrt{1-\\zeta^2}}{\\zeta}\\right)$',
      '$c(t) = 1 - e^{-\\zeta\\omega_n t} \\cos(\\omega_n t)$',
      '$c(t) = 1 - \\frac{e^{-\\omega_n t}}{\\zeta} \\sin(\\omega_d t)$',
      '$c(t) = 1 + \\frac{e^{-\\zeta\\omega_n t}}{\\sqrt{1 - \\zeta^2}} \\cos(\\omega_d t)$'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slides 25, 50-51: The inverse Laplace transform of $C(s) = \\frac{1}{s} \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}$ evaluates by partial fractions to: $c(t) = 1 - \\frac{e^{-\\zeta\\omega_n t}}{\\sqrt{1-\\zeta^2}} \\sin(\\omega_d t + \\theta)$, where $\\theta = \\cos^{-1}(\\zeta) = \\tan^{-1}\\left(\\frac{\\sqrt{1-\\zeta^2}}{\\zeta}\\right)$.',
    whyCorrect: 'Option A is the canonical university examination step response equation.',
    distractorAnalysis: [
      'Missing the phase angle $\\theta$ and the $\\frac{1}{\\sqrt{1-\\zeta^2}}$ amplitude scaling factor.',
      'Incorrect damping factor in denominator and exponent.',
      'Plus sign would cause initial value $c(0) \\ne 0$.'
    ],
    formulaId: 'FORM-M3-04',
    sourceRef: 'BECE302L Module 3, Slide 25, 50-51',
    diagram: 'second-order-response',
    keywords: ['Step Response', 'Second Order', 'Underdamped', 'Analytical Solution'],
    isVerified: true
  },
  {
    id: 'CS-M4-T07',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Special Routh Array Cases',
    subtopic: 'Routh Hurwitz Necessary Conditions',
    category: 'theory',
    difficulty: 'Easy',
    question: 'Before constructing a Routh Array for polynomial $a_n s^n + a_{n-1} s^{n-1} + \\dots + a_0 = 0$, what is the essential NECESSARY condition that must be satisfied by all coefficients $a_i$ for the system to be stable?',
    options: [
      'All coefficients $a_i$ must be strictly non-zero and must have the identical sign (all positive).',
      'At least one coefficient must be zero to allow pole cancellation.',
      'The sum of odd coefficients must equal the sum of even coefficients.',
      'The leading coefficient $a_n$ must equal 1.'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 15-16: A necessary condition for all roots to lie in the left-half s-plane is that all coefficients of the characteristic polynomial must exist (none can be zero) and all must share the same sign (conventionally positive). If any coefficient is zero or negative, the system is immediately either unstable or has poles on the imaginary axis.',
    whyCorrect: 'Option A is the classic Stodola / Hurwitz necessary condition.',
    distractorAnalysis: [
      'A zero coefficient immediately proves the presence of roots on the imaginary axis or RHP, violating stability.',
      'Sum of coefficients is not a general condition for stability.',
      'Leading coefficient does not need to be 1; any positive scalar $a_n > 0$ is valid.'
    ],
    sourceRef: 'BECE302L Module 4, Slide 15-16',
    keywords: ['Necessary Condition', 'Routh Hurwitz', 'Positive Coefficients', 'Stability'],
    isVerified: true
  },
  {
    id: 'CS-M4-T08',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Root Locus Sensitivity to Open-Loop Gain K',
    category: 'theory',
    difficulty: 'Medium',
    question: 'Why is the Root Locus technique preferred in control engineering design over the purely algebraic Routh-Hurwitz criterion?',
    options: [
      'Root Locus shows the exact migration trajectories of closed-loop poles as gain $K$ changes, allowing engineers to design for transient performance ($t_r, M_p, \\zeta$) and relative stability.',
      'Routh-Hurwitz only works for second-order systems, while Root Locus works for any order.',
      'Root Locus eliminates the need for feedback sensors.',
      'Root Locus guarantees that every system is unconditionally stable for all $K > 0$.'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 49-50: "Routh Hurwitz criterion cannot give information regarding the amount of rise time, settling time, overshoot %, etc., nor can it tell us about the system performance with respect to loop gain. Yet it is very important to know how closed-loop poles move in the s-plane as gain varies. The root locus provides a measure of the sensitivity of the roots to design variations."',
    whyCorrect: 'Option A quotes the exact motivation for Root Locus given on Slide 49-50.',
    distractorAnalysis: [
      'Routh-Hurwitz works for any $n$-th order polynomial, not just second-order.',
      'Root Locus is a feedback analysis technique; it does not eliminate sensors.',
      'Many systems become unstable at high $K$; Root Locus reveals when and where instability occurs.'
    ],
    sourceRef: 'BECE302L Module 4, Slide 49-50',
    keywords: ['Root Locus', 'Routh Hurwitz Comparison', 'Transient Performance', 'Pole Migration'],
    isVerified: true
  },
  {
    id: 'CS-M5-T05',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Polar Plot / Nyquist Plot',
    subtopic: 'Polar Plot of RC Low-Pass Filter',
    category: 'diagram',
    difficulty: 'Medium',
    question: 'For a simple first-order RC low-pass filter with transfer function $G(s) = \\frac{1}{1 + \\tau s}$, what is the geometric shape of the polar plot as frequency $\\omega$ increases from $0$ to $\\infty$?',
    options: [
      'A semicircle in the fourth quadrant of the complex plane with diameter 1 along the real axis, starting at $1\\angle 0^\\circ$ and ending at $0\\angle -90^\\circ$.',
      'A full circle centered at the origin with radius 1.',
      'A straight line parallel to the imaginary axis.',
      'A parabola in the second quadrant.'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slides 20-21: For $G(j\\omega) = \\frac{1}{1+j\\omega\\tau} = \\frac{1}{\\sqrt{1+\\omega^2\\tau^2}} \\angle -\\tan^{-1}(\\omega\\tau)$. At $\\omega = 0$: $M = 1, \\phi = 0^\\circ$. At $\\omega = 1/\\tau$: $M = 1/\\sqrt{2}, \\phi = -45^\\circ$. At $\\omega \\to \\infty$: $M = 0, \\phi = -90^\\circ$. Rationalizing $G(j\\omega) = x + jy$ yields $(x - 0.5)^2 + y^2 = (0.5)^2$ with $y \\le 0$, which is a semicircle of diameter 1 in the 4th quadrant.',
    whyCorrect: 'Option A is the exact mathematical locus and figure shown on Slide 21.',
    distractorAnalysis: [
      'A full circle would require frequencies where phase reaches $+90^\\circ$, impossible for a passive RC filter.',
      'Straight lines occur only for pure real or pure imaginary factors.',
      'The locus is circular, not parabolic.'
    ],
    sourceRef: 'BECE302L Module 5, Slide 20-21',
    keywords: ['Polar Plot', 'RC Circuit', 'Semicircle', 'Fourth Quadrant'],
    isVerified: true
  },
  {
    id: 'CS-M5-T06',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Nyquist Stability Criterion',
    subtopic: 'Mapping from s-plane to q(s)-plane',
    category: 'theory',
    difficulty: 'Hard',
    question: 'When a clockwise Nyquist contour in the $s$-plane encircles a single POLE of $q(s) = 1 + G(s)H(s)$, what happens to the corresponding mapped contour in the $q(s)$-plane?',
    options: [
      'It encircles the origin ONCE in the COUNTERCLOCKWISE direction.',
      'It encircles the origin once in the clockwise direction.',
      'It passes straight through the origin.',
      'It does not encircle the origin.'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 43: "Encirclement of a Pole: As point s follows a path in the clockwise direction on the s-plane, the factor $(s - p_1)$ in the denominator produces an angle change of $-2\\pi$. Since it is in the denominator, the net phase change of $q(s)$ is $+2\\pi$. This implies that if a contour encircles a pole in the clockwise direction, the mapped contour in the $q(s)$-plane will encircle the origin once in the COUNTERCLOCKWISE direction."',
    whyCorrect: 'A pole is in the denominator, so its angle subtracts: $-(-2\\pi) = +2\\pi$, creating a counterclockwise encirclement.',
    distractorAnalysis: [
      'Clockwise encirclement corresponds to encircling a ZERO, not a pole.',
      'Passing through the origin only occurs if a pole or zero lies directly on the boundary of the contour.',
      'Encirclement occurs whenever a singularity is enclosed.'
    ],
    sourceRef: 'BECE302L Module 5, Slide 43',
    keywords: ['Nyquist Mapping', 'Encirclement of Pole', 'Counterclockwise', 'Cauchy Principle'],
    isVerified: true
  },
  {
    id: 'CS-M6-T07',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Proportional-Integral (PI) Controller',
    subtopic: 'Steady-State Accuracy vs Phase Lag Trade-off',
    category: 'comparison',
    difficulty: 'Medium',
    question: 'What is the principal trade-off when implementing a Proportional-Integral (PI) Controller in place of a pure Proportional (P) Controller?',
    options: [
      'The PI controller eliminates steady-state error completely ($e_{ss} = 0$), but introduces phase lag $\\phi = -\\tan^{-1}\\left(\\frac{1}{\\omega T_i}\\right)$, which reduces the phase margin and can increase transient oscillations.',
      'The PI controller makes the system faster but increases steady-state error.',
      'The PI controller eliminates sensor noise but makes the system non-linear.',
      'The PI controller requires no tuning parameters.'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 notes (Page 99, 107): The integral action adds a pole at $s=0$, which boosts low-frequency gain to infinity and eliminates steady-state error. However, the negative phase shift $-\\tan^{-1}(1/\\omega T_i)$ erodes the system phase margin, potentially making the step response more oscillatory or unstable if $K_i$ is tuned too high.',
    whyCorrect: 'Option A correctly states the fundamental engineering compromise: zero steady-state error at the cost of phase lag and reduced stability margin.',
    distractorAnalysis: [
      'PI controllers make the system slower, not faster, and eliminate steady-state error, not increase it.',
      'PI controllers do not eliminate high frequency noise (they amplify low frequencies).',
      'PI controllers require tuning both $K_p$ and $K_i$.'
    ],
    sourceRef: 'BECE302L Module 6 Notes, Page 99, 107',
    keywords: ['PI Controller', 'Trade-off', 'Steady-state Error', 'Phase Lag'],
    isVerified: true
  },
  {
    id: 'CS-M2-T06',
    module: 2,
    moduleName: 'Module 2: Mathematical Modeling & Representation',
    topic: 'Rules of Block Diagram Algebra and Reduction',
    subtopic: 'Feedback Loop Sign Trap',
    category: 'formula-interpretation',
    difficulty: 'Easy',
    question: 'In block diagram reduction, when eliminating an inner feedback loop with forward gain $G(s)$ and feedback gain $H(s)$, why does negative feedback result in $1 + G(s)H(s)$ in the denominator, while positive feedback results in $1 - G(s)H(s)$?',
    options: [
      'Because subtracting the feedback signal at the summing junction ($E = R - B$) creates $C = G(R - HC) \\implies C(1 + GH) = GR$.',
      'Because the Laplace transform introduces an imaginary operator $j$.',
      'Because negative feedback is physically impossible in electrical circuits.',
      'Because positive feedback blocks have negative resistance.'
    ],
    correctAnswer: 0,
    explanation: 'Module 2 Slide 9: For negative feedback: $E = R - B = R - HC$. Since $C = GE = G(R - HC) = GR - GHC \\implies C + GHC = GR \\implies C(1 + GH) = GR \\implies \\frac{C}{R} = \\frac{G}{1 + GH}$. For positive feedback: $E = R + B = R + HC \\implies C(1 - GH) = GR \\implies \\frac{C}{R} = \\frac{G}{1 - GH}$.',
    whyCorrect: 'Option A is the algebraic derivation from the summing junction equation.',
    distractorAnalysis: [
      'Laplace transform variable $s$ is complex, but the sign comes purely from algebraic summation.',
      'Negative feedback is standard across amplifiers, servomechanisms, and biological systems.',
      'Positive feedback does not require negative resistance.'
    ],
    formulaId: 'FORM-M1-01',
    sourceRef: 'BECE302L Module 2, Slide 9',
    keywords: ['Feedback Sign', 'Block Diagram Algebra', 'Summing Junction'],
    isVerified: true
  },
  {
    id: 'CS-M3-T07',
    module: 3,
    moduleName: 'Module 3: Time Domain Response Analysis',
    topic: 'Second Order Dynamical Systems',
    subtopic: 'Settling Time Definition',
    category: 'theory',
    difficulty: 'Easy',
    question: 'How is the Settling Time $t_s$ of a dynamic control system rigorously defined?',
    options: [
      'The time required for the system response curve to reach and PERMANENTLY remain within a specified tolerance band (typically $\\pm 2\\%$ or $\\pm 5\\%$) of its final steady-state value.',
      'The time taken to reach the absolute maximum peak of overshoot.',
      'The time taken to rise from 10% to 90% of the final value.',
      'The time required for the input command to reach 100%.'
    ],
    correctAnswer: 0,
    explanation: 'Module 3 Slide 23 defines: "Settling Time $t_s$: Time required by the response to reach and stay within a specified tolerance band of its final value or steady-state value. Usually the tolerance band is 2% or 5%."',
    whyCorrect: 'Option A specifies both reaching and staying permanently within the band.',
    distractorAnalysis: [
      'Time to reach the peak is Peak Time $t_p$.',
      'Time from 10% to 90% is Rise Time $t_r$.',
      'Input command is applied instantaneously at $t=0$ for step inputs.'
    ],
    sourceRef: 'BECE302L Module 3, Slide 23',
    diagram: 'second-order-response',
    keywords: ['Settling Time', 'Tolerance Band', 'Time Domain Specification'],
    isVerified: true
  },
  {
    id: 'CS-M4-T09',
    module: 4,
    moduleName: 'Module 4: Characterization of Systems & Stability',
    topic: 'Root Locus',
    subtopic: 'Direction of Root Movement as K Increases',
    category: 'theory',
    difficulty: 'Easy',
    question: 'As the loop gain $K$ increases from $0$ to $\\infty$, in what direction do the closed-loop poles traverse along the root locus branches?',
    options: [
      'Branches originate at the open-loop poles at $K = 0$ and terminate at the open-loop zeros (or infinity along asymptotes) as $K \\to \\infty$.',
      'Branches originate at open-loop zeros at $K = 0$ and terminate at open-loop poles as $K \\to \\infty$.',
      'Branches remain stationary at the open-loop poles for all values of $K$.',
      'Branches move in circular paths centered on the imaginary axis.'
    ],
    correctAnswer: 0,
    explanation: 'Module 4 Slide 67-69: Rule 2 states that when $K=0$, the characteristic equation $1 + KG(s)H(s) = 0$ reduces to $\\prod(s+p_i) = 0$ (open-loop poles). As $K \\to \\infty$, dividing by $K$ yields $\\prod(s+z_i) = 0$ (open-loop zeros). Therefore, root locus branches ALWAYS start at open-loop poles ($K=0$) and end at open-loop zeros or infinity ($K=\\infty$).',
    whyCorrect: 'Option A is the fundamental Rule 2 of Root Locus.',
    distractorAnalysis: [
      'Reverses the starting and ending points.',
      'Closed-loop poles move continuously with $K$.',
      'Branches can be straight lines or curves, not restricted to circles centered on imaginary axis.'
    ],
    formulaId: 'FORM-M4-03',
    sourceRef: 'BECE302L Module 4, Slide 67-69',
    diagram: 'root-locus-basic',
    keywords: ['Root Locus Rule 2', 'Start and End Points', 'Poles to Zeros'],
    isVerified: true
  },
  {
    id: 'CS-M5-T07',
    module: 5,
    moduleName: 'Module 5: Frequency Domain Response',
    topic: 'Nyquist Stability Criterion',
    subtopic: 'Open-Loop vs Closed-Loop Stability Relationship',
    category: 'theory',
    difficulty: 'Hard',
    question: 'Is it theoretically possible for a closed-loop negative feedback system to be completely STABLE even if its open-loop plant is UNSTABLE ($P > 0$)?',
    options: [
      'YES; if the Nyquist plot of $G(s)H(s)$ encircles the critical point $(-1 + j0)$ in the counterclockwise direction exactly $N = P$ times, the closed-loop system is stable ($Z = 0$).',
      'NO; an open-loop unstable plant will always result in an unstable closed-loop system under negative feedback.',
      'YES; but only if all feedback sensors are disconnected.',
      'NO; because Cauchy’s theorem prohibits negative encirclements.'
    ],
    correctAnswer: 0,
    explanation: 'Module 5 Slide 46, 54-55 explicitly proves: "The expression of $q(s)$ suggests that even if the open-loop system is unstable ($P > 0$), the closed-loop system can be stable!" As demonstrated in Example 2 (Slide 54-55) for $G(s)H(s) = \\frac{s+2}{(s+1)(s-1)}$, the open-loop pole at $s=+1$ is unstable ($P=1$), yet the closed-loop system is stable because the Nyquist plot encircles $(-1+j0)$ once counterclockwise ($N = P = 1 \\implies Z = 0$).',
    whyCorrect: 'One of the primary powers of feedback control is stabilizing an open-loop unstable plant (e.g. inverted pendulum, modern fighter jets, magnetic levitation).',
    distractorAnalysis: [
      'Negative feedback is routinely used to stabilize open-loop unstable systems.',
      'Disconnecting sensors leaves the system open-loop and thus unstable.',
      'Cauchy’s theorem naturally accommodates both clockwise and counterclockwise encirclements.'
    ],
    formulaId: 'FORM-M5-05',
    sourceRef: 'BECE302L Module 5, Slide 46, 54-55',
    keywords: ['Open Loop Unstable', 'Closed Loop Stable', 'Nyquist Criterion', 'Stabilization'],
    isVerified: true
  },
  {
    id: 'CS-M6-T08',
    module: 6,
    moduleName: 'Module 6: Controllers & Compensators Design',
    topic: 'Proportional, Integral, and Derivative Controllers',
    subtopic: 'Proportional Controller Offset',
    category: 'theory',
    difficulty: 'Medium',
    question: 'When a Proportional Controller ($G_c(s) = K_p$) is used with a first-order plant $G(s) = \\frac{1}{Ts+1}$ under unity feedback, what is the steady-state error $e_{ss}$ for a step input of magnitude $A$?',
    options: [
      '$e_{ss} = \\frac{A}{1 + K_p}$',
      '$e_{ss} = 0$',
      '$e_{ss} = A \\cdot K_p$',
      '$e_{ss} = \\infty$'
    ],
    correctAnswer: 0,
    explanation: 'Module 6 handwritten notes Page 96 explicitly derives: $e_{ss} = \\lim_{s \\to 0} \\frac{s R(s)}{1 + G(s)H(s)} = \\lim_{s \\to 0} \\frac{s (A/s)}{1 + \\frac{K_p}{Ts+1}} = \\frac{A}{1 + K_p}$. As $K_p$ increases, $e_{ss}$ decreases, but for any finite $K_p$, $e_{ss} \\ne 0$. A pure P controller cannot eliminate steady-state error in a Type 0 system.',
    whyCorrect: 'Option A matches the explicit mathematical derivation on Page 96 of the lecture notes.',
    distractorAnalysis: [
      '$e_{ss} = 0$ requires an integral controller (Type 1 system).',
      '$A \\cdot K_p$ is dimensionally and physically incorrect (error decreases with $K_p$, not increases).',
      'The error is finite, not infinite.'
    ],
    sourceRef: 'BECE302L Module 6 Notes, Page 96',
    keywords: ['Proportional Controller', 'Steady-state Error', 'Type 0 System', 'Offset'],
    isVerified: true
  }
,
  {
  "id": "CS-M2-F09",
  "module": 2,
  "moduleName": "Module 2: Mathematical Modeling & Representation",
  "topic": "Block Diagram Algebra",
  "subtopic": "Cascade Blocks Combination",
  "category": "formula-id",
  "difficulty": "Easy",
  "question": "Three linear blocks with transfer functions $G_1(s), G_2(s)$, and $G_3(s)$ are connected in series (cascade) without loading effects. Which expression represents the overall equivalent transfer function $G_{eq}(s)$?",
  "options": [
    "$G_{eq}(s) = G_1(s) \\cdot G_2(s) \\cdot G_3(s)$",
    "$G_{eq}(s) = G_1(s) + G_2(s) + G_3(s)$",
    "$G_{eq}(s) = \\frac{G_1(s) G_2(s)}{1 + G_3(s)}$",
    "$G_{eq}(s) = \\frac{1}{G_1(s)} + \\frac{1}{G_2(s)} + \\frac{1}{G_3(s)}$"
  ],
  "correctAnswer": 0,
  "explanation": "Module 2 Slide 8: Combining blocks in cascade (series) yields the product of their individual transfer functions: $G_{eq}(s) = G_1(s) \\cdot G_2(s) \\cdot G_3(s) = \\prod_{i=1}^m G_i(s)$, assuming non-loading conditions.",
  "whyCorrect": "Option A gives the standard cascade product formula for series blocks.",
  "distractorAnalysis": [
    "Summation corresponds to parallel connections, not series cascade.",
    "Denotes a feedback loop structure.",
    "Sum of reciprocals applies to parallel electrical resistors, not cascaded transfer functions."
  ],
  "formulaId": "FORM-M2-01",
  "sourceRef": "BECE302L Module 2, Slide 8",
  "keywords": [
    "Cascade",
    "Series Blocks",
    "Product Rule",
    "Equivalent Gain"
  ],
  "isVerified": true
},
  {
  "id": "CS-M2-F10",
  "module": 2,
  "moduleName": "Module 2: Mathematical Modeling & Representation",
  "topic": "Block Diagram Algebra",
  "subtopic": "Parallel Blocks Combination",
  "category": "formula-id",
  "difficulty": "Easy",
  "question": "Three blocks $G_1(s), G_2(s)$, and $G_3(s)$ share the common reference input $R(s)$ and their individual outputs are combined at a summing junction with signs $+$, $-$, and $+$ respectively. What is the overall transfer function $C(s)/R(s)$?",
  "options": [
    "$\\frac{C(s)}{R(s)} = G_1(s) - G_2(s) + G_3(s)$",
    "$\\frac{C(s)}{R(s)} = G_1(s) \\cdot G_2(s) \\cdot G_3(s)$",
    "$\\frac{C(s)}{R(s)} = \\frac{G_1(s) + G_3(s)}{1 + G_2(s)}$",
    "$\\frac{C(s)}{R(s)} = \\frac{1}{G_1(s) - G_2(s) + G_3(s)}$"
  ],
  "correctAnswer": 0,
  "explanation": "Module 2 Slide 8 and 22: For parallel blocks, each branch output is $X_i(s) = \\pm G_i(s)R(s)$. The summing junction produces $C(s) = X_1(s) - X_2(s) + X_3(s) = [G_1(s) - G_2(s) + G_3(s)]R(s)$. Hence, $C(s)/R(s) = G_1(s) - G_2(s) + G_3(s)$.",
  "whyCorrect": "Option A is the direct algebraic sum of the parallel forward gains respecting the signs at the summing junction.",
  "distractorAnalysis": [
    "Product represents cascade (series) connection.",
    "Represents a feedback configuration, not a pure parallel feedforward structure.",
    "Inverts the transfer function."
  ],
  "formulaId": "FORM-M2-02",
  "sourceRef": "BECE302L Module 2, Slide 8, 22",
  "keywords": [
    "Parallel Blocks",
    "Summing Point",
    "Block Diagram Reduction"
  ],
  "isVerified": true
},
  {
  "id": "CS-M3-F09",
  "module": 3,
  "moduleName": "Module 3: Time Domain Response Analysis",
  "topic": "First Order Dynamical Systems",
  "subtopic": "Impulse Response Formulation",
  "category": "formula-id",
  "difficulty": "Medium",
  "question": "Which of the following is the correct mathematical expression for the unit-impulse response $y(t)$ of a first-order system with transfer function $T(s) = \\frac{k}{Ts+1}$?",
  "options": [
    "$y(t) = \\frac{k}{T} e^{-\\frac{t}{T}} u(t)$",
    "$y(t) = k \\left(1 - e^{-\\frac{t}{T}}\\right) u(t)$",
    "$y(t) = k \\cdot t \\cdot e^{-\\frac{t}{T}} u(t)$",
    "$y(t) = \\frac{k}{s(Ts+1)}$"
  ],
  "correctAnswer": 0,
  "explanation": "Module 3 Slide 10: For an impulse input $R(s) = 1$, the Laplace response is $Y(s) = T(s) \\cdot 1 = \\frac{k}{Ts+1} = \\frac{k/T}{s + 1/T}$. The inverse Laplace transform is $y(t) = \\frac{k}{T} e^{-t/T} u(t)$. Notice that the initial value at $t=0^+$ is $k/T$, which decays to zero as $t \\to \\infty$.",
  "whyCorrect": "Option A gives the exact impulse response formula derived on Slide 10.",
  "distractorAnalysis": [
    "$k(1 - e^{-t/T})$ is the unit-step response, not impulse response.",
    "$k t e^{-t/T}$ corresponds to critically damped second-order impulse response.",
    "$\\frac{k}{s(Ts+1)}$ is the Laplace s-domain transform of the step response, not time-domain impulse response."
  ],
  "formulaId": "FORM-M3-03",
  "sourceRef": "BECE302L Module 3, Slide 10",
  "keywords": [
    "Impulse Response",
    "First Order System",
    "Laplace Inverse",
    "Exponential Decay"
  ],
  "isVerified": true
},
  {
  "id": "CS-M4-F10",
  "module": 4,
  "moduleName": "Module 4: Characterization of Systems & Stability",
  "topic": "Routh-Hurwitz Stability Criterion",
  "subtopic": "Routh Array Row Elements Formulation",
  "category": "formula-id",
  "difficulty": "Medium",
  "question": "In the Routh Array for polynomial $a_n s^n + a_{n-1} s^{n-1} + a_{n-2} s^{n-2} + \\dots = 0$, what is the exact algebraic formula to calculate the first element $b_1$ of the $s^{n-2}$ row?",
  "options": [
    "$b_1 = \\frac{a_{n-1} a_{n-2} - a_n a_{n-3}}{a_{n-1}}$",
    "$b_1 = \\frac{a_n a_{n-3} - a_{n-1} a_{n-2}}{a_n}$",
    "$b_1 = \\frac{a_{n-1} a_{n-2} + a_n a_{n-3}}{a_{n-2}}$",
    "$b_1 = a_{n-1} a_{n-2} - a_n a_{n-3}$"
  ],
  "correctAnswer": 0,
  "explanation": "Module 4 Slide 20: The Routh array calculation defines cross-multiplication with the pivot element $a_{n-1}$ in the denominator: $b_1 = \\frac{a_{n-1} a_{n-2} - a_n a_{n-3}}{a_{n-1}}$.",
  "whyCorrect": "Option A is the exact formula displayed on Slide 20.",
  "distractorAnalysis": [
    "Reverses the cross-multiplication signs and uses incorrect denominator $a_n$.",
    "Uses addition instead of subtraction in the numerator.",
    "Missing division by the pivot element $a_{n-1}$."
  ],
  "formulaId": "FORM-M4-02",
  "sourceRef": "BECE302L Module 4, Slide 20",
  "keywords": [
    "Routh Array",
    "Row Formula",
    "Cross Multiplication",
    "Pivot Element"
  ],
  "isVerified": true
}
];
