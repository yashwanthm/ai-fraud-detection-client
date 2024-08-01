import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [distance, setDistance] = useState('');
  const [ratioToMedian, setratioToMedian] = useState('');
  const [usePin, setUsePin] = useState(false);
  const [useChip, setUseChip] = useState(false);
  const [onlineTransaction, setOnlineTransaction] = useState(false);
  const [message, setMessage] = useState('');

  const endpoint = "https://ai-fraud-detection-demo-api-ymaheshw-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com"

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the payload
    const payload = [
      parseFloat(distance), 
      parseFloat(ratioToMedian), 
      usePin ? 1 : 0, 
      useChip ? 1 : 0, // assuming chip is always false as it's not mentioned in the form
      onlineTransaction ? 1 : 0
    ];

    try {
      const response = await axios.post(endpoint, payload);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error: Could not determine the transaction status.');
    }
  };

  return (
    <div>
      <h1>Transaction Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Distance from last transaction (km):
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Median price as the last transaction:
            <input
              type="number"
              step="0.01"
              value={ratioToMedian}
              onChange={(e) => setratioToMedian(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Using a pin:
            <input
              type="checkbox"
              checked={usePin}
              onChange={(e) => setUsePin(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label>
            Is the credit card with a chip:
            <input
              type="checkbox"
              checked={useChip}
              onChange={(e) => setUseChip(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label>
            Online transaction:
            <input
              type="checkbox"
              checked={onlineTransaction}
              onChange={(e) => setOnlineTransaction(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>Response: {message}</p>}
    </div>
  );
};

export default App;