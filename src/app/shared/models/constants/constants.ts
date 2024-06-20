import { HttpHeaders } from "@angular/common/http";

// API INFO
export const API_URL = 'http://localhost:5000';
export const FRONT_URL = 'http://localhost:4200';
export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': FRONT_URL,
        'Access-Control-Allow-Methods': "PUT, POST, DELETE, GET, OPTIONS",
        'Access-Control-Allow-Headers': "Accept, Authorization, Content-Type",
        'Access-Control-Allow-Credentials': "true"
    })
};

// KEYS
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const PERFIL_KEY = 'perfil';

// GROUPS
export const ADMIN_GROUP = 'admin';
export const NORMAL_GROUP = 'normal';
