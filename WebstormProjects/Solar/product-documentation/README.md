# Product documentation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Docker image build

Run `docker build -t pd .` to build the project image.

## Docker container

Run `docker run -p 8080:8080 -d --rm --name pd pd` to create docker container. Navigate to `http://localhost:8080/documentation`. The application will not automatically reload if you change any of the source files. You should rebuild Docker Image and rerun Docker container.

## Description

For correct working you should contain `content` directory with `documentation` directory.

Each directory should contain a `metadata.md` file or contain a file with the same name or at the same nesting level as the directory.

Each file must contain a `title` with the same name as the file name, and a "displayName" so that the name is displayed correctly in the navigation menu.
