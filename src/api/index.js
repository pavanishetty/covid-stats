export const fetchData = async () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f8653c47e1msh16292a78f4f056ep1f9b12jsn864a79d65832',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };

  const url = "https://covid-193.p.rapidapi.com/history?country=All";

  // fetch total data stats
  const response = await fetch(url, options);
  const json = await response.json();
  console.log('json', json)

  //fetch list of countries
  const countries = await fetch('https://covid-193.p.rapidapi.com/countries', options).then((response) =>
    response.json()
  );
  

  //return customized data
  return {

    confirmed: json.response[0].cases.total,
    deaths: json.response[0].deaths.total,
    recovered: json.response[0].cases.recovered,
    countries: countries.response,
  };
};

export const fetchCountryStats = async (query) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f8653c47e1msh16292a78f4f056ep1f9b12jsn864a79d65832',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };
  const url = `https://covid-193.p.rapidapi.com/statistics?country=${query}`
  const response = await fetch(url, options)
  const json = await response.json()

  return json;

};