import React, { useState } from 'react';
import './Gallery.css';

function Gallery({ images }) {
    const [isLightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (image) => {
        setSelectedImage(image);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        setLightboxOpen(false);
    };

    return (
        <div className="gallery-container">
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        onClick={() => openLightbox(image)}
                    >
                        <img src={image.url} alt={image.alt || 'Gallery Image'} />
                        <div className="image-actions">
                            {/* Placeholder for icons/actions, such as delete or info */}
                        </div>
                    </div>
                ))}
            </div>

            {isLightboxOpen && (
                <div className="lightbox" onClick={closeLightbox}>
                    <img src={selectedImage.url} alt={selectedImage.alt || 'Selected Gallery Image'} />
                    <p>{selectedImage.description}</p>
                </div>
            )}

            <div className="image-upload">
                {/* Placeholder for image upload functionality */}
                <span>Upload</span>
            </div>
        </div>
    );
}

export default Gallery;
