import { useState } from "react";

const AreaBarChart = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = () => {
    // Envoyez les données email et numéro de téléphone à votre backend ici
    // console.log("Email:", email);
    // console.log("Phone Number:", phoneNumber);
  };

  const showAlert = () => {
    // const emailInput = prompt("Saisissez votre email :");
    // if (emailInput !== null) {
    //   setEmail(emailInput);
    //   const phoneInput = prompt("Saisissez votre numéro de téléphone :");
    //   if (phoneInput !== null) {
    //     setPhoneNumber(phoneInput);
    //     handleSubmit();
    //   }
    // }
  };

  return (
    <div className="bar-chart">
     
    </div>
  );
};

export default AreaBarChart;
