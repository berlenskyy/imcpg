import api from './Api';

// Récupérer tous les étudiants
export const getStudents = () => api.get('/students');

// Récupérer un étudiant par ID
export const getStudent = (id) => api.get(`/student/${id}`);

// Créer un étudiant
export const createStudent = (student) => api.post('/student', student);

// Mettre à jour un étudiant
export const updateStudent = (id, student) => api.put(`/student/${id}`, student);

// Supprimer un étudiant
export const deleteStudent = (id) => api.delete(`/student/${id}`);
