# MASTER DEMO WALKTHROUGH: UNIFIED ASSET & OPERATIONS BRAIN

**Total Runtime:** 3:00 Minutes
**Goal:** Deliver a flawless, visceral demonstration of deterministic AI safety in action.

---

## 0:00 - 0:30 | The Setup & The Pulse
**[Visual Action]**
Screen splits. On the left: The raw backend terminal showing FastAPI logs. On the right: The Mobile GraphRAG UI (Dark Cyberpunk Glassmorphism interface). The terminal shows Engine C’s simulation firing every 15 seconds.

**[Voiceover (You)]**
> "Judges, what you are looking at is the live nervous system of our Unified Brain. On the left, Engine C is continuously ingesting simulated Kafka telemetry from hundreds of sensors. On the right, our Mobile GraphRAG interface, deployed on the factory floor, currently in a nominal state."

## 0:30 - 1:00 | The Anomaly Strike
**[Visual Action]**
Suddenly, a bright red critical warning flashes in the FastAPI terminal log on the left.
`[KAFKA STREAM] ANOMALY DETECTED: {"sensor": "ST-402", "type": "Styrene Tank Pressure Anomaly - Visakhapatnam Signature Match", ...}`

**[Voiceover (You)]**
> "Watch the logs. Right there—Engine C has just detected a pressure anomaly in Styrene Tank 402. More importantly, Engine E has pattern-matched this exact telemetry signature to the precursor of the Visakhapatnam disaster. Our Graph has identified an imminent critical failure."

## 1:00 - 1:45 | The Human-in-the-Loop Intercept
**[Visual Action]**
You move to the GraphRAG UI on the right. In the input box, you type:
*Operator Input:* `Emergency isolate ST-402 valve immediately.`
Hit **[Execute]**. 
The UI shows "Traversing Knowledge Graph..." The OPA STATUS badge in the top right changes from `NOMINAL` (Green) to `EVALUATING` (Amber / Pulsing).

**[Voiceover (You)]**
> "An operator on the floor receives the alert and immediately asks Engine B to manually isolate the valve to contain the pressure. Now, an LLM wrapper would just blindly execute this command or generate a script. Let's see what the Unified Brain does. It intercepts the intent and passes the proposed mitigation to Engine D—our Open Policy Agent."

## 1:45 - 2:30 | The OPA Webhook Block (The Climax)
**[Visual Action]**
The OPA STATUS badge flashes from `EVALUATING` to a glaring, neon-red `BLOCKED`. 
A red alert box renders in the chat interface:
`[CRITICAL INTERCEPT] Action: REVOKE_PERMIT | Policy: OISD-STD-105 | Reason: Temperature or Pressure exceeds critical thresholds for isolation.`
In the terminal left, you see: `Engine D (OPA) BLOCK: Safety Boundary Violated (OISD-STD-105).`

**[Voiceover (You)]**
> "Boom. The action is blocked. Why? Because the OPA compliance engine checked the live telemetry. The tank is currently at 160 PSI and 72 degrees. According to strict OISD safety standard 105, isolating a valve under these specific thermodynamic conditions will cause a catastrophic rupture. The AI didn't just understand the manual; it deterministically saved the plant from human error."

## 2:30 - 3:00 | The Mic Drop
**[Visual Action]**
Camera cuts back to you on stage. The red 'BLOCKED' status glowing on the screen behind you.

**[Voiceover (You)]**
> "This is what separates a toy from an enterprise tool. When telemetry has memory, when schematics can speak, and when safety is mathematically enforced by a unified architecture—downtime is eradicated, and human lives are protected. This is the Unified Asset & Operations Brain. Thank you."
