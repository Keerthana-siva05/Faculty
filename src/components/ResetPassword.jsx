import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reset-password", { token, newPassword });
      alert("Password Updated Successfully!");
    } catch (error) {
      alert("Invalid or Expired Token!");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
