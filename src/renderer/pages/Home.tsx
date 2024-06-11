import { Link } from 'react-router-dom';
import { Button } from 'antd';
import React from 'react';

export default function Home() {
  return (
    <div>
      <div className="">
        <h1>Home Page</h1>
        <Link to="/new-page">
          <Button type="primary">Go to New Page</Button>
        </Link>
      </div>
    </div>
  );
}
