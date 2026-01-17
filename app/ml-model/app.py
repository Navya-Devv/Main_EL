from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# NOTE: We are NOT using flask_cors library anymore. 
# We are manually handling it below to guarantee it works.

# LOAD THE MODEL
try:
    artifact = joblib.load('placement_model.pkl')
    model = artifact['model']
    print(f"✅ Model v{artifact.get('version', 'Unknown')} loaded!")
except Exception as e:
    print("❌ Error loading model:", e)
    model = None

# ---------------------------------------------------------
# NUCLEAR CORS FIX: Manually inject headers into EVERY response
# ---------------------------------------------------------
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    # 1. Handle the "Preflight" OPTIONS check
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200

    # 2. Handle the Actual POST Request
    if not model:
        return jsonify({'error': 'Model not active'}), 500

    try:
        data = request.json
        print(f"📩 Received Data: {data}")

        input_data = pd.DataFrame([{
            'CGPA': float(data.get('cgpa', 0)),
            'Internships': int(data.get('internships', 0)),
            'Projects': int(data.get('projects', 0)),
            'Workshops/Certifications': int(data.get('workshops', 0)),
            'AptitudeTestScore': float(data.get('aptitudeScore', 0)),
            'SoftSkillsRating': float(data.get('softSkills', 0)),
            'ExtracurricularActivities': int(data.get('extracurricular', 0)),
            'PlacementTraining': int(data.get('placementTraining', 0)),
            'SSC_Marks': float(data.get('sscMarks', 0)),
            'HSC_Marks': float(data.get('hscMarks', 0))
        }])

        # Reorder columns
        if 'features' in artifact:
            input_data = input_data[artifact['features']]

        # Predict
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]

        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability * 100),
            'status': 'success'
        })

    except Exception as e:
        print("❌ Prediction Error:", e)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    # Run on 127.0.0.1 explicitly
    app.run(port=5000, debug=True, host='127.0.0.1')