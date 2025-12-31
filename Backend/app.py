from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   # allow frontend to talk to backend

# Load the trained model
model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))


@app.route("/")
def home():
    return "Diabetes Prediction API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Arrange input in SAME ORDER as training
    features = np.array([[
        data["Pregnancies"],
        data["Glucose"],
        data["BloodPressure"],
        data["SkinThickness"],
        data["Insulin"],
        data["BMI"],
        data["DiabetesPedigreeFunction"],
        data["Age"]
    ]])

    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)[0]


    return jsonify({
        "prediction": int(prediction)
    })

if __name__ == "__main__":
    app.run(debug=True)