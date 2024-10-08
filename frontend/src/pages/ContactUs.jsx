import React, { useRef, useState } from "react";
import {
  Container,
  Alert,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Button,
} from "@mui/material";
import axiosInstance from "../api/Axios";


const ContactUs = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const termsRef = useRef(null);

  const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
  const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isMessageInvalid, setIsMessageInvalid] = useState(false);
  const [isTermsUnchecked, setIsTermsUnchecked] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const nameRegex = /^[A-Za-z]+$/;
  const adminEmail = "kapoor28204@gmail.com"

  function handleSubmit() {
    if (areAllInputsValid()) {
      sendEmailToAdmin()
    } else {
      setSuccessMsg("");
    }
  }

  async function sendEmailToAdmin() {
    try {
      const response = await axiosInstance.post('/email/send', {
        to: adminEmail,
        subject: `Customer contact request | ${firstNameRef.current.value}`,
        text: `${firstNameRef.current.value} ${lastNameRef.current.value} want to connect to you about the trippy. Their email: ${emailRef.current.value}. Message : ${messageRef.current.value} . Happy conversation !`
      })
      setSuccessMsg("Message sent successfully!");
      clearInputs();
    }
    catch (error) {
      alert("Unable to submit the form. Please try again later")
      console.log(`Error while sending email. Error: ${error}`)
    }
  }

  function areAllInputsValid() {
    const isFirstNameValid = nameRegex.test(firstNameRef.current.value);
    const isLastNameValid = nameRegex.test(lastNameRef.current.value);

    const isEmailValid = emailRegex.test(emailRef.current.value);
    const isMessageValid = messageRef.current.value !== "";
    const isTermsValid = termsRef.current.checked;

    setIsFirstNameInvalid(!isFirstNameValid);
    setIsLastNameInvalid(!isLastNameValid);
    setIsEmailInvalid(!isEmailValid);
    setIsMessageInvalid(!isMessageValid);
    setIsTermsUnchecked(!isTermsValid);

    return (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isMessageValid &&
      isTermsValid
    );
  }

  function clearInputs() {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
    termsRef.current.checked = false;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="90vh" height="100%">
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Contact us
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            We're here to answer your questions. Let's talk!
          </Typography>
          <form noValidate autoComplete="off">
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                required
                variant="filled"
                sx={{ width: "49%" }}
                label="First name"
                margin="dense"
                inputRef={firstNameRef}
                helperText={
                  isFirstNameInvalid
                    ? "First name must contain only letters."
                    : ""
                }
                error={isFirstNameInvalid}
                onChange={() =>
                  setIsFirstNameInvalid(
                    !nameRegex.test(firstNameRef.current.value)
                  )
                }
              />

              <TextField
                required
                variant="filled"
                sx={{ width: "49%" }}
                label="Last name"
                margin="dense"
                inputRef={lastNameRef}
                helperText={
                  isLastNameInvalid
                    ? "Last name must contain only letters."
                    : ""
                }
                error={isLastNameInvalid}
                onChange={() =>
                  setIsLastNameInvalid(
                    !nameRegex.test(lastNameRef.current.value)
                  )
                }
              />
            </Box>
            <TextField
              required
              variant="filled"
              fullWidth
              label="Email address"
              margin="dense"
              inputRef={emailRef}
              helperText={
                isEmailInvalid ? "Please enter a valid email address." : ""
              }
              error={isEmailInvalid}
              onChange={() =>
                setIsEmailInvalid(!emailRegex.test(emailRef.current.value))
              }
            />

            <TextField
              required
              fullWidth
              label="Message"
              multiline
              rows={4}
              margin="dense"
              variant="filled"
              inputRef={messageRef}
              helperText={isMessageInvalid ? "Please enter your message." : ""}
              error={isMessageInvalid}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  color="primary"
                  inputRef={termsRef}
                />
              }
              label="I agree to the terms of use and privacy policy."
            />
            {isTermsUnchecked && (
              <FormHelperText error>Please agree to the terms</FormHelperText>
            )}
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="primary"
              fullWidth
            >
              SUBMIT
            </Button>
          </form>
          {successMsg && (
            <Alert severity="success" sx={{ mt: 4 }}>
              {successMsg}
            </Alert>
          )}
        </Container>
      </Container>
    </Box>
  );
};

export default ContactUs;
