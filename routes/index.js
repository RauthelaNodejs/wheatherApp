const express = require('express');
const router = express.Router();
const axios = require('axios');
const Weather = require('../modal/weather');

router.get('/', async (req, res) => {
  const weatherData = await Weather.find().sort({ date: -1 }).limit(15);
  res.render('index', { weatherData });
});

router.post('/weather', async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const url= `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await axios.get(url);
    console.log(response);
    const { main, weather,location, current} = response.data;

    const weatherEntry = new Weather({
      city: city,
      temperature: current.temp_c,
      description: location.region
    });

    await weatherEntry.save();

    res.redirect('/');
  } catch (error) {
    res.send('City not found!');
  }
});

module.exports = router;
