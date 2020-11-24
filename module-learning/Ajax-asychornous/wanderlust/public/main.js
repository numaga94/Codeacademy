// Foursquare API Info
const clientId = 'XCCJBJMIJ5Y1SJBAJOAE02AV2FCEHOEOPXEREWLYMQZXKCGT';
const clientSecret = 'LWA22WURRYL44H04SKIY1BA3BE0Z1CNJM1R0LDYIYDTFDMAK';
const url = 'https://api.foursquare.com/v2/venues/explore';

// OpenWeather Info
const openWeatherKey = '4529a69486bf197f7b9543654fc55947';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$('#venue1'), $('#venue2'), $('#venue3'), $('#venue4')];
const $weatherDiv = $('#weather1');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const today = new Date();
  const city = $input.val();
  const urlToFetch = `${url}?near=${city}&limit=10&v=${today.getFullYear()}${today.getMonth()}${today.getDate()}&client_id=${clientId}&client_secret=${clientSecret}`;
  // console.log(city);
  // console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch, { cache: 'no-cache' });
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map((element) => element.venue);
      // console.log(venues);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = `${weatherUrl}?q=${city}&units=metric&appid=${openWeatherKey}`;
  try {
    const response = fetch(urlToFetch);
    if (response.ok) {
      const jsonRes = response.json();
      console.log(jsonRes);
      return jsonRes;
    }
  } catch (error) {
    console.log(error);
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0];
    console.log(venueIcon);
    let venueContent = '';
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  // Add your code here:

  let weatherContent = '';
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css('visibility', 'visible');
  getVenues();
  getForecast();
  return false;
};

$submit.click(executeSearch);
