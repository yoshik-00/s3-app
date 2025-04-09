import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import { getAllMedia } from './services/api';

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await getAllMedia();
      setFiles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchFiles();
  // }, []);

  useEffect(() => {
    const initApp = async () => {
      // 開発環境でのみ遅延を追加
      if (import.meta.env.DEV) {
        // MSWの初期化を待つための0.5秒の遅延
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // データ取得を実行
      fetchFiles();
    };

    initApp();
  }, []);

  return (
    <Router>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 pb-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800">REPOSITORY</h1>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FileUpload onUploadSuccess={fetchFiles} />
                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                      <p>{error}</p>
                      <button
                        onClick={fetchFiles}
                        className="mt-2 px-3 py-1 bg-red-400 text-white rounded-md text-sm cursor-pointer active:scale-95 transform transition-transform duration-100 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        RETRY
                      </button>
                    </div>
                  )}
                  <FileList
                    files={files}
                    onDeleteSuccess={fetchFiles}
                    loading={loading}
                  />
                </>
              }
            />
          </Routes>
        </main>

        <footer className="mt-12 pt-6 border-t text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} naoto yoshikawa. All Rights
            Reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
