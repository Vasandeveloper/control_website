import type { CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    code: 'MOD-01',
    title: 'Module 1: Introduction to Control Systems',
    shortTitle: 'Control Systems Basics',
    description:
      'Fundamental components, terminology (Plant, Controller, Sensor, Manipulated/Response Variables, Disturbances), Open-loop vs Closed-loop, physical examples (Elevator, Tracking Antenna, Water Tank regulator, Automobile, PLL), Effects of Feedback on Gain & Stability, and Linear vs Non-linear systems.',
    topics: [
      'Basic Components and Control Problem Terminology',
      'Open-Loop vs. Closed-Loop Systems',
      'Physical Case Studies: Elevator, Antenna, Water Tank, PLL',
      'Regulator Systems vs. Tracking Systems',
      'Effects of Feedback on Overall Gain and Stability',
      'Linear and Non-Linear Systems Superposition & Homogeneity'
    ],
    icon: 'Sliders',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    code: 'MOD-02',
    title: 'Module 2: Mathematical Modeling & Representation',
    shortTitle: 'Block Diagrams & SFG',
    description:
      'Transfer function representations, Block Diagram Algebra (cascade, parallel, feedback loops, moving summing & take-off points), and Signal Flow Graphs (nodes, forward paths, loops, non-touching loops, and Mason’s Gain Formula).',
    topics: [
      'Transfer Function & Physical Systems Modeling',
      'Block Diagram Representation & Components',
      'Rules of Block Diagram Algebra and Reduction',
      'Signal Flow Graphs (SFG) Fundamentals and Terminology',
      'Mason’s Gain Formula and Determinant Δ Calculations',
      'Equivalence between Block Diagrams and SFGs'
    ],
    icon: 'GitFork',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 3,
    code: 'MOD-03',
    title: 'Module 3: Time Domain Response Analysis',
    shortTitle: 'Time Domain Response',
    description:
      'Order and Type of systems, standard test signals (Impulse, Step, Ramp, Parabolic), 1st-order system responses, and standard 2nd-order underdamped/overdamped/critically damped systems with analytical time-domain specifications (td, tr, tp, Mp, ts).',
    topics: [
      'System Order and System Type Number',
      'Standard Test Signals and Laplace Relationships',
      'First-Order System Transient & Steady-State Response',
      'Second-Order System Damping Ratio (ζ) and Natural Frequency (ωn)',
      'Classification of 2nd Order Damping: Undamped, Underdamped, Critically Damped, Overdamped',
      'Time Domain Specifications: Delay, Rise, Peak Time, Peak Overshoot, and Settling Time'
    ],
    icon: 'Activity',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    code: 'MOD-04',
    title: 'Module 4: Characterization of Systems & Stability',
    shortTitle: 'Stability & Root Locus',
    description:
      'Stability definitions, BIBO criterion (impulse response absolute integrability), Pole locations in s-plane, Routh-Hurwitz Stability Criterion with special cases (first element zero, row of zeros), and Root Locus construction rules using Evans conditions.',
    topics: [
      'Concept of Stability, Equilibrium, and BIBO Criterion',
      'Location of Closed-Loop Poles in the s-Plane and System Stability',
      'Routh-Hurwitz Stability Criterion and Array Formulation',
      'Special Routh Array Cases: First Element Zero (ε) and Entire Row Zero (Auxiliary Polynomial)',
      'Root Locus Concept, Evans Magnitude & Angle Conditions',
      'Root Locus Construction Rules: Branches, Asymptotes, Centroid, Breakaway Points, Departure Angles'
    ],
    icon: 'Compass',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 5,
    code: 'MOD-05',
    title: 'Module 5: Frequency Domain Response',
    shortTitle: 'Frequency Domain & Bode/Nyquist',
    description:
      'Steady-state sinusoidal response, Frequency domain specifications (Resonant Peak Mr, Resonant Frequency ωr, Bandwidth ωb), Polar/Nyquist plots, Nyquist stability criterion (N = P - Z), Relative stability (GM, PM, crossover frequencies), and Bode logarithmic magnitude/phase plots.',
    topics: [
      'Concept of Frequency Response for Linear Systems',
      'Closed-Loop Frequency Specifications: Resonant Peak, Frequency, and Bandwidth',
      'Relative Stability: Gain Margin, Phase Margin, Gain/Phase Crossover Frequencies',
      'Polar Plots of Typical Transfer Functions',
      'Nyquist Stability Criterion, Encirclement of (-1+j0), and Cauchy’s Principle',
      'Bode Plots: Standard Factors, Logarithmic dB Scale, Slopes, and Corner Frequency Error'
    ],
    icon: 'BarChart2',
    color: 'from-fuchsia-500 to-pink-600',
  },
  {
    id: 6,
    code: 'MOD-06',
    title: 'Module 6: Controllers & Compensators Design',
    shortTitle: 'Controllers & Compensators',
    description:
      'Controllers (Proportional, Integral/Reset mode, Derivative/Rate/Anticipatory mode, PI, PD, PID), active op-amp realization circuits, and design of passive/active phase Lead, Lag, and Lead-Lag Compensators for transient and steady-state performance.',
    topics: [
      'Proportional (P), Integral (I), and Derivative (D) Controllers',
      'Proportional-Integral (PI) and Proportional-Derivative (PD) Controllers',
      'PID Controller Working Principles and Performance Synthesis',
      'Op-Amp Circuit Realizations of Controllers',
      'Lead Compensator: Working Principle, Pole-Zero Placement, Phase Lead Angle',
      'Lag and Lead-Lag Compensators: Pole-Zero Placement, Steady-State Error Elimination'
    ],
    icon: 'Cpu',
    color: 'from-rose-500 to-red-600',
  },
];
