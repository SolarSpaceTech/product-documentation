const port = process.env['PORT'] || 4000;

fetch('http://localhost:4000/api/stop-server', {
  method: 'DELETE',
}).catch(() => {
  console.log('Server is stopped.');
})

