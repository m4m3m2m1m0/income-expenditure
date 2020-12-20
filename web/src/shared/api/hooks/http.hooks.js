import { useState, useEffect } from 'react';
import axios from 'axios';
import pathBuilder from '../utils/pathBuilder';

export const useGet = (
  path,
  { query, fragment, params, onSuccess, onError } = {}
) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fullPath = pathBuilder(path, query, fragment, params);

    axios.get(fullPath).then(
      (res) => {
        setResponse(res);
        setLoading(false);
        if (typeof onSuccess === 'function') {
          onSuccess(res);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
        if (typeof onError === 'function') {
          onError(err);
        }
      }
    );
  }, [setLoading, setResponse, setError]);

  return { response, loading, error };
};

export const usePost = (
  path,
  body,
  { query, fragment, params, onSuccess, onError } = {}
) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fullPath = pathBuilder(path, query, fragment, params);

    axios.post(fullPath, body).then(
      (res) => {
        setResponse(res);
        setLoading(false);
        if (typeof onSuccess === 'function') {
          onSuccess(res);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
        if (typeof onError === 'function') {
          onError(err);
        }
      }
    );
  }, [setLoading, setResponse, setError]);

  return { response, loading, error };
};

export const usePut = (
  path,
  body,
  { query, fragment, params, onSuccess, onError } = {}
) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fullPath = pathBuilder(path, query, fragment, params);

    axios.put(fullPath, body).then(
      (res) => {
        setResponse(res);
        setLoading(false);
        if (typeof onSuccess === 'function') {
          onSuccess(res);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
        if (typeof onError === 'function') {
          onError(err);
        }
      }
    );
  }, [setLoading, setResponse, setError]);

  return { response, loading, error };
};
