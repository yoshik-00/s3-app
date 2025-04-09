import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllMedia = async () => {
  try {
    const response = await api.get('/files');
    return response.data;
  } catch (error) {
    console.error('Error getting media files:', error);
    throw error;
  }
};

export const uploadFile = async (file, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onUploadProgress(percentCompleted);
        }
      },
    });

    return response.data;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

export const deleteFile = async (fileUrl) => {
  try {
    const response = await api.delete(
      `/delete?fileUrl=${encodeURIComponent(fileUrl)}`,
    );
    return response.data;
  } catch (error) {
    console.error('File delete error:', error);
    throw error;
  }
};
