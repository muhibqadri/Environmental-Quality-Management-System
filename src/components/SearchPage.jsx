import { useState } from 'react';

function SearchPage({ onSearch }) {
  const [searchType, setSearchType] = useState('city');
  const [cityName, setCityName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (searchType === 'city' && !cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    if (searchType === 'coordinates') {
      if (!latitude.trim() || !longitude.trim()) {
        setError('Please enter both latitude and longitude');
        return;
      }
      if (isNaN(latitude) || isNaN(longitude)) {
        setError('Latitude and longitude must be numbers');
        return;
      }
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        setError('Invalid latitude or longitude values');
        return;
      }
    }

    const query = searchType === 'city' ? cityName : `${latitude},${longitude}`;
    onSearch(query);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Weather Search</h1>
        
        <div className="mb-6">
          <div className="flex gap-4 justify-center">
            <button
              className={`px-4 py-2 rounded-lg ${
                searchType === 'city'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSearchType('city')}
            >
              City Name
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                searchType === 'coordinates'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSearchType('coordinates')}
            >
              Coordinates
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {searchType === 'city' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City Name
              </label>
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter city name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Enter latitude (-90 to 90)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Enter longitude (-180 to 180)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Get Weather
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchPage;