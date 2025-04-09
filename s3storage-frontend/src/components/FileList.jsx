import FileItem from './FileItem';

const FileList = ({ files, onDeleteSuccess, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">There is no uploaded file</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Uploaded files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file, index) => (
          <FileItem
            key={file.url || index}
            file={file}
            onDeleteSuccess={onDeleteSuccess}
          />
        ))}
      </div>
    </div>
  );
};

export default FileList;
