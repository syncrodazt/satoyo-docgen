import React, { useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  createTheme,
  ThemeProvider,
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Brightness4 } from "@mui/icons-material";
import { generateDocument } from "./scripts/generate";

function App() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2024-03-31"));
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [country, setCountry] = useState("");
  const [scholarshipNumber, setScholarshipNumber] = useState("");
  const [name, setName] = useState("");
  const [currentDegree, setCurrentDegree] = useState("");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [rememberChoice, setRememberChoice] = useState(false);

  const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberChoice(event.target.checked);
  };

  const handleGenerateDocument = () => {
    // Here you can implement the logic for generating the Word documents
    // based on the form inputs

    // For simplicity, let's just log the values to the console
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Name:", name);
    console.log("University:", university);
    console.log("Current Degree:", currentDegree);
    console.log("Major:", major);
    console.log("Country:", country);
    console.log("Scholarship Number:", scholarshipNumber);

    if (rememberChoice) {
      // Save the user's choice
      localStorage.setItem("rememberChoice", "true");
    } else {
      // Clear the user's choice
      localStorage.removeItem("rememberChoice");
    }

    generateDocument(
      startDate,
      endDate,
      university,
      major,
      currentDegree,
      name,
      country,
      scholarshipNumber
    );
  };

  const handleThemeToggle = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      // background: {
      //   default: "white",
      // },
    },
  });

  const h1Color = themeMode === "light" ? "black" : "white";

  React.useEffect(() => {
    const storedChoice = localStorage.getItem("rememberChoice");
    setRememberChoice(storedChoice === "true");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "background.default",
          width: "100%", // Set the width to 100% to make it full width
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Grid container spacing={2} direction="column" alignItems="center">
              <Grid item>
                <Typography
                  variant="h4"
                  component="h1"
                  style={{ color: h1Color }}
                >
                  Scholarship Docgen
                </Typography>
              </Grid>

              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      format="YYYY-MM-DD"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      format="YYYY-MM-DD"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item>
                <TextField
                  label="University"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  select
                  label="Current Degree"
                  sx={{ minWidth: 225 }}
                  value={currentDegree}
                  onChange={(e) => {
                    setCurrentDegree(e.target.value as string);
                  }}
                >
                  <MenuItem value="">Select Degree</MenuItem>
                  <MenuItem value="B">Bachelor</MenuItem>
                  <MenuItem value="M">Master</MenuItem>
                  <MenuItem value="D">Doctor</MenuItem>
                </TextField>
              </Grid>

              <Grid item>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Scholarship Number"
                  value={scholarshipNumber}
                  onChange={(e) => setScholarshipNumber(e.target.value)}
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberChoice}
                      onChange={handleRememberChange}
                      color="primary"
                    />
                  }
                  label={
                    <span
                      style={{
                        color: themeMode === "light" ? "black" : "white",
                      }}
                    >
                      Remember Choice
                    </span>
                  }
                />
              </Grid>

              <Grid item>
                <Button variant="contained" onClick={handleGenerateDocument}>
                  Generate Document
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleThemeToggle}
                  startIcon={<Brightness4 />}
                >
                  {themeMode === "light"
                    ? "Switch to Dark Theme"
                    : "Switch to Light Theme"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
