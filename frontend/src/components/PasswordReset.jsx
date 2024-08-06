import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const PasswordReset = () => {
  // const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    setErrMsg("");
    setNewPasswordError("");
    setConfirmPasswordError("");
  }, [newPassword, confirmPassword]);

  const validateInputs = () => {
    let isValid = true;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!newPassword.trim()) {
      setNewPasswordError("Please enter your new password");
      isValid = false;
    } else if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number"
      );
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your new password");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
    return isValid;
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setErrMsg("");
      setSuccessMsg("Password reset successful");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Box textAlign="center" mb={2} mt={10}>
        <Typography variant="h4" component="h1" fontWeight="bold" mb={5}>
          Password Reset
        </Typography>
      </Box>
      <Box component="form" onSubmit={handlePasswordReset}>
        <TextField
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={!!newPasswordError}
          helperText={newPasswordError}
        />
        <TextField
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
        />
        {errMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errMsg}
          </Alert>
        )}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
        </Box>
        {successMsg && (
          <Alert severity="success" sx={{ mt: 4 }}>
            {successMsg}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default PasswordReset;
