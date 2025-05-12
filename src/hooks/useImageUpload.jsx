import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export function useImageUpload() {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState('No se seleccionó archivo');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(`Archivo seleccionado: ${file.name}`);
      return file;
    }
    setFileName('No se seleccionó archivo');
    setImagePreview(null);
    return null;
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(`https://glorious-energy-production.up.railway.app/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw new Error(error.response?.data?.error || 'Error al subir la imagen');
    }
  };

  const upload = async (file) => {
    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Por favor selecciona una imagen',
      });
      return;
    }

    setIsLoading(true);
    Swal.fire({
      title: 'Subiendo imagen...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const uploadResult = await uploadImage(file);
      console.log('uploadResult:', uploadResult);
      if (uploadResult?.success) {
        const imageData = uploadResult;
        
        if (imageData.success) {
          setImagePreview(imageData.url);
          
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            html: 'Imagen subida y recuperada correctamente',
            confirmButtonText: 'Aceptar',
          });
          return imageData;
        }
      }
      throw new Error(uploadResult?.error || 'Error al subir la imagen');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error en el proceso',
      });
      console.error("Error en upload():", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imagePreview,
    fileName,
    isLoading,
    handleFileChange,
    upload,
  };
}