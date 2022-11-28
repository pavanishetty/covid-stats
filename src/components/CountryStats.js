import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { fetchCountryStats } from "../api";
import CountUp from "react-countup";

function CountryStats({ countries }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      boxShadow: "4px 4px 31px 2px rgba(0, 0, 0, 0.10)",
      backgroundColor: "#fff",
    },
    input: {
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "blue",
      },
      boxShadow: "4px 4px 31px 2px rgba(0, 0, 0, 0.10)",
    },
  }));

  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState({});
  const { response=0 } = country;
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    if (search && search.trim !== "") {
      setIsLoading(true);

      setTimeout(() => {
        fetchCountryStats(search)
          .then((data) => {
            setCountry(data);
          })
          .finally(setIsLoading(false));
      }, 100);
    }
  }, [search]);

  return (
    <Grid>
      <Grid>
        <Autocomplete
          autoSelect
          getOptionLabel={(option) => option}
          getOptionSelected={(option) => option}
          options={countries}
          value={search}
          onChange={(event, value) => handleOnChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Search"
              fullWidth
              hiddenLabel
              style={{ backgroundColor: "white" }}
              InputProps={{
                ...params.InputProps,
                className: classes.input,
                disableUnderline: true,
              }}
            />
          )}
        />
      </Grid>
      <br />
      <br />
      <Paper className={classes.paper}>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={4}>
            <Typography component="body1" variant="subtitle1">
              Confirmed
            </Typography>
            <br />
            <Typography component="body1" variant="h4">
              {response && response[0].cases.total ? (
                <CountUp
                  start={0}
                  end={response && response[0].cases.total}
                  duration={1.5}
                  separator=","
                />
              ) : (
                "0"
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="body1" variant="subtitle1">
              Deaths
            </Typography>
            <br />
            <Typography component="body1" variant="h4">
              {response && response[0].deaths.total ? (
                <CountUp
                  start={0}
                  end={response && response[0].deaths.total}
                  duration={1.5}
                  separator=","
                />
              ) : (
                "0"
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="body1" variant="subtitle1">
              Recovered
            </Typography>
            <br />
            <Typography component="body1" variant="h4">
              {response && response[0].cases.recovered ? (
                <CountUp
                  start={0}
                  end={response && response[0].cases.recovered}
                  duration={1.5}
                  separator=","
                />
              ) : (
                "0"
              )}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default CountryStats;
