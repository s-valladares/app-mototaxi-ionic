import { HttpHeaders } from '@angular/common/http';

export function getHeaders() {
  return new HttpHeaders({
    'Content-Type': 'application/json'
  });
}

export function getHeadersOauth(credenciales) {
  return new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Basic ' + credenciales
  });
}

export function getParams(user, pass) {

  const params = new URLSearchParams();
  params.set('grant_type', 'password');
  params.set('username', user);
  params.set('password', pass);

  console.log(params.toString().replace('%40', '@'));
  return params.toString();
}

