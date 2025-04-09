import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock GET /files
  http.get('http://localhost:8080/files', () => {
    return HttpResponse.json([
      {
        id: 'file-1',
        name: 'mock-file-1.txt',
        url: 'http://localhost:8080/files/mock-file-1.txt',
      },
      {
        id: 'file-2',
        name: 'mock-file-2.txt',
        url: 'http://localhost:8080/files/mock-file-2.txt',
      },
    ]);
  }),

  // Mock POST /upload
  http.post('http://localhost:8080/upload', async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    console.log('[MSW] Uploaded mock file:', file.name);

    return HttpResponse.json({
      message: 'Mock upload successful',
      fileUrl: `http://localhost:8080/files/${file.name}`,
    });
  }),

  // Mock DELETE /delete
  http.delete('http://localhost:8080/delete', ({ request }) => {
    const url = new URL(request.url);
    const fileUrl = url.searchParams.get('fileUrl');

    console.log('[MSW] Mock delete for fileUrl:', fileUrl);

    return HttpResponse.json({
      message: 'Mock delete successful',
      deletedFileUrl: fileUrl,
    });
  }),
];
