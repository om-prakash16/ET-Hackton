# Industrial Taxonomy & Controlled Vocabulary

To ensure the AI models, Graph, and relational database speak the same language, we enforce a strict, hierarchical taxonomy.

## 1. Equipment Classes (ISO 14224 Aligned)
- **Rotating Equipment**: `Pump`, `Compressor`, `Turbine`, `Motor`, `Fan`.
- **Static Equipment**: `Vessel`, `Tank`, `Heat_Exchanger`, `Pipe`.
- **Instrumentation**: `Valve`, `Transmitter`, `Sensor`, `Analyzer`.
- **Electrical**: `Transformer`, `Switchgear`, `VFD`.

## 2. Document Types
- `OEM_MANUAL`: Original equipment manufacturer guide.
- `P_AND_ID`: Piping and Instrumentation Diagram.
- `SOP`: Standard Operating Procedure.
- `RCA_REPORT`: Root Cause Analysis of a past failure.
- `MAINTENANCE_LOG`: Historical log of work performed.

## 3. Failure Modes
- `MECHANICAL`: Bearing failure, seal leak, vibration.
- `ELECTRICAL`: Short circuit, insulation failure.
- `PROCESS`: Cavitation, overpressure, high temperature.
- `SOFTWARE`: PLC logic error, network loss.

## 4. Severity & Risk Levels (RAM Matrix)
- `CATASTROPHIC`: Plant shutdown, extreme safety risk.
- `CRITICAL`: Unit shutdown, severe environmental risk.
- `MODERATE`: Reduced capacity, repairable within 24 hours.
- `MINOR`: No production impact, routine maintenance.

*Note: All taxonomy nodes in Neo4j (e.g., `(:FailureMode { name: "Cavitation" })`) act as aggregation points. If an operator asks "Show me all cavitation incidents", the graph performs a simple 1-hop traversal from the taxonomy node to all linked `(:Incident)` nodes.*
