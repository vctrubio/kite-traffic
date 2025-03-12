"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface ApiResponse {
  data: any;
  status: number;
  error?: string;
}

export default function ApiTestPage() {
  const searchParams = useSearchParams();
  const initialEndpoint = searchParams.get('endpoint') || '/api/users';
  
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [idParam, setIdParam] = useState('');

  const apiEndpoints = [
    '/api/users',
    '/api/students',
    '/api/teachers',
    '/api/bookings',
    '/api/sessions',
    '/api/lessons',
    '/api/equipment',
    '/api/forecasts',
    '/api/dateSpans',
    '/api/kites',
    '/api/bars',
    '/api/boards',
    '/api/payments',
    '/api/feedbacks',
    '/api/forecastPredictions',
    '/api/lessonConfirmations',
  ];

  useEffect(() => {
    if (initialEndpoint !== endpoint) {
      setEndpoint(initialEndpoint);
    }
  }, [initialEndpoint]);

  const handleEndpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndpoint(e.target.value);
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const constructFinalEndpoint = () => {
    if (idParam && (method === 'GET' || method === 'PUT' || method === 'DELETE')) {
      return `${endpoint}/${idParam}`;
    }
    return endpoint;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const finalEndpoint = constructFinalEndpoint();
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method === 'POST' || method === 'PUT') {
        options.body = requestBody;
      }

      const res = await fetch(finalEndpoint, options);
      const data = await res.json();
      
      setResponse({
        data,
        status: res.status,
      });
    } catch (error) {
      setResponse({
        data: null,
        status: 500,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatJson = (json: any) => {
    try {
      return JSON.stringify(json, null, 2);
    } catch (e) {
      return 'Invalid JSON';
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">API Testing Interface</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">API Endpoint</label>
            <select
              value={endpoint}
              onChange={handleEndpointChange}
              className="w-full p-2 border rounded"
            >
              {apiEndpoints.map(ep => (
                <option key={ep} value={ep}>{ep}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">HTTP Method</label>
            <select
              value={method}
              onChange={handleMethodChange}
              className="w-full p-2 border rounded"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
        </div>
        
        {(method === 'GET' || method === 'PUT' || method === 'DELETE') && (
          <div>
            <label className="block text-sm font-medium mb-1">ID Parameter (for single resource)</label>
            <input
              type="text"
              value={idParam}
              onChange={(e) => setIdParam(e.target.value)}
              placeholder="Resource ID (optional)"
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        
        {(method === 'POST' || method === 'PUT') && (
          <div>
            <label className="block text-sm font-medium mb-1">Request Body (JSON)</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              rows={8}
              className="w-full p-2 border rounded font-mono text-sm"
              placeholder='{"key": "value"}'
            />
          </div>
        )}
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </form>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Response</h2>
        {response ? (
          <div className="border rounded-md overflow-hidden">
            <div className={`p-2 ${
              response.status >= 200 && response.status < 300 
                ? 'bg-green-100 border-b border-green-200' 
                : 'bg-red-100 border-b border-red-200'
            }`}>
              Status Code: {response.status}
              {response.error && <span className="ml-2 text-red-700">{response.error}</span>}
            </div>
            <pre className="bg-gray-50 p-4 overflow-x-auto text-sm">
              {formatJson(response.data)}
            </pre>
          </div>
        ) : (
          <div className="text-gray-500 italic">No response yet</div>
        )}
      </div>
    </div>
  );
}
