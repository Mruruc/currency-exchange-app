export function getExchangeRate(currency) {
  const rate = fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currency}?format=json`
  )
    .then((response) => response.json())
    .then((result) => result.rates[0].mid);

  return rate;
}

const API_PATH = "http://10.0.2.2:8080/api/v1";

export async function signup(email, password) {
  const response = await fetch(`${API_PATH}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const status = response.status;
  if (status === 201) {
    return { status };
  }
  const result = await response.json();

  return {
    status,
    ...result,
  };
}

export async function login({ email, password }) {
  const response = await fetch(`${API_PATH}/auth/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const status = response.status;
  if (status === 200) {
    return { status, token: response.headers.get("Authorization") };
  }
  const result = await response.json();
  return {
    status,
    ...result,
  };
}

export async function postRequest(token, path, payload) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });
  const status = response.status;
  if (status < 400) {
    return { status };
  }
  const result = await response.json();
  return {
    status,
    ...result,
  };
}

export async function getRequest(token, path) {
  const response = await fetch(`${API_PATH}${path}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const result = await response.json();
  return result;
}
