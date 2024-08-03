## The Awesome QA Tool

[![Next.JS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Husky](https://img.shields.io/static/v1?label=husky&message=%F0%9F%90%B6&style=for-the-badge&color=161E54&labelColor=161E54)](https://typicode.github.io/husky/#/)
[![Commitizen](https://img.shields.io/static/v1?label=Commitizen&message=%E2%9C%94&style=for-the-badge&color=gray)](https://commitizen.github.io/cz-cli/)
[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://docs.amplify.aws/nextjs/)

## Getting started 🚀

> [!IMPORTANT]  
> Node.js version >= v18.17.0 is required. You can use [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#intro) to install correct node version.

```bash
## install the dependencies
npm install

## start development server
npm run dev

## detect all linting issues
npm run lint

## fix all linting issues
npm run lint:fix
```

You can view the app in your browser at [http://localhost:3000](http://localhost:3000).

## Contributing 👨‍💻

> [!NOTE]  
> This app uses [Commitizen](https://commitizen.github.io/cz-cli/) cli to enforce [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
> We have used [Husky](https://typicode.github.io/husky/get-started.html) to override the `prepare-commit-msg` hook and trigger the Commitizen cli.

```bash
## go to main/stage/dev branch
git checkout main

## create your feature branch
git checkout -b feat/my-branch

## make necessary changes and stage them
git add .

## commit your changes
git commit # it will trigger Commitizen cli for generating commit message
```

## Folder Structure 🗂️

> [!NOTE]  
> This app uses the new Next.js [App Router](https://nextjs.org/docs/app).

```
awesome-qa-tool
|-- layouts         ← page or root layouts
|-- public          ← contains assets like img, fonts, etc
|-- components      ← reusable atoms
|-- app             ← routes and pages
|-- seo             ← app meta data
|-- config          ← app config / env variables
|-- theme           ← app theme or global styles
|-- helpers         ← helper functions
|-- store           ← redux store
|   |-- reducers    ← reducers/slices/features
|-- types           ← types & interfaces
```

## Branch ↔ Environments

- `stage` → [stage](https://stage-awesome-qa-tool.sohammondal.com)
- `main` → [production](https://awesome-qa-tool.sohammondal.com)

## Hosting & Deployment ☁️

The app is hosted on AWS and deployed using [AWS Amplify](https://docs.amplify.aws/nextjs/)

## Learn More 📚

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
