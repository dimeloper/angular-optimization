![angular-performance.png](docs%2Fangular-performance.png)

# Angular Optimization with Pokemon

This is a basic Angular app, featuring a pokedex to showcase some performance optimisation techniques within Angular SPAs.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Performance measurements

The idea is the following, we start with a couple of pages that are way from optimized, and we take some initial measurements using [unlighthouse](https://unlighthouse.dev/)*.
Then we are going to optimize them, while we are aiming for a better measurement in our result pages.

Starting point:
![overview-bad.png](docs%2Foverview-bad.png)

Result:
![overview-optimized.png](docs%2Foverview-optimized.png)

If you want to run your checks yourself you can either go to https://ng-pokedex-optimization.netlify.app/ and use your Chrome's lighthouse (make sure to use an incognito window), 
or you can download unlighthouse and run the full audit while using the app's sitemaps as parameters.

Install unlighthouse:
```
npm install -g unlighthouse
```

Audit the bad performing pages (before optimization).
```
unlighthouse --site https://ng-pokedex-optimization.netlify.app/ --sitemaps https://ng-pokedex-optimization.netlify.app/sitemap-bad.xml
```

Audit the optimized pages (after optimization).
```
unlighthouse --site https://ng-pokedex-optimization.netlify.app/ --sitemaps https://ng-pokedex-optimization.netlify.app/sitemap-optimized.xml
```

*Unlighthouse is a tool that is able to scan our entire site with Google Lighthouse in a few minutes. Open source, fully configurable with minimal setup.


## Development Documentation

### Development server

Run `pnpm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
