import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadFile } from '../services/api';

const FileUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // 選択されたファイルを監視
  const selectedFile = watch('file');

  const onSubmit = async (data) => {
    const file = data.file[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      await uploadFile(file, (percent) => {
        setProgress(percent);
      });

      // アップロード成功後の処理
      onUploadSuccess();
      reset(); // フォームをリセット
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">UPLOAD YOUR FILES</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="file"
            {...register('file', {
              required: 'Please select a file to upload',
            })}
            disabled={uploading}
            placeholder="Select a file to upload"
            aria-label="File upload input"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
          />
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 
              cursor-pointer 
              active:scale-95 
              transform 
              transition-transform 
              duration-100 
              ease-in-out 
              hover:bg-blue-600
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-400"
          >
            {uploading ? 'Uploading now...' : 'UPLOAD'}
          </button>
        </div>

        {errors.file && (
          <p className="text-red-500 mb-4">{errors.file.message}</p>
        )}

        {uploading && (
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-sm mt-1">{progress}%</div>
          </div>
        )}

        {selectedFile && selectedFile.length > 0 && (
          <div className="p-3 bg-blue-50 rounded-md">
            <p>Selected file: {selectedFile[0].name}</p>
            <p>Size: {(selectedFile[0].size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default FileUpload;
