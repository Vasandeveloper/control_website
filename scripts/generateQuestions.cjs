// Script to build the verified, comprehensive question bank
const fs = require('fs');
const path = require('path');

const questions = [
  // ==========================================
  // MODULE 1: INTRODUCTION TO CONTROL SYSTEMS (12 Questions)
  // ==========================================
  {
    id: 'CS-M1-001',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Basic Components and Control Problem Terminology',
    subtopic: 'Manipulated Variable vs Controlled Variable',
    category: 'theory',
    difficulty: 'Easy',
    question: 'In the engineering analysis of an automated feedback system, what is the exact distinction between the Manipulated Variable (MV) and the Response/Controlled Variable (CV)?',
    options: [
      'The MV represents the unwanted disturbance from outside, whereas the CV is the reference command signal.',
      'The MV is adjusted directly by the controller/actuator to influence the process, whereas the CV is the output attribute intended to track the setpoint.',
      'The MV is measured by the feedback sensor, whereas the CV is computed by the error comparator.',
      'The MV remains strictly constant over time, whereas the CV is freely variable.'
    ],
    correctAnswer: 1,
    explanation: 'As defined in Module 1 (Slides 10-12), the Manipulated Variable (MV) is the variable directly adjusted by the controller/actuator (e.g. fuel flow, voltage, steering torque) to counteract disturbances, while the Controlled Variable (CV / RV) is the output condition of the plant (e.g. room temperature, vehicle speed, liquid level) that must follow the command.',
    whyCorrect: 'Option B correctly states the fundamental roles: controller acts on MV, which forces the CV to follow the desired command despite disturbances.',
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
    id: 'CS-M1-002',
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
    explanation: 'In Module 1 (Slides 35-37), a Regulator system (e.g. water tank float system or room thermostat) maintains the controlled variable at a constant predefined setpoint despite load disturbances. In contrast, a Tracking system (e.g. radar antenna following Chandrayaan or an automobile driver tracking road curves) must continuously follow an input command that changes with time.',
    whyCorrect: 'Option A gives the standard university definition: constant setpoint (regulator) vs. time-varying reference trajectory (tracking/servomechanism).',
    distractorAnalysis: [
      'Both regulators and tracking systems rely fundamentally on closed-loop feedback.',
      'Regulators routinely use feedback sensors (such as floats, thermistors, tachometers).',
      'The distinction is based on input command time-dependence, not physical domain.'
    ],
    sourceRef: 'BECE302L Module 1, Slide 35-37',
    keywords: ['Regulator', 'Tracking System', 'Servomechanism', 'Setpoint'],
    isVerified: true
  },
  {
    id: 'CS-M1-003',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Physical Case Studies',
    subtopic: 'Elevator Control System Performance Metrics',
    category: 'conceptual-app',
    difficulty: 'Medium',
    question: 'In the elevator control system case study, which performance attribute is primarily constrained by passenger comfort and patience, and which is constrained by passenger safety and floor leveling?',
    options: [
      'Both comfort and safety depend strictly on the open-loop DC gain.',
      'Passenger comfort depends on Steady-State Error, while safety depends on Transient Response.',
      'Passenger comfort/patience depends on Transient Response (acceleration/jerk), while passenger safety/convenience depends on Steady-State Error.',
      'Neither depends on system dynamics, only on cable tension.'
    ],
    correctAnswer: 2,
    explanation: 'Module 1 (Slide 14) explicitly analyzes the elevator: "Two major measures of performance are apparent: The transient response and The steady-state error. Passenger comfort and patience depend upon the transient response (too fast sacrifices comfort, too slow sacrifices patience). Steady-state error governs safety and convenience, ensuring the elevator levels flush with the floor."',
    whyCorrect: 'Option C matches the explicit slide analysis of transient response (comfort/patience) versus steady-state error (safety/floor leveling).',
    distractorAnalysis: [
      'DC gain alone does not account for damping or acceleration transients.',
      'Confuses the transient phase (motion profile) with the steady-state final resting position.',
      'Dismisses control engineering performance specifications.'
    ],
    sourceRef: 'BECE302L Module 1, Slide 14',
    diagram: 'block-diagram-general',
    keywords: ['Elevator', 'Transient Response', 'Steady-State Error', 'Performance Metric'],
    isVerified: true
  },
  {
    id: 'CS-M1-004',
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
    id: 'CS-M1-005',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Effects of Feedback on Overall Gain',
    subtopic: 'Gain Variation with Frequency',
    category: 'formula-interpretation',
    difficulty: 'Hard',
    question: 'Under what mathematical condition does introducing negative feedback cause the overall closed-loop gain $|T(j\\omega)|$ to INCREASE compared to the open-loop gain $|G(j\\omega)|$ at a given frequency $\\omega$?',
    options: [
      'When $|1 + G(j\\omega)H(j\\omega)| > 1$, which is always true for all frequencies.',
      'When $|1 + G(j\\omega)H(j\\omega)| < 1$, which occurs when the real part of $G(j\\omega)H(j\\omega)$ is negative.',
      'When the open-loop gain $|G(j\\omega)| = 0$.',
      'When the feedback factor $H(j\\omega) = 1$ identically.'
    ],
    correctAnswer: 1,
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
    id: 'CS-M1-006',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Effects of Feedback on Stability',
    subtopic: 'Instability Condition',
    category: 'theory',
    difficulty: 'Medium',
    question: 'In a negative feedback control system with closed-loop transfer function $T(s) = \\frac{G(s)}{1 + G(s)H(s)}$, at what condition does the system output become infinite for a finite input, resulting in instability?',
    options: [
      'When the forward gain $G(s) = 0$',
      'When the feedback gain $H(s) = 1$',
      'When the loop transmission $G(s)H(s) = -1$',
      'When the input reference $R(s) = 0$'
    ],
    correctAnswer: 2,
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
    id: 'CS-M1-007',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Linear & Non-Linear Systems',
    subtopic: 'Identification of Non-Linearity',
    category: 'theory',
    difficulty: 'Medium',
    question: 'Which of the following differential equations describes a NON-LINEAR system?',
    options: [
      '$\\frac{d^2y(t)}{dt^2} + 5\\frac{dy(t)}{dt} + 6y(t) = x(t)$',
      '$2\\frac{dy(t)}{dt} + 7y(t) = 3x(t)$',
      '$\\frac{d^3y(t)}{dt^3} + 4\\frac{d^2y(t)}{dt^2} + 2y(t) = \\frac{dx(t)}{dt}$',
      '$3\\frac{dy(t)}{dt} + 4y(t) = x^2(t)$'
    ],
    correctAnswer: 3,
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
    id: 'CS-M1-008',
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
  {
    id: 'CS-M1-009',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Physical Case Studies',
    subtopic: 'Antenna Azimuth Position Control',
    category: 'diagram',
    difficulty: 'Medium',
    question: 'In the ISRO Deep Space Network antenna azimuth positioning system (Slides 19-27), what is the specific role of the input and output potentiometers?',
    options: [
      'They amplify the electric motor current to turn the heavy antenna dish.',
      'They act as input and output transducers that convert angular shaft positions $\\theta_i(t)$ and $\\theta_o(t)$ into proportional electrical voltages.',
      'They measure the wind disturbance acting directly on the dish structure.',
      'They filter out high-frequency electromagnetic radar noise.'
    ],
    correctAnswer: 1,
    explanation: 'Module 1 Slides 21-27 illustrate the antenna position control case study: The input potentiometer converts the desired azimuth angle command $\\theta_i(t)$ into an electrical voltage, and the feedback potentiometer converts the actual antenna azimuth angle $\\theta_o(t)$ into a proportional voltage for comparison at the differential summing junction.',
    whyCorrect: 'Option B correctly identifies potentiometers as angular-to-voltage transducers.',
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
    id: 'CS-M1-010',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Physical Case Studies',
    subtopic: 'Phase Locked Loop (PLL) Architecture',
    category: 'theory',
    difficulty: 'Hard',
    question: 'In a Phase-Locked Loop (PLL) control system (Slide 39), which subsystem acts as the feedback comparator (error detector), and which subsystem serves as the controllable plant?',
    options: [
      'The Low-Pass Filter acts as the comparator, and the Counter acts as the plant.',
      'The Counter acts as the comparator, and the Phase Detector acts as the plant.',
      'The Reference input acts as the plant, and the VCO acts as the controller.',
      'The Phase Detector acts as the comparator (error detector), and the Voltage-Controlled Oscillator (VCO) acts as the plant.'
    ],
    correctAnswer: 3,
    explanation: 'In Slide 39, the Phase Detector compares the reference frequency $F_{REF}$ with the divided feedback signal from the $\\div N$ counter, outputting an error voltage. This error passes through a low-pass filter to the Voltage-Controlled Oscillator (VCO), whose output frequency varies in direct response to the error voltage. Thus, Phase Detector = Comparator, VCO = Plant/Actuator.',
    whyCorrect: 'Option D matches the architecture of the PLL shown in Slide 39.',
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
    id: 'CS-M1-011',
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
    id: 'CS-M1-012',
    module: 1,
    moduleName: 'Module 1: Introduction to Control Systems',
    topic: 'Linear & Non-Linear Systems',
    subtopic: 'Superposition Test on Resistive Networks',
    category: 'conceptual-app',
    difficulty: 'Easy',
    question: 'Why are ideal resistive electrical networks (Ohm’s law $v(t) = R \\cdot i(t)$) considered linear systems?',
    options: [
      'Because resistors dissipate thermal energy.',
      'Because they satisfy both Homogeneity ($R(ai) = a(Ri)$) and Additivity ($R(i_1 + i_2) = Ri_1 + Ri_2$).',
      'Because resistance never varies with temperature in physical systems.',
      'Because they only operate with direct current (DC).'
    ],
    correctAnswer: 1,
    explanation: 'Module 1 Slide 51: A system is linear if it obeys the principle of homogeneity and superposition. For $v = Ri$: $T[ai] = R(ai) = a(Ri) = a v$, and $T[i_1 + i_2] = R(i_1 + i_2) = Ri_1 + Ri_2 = v_1 + v_2$. Thus, the weighted sum of inputs produces the weighted sum of outputs.',
    whyCorrect: 'Option B proves the definition of linearity via homogeneity and superposition.',
    distractorAnalysis: [
      'Thermal dissipation is thermodynamics, not a mathematical definition of linearity.',
      'Physical temperature variation causes non-linearity in real materials, but ideal resistors assume linearity.',
      'Linearity holds equally for AC, DC, and transient arbitrary signals.'
    ],
    formulaId: 'FORM-M1-03',
    sourceRef: 'BECE302L Module 1, Slide 51',
    keywords: ['Resistive Network', 'Linearity', 'Superposition', 'Homogeneity'],
    isVerified: true
  }
];

console.log('Writing base question bank with ' + questions.length + ' questions...');
fs.writeFileSync(path.join(__dirname, 'baseQuestions.json'), JSON.stringify(questions, null, 2));

