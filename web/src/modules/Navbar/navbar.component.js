import React, { useState } from 'react';
import { useGet, usePost } from '../../shared/api/hooks/http.hooks';

const Navbar = () => {
  const { response, loading, error } = useGet('http://localhost:5000');

  if (loading) {
    return <p>loading</p>;
  }

  if (response) {
    return <p>{response.data}</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default Navbar;
