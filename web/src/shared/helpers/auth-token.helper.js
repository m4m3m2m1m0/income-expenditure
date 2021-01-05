import jwt from 'jwt-decode';

export function getTokenObjectToSave(token) {
  const payload = jwt(token);

  const dateNow = new Date() / 1000;
  return {
    token: token,
    expiresAt: payload.exp,
    lifeTime: payload.exp - dateNow,
  };
}

export function isHalfLife(token) {
  if (!token) return false;

  return new Date() / 1000 > token.expiresAt - token.lifeTime / 2;
}

export function isExpired(token) {
  if (!token) return true;

  return new Date() / 1000 > token.expiresAt;
}
