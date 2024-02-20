![angular-performance.png](docs%2Fangular-performance.png)

# Angular Optimization with Pokemon

This is a basic Angular app, featuring a pokedex to showcase some performance optimisation techniques within Angular SPAs.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Performance measurements

The idea is the following, we start with a couple of pages that are way from optimized, and we take some initial measurements using [unlighthouse](https://unlighthouse.dev/)*.
Then we are going to optimize them, while we are aiming for a better measurement in our result pages.

Before optimization - Overview:
![overview-bad.png](docs%2Foverview-bad.png)

Before optimization - Main page Web Vitals scores:
![pokedex-main-bad.png](docs%2Fpokedex-main-bad.png)

After optimization - Overview:
![overview-optimized.png](docs%2Foverview-optimized.png)

After optimization - Main page Web Vitals scores:
![pokedex-main-optimized.png](docs%2Fpokedex-main-optimized.png)

If you want to run your checks yourself you can either go to https://ng-pokedex-optimization.netlify.app/ and use your Chrome's lighthouse (make sure to use an incognito window),
or you can download unlighthouse and run the full audit while using the related scripts.

Install unlighthouse:

```
npm install -g unlighthouse
```

Audit the bad performing pages (before optimization).

```
pnpm audit:bad-pages
```

Audit the optimized pages (after optimization).

```
pnpm audit:optimized-pages
```

*Unlighthouse is a tool that is able to scan our entire site with Google Lighthouse in a few minutes. Open source, fully configurable with minimal setup.

## Development documentation

[DEVELOPER.md](DEVELOPER.md)

## Recommended Web Vitals blog post

[Navigating the Waters of Core Web Vitals in 2024](https://medium.com/@dimeloper/navigating-the-waters-of-core-web-vitals-in-2024-3cd6a08666d9)

## Stay in touch

- Instagram: [@dimeloper_](https://instagram.com/dimeloper_)
- Twitter: [@dimeloper](https://twitter.com/dimeloper)
