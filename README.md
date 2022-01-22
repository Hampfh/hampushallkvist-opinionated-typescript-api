# opinionated typescript rest api template
This repository is an opionated take on how an express backend should be structured. The backend includes techonologies such as:
+ Typescript
+ expressJS
+ MongoDB
+ eslint
+ Prettier 
 
The repository also has a well defined structure built to allow for easy maintainability. The thought process here is that the repo should easily be able to be integrated as a foundation for a project without the initial configuration and all the setup. Included in the repo there are also vscode extension recommendations and settings, all set to help productivity and enforce code style to get a consitent and well written project.

## Setup

1. Clone the repository
2. Run `yarn` to install all dependencies
3. Copy over the `.env.example` to `.env`
4. Build the backend by running
```
yarn build
```
or if you want it in watch mode
```
yarn watch
```
5. Finally the application is ready to start
```
yarn start
```

Also make sure to install all the recommended extensions included as "suggested extensions" in visual code.

## Configuration
Of course your project will not be named the same as this and databases, tables etc will therefore have to be changed to match your requirement. Here are a few steps to change the repository from a template to your own:
1. Change all database names form "template" to your wanted name, search for "template" in the `.sql` files.
