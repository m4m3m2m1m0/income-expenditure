import React, { useState } from 'react';
import { useGet, usePost } from '../../shared/api/hooks/http.hooks';

const Navbar = () => {
  const { response, loading, error } = useGet('http://localhost:5000', {
    query: { id: 2 },
  });

  usePost(
    'http://localhost:5000',
    { test: 1 },
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );

  if (loading) {
    return <p>loading</p>;
  }

  if (response) {
    return <p>{response.data}</p>;
    // return response.data.map((d) => <p key={d.id}>{d.id}</p>);
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
