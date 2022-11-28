import React, { useState, useEffect } from "react";
import { fetchData } from "./api";
import {
  Container,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
  Grid,
} from "@material-ui/core";
import TotalStats from "./components/TotalStats";
import CountryStats from "./components/CountryStats";
import logo from "./assets/covidStats.png";

function App() {
  const [state, setState] = useState({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    countries: [],
  });
  useEffect(() => {
    fetchData().then(({ confirmed, deaths, recovered, countries }) => {
      setState({
        confirmed,
        deaths,
        recovered,
        countries,
      });
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      height: "100vh",
    },
    title: {
      fontSize: "72px",
      color: "#404040",
    },
  }));
  const classes = useStyles();
  let theme = createMuiTheme({
    typography: {
      fontFamily: "Spartan, sans-serif",
    },
    palette: {
      primary: { main: "#fff" },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          style={{
            minHeight: "100vh",
            fontFamily: "Jost",
          }}
        >
          <Title />
          <br />
          <TotalStats {...state} />
          <br />
          <br />
          <CountryStats {...state} />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
const Title = () => (
  <div>
  <img src={logo} alt="boo" style={{
  width: "250px",
  height:"150px"
  }} />
  </div>
);

export default App;
