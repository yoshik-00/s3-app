import { useState } from 'react';
import { deleteFile } from '../services/api';

const FileItem = ({ file, onDeleteSuccess }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const isImage = file.url?.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  const isVideo = file.url?.match(/\.(mp4|webm|ogg|mov)$/i);

  const fileName =
    file.name || file.url?.substring(file.url.lastIndexOf('/') + 1);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteFile(file.url);
      onDeleteSuccess();
    } catch (err) {
      console.error('Error deleting file:', err);
      setError('File upload failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {isImage ? (
          <img
            src={file.url}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        ) : isVideo ? (
          <video
            src={file.url}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-4xl">📄</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium truncate" title={fileName}>
          {fileName}
        </h3>

        <div className="mt-4 flex gap-2">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-1 bg-gray-100 text-gray-700 rounded text-center text-sm 
              cursor-pointer 
              active:scale-95 
              transform 
              transition-transform 
              duration-100 
              ease-in-out 
              hover:bg-gray-200
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-100"
          >
            View
          </a>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm disabled:bg-red-300 
              cursor-pointer 
              active:scale-95 
              transform 
              transition-transform 
              duration-100 
              ease-in-out 
              hover:bg-red-600
              focus:outline-none 
              focus:ring-2 
              focus:ring-red-500"
          >
            {deleting ? 'Deleteing now...' : 'Delete'}
          </button>
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FileItem;
