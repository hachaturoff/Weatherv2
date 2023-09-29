import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import WebService from "../services/webService";

type InitType = {
    location: {
        name: String,
        country: String,
        localtime: String
    },
    current: {
        temp_c: String,
        feelslike_c: String,
        wind_kph: String
    }
}

const initialData: InitType = {
    location: {
        name: '',
        country: '',
        localtime: ''
    },
    current: {
        temp_c: '',
        feelslike_c: '',
        wind_kph: ''
    }
}

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(initialData);
    const [valueCity, setValueCity] = useState('');
    const [city, setCity] = useState('');
    const [isDayTime, setIsDayTime] = useState(false);

    const handleValueCityChange = (event: any) => {
        setValueCity(event.target.value);
    };

    const handleCityChange = (event: any) => {
        if (event.key === 'Enter') {
            setCity(valueCity);
        }
    };

    const loadData = () => {
        const webServiceApi = new WebService()
        return webServiceApi.fetchWeatherData(city)
            .then(setWeatherData);
    }

    const checkDayTime = () => {
            const isTime = +weatherData.location.localtime.slice(11, 13)
            // const isTime = 0
            setIsDayTime(isTime >= 6 && isTime < 18)
    }
//минск

    useEffect(() => {
        if (city) {
            loadData()
        }
    }, [city]);

    useEffect(() => {
        checkDayTime();
    }, [isDayTime]);

    return (
        <div className="weather-app">
            <h1 className="app-title" >Weather App</h1>
            <input
                className="input-city"
                type="text"
                value={valueCity}
                onChange={handleValueCityChange}
                onKeyPress={handleCityChange}
                placeholder="Введите город" />
            {weatherData && weatherData.location.name !== ''
                ? (
                <div className={'weather-info' + (isDayTime ? ' sun-time' : ' night-time')}>
                    <div className=''>
                        <h2>{weatherData.location.country + ', ' + weatherData.location.name}</h2>
                        <h3 className='city-time'>Сейчас  {weatherData.location.localtime.slice(11, 16)}.</h3>
                    </div>
                    <div className='weather-temp-info'>
                        <p className='weather-temp'>{weatherData.current.temp_c}°</p>
                        <div className='weather-temp-descr'>
                            <p>Ощущается как: {weatherData.current.feelslike_c}°C</p>
                            <p>Скорость ветра: {weatherData.current.wind_kph} км/ч</p>
                        </div>
                    </div>
                </div>
            )
                : (
                    <div className={'weather-info' + (isDayTime ? ' sun-time' : ' night-time')}>
                        <div className='weather-temp-info'>
                            <p className='weather-temp'>Ждём ваш город</p>
                        </div>
                    </div>
                ) }
        </div>
    );
};

export default WeatherApp;