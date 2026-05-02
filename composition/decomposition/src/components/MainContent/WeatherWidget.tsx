export const WeatherWidget = () => (
    <div className="weather">
        <h4>Погода</h4>
        <div className="weather-column">
            <div className="weather-precipitation">
                <img className="weather-icon" src="https://yastatic.net/weather/i/icons/funky/dark/ovc_-ra.svg"></img>
            </div>
            <div className="weather-temp">+17°</div>
            <div className="weather-daytime">
                <p>Утром +17,</p>
                <p>днем +20</p>
            </div>
        </div>
    </div>
);