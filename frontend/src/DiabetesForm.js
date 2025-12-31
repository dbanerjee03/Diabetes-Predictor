import { useState } from "react";
import axios from "axios";
import "./DiabetesForm.css";

function DiabetesForm() {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });

  const [result, setResult] = useState("");
  const [isDiabetic, setIsDiabetic] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      if (response.data.prediction === 1) {
        setResult("Diabetic");
        setIsDiabetic(true);
      } else {
        setResult("Non-Diabetic");
        setIsDiabetic(false);
      }
    } catch (error) {
      setResult("Server Error");
      setIsDiabetic(null);
    }
  };

 return (
  <div className="container">
    <h2>Diabetes Prediction System</h2>
    <div className="subtitle">
      ML-powered health risk assessment
    </div>

    {Object.keys(formData).map((field) => (
      <input
        key={field}
        name={field}
        placeholder={field}
        value={formData[field]}
        onChange={handleChange}
      />
    ))}

    <button onClick={handleSubmit}>Predict</button>

    {result && (
      <div
        className={`result ${
          isDiabetic ? "diabetic" : "non-diabetic"
        }`}
      >
        {result}
      </div>
    )}

    <div className="footer">
      Powered by Machine Learning
    </div>
  </div>
);

}

export default DiabetesForm;
