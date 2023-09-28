import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import WebService from "../services/webService";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        location: { name: '' },
        current: { temp_c: '', feelslike_c: '', wind_kph: '' }
    });
    const [city, setCity] = useState('');

    const handleCityChange = (event: any) => {
        setCity(event.target.value);
    };

    const loadData = () => {
        const webServiceApi = new WebService()

        return webServiceApi.fetchWeatherData(city)
            .then(setWeatherData);
    }

    useEffect(() => {
        if (city) {
            loadData()
        }
    }, [city]);

    return (
        <div className="weather-app">
            <h1 className="app-title" >Weather App</h1>
            <input className="input-city" type="text" value={city} onChange={handleCityChange} placeholder="Введите город" />
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.location.name}</h2>
                    <p>Текущая температура: {weatherData.current.temp_c}°C</p>
                    <p>Ощущается как: {weatherData.current.feelslike_c}°C</p>
                    <p>Скорость ветра: {weatherData.current.wind_kph} км/ч</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;