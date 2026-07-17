QMS_STANDARDS = {
    "OISD-105": {
        "title": "OISD-105: Work Permit System",
        "rules": [
            "Hot work on equipment requires a valid hot work permit.",
            "All pumps handling flammable fluids require annual thickness testing.",
            "Safety relief valves must be calibrated every 6 months.",
            "Any modification to equipment requires Management of Change (MOC) documentation."
        ]
    },
    "Factory Act": {
        "title": "Factory Act: Plant Safety",
        "rules": [
            "Pressure vessels must undergo hydro-testing every 3 years.",
            "Operator training certificates must be linked to the equipment being operated.",
            "Secondary containment is required for hazardous chemical storage tanks, inspected monthly."
        ]
    }
}

def get_qms_standard(regulation_name: str) -> dict:
    return QMS_STANDARDS.get(regulation_name, {"title": regulation_name, "rules": []})
