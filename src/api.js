const BASE_URL = 'http://localhost:5000/api';

// Register Driver
export const registerDriver = async (data) => {
  const response = await fetch(`${BASE_URL}/drivers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Register Passenger
export const registerPassenger = async (data) => {
  const response = await fetch(`${BASE_URL}/drivers/register-passenger`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Login
export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/drivers/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Verify Driver
export const verifyDriver = async (phone) => {
  const response = await fetch(`${BASE_URL}/drivers/verify/${phone}`);
  return response.json();
};

// Get All Drivers — Admin
export const getAllDrivers = async () => {
  const response = await fetch(`${BASE_URL}/drivers/all`);
  return response.json();
};

// Approve Driver — Admin
export const approveDriver = async (id) => {
  const response = await fetch(`${BASE_URL}/drivers/approve/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

// Reject Driver — Admin
export const rejectDriver = async (id) => {
  const response = await fetch(`${BASE_URL}/drivers/reject/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};


export const getDriverByUserId = async (userId) => {
  const response = await fetch(`${BASE_URL}/drivers/user/${userId}`);
  return response.json();
};