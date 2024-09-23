import React from 'react'
import { Route, Routes } from 'react-router-dom';

export const TravelerRoutes = () => {
  return (
    <>
      <Route path="/new-flight" element={<div>Create Flights</div>} />
    </>
  );
}
