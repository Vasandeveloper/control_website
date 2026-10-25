import React from 'react';
import { MathText } from './MathText';

interface DiagramViewerProps {
  type: string;
  caption?: string;
  className?: string;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ type, caption, className = '' }) => {
  const renderDiagram = () => {
    switch (type) {
      case 'feedback-loop-detailed':
      case 'block-diagram-general':
        return (
          <svg viewBox="0 0 740 240" className="w-full max-w-2xl mx-auto h-auto text-slate-200">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
              </marker>
              <linearGradient id="gradBlock" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Input Reference */}
            <line x1="20" y1="70" x2="110" y2="70" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="30" y="55" fill="#93c5fd" fontSize="13" fontWeight="bold">R(s) [Command]</text>

            {/* Summing Junction */}
            <circle cx="130" cy="70" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="120" y1="70" x2="140" y2="70" stroke="#f8fafc" strokeWidth="2" />
            <line x1="130" y1="60" x2="130" y2="80" stroke="#f8fafc" strokeWidth="2" />
            <text x="115" y="65" fill="#4ade80" fontSize="12" fontWeight="bold">+</text>
            <text x="135" y="88" fill="#f87171" fontSize="14" fontWeight="bold">-</text>

            {/* Error Signal Line */}
            <line x1="148" y1="70" x2="220" y2="70" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="156" y="55" fill="#e2e8f0" fontSize="12">E(s) [Error]</text>

            {/* Controller Block */}
            <rect x="220" y="42" width="110" height="56" rx="8" fill="url(#gradBlock)" stroke="#818cf8" strokeWidth="2" />
            <text x="275" y="66" fill="#c7d2fe" fontSize="13" fontWeight="bold" textAnchor="middle">Controller</text>
            <text x="275" y="86" fill="#818cf8" fontSize="14" fontWeight="bold" textAnchor="middle">K(s) / Gc(s)</text>

            {/* Manipulated Variable Line */}
            <line x1="330" y1="70" x2="410" y2="70" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="340" y="55" fill="#e2e8f0" fontSize="12">U(s) [Control / MV]</text>

            {/* Plant Block */}
            <rect x="410" y="42" width="120" height="56" rx="8" fill="url(#gradBlock)" stroke="#38bdf8" strokeWidth="2" />
            <text x="470" y="66" fill="#bae6fd" fontSize="13" fontWeight="bold" textAnchor="middle">Plant / Process</text>
            <text x="470" y="86" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">G(s)</text>

            {/* Output Line and Branch */}
            <line x1="530" y1="70" x2="710" y2="70" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <circle cx="610" cy="70" r="4.5" fill="#38bdf8" />
            <text x="640" y="55" fill="#93c5fd" fontSize="13" fontWeight="bold">C(s) [Output / CV]</text>

            {/* Feedback Path Down */}
            <line x1="610" y1="70" x2="610" y2="170" stroke="#a78bfa" strokeWidth="2.5" />
            <line x1="610" y1="170" x2="520" y2="170" stroke="#a78bfa" strokeWidth="2.5" markerEnd="url(#arrow)" />

            {/* Feedback Sensor Block */}
            <rect x="370" y="142" width="150" height="56" rx="8" fill="url(#gradBlock)" stroke="#a78bfa" strokeWidth="2" />
            <text x="445" y="166" fill="#ddd6fe" fontSize="13" fontWeight="bold" textAnchor="middle">Feedback Sensor</text>
            <text x="445" y="186" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">H(s)</text>

            {/* Feedback Path Back to Summing Point */}
            <line x1="370" y1="170" x2="130" y2="170" stroke="#a78bfa" strokeWidth="2.5" />
            <line x1="130" y1="170" x2="130" y2="92" stroke="#a78bfa" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="142" y="150" fill="#ddd6fe" fontSize="12">B(s) [Feedback]</text>
          </svg>
        );

      case 'first-order-response':
        return (
          <svg viewBox="0 0 600 280" className="w-full max-w-xl mx-auto h-auto text-slate-200">
            {/* Grid & Axes */}
            <line x1="60" y1="230" x2="560" y2="230" stroke="#64748b" strokeWidth="2" />
            <line x1="60" y1="230" x2="60" y2="30" stroke="#64748b" strokeWidth="2" />
            <text x="565" y="235" fill="#94a3b8" fontSize="12">Time (t)</text>
            <text x="45" y="25" fill="#94a3b8" fontSize="12">c(t)</text>

            {/* Steady State Unit Step Line */}
            <line x1="60" y1="70" x2="550" y2="70" stroke="#475569" strokeDasharray="5,5" strokeWidth="1.5" />
            <text x="25" y="75" fill="#cbd5e1" fontSize="12" fontWeight="bold">1.0</text>
            <text x="555" y="75" fill="#94a3b8" fontSize="11">Final Value (k)</text>

            {/* Exponential Curve c(t) = 1 - e^(-t/T) */}
            <path
              d="M 60 230 C 130 140, 200 80, 550 70"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />

            {/* Initial tangent slope line 1/T */}
            <line x1="60" y1="230" x2="220" y2="70" stroke="#f59e0b" strokeDasharray="3,3" strokeWidth="1.5" />
            <text x="130" y="125" fill="#fbbf24" fontSize="11">Initial slope = 1/T</text>

            {/* Vertical Marker Lines at T, 2T, 3T, 4T, 5T */}
            {/* T (63.2%) */}
            <line x1="160" y1="230" x2="160" y2="129" stroke="#94a3b8" strokeDasharray="2,2" />
            <line x1="60" y1="129" x2="160" y2="129" stroke="#94a3b8" strokeDasharray="2,2" />
            <circle cx="160" cy="129" r="4" fill="#38bdf8" />
            <text x="150" y="248" fill="#e2e8f0" fontSize="12" fontWeight="bold">T</text>
            <text x="15" y="133" fill="#38bdf8" fontSize="11" fontWeight="bold">0.632</text>
            <text x="170" y="135" fill="#38bdf8" fontSize="10">63.2%</text>

            {/* 2T (86.5%) */}
            <line x1="260" y1="230" x2="260" y2="92" stroke="#64748b" strokeDasharray="2,2" />
            <circle cx="260" cy="92" r="3.5" fill="#38bdf8" />
            <text x="250" y="248" fill="#94a3b8" fontSize="12">2T</text>
            <text x="270" y="100" fill="#94a3b8" fontSize="10">86.5%</text>

            {/* 3T (95.0%) */}
            <line x1="360" y1="230" x2="360" y2="78" stroke="#64748b" strokeDasharray="2,2" />
            <circle cx="360" cy="78" r="3.5" fill="#38bdf8" />
            <text x="350" y="248" fill="#94a3b8" fontSize="12">3T</text>
            <text x="370" y="88" fill="#94a3b8" fontSize="10">95.0%</text>

            {/* 4T (98.2%) */}
            <line x1="440" y1="230" x2="440" y2="73" stroke="#64748b" strokeDasharray="2,2" />
            <circle cx="440" cy="73" r="3.5" fill="#38bdf8" />
            <text x="430" y="248" fill="#94a3b8" fontSize="12">4T</text>
            <text x="445" y="85" fill="#94a3b8" fontSize="10">98.2%</text>

            {/* 5T (99.3%) */}
            <line x1="510" y1="230" x2="510" y2="71" stroke="#64748b" strokeDasharray="2,2" />
            <circle cx="510" cy="71" r="3.5" fill="#38bdf8" />
            <text x="500" y="248" fill="#94a3b8" fontSize="12">5T</text>
            <text x="505" y="65" fill="#4ade80" fontSize="10">99.3% SS</text>
          </svg>
        );

      case 'second-order-response':
        return (
          <svg viewBox="0 0 650 320" className="w-full max-w-xl mx-auto h-auto text-slate-200">
            {/* Grid & Axes */}
            <line x1="60" y1="260" x2="620" y2="260" stroke="#64748b" strokeWidth="2" />
            <line x1="60" y1="260" x2="60" y2="30" stroke="#64748b" strokeWidth="2" />
            <text x="615" y="278" fill="#94a3b8" fontSize="12">Time (t)</text>
            <text x="30" y="30" fill="#94a3b8" fontSize="12">c(t)</text>

            {/* Unit Step Steady State 1.0 */}
            <line x1="60" y1="140" x2="610" y2="140" stroke="#64748b" strokeDasharray="4,4" strokeWidth="1.5" />
            <text x="25" y="145" fill="#f8fafc" fontSize="12" fontWeight="bold">1.0</text>

            {/* 2% Tolerance Band */}
            <line x1="60" y1="134" x2="610" y2="134" stroke="#dc2626" strokeDasharray="2,3" strokeWidth="1" />
            <line x1="60" y1="146" x2="610" y2="146" stroke="#dc2626" strokeDasharray="2,3" strokeWidth="1" />
            <text x="540" y="128" fill="#f87171" fontSize="10">±2% band</text>

            {/* Underdamped Response Curve with overshoot and oscillation */}
            <path
              d="M 60 260 C 90 260, 110 220, 140 140 C 160 80, 185 55, 210 55 C 245 55, 275 185, 310 185 C 345 185, 375 125, 410 125 C 445 125, 470 146, 500 146 C 530 146, 560 140, 610 140"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />

            {/* Peak Overshoot Mp */}
            <line x1="210" y1="55" x2="210" y2="260" stroke="#fbbf24" strokeDasharray="3,3" strokeWidth="1.5" />
            <circle cx="210" cy="55" r="4.5" fill="#f59e0b" />
            <line x1="210" y1="55" x2="330" y2="55" stroke="#f59e0b" strokeDasharray="2,2" strokeWidth="1" />
            <line x1="320" y1="55" x2="320" y2="140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="330" y="100" fill="#fbbf24" fontSize="12" fontWeight="bold">Peak Overshoot (Mp)</text>
            <text x="200" y="278" fill="#fbbf24" fontSize="12" fontWeight="bold">tp (Peak Time)</text>

            {/* Delay Time td (50%) */}
            <line x1="118" y1="200" x2="118" y2="260" stroke="#a78bfa" strokeDasharray="2,2" />
            <circle cx="118" cy="200" r="3.5" fill="#a78bfa" />
            <text x="108" y="278" fill="#a78bfa" fontSize="11">td</text>

            {/* Rise Time tr (0% to 100%) */}
            <line x1="140" y1="140" x2="140" y2="260" stroke="#34d399" strokeDasharray="2,2" />
            <circle cx="140" cy="140" r="3.5" fill="#34d399" />
            <text x="135" y="292" fill="#34d399" fontSize="11" fontWeight="bold">tr (Rise Time)</text>

            {/* Settling Time ts */}
            <line x1="470" y1="140" x2="470" y2="260" stroke="#f87171" strokeDasharray="3,3" strokeWidth="1.5" />
            <text x="460" y="278" fill="#f87171" fontSize="12" fontWeight="bold">ts (Settling Time ≈ 4/(ζωn))</text>
          </svg>
        );

      case 'root-locus-basic':
        return (
          <svg viewBox="0 0 540 300" className="w-full max-w-lg mx-auto h-auto text-slate-200">
            {/* Real and Imaginary Axes */}
            <line x1="40" y1="150" x2="500" y2="150" stroke="#64748b" strokeWidth="2" />
            <line x1="380" y1="20" x2="380" y2="280" stroke="#64748b" strokeWidth="2" />
            <text x="505" y="155" fill="#94a3b8" fontSize="13">σ (Real)</text>
            <text x="385" y="30" fill="#94a3b8" fontSize="13">jω (Imag)</text>

            {/* Open Loop Poles at s=0 and s=-a */}
            {/* Pole at s=0 */}
            <line x1="373" y1="143" x2="387" y2="157" stroke="#ef4444" strokeWidth="3" />
            <line x1="387" y1="143" x2="373" y2="157" stroke="#ef4444" strokeWidth="3" />
            <text x="388" y="170" fill="#f87171" fontSize="12" fontWeight="bold">s = 0</text>

            {/* Pole at s=-a */}
            <line x1="133" y1="143" x2="147" y2="157" stroke="#ef4444" strokeWidth="3" />
            <line x1="147" y1="143" x2="133" y2="157" stroke="#ef4444" strokeWidth="3" />
            <text x="125" y="170" fill="#f87171" fontSize="12" fontWeight="bold">s = -a</text>

            {/* Root Locus segment between 0 and -a (Heavy Blue) */}
            <line x1="140" y1="150" x2="380" y2="150" stroke="#38bdf8" strokeWidth="4" />
            {/* Arrows pointing toward breakaway point */}
            <polygon points="280,146 295,150 280,154" fill="#38bdf8" />
            <polygon points="240,146 225,150 240,154" fill="#38bdf8" />

            {/* Breakaway Point at s = -a/2 */}
            <circle cx="260" cy="150" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            <text x="220" y="180" fill="#fbbf24" fontSize="12" fontWeight="bold">Breakaway: s = -a/2</text>

            {/* Asymptotes at +90 and -90 degrees */}
            <line x1="260" y1="20" x2="260" y2="280" stroke="#818cf8" strokeWidth="3.5" strokeDasharray="6,4" />
            <polygon points="256,40 260,25 264,40" fill="#818cf8" />
            <polygon points="256,260 260,275 264,260" fill="#818cf8" />
            <text x="270" y="50" fill="#a5b4fc" fontSize="12" fontWeight="bold">Asymptote (+90°)</text>
            <text x="270" y="260" fill="#a5b4fc" fontSize="12" fontWeight="bold">Asymptote (-90°)</text>
          </svg>
        );

      case 'nyquist-plot-basic':
        return (
          <svg viewBox="0 0 540 320" className="w-full max-w-lg mx-auto h-auto text-slate-200">
            {/* Axes */}
            <line x1="40" y1="160" x2="500" y2="160" stroke="#64748b" strokeWidth="2" />
            <line x1="300" y1="20" x2="300" y2="300" stroke="#64748b" strokeWidth="2" />
            <text x="505" y="165" fill="#94a3b8" fontSize="13">Re</text>
            <text x="305" y="35" fill="#94a3b8" fontSize="13">Im</text>

            {/* Unit Circle centered at origin */}
            <circle cx="300" cy="160" r="110" fill="none" stroke="#475569" strokeDasharray="3,3" strokeWidth="1.5" />
            <text x="415" y="150" fill="#94a3b8" fontSize="11">Unit Circle (|G|=1)</text>

            {/* Critical Point -1 + j0 */}
            <line x1="185" y1="155" x2="195" y2="165" stroke="#ef4444" strokeWidth="3" />
            <line x1="195" y1="155" x2="185" y2="165" stroke="#ef4444" strokeWidth="3" />
            <circle cx="190" cy="160" r="4" fill="#ef4444" />
            <text x="145" y="180" fill="#f87171" fontSize="12" fontWeight="bold">-1 + j0</text>

            {/* Polar Plot Locus entering from low freq */}
            <path
              d="M 450 160 C 440 230, 310 245, 230 200 C 190 180, 240 160, 240 160"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
            />
            {/* Point of Phase Crossover (Intersection with negative real axis) */}
            <circle cx="240" cy="160" r="4.5" fill="#fbbf24" />
            <text x="210" y="145" fill="#fbbf24" fontSize="11">ωpc (Phase Crossover)</text>
            <line x1="190" y1="160" x2="240" y2="160" stroke="#34d399" strokeWidth="3" />
            <text x="195" y="130" fill="#34d399" fontSize="11" fontWeight="bold">GM = 1/|G(jωpc)|</text>

            {/* Gain Crossover intersection with unit circle */}
            <circle cx="225" cy="225" r="4.5" fill="#c084fc" />
            <line x1="300" y1="160" x2="225" y2="225" stroke="#c084fc" strokeWidth="2" strokeDasharray="2,2" />
            <text x="150" y="245" fill="#c084fc" fontSize="11" fontWeight="bold">PM = 180° + φ</text>
          </svg>
        );

      case 'bode-plot-first-order':
        return (
          <svg viewBox="0 0 560 300" className="w-full max-w-lg mx-auto h-auto text-slate-200">
            {/* Magnitude Section */}
            <rect x="50" y="20" width="480" height="120" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="60" y="40" fill="#38bdf8" fontSize="12" fontWeight="bold">Magnitude Plot (dB)</text>
            <line x1="50" y1="60" x2="530" y2="60" stroke="#475569" strokeDasharray="2,2" />
            <text x="20" y="65" fill="#94a3b8" fontSize="11">0 dB</text>

            {/* Asymptotic Approximations */}
            <line x1="50" y1="60" x2="250" y2="60" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4,4" />
            <line x1="250" y1="60" x2="520" y2="130" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4,4" />
            <text x="360" y="90" fill="#fbbf24" fontSize="11">-20 dB/dec</text>

            {/* Actual Curve */}
            <path d="M 50 60 Q 220 62 250 72 T 520 130" fill="none" stroke="#38bdf8" strokeWidth="3" />
            {/* Corner Frequency Marker */}
            <line x1="250" y1="20" x2="250" y2="140" stroke="#ef4444" strokeDasharray="3,3" strokeWidth="1.5" />
            <text x="220" y="15" fill="#f87171" fontSize="11" fontWeight="bold">ωc = 1/T</text>
            <text x="260" y="80" fill="#38bdf8" fontSize="10">-3 dB error</text>

            {/* Phase Section */}
            <rect x="50" y="160" width="480" height="110" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="60" y="180" fill="#c084fc" fontSize="12" fontWeight="bold">Phase Plot (Degrees)</text>
            <line x1="50" y1="180" x2="530" y2="180" stroke="#475569" strokeDasharray="2,2" />
            <text x="20" y="185" fill="#94a3b8" fontSize="11">0°</text>
            <line x1="50" y1="215" x2="530" y2="215" stroke="#475569" strokeDasharray="2,2" />
            <text x="15" y="220" fill="#94a3b8" fontSize="11">-45°</text>
            <line x1="50" y1="250" x2="530" y2="250" stroke="#475569" strokeDasharray="2,2" />
            <text x="15" y="255" fill="#94a3b8" fontSize="11">-90°</text>

            {/* Phase curve */}
            <path d="M 50 180 C 180 182, 230 215, 250 215 C 280 215, 340 250, 520 250" fill="none" stroke="#c084fc" strokeWidth="3" />
            <circle cx="250" cy="215" r="4" fill="#c084fc" />
          </svg>
        );

      case 'opamp-pi-controller':
        return (
          <svg viewBox="0 0 540 240" className="w-full max-w-lg mx-auto h-auto text-slate-200">
            {/* Input Resistor R1 */}
            <text x="20" y="115" fill="#94a3b8" fontSize="12">Vi(s)</text>
            <line x1="50" y1="110" x2="100" y2="110" stroke="#38bdf8" strokeWidth="2" />
            <rect x="100" y="100" width="40" height="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="110" y="115" fill="#93c5fd" fontSize="11">R1</text>
            <line x1="140" y1="110" x2="200" y2="110" stroke="#38bdf8" strokeWidth="2" />

            {/* OpAmp Triangle */}
            <polygon points="200,80 200,160 270,120" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
            <text x="208" y="105" fill="#f87171" fontSize="14">-</text>
            <text x="208" y="145" fill="#4ade80" fontSize="14">+</text>
            {/* Ground on positive terminal */}
            <line x1="200" y1="140" x2="175" y2="140" stroke="#64748b" strokeWidth="2" />
            <line x1="175" y1="140" x2="175" y2="160" stroke="#64748b" strokeWidth="2" />
            <line x1="165" y1="160" x2="185" y2="160" stroke="#64748b" strokeWidth="2" />

            {/* Feedback Path (R2 in series with C) */}
            <line x1="180" y1="110" x2="180" y2="40" stroke="#38bdf8" strokeWidth="2" />
            <line x1="180" y1="40" x2="210" y2="40" stroke="#38bdf8" strokeWidth="2" />
            {/* R2 */}
            <rect x="210" y="30" width="40" height="20" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="220" y="45" fill="#fbbf24" fontSize="11">R2</text>
            <line x1="250" y1="40" x2="270" y2="40" stroke="#38bdf8" strokeWidth="2" />
            {/* Capacitor C */}
            <line x1="270" y1="30" x2="270" y2="50" stroke="#34d399" strokeWidth="2.5" />
            <line x1="276" y1="30" x2="276" y2="50" stroke="#34d399" strokeWidth="2.5" />
            <text x="268" y="24" fill="#34d399" fontSize="11">C</text>
            <line x1="276" y1="40" x2="310" y2="40" stroke="#38bdf8" strokeWidth="2" />
            <line x1="310" y1="40" x2="310" y2="120" stroke="#38bdf8" strokeWidth="2" />

            {/* Output */}
            <line x1="270" y1="120" x2="350" y2="120" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="310" cy="120" r="3" fill="#38bdf8" />
            <text x="360" y="125" fill="#93c5fd" fontSize="12">Vout(s)</text>

            {/* Transfer function formula */}
            <text x="130" y="210" fill="#cbd5e1" fontSize="13" fontWeight="bold">
              Gc(s) = (R2/R1) + 1/(R1·C·s) = Kp + Ki/s
            </text>
          </svg>
        );

      case 'lead-lag-compensator':
        return (
          <svg viewBox="0 0 560 220" className="w-full max-w-lg mx-auto h-auto text-slate-200">
            {/* Comparison of Pole-Zero Locations on S-Plane */}
            {/* Lead Compensator S-plane */}
            <g transform="translate(40, 20)">
              <text x="60" y="18" fill="#38bdf8" fontSize="12" fontWeight="bold">LEAD COMPENSATOR</text>
              <line x1="10" y1="70" x2="190" y2="70" stroke="#64748b" strokeWidth="1.5" />
              <line x1="160" y1="30" x2="160" y2="110" stroke="#64748b" strokeWidth="1.5" />
              <text x="165" y="45" fill="#94a3b8" fontSize="10">jω</text>
              <text x="180" y="85" fill="#94a3b8" fontSize="10">σ</text>

              {/* Zero first (closer to origin) */}
              <circle cx="110" cy="70" r="4.5" fill="none" stroke="#34d399" strokeWidth="2.5" />
              <text x="95" y="92" fill="#34d399" fontSize="10" fontWeight="bold">-1/T</text>
              {/* Pole further to left */}
              <line x1="45" y1="65" x2="55" y2="75" stroke="#ef4444" strokeWidth="2.5" />
              <line x1="55" y1="65" x2="45" y2="75" stroke="#ef4444" strokeWidth="2.5" />
              <text x="35" y="92" fill="#f87171" fontSize="10" fontWeight="bold">-1/(αT)</text>

              <text x="15" y="125" fill="#94a3b8" fontSize="11">Zero closer to origin than pole (α &lt; 1)</text>
              <text x="15" y="140" fill="#38bdf8" fontSize="11">Provides Phase Lead, speeds response</text>
            </g>

            {/* Lag Compensator S-plane */}
            <g transform="translate(300, 20)">
              <text x="60" y="18" fill="#fbbf24" fontSize="12" fontWeight="bold">LAG COMPENSATOR</text>
              <line x1="10" y1="70" x2="190" y2="70" stroke="#64748b" strokeWidth="1.5" />
              <line x1="160" y1="30" x2="160" y2="110" stroke="#64748b" strokeWidth="1.5" />
              <text x="165" y="45" fill="#94a3b8" fontSize="10">jω</text>
              <text x="180" y="85" fill="#94a3b8" fontSize="10">σ</text>

              {/* Pole closer to origin */}
              <line x1="125" y1="65" x2="135" y2="75" stroke="#ef4444" strokeWidth="2.5" />
              <line x1="135" y1="65" x2="125" y2="75" stroke="#ef4444" strokeWidth="2.5" />
              <text x="110" y="92" fill="#f87171" fontSize="10" fontWeight="bold">-1/(βT)</text>
              {/* Zero further away */}
              <circle cx="60" cy="70" r="4.5" fill="none" stroke="#34d399" strokeWidth="2.5" />
              <text x="45" y="92" fill="#34d399" fontSize="10" fontWeight="bold">-1/T</text>

              <text x="15" y="125" fill="#94a3b8" fontSize="11">Pole closer to origin than zero (β &gt; 1)</text>
              <text x="15" y="140" fill="#fbbf24" fontSize="11">Improves Steady-State Error (ess = 0)</text>
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  const rendered = renderDiagram();
  if (!rendered) return null;

  return (
    <div className={`my-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 shadow-inner ${className}`}>
      {rendered}
      {caption && (
        <div className="mt-2 text-center text-xs text-slate-400 font-medium">
          <MathText text={caption} />
        </div>
      )}
    </div>
  );
};

