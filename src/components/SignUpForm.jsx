import { useState } from "react";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.value]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    console.log(formData);
  };
  return <div>Sign Up</div>;
}

export default SignUpForm;
