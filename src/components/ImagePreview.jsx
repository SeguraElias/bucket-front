export function ImagePreview({ imageUrl }) {
  if (!imageUrl) return null;

  return (
    <div className="image-preview">
      <h3>Imagen cargada:</h3>
      <img src={imageUrl} alt="Uploaded preview" />
    </div>
  );
}