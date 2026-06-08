import { API_BASE_URL } from '../config/apiConfig';

const CLOUD_NAME = 'deq0hxr3t';

/**
 * Upload a single image to Cloudinary via the backend route.
 * Stores at quality:100 (lossless). Returns the secure_url and public_id.
 * @param {File} file
 * @param {string} folder - Cloudinary folder ('loupe-jewels/products' by default)
 * @returns {Promise<{secure_url, optimized_url, public_id}>}
 */
export const uploadImageViaBackend = async (file, folder = 'loupe-jewels/products') => {
    const jwt = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Image upload failed');
    }

    return res.json(); // { secure_url, optimized_url, public_id, width, height, bytes }
};

/**
 * Upload multiple images (up to 4) via backend route.
 * @param {File[]} files
 * @param {string} folder
 * @returns {Promise<Array<{secure_url, optimized_url, public_id}>>}
 */
export const uploadMultipleImagesViaBackend = async (files, folder = 'loupe-jewels/products') => {
    const jwt = localStorage.getItem('jwt');
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('folder', folder);

    const res = await fetch(`${API_BASE_URL}/api/upload/images`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Multiple image upload failed');
    }

    const data = await res.json(); // { success, count, results: [...] }
    return data.results;
};

/**
 * Upload a video to Cloudinary via the backend route.
 * Stored with q_auto:best,vc_auto for best quality streaming.
 * @param {File} file
 * @param {string} folder
 * @param {function} onProgress - optional callback(percent) (not available with fetch, use XMLHttpRequest)
 * @returns {Promise<{secure_url, optimized_url, public_id, duration}>}
 */
export const uploadVideoViaBackend = async (file, folder = 'loupe-jewels/videos', onProgress = null) => {
    const jwt = localStorage.getItem('jwt');

    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const xhr = new XMLHttpRequest();

        if (onProgress) {
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    onProgress(Math.round((e.loaded / e.total) * 100));
                }
            });
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                try {
                    const err = JSON.parse(xhr.responseText);
                    reject(new Error(err.error || 'Video upload failed'));
                } catch {
                    reject(new Error('Video upload failed'));
                }
            }
        };

        xhr.onerror = () => reject(new Error('Network error during video upload'));

        xhr.open('POST', `${API_BASE_URL}/api/upload/video`);
        xhr.setRequestHeader('Authorization', `Bearer ${jwt}`);
        xhr.send(formData);
    });
};

/**
 * Delete an asset from Cloudinary via the backend route.
 * @param {string} publicId  - Cloudinary public_id
 * @param {string} type      - 'image' or 'video'
 */
export const deleteAssetViaBackend = async (publicId, type = 'image') => {
    const jwt = localStorage.getItem('jwt');
    const encodedId = encodeURIComponent(publicId);

    const res = await fetch(`${API_BASE_URL}/api/upload/${encodedId}?type=${type}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete asset');
    }

    return res.json();
};

/**
 * Transform any Cloudinary URL to add q_auto:best,f_auto for optimal delivery.
 * Images: q_auto:best,f_auto (smart quality + best format for browser)
 * Videos: q_auto:best,vc_auto (smart quality + best codec)
 * @param {string} url
 * @param {string} type - 'image' | 'video'
 * @returns {string}
 */
export const getOptimizedCloudinaryUrl = (url, type = 'image') => {
    if (!url || !url.includes('cloudinary.com')) return url;
    const params = type === 'image' ? 'q_auto:best,f_auto' : 'q_auto:best,vc_auto';
    return url.replace('/upload/', `/upload/${params}/`);
};

/**
 * Check if a URL is a Cloudinary URL
 */
export const isCloudinaryUrl = (url) => {
    return url && url.includes(`res.cloudinary.com/${CLOUD_NAME}`);
};
