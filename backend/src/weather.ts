import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(cors());
app.use(express.json());

// Weather Routes
app.get('/api/weather/current', async (req: Request, res: Response) => {
  try {
    const { lat, lon, city } = req.query;

    if (!OPENWEATHER_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    let url = '';
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ error: 'Please provide lat/lon or city' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error fetching weather data',
    });
  }
});

app.get('/api/weather/forecast', async (req: Request, res: Response) => {
  try {
    const { lat, lon, city } = req.query;

    if (!OPENWEATHER_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    let url = '';
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ error: 'Please provide lat/lon or city' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error fetching forecast data',
    });
  }
});

app.get('/api/weather/air-quality', async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    if (!OPENWEATHER_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Please provide lat/lon' });
    }

    const url = `https://api.openweathermap.org/data/3.0/stations/geo?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error fetching air quality data',
    });
  }
});

app.listen(PORT, () => {
  console.log(`⛅ Weather API Server running on port ${PORT}`);
});
