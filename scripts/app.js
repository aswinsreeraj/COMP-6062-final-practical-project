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
            province: 'Ontario',
            weatherActive: false,
            dictionary: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            },
            wordToDefine: 'Bottle',
            dictActive: false,
        };
    },
    computed: {
        completeCity() {
            return this.city + " " + this.province;
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
            fetch(`https://goweather.herokuapp.com/weather/${this.completeCity}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Weather data:', data);
                    this.weather.temperature = data.temperature || 'N/A';
                    this.weather.wind = data.wind || 'N/A';
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
        },
        getDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.wordToDefine}`)
                .then(response => response.json())
                .then(data => {
                    const entry = data[0];
                    this.dictionary.word = entry.word;
                    this.dictionary.phonetic = entry.phonetic || 'N/A';
                    this.dictionary.partOfSpeech = entry.meanings[0].partOfSpeech;
                    this.dictionary.definition = entry.meanings[0].definitions[0].definition;
                });
        },
        expandDict() {
            this.getDefinition();
            this.dictActive = !this.dictActive;
        },

    }
});

app.mount('#app');