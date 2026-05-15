from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # ALLOW ALL ORIGINS

# ---------------------------------------------------------
# LOAD MODEL
# ---------------------------------------------------------
try:
    artifact = joblib.load('placement_model.pkl')
    model = artifact['model']
    print(f"✅ Model v{artifact.get('version', 'Unknown')} loaded!")
except Exception as e:
    print("❌ Error loading model:", e)
    artifact = {}
    model = None

# ---------------------------------------------------------
# PREDICTION ENDPOINT
# ---------------------------------------------------------
@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    print(f"🚀 [API] {request.method} request received from {request.remote_addr}")


    # Preflight request
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.status_code = 200
        return response

    if not model:
        return jsonify({"error": "Model not active"}), 500

    try:
        data = request.json
        print("📩 Received:", data)

        input_data = pd.DataFrame([{
            "CGPA": float(data.get("cgpa", 0)),
            "Internships": int(data.get("internships", 0)),
            "Projects": int(data.get("projects", 0)),
            "Workshops/Certifications": int(data.get("workshops", 0)),
            "AptitudeTestScore": float(data.get("aptitudeScore", 0)),
            "SoftSkillsRating": float(data.get("softSkills", 0)),
            "ExtracurricularActivities": int(data.get("extracurricular", 0)),
            "PlacementTraining": int(data.get("placementTraining", 0)),
            "SSC_Marks": float(data.get("sscMarks", 0)),
            "HSC_Marks": float(data.get("hscMarks", 0))
        }])

        if "features" in artifact:
            input_data = input_data[artifact["features"]]

        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]

        return jsonify({
            "prediction": int(prediction),
            "probability": round(float(probability * 100), 2),
            "status": "success"
        })

    except Exception as e:
        print("❌ Prediction Error:", e)
        return jsonify({"error": str(e)}), 400

# ---------------------------------------------------------
# RUN SERVER
# ---------------------------------------------------------
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
