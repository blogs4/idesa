// Get user's IP address
const ip_address = window.location.hostname;

// Define array of bot user agents to filter out
const bot_user_agents = ['Googlebot', 'Bingbot', 'Yahoo! Slurp', 'DuckDuckBot'];

// Define array of allowed countries
const allowed_countries = ['US', 'CA', 'GB', 'AU'];

// Define array of allowed languages
const allowed_languages = ['en', 'es', 'fr', 'de'];

// Get user agent string
const user_agent = navigator.userAgent;

// Get user's country code based on IP address
fetch(`http://ip-api.com/json/${ip_address}?fields=status,message,countryCode`)
    .then(response => response.json())
    .then(data => {
        const country_code = data.countryCode;

        // Check if user's country is allowed
        const country_allowed = data.status === 'success' && allowed_countries.includes(country_code);

        // Check if user's language is allowed
        const language = navigator.language.slice(0, 2);
        const language_allowed = allowed_languages.includes(language);

        // Check if user agent is a bot
        const is_bot = bot_user_agents.some(bot_user_agent => user_agent.includes(bot_user_agent));

        // If any filter fails, redirect user to error page
        if (is_bot || !country_allowed || !language_allowed) {
            window.location.href = 'error.php';
        }
    })
    .catch(error => console.error(error));

// If all filters pass, continue with normal page content
console.log('Welcome to our website!');
