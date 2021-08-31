const options = (requestMethod, body = null, token = null) => {
  if (body) {
    return {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    };
  }

  return {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
};

export const userRegister = async ({ userName, email, password }) => {
  const request = await fetch('http://localhost:3001/register', options('POST', { userName, email, password }));

  const response = await request.json();
  return response;
};

export const userLogin = async ({ email, password }) => {
  const body = { email: `${email}`, password: `${password}` };
  const request = await fetch('http://localhost:3001/login', options('POST', body));

  const response = await request.json();
  return response;
};

export const closeOrder = async (orderInfo) => {
  const request = await fetch('http://localhost:3001/sale', options('POST', orderInfo, 'token'));

  const response = await request.json();
  return response;
};

export const getSellers = async () => {
  const request = await fetch('http://localhost:3001/sellers', options('GET'));

  const response = await request.json();
  return response;
};