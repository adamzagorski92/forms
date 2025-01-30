import { useState } from "react";

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return pattern.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Zatrzymuje wysyłanie formularza
    

    if (!validatePassword(password)) {
      setError("Hasło musi zawierać co najmniej 8 znaków, 1 dużą literę, 1 małą literę i 1 cyfrę.");
      return;
    }

    setError(""); // Czyści błąd jeśli wszystko jest OK
    alert("Formularz wysłany! ✅");
  };

};

export default PasswordForm;