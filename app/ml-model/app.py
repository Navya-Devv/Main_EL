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
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Server is live and running!"})

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    print(f"🚀 [API] {request.method} request received from {request.remote_addr}")

    # Preflight request handled by flask-cors automatically, 
    # but keeping this for safety if needed.
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    if not model:
        return jsonify({"error": "Model not active"}), 500

    try:
        data = request.json
        print("📩 Received:", data)

        def safe_float(val, default=0.0):
            try:
                return float(val) if val and str(val).strip() else default
            except:
                return default

        def safe_int(val, default=0):
            try:
                return int(val) if val and str(val).strip() else default
            except:
                return default

        input_data = pd.DataFrame([{
            "CGPA": safe_float(data.get("cgpa")),
            "Internships": safe_int(data.get("internships")),
            "Projects": safe_int(data.get("projects")),
            "Workshops/Certifications": safe_int(data.get("workshops")),
            "AptitudeTestScore": safe_float(data.get("aptitudeScore")),
            "SoftSkillsRating": safe_float(data.get("softSkills")),
            "ExtracurricularActivities": safe_int(data.get("extracurricular")),
            "PlacementTraining": safe_int(data.get("placementTraining")),
            "SSC_Marks": safe_float(data.get("sscMarks")),
            "HSC_Marks": safe_float(data.get("hscMarks"))
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
