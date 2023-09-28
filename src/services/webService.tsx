const API_KEY = '63da6e9f907949d59f8115622232809'; // Замените YOUR_API_KEY на свой ключ API


class WebService {

    fetchWeatherData = async (city: any) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);

            if (!response.ok) {
                throw new Error('Ошибка при получении данных о погоде');
            }

            return await response.json();
            // setWeatherData(data);
            // return data
            // console.log(data)
        } catch (error) {
            console.error('Ошибка при получении данных о погоде:', error);
            // Обработка ошибки - показать сообщение пользователю или выполнить другие действия
        }
    };


}

export default WebService