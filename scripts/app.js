/*============================================================================
	File Name:	app.js
	Author:		Aswin Sreeraj
	Date:		14/08/2024
	Modified:	None
	© Fanshawe College, 2023

	Description: 	To develop a Vue.js app for to implement the following 3 modules:
                    1. Randon Fact Generator
                    2. Current Weather
                    3. Dictionary
============================================================================*/

// To ensure user-friendliness and convenience, a single
// web app has been implemented for the 3 modules.
// So, instead of using the lifecycle hooks "created" or "mounted",
// the code implements a expand button click for the same logic
const app = Vue.createApp({
    data() {
        return {
            // Variables for updating data in the web documenmt
            randomFact: '',
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            city: 'London',
            province: 'Ontario',
            dictionary: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            },
            wordToDefine: 'Bottle',

            // Display flags to toggle expansion
            weatherActive: false,
            randomActive: false,
            dictActive: false,
        };
    },
    computed: {
        completeCity() {
            return this.city + " " + this.province;
        }
    },
    methods: {
        getRandomFact() { // To fetch random fact from the API
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
        },
        // This is to display a random fact upon opening the module
        expandRandom() { 
            this.getRandomFact();
            this.randomActive = !this.randomActive;
        },
        getWeather() { // To fetch weather data for the specific city using the API
            fetch(`https://goweather.herokuapp.com/weather/${this.completeCity}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Weather data:', data);
                    this.weather.temperature = data.temperature || 'N/A';
                    this.weather.wind = data.wind || 'N/A';
                    this.weather.description = data.description || 'N/A';
                })
                .catch(error => { // Weather API created some issues, so for debugging and null handling
                    console.error('Error fetching weather data:', error);
                    this.weather.temperature = 'N/A';
                    this.weather.wind = 'N/A';
                    this.weather.description = 'N/A';
                });
        },
        // Display the weather of London, Ontario on expansion
        expandWeather() {
            this.getWeather();
            this.weatherActive = !this.weatherActive;
        },
        getDefinition() { // TO fetch information related to the word from the dictionary API
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
        // Display details of the word 'Bottle' when the arrow down is clicked
        expandDict() {
            this.getDefinition();
            this.dictActive = !this.dictActive;
        },

    }
});

app.mount('#app');