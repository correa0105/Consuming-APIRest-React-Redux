import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Register from '../pages/Register';
import Photos from '../pages/Photos';

export default function ContainerRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Students />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/student"
        element={
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/student/edit/:id"
        element={
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/student/delete/:id"
        element={
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/photos/:id"
        element={
          <PrivateRoute>
            <Photos />
          </PrivateRoute>
        }
      />
      <Route exact path="*" element={<Page404 />} />
    </Routes>
  );
}
