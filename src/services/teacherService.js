import api from './api';

export const getTeachers = () => api.get('/teacher');
export const registerTeacher = (teacher) => api.post('/teacher/register', teacher);
export const loginTeacher = (credentials) => api.post('/teacher/login', credentials);