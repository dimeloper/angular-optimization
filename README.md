![angular-performance.png](https://github.com/dimeloper/angular-optimization/blob/main/docs/angular-performance.png)

# Angular Optimization with Pokemon

## Table of Contents

1. [Introduction](#angular-optimization-with-pokemon)
2. [Update to Version 19](#update-to-version-19)
3. [Performance Measurements](#performance-measurements)
4. [Optimization Techniques Summary](#optimization-techniques-summary)
5. [Development Documentation](#development-documentation)
6. [CI/CD Setup](#cicd-setup)
7. [Recommended Web Vitals Blog Post](#recommended-web-vitals-blog-post)
8. [Stay in Touch](#stay-in-touch)

## Optimization Techniques Summary

This project demonstrates several optimization techniques to improve Angular app performance:

- **Lazy Loading**: Modules and components are loaded only when needed, reducing initial load time.
- **OnPush Change Detection**: Optimizes component rendering by checking only specific inputs for changes.
- **Server-Side Rendering (SSR)**: Improves performance and SEO by pre-rendering pages on the server.
- **Image Optimization**: Uses modern formats like WebP and responsive images for faster loading.
- **Code Splitting**: Breaks the application into smaller bundles to load only the necessary code.
- **Preloading Strategies**: Preloads critical resources to improve navigation speed.
- **Efficient State Management**: Minimizes unnecessary state updates and improves data flow.

For more details, refer to the related article: [Supercharging Angular apps for better performance](https://medium.com/zeal-tech-blog/supercharging-angular-apps-for-better-performance-6814e46bb3c0).

## Update to version 19

The project utilises Angular version 19 and most of its latest features. If you want to review the changes so as to utilise the latest features in your project too, here is the related PR: [Update project to Angular v19](https://github.com/dimeloper/angular-optimization/pull/9).

## Performance measurements

The idea is the following, we start with a couple of pages that are far from optimized, and we take some initial measurements using [unlighthouse](https://unlighthouse.dev/)\* for faster feedback loops.
Then we are going to optimize our pages, while we are aiming for a better Core Web Vitals performance and better lighthouse scores overall.

Before optimization - Overview:
![overview-bad.png](./docs/overview-bad.png)

Before optimization - Main page Web Vitals scores:
![pokedex-main-bad.png](./docs/pokedex-main-bad.png)

After optimization - Overview:
![overview-optimized.png](./docs/overview-optimized.png)

After optimization - Main page Web Vitals scores:
![pokedex-main-optimized.png](./docs/pokedex-main-optimized.png)

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

\*Unlighthouse is a tool that is able to scan our entire site with Google Lighthouse in a few minutes. Open source, fully configurable with minimal setup.

## Development documentation

[DEVELOPER.md](DEVELOPER.md)

## CI/CD Setup

The project uses GitHub Actions for continuous integration. The workflow runs on every pull request to the main branch and performs the following checks:

- Linting: Runs ESLint to check code quality
- Tests: Runs unit tests in a headless Chrome environment

The workflow configuration can be found in `.github/workflows/pr-checks.yml`.

## Recommended Web Vitals blog post

[Navigating the Waters of Core Web Vitals in 2024](https://medium.com/@dimeloper/navigating-the-waters-of-core-web-vitals-in-2024-3cd6a08666d9)

## Stay in touch

- LinkedIn: [Dimitris Kiriakakis](https://linkedin.com/in/kiriakakis)
- Instagram: [@dimeloper\_](https://instagram.com/dimeloper_)
- Twitter: [@dimeloper](https://twitter.com/dimeloper)
