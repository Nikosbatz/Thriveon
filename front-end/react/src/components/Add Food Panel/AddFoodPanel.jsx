import { useState, useContext } from "react";
import { FoodsContext } from "../Contexts/FoodContext/FoodsContext";
import { postFood } from "../../api/requests";

export default function AddFoodPanel() {
  const [pendingValidation, setPendingValidation] = useState(false);
  const [submissionSuccess, setsubmissionSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    grams: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  /*---------- ----------*/

  function validateFormData() {
    for (const [key, value] of Object.entries(formData)) {
      if (formData[key] === "") {
        return false;
      }
    }

    return true;
  }
  /*---------- ----------*/

  // Handles the Request's response based on the status code
  function resetForm(statusCode) {
    setFormData({
      name: "",
      calories: "",
      grams: "",
      protein: "",
      carbs: "",
      fats: "",
    });

    //make animation turn card
  }
  /*---------- ----------*/

  // Handles the Form Submission
  async function handleSubmission() {
    setPendingValidation(true);
    if (!validateFormData()) {
      alert("Fill All the Fields");
      return;
    }

    try {
      const createdFood = await postFood(formData, "/foods");
      resetForm();
    } catch (err) {
      console.log(err.message);
    }

    // Disable Loading Spinner
    setPendingValidation(false);
  }
  /*---------- ----------*/

  return (
    <main className="add-food-panel">
      <h2>Add Food</h2>
      <form className="add-food-form">
        {Object.keys(formData).map((nutrientName) => (
          <div className="add-food-form-item">
            <label htmlFor={nutrientName}>
              {nutrientName.charAt(0).toUpperCase() + nutrientName.slice(1)}:
            </label>
            <input
              name={nutrientName}
              onChange={handleInputChange}
              value={formData[nutrientName]}
              type={nutrientName === "name" ? "text" : "number"}
              placeholder={`Enter ${nutrientName}`}
            />
          </div>
        ))}
      </form>
      {!pendingValidation ? (
        <img
          onClick={handleSubmission}
          src="./assets/tick.png"
          alt="Food Icon"
        ></img>
      ) : (
        <div className="loader"></div>
      )}
    </main>
  );
}
