import express from 'express';
import cors from 'cors';
import { getContentEndpoint } from "./endpoints/get/content/get-content.endpoint";
import { deleteStopServerEndpoint } from "./endpoints/delete/delete-stop-server.endpoint";
import { getMenuEndpoint } from "./endpoints/get/menu/get-menu.endpoint";
import { getDirectoryEndpoint } from './endpoints/get/directory/get-directory.endpoint';
import { getBreadcrumbsEndpoint } from './endpoints/get/breadcrumbs/get-breadcrumbs.endpoint';

export function app(): express.Express {
  const server = express();

  server.use(cors());

  server.get('/api/breadcrumbs/*', getBreadcrumbsEndpoint);

  server.get('/api/menu/*', getMenuEndpoint);

  server.get('/api/directory/*', getDirectoryEndpoint);

  server.get('/api/content/*', getContentEndpoint);

  server.delete('/api/stop-server', deleteStopServerEndpoint);

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Dev content server listening on http://localhost:${port}`);
  });
}

run();
