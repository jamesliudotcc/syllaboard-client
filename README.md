# Syllaboard
A dashboard for instructors at GA.
Immersive courses are just that: immersive. When you have multiple things going on, it can be easy to let somethings slip through the cracks: laundry, personal care, and more often than not, the outcomes homework that is also a part of the course. This webapp aims to help both the outcomes instructors and the students to stay organised and on-top of the work.

[Syllaboard Live](http://syllaboard.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This repo only contains the front-end side of the app. In order to use this client go to our [backend repository](https://github.com/jamesliudotcc/syllaboard-backend) and set that up first. 

### Installing

First thing first, fork and clone this repository. Make sure that you have yarn installed as we used that instead of npm.

Install all the dependencies

```
yarn install
```

Then start the system. 

```
yarn start
```

This will point to localhost:3000 for the server. Change the .env.development file if that needs to be different.

### Coding Style

There are prettier and tslint configurations in the root folder. Those should keep all new code consistent.

## Deployment

Deployment is fairly straightforward since this was made with create react app. You can look look at their [documentation](https://facebook.github.io/create-react-app/docs/deployment) for more info.

One thing that needs to be done is to add a .env.production file to set the server url.

## Built With

* [React](https://reactjs.org/)
* [Material-Ui](https://material-ui.com/)
* [Redux](https://redux.js.org/)
* [Typescript](https://www.typescriptlang.org/)

## Authors

See the list of [contributors](https://github.com/parkercouch/syllaboard-client/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Thanks to Marcel Veldhuizen for a helper function to properly type Redux connected react components. [Link to Blog Post](https://thorarin.net/blog/post/2017/05/05/redux-connected-react-components-in-typescript.aspx)