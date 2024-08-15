const app = Vue.createApp({
    data() {
        return {
            randomFact: '',
            randomActive: false,
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            city: 'London',
            weatherActive: false,
        }
    },
    methods: {
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
        },
        expandRandom() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
            this.randomActive = !this.randomActive;
        },
        getWeather() {
            fetch(`https://weather-data.liamstewart.ca/?city=${this.city}`, { mode: 'no-cors' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Weather data:', data);
                    this.weather.temperature = data.temperature || 'N/A';
                    this.weather.wind = data.wind_speed || 'N/A';
                    this.weather.description = data.description || 'N/A';
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    this.weather.temperature = 'N/A';
                    this.weather.wind = 'N/A';
                    this.weather.description = 'N/A';
                });
        },
        expandWeather() {
            this.getWeather();
            this.weatherActive = !this.weatherActive;
        }
    }
});

app.mount('#app');