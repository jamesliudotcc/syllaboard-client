import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <div>
    Page Not Found
    <Link to="/">Go Back Home</Link>
  </div>
);

export default NoMatch;
