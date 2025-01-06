import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const ApiTest = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const testData = {
    name: "Test Brand",
    email: "test@example.com",
    password: "test123",
    category: "Technology",
    subcategory: "Web",
    brandTags: ["test"],
    country: "United States",
    agree: true
  };

  const handleTestPost = async () => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/registrations`, testData);
      setResponse(response.data);
      console.log('Success:', response.data);
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };

  const handleGetRegistrations = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_URL}/registrations`);
      setResponse(response.data);
      console.log('Registrations:', response.data);
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-x-4">
        <Button onClick={handleTestPost} color="primary">
          Test POST Request
        </Button>
        <Button onClick={handleGetRegistrations} color="secondary">
          Test GET Request
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          <h3 className="font-bold">Error:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(error.message, null, 2)}
          </pre>
        </div>
      )}

      {response && (
        <div className="p-4 bg-green-50 text-green-700 rounded">
          <h3 className="font-bold">Response:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;