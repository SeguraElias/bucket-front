import { useRef } from 'react';
import { FiUpload, FiImage, FiX } from 'react-icons/fi';
import { useImageUpload } from '../hooks/useImageUpload';
import './ImageUploader.css';

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const {
    imagePreview,
    fileName,
    isLoading,
    handleFileChange,
    upload,
  } = useImageUpload();

  const handleUploadClick = async () => {
    if (fileInputRef.current?.files?.[0]) {
      await upload(fileInputRef.current.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      handleFileChange({ target: { files: [] } });
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Subir imagen</h2>
      
      <div className={`upload-area ${imagePreview ? 'has-preview' : ''}`}>
        {imagePreview ? (
          <div className="preview-container">
            <img src={imagePreview} alt="Preview" className="image-preview" />
            <button 
              onClick={handleRemoveImage} 
              className="remove-btn"
              disabled={isLoading}
            >
              <FiX />
            </button>
          </div>
        ) : (
          <>
            <FiImage className="upload-icon" />
            <p className="upload-text">Arrastra y suelta tu imagen</p>
            <p className="upload-subtext">o</p>
          </>
        )}
        
        <label className="file-label">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
            disabled={isLoading}
          />
          <span className="browse-btn">
            <FiUpload className="btn-icon" />
            Seleccionar imagen
          </span>
        </label>
      </div>

      <div className="file-info">
        {fileName !== 'No se seleccionó archivo' ? (
          <>
            <p className="file-name">{fileName.replace('Archivo seleccionado: ', '')}</p>
          </>
        ) : (
          <p className="no-file">{fileName}</p>
        )}
      </div>

      <button
        onClick={handleUploadClick}
        disabled={isLoading}
        className="upload-btn"
      >
        {isLoading ? (
          <span className="loading-text">Subiendo...</span>
        ) : (
          'Subir imagen'
        )}
      </button>
    </div>
  );
};

export default ImageUploader;
