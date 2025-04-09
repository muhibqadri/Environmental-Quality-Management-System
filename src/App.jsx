import { useState } from 'react';
import SearchPage from './components/SearchPage';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showWeather, setShowWeather] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowWeather(true);
  };

  const handleBack = () => {
    setShowWeather(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!showWeather ? (
        <SearchPage onSearch={handleSearch} />
      ) : (
        <WeatherDetails searchQuery={searchQuery} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;