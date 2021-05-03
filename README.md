# Single Page Apps for GitHub Pages

[Demo app][demoapp]

This is a lightweight solution for deploying single page apps with [GitHub Pages][ghpagesoverview]. You can easily deploy a [React][react] single page app with [React Router][reactrouter] `<BrowserRouter />`, like the one in the [demo app][demoapp], or a single page app built with any frontend library or framework.

#### Why it's necessary

GitHub Pages doesn't natively support single page apps. When there is a fresh page load for a url like `example.tld/foo`, where `/foo` is a frontend route, the GitHub Pages server returns 404 because it knows nothing of `/foo`.

#### How it works

When the GitHub Pages server gets a request for a path defined with frontend routes, e.g. `example.tld/foo`, it returns a custom `404.html` page. The [custom `404.html` page contains a script][404html] that takes the current url and converts the path and query string into just a query string, and then redirects the browser to the new url with only a query string and hash fragment. For example, `example.tld/one/two?a=b&c=d#qwe`, becomes `example.tld/?/one/two&a=b~and~c=d#qwe`.

The GitHub Pages server receives the new request, e.g. `example.tld/?/...`, ignores the query string and returns the `index.html` file, which has a [script that checks for a redirect in the query string][indexhtmlscript] before the single page app is loaded. If a redirect is present it is converted back into the correct url and added to the browser's history with `window.history.replaceState(...)`, but the browser won't attempt to load the new url. When the [single page app is loaded][indexhtmlspa] further down in the `index.html` file, the correct url will be waiting in the browser's history for the single page app to route accordingly. (Note that these redirects are only needed with fresh page loads, and not when navigating within the single page app once it's loaded).

## Usage instructions

_For general information on using GitHub Pages please see [Getting Started with GitHub Pages][ghpagesbasics], note that pages can be [User, Organization or Project Pages][ghpagestypes]_  
&nbsp;

**Basic instructions** - there are two things you need from this repo for your single page app to run on GitHub Pages.

1. Copy over the [`404.html`][404html] file to your repo as is
   - Note that if you are setting up a Project Pages site and not using a [custom domain][customdomain] (i.e. your site's address is `username.github.io/repo-name`), then you need to set [`pathSegmentsToKeep` to `1` in the `404.html` file][pathsegmentstokeep] in order to keep `/repo-name` in the path after the redirect. If you are using React Router you'll need to tell it to use the `repo-name` as the `basename`, for example `<BrowserRouter basename="/repo-name" />`.
2. Copy the [redirect script][indexhtmlscript] in the `index.html` file and add it to your `index.html` file - Note that the redirect script must be placed _before_ your single page app script in your `index.html` file.
   &nbsp;

**Detailed instructions** - using this repo as a boilerplate for a React single page app hosted with GitHub Pages. Note that this boilerplate is written in TypeScript but is setup to accept JavaScript files as well. It was previously written in JS and if you prefer a JS only boilerplate you can use [version 6][spa-github-pages-v6].

1. Clone this repo (`$ git clone https://github.com/rafgraph/spa-github-pages.git`)
2. Delete the `.git` directory (`cd` into the `spa-github-pages` directory and run `$ rm -rf .git`)
3. Instantiate the repository
   - If you're using this boilerplate as a new repository
     - `$ git init` in the `spa-github-pages` directory, and then `$ git add .` and `$ git commit -m "Add SPA for GitHub Pages boilerplate"` to initialize a fresh repository
     - If this will be a Project Pages site, then change the branch name from `main` to `gh-pages` (`$ git branch -m gh-pages`), if this will be a User or Organization Pages site, then leave the branch name as `main`
     - Create an empty repo on GitHub.com (don't add a readme, gitignore or license), and add it as a remote to the local repo (`$ git remote add origin <your-new-github-repo-url>`)
     - Feel free to rename the local `spa-github-pages` directory to anything you want (e.g. `your-project-name`)
   - If you're adding this boilerplate as the `gh-pages` branch of an existing repository
     - Create and checkout a new orphaned branch named `gh-pages` for your existing repo (`$ git checkout --orphan gh-pages`), note that the `gh-pages` branch won't appear in the list of branches until you make your first commit
     - Delete all of the files and directories (except the `.git` directory) from the directory of your existing repo (`$ git rm -rf .`)
     - Copy all of the files and directories (including hidden dot files) from the cloned `spa-github-pages` directory into your project's now empty directory (`$ mv path/to/spa-github-pages/{.[!.],}* path/to/your-projects-directory`)
     - `$ git add .` and `$ git commit -m "Add SPA for GitHub Pages boilerplate"` to instantiate the `gh-pages` branch
4. Set up a custom domain (optional) - see GitHub Pages instructions for [setting up a custom domain][customdomain]
   - Update the [`CNAME` file][cnamefile] with your custom domain, don't include `https://`, but do include a subdomain if desired, e.g. `www` or `your-subdomain`
   - Update your `CNAME` and/or `A` record with your DNS provider
   - Run `$ dig your-subdomain.your-domain.tld` to make sure it's set up properly with your DNS (don't include `https://`)
5. Set up without using a custom domain (optional)
   - Delete the [`CNAME` file][cnamefile]
   - If you are creating a User or Organization Pages site, then that's all you need to do
   - If you are creating a Project Pages site, (i.e. your site's address is `username.github.io/repo-name`):
     - Set [`pathSegmentsToKeep` to `1` in the `404.html` file][pathsegmentstokeep] in order to keep `/repo-name` in the path after the redirect
     - Add your `repo-name` to the absolute path of assets in `index.html`, change the [bundle.js src][indexhtmlspa] to `"/repo-name/build/bundle.js"`
     - In React Router set the `basename` to `/repo-name` [here][browserrouter] like `<BrowserRouter basename="/repo-name" />`
     - In the [start script][startscript] in `package.json` replace `--open` with `--open-page repo-name`
     - In `webpack.config.js`:
       - Add `repo-name` to the [`publicPath`][webpackpublicpath] like `publicPath: '/repo-name/build/'`
       - Change the [`historyApiFallback rewrites`][webpackdevrewrites] to `rewrites: [{ from: /\/repo-name\/[^?]/, to: '/404.html' }]`
6. Run `$ npm install` to install React and other dependencies, and then run `$ npm run build` to update the build
7. `$ git add .` and `$ git commit -m "Update boilerplate for use with my domain"` and then push to GitHub (`$ git push origin gh-pages` for Project Pages or `$ git push origin main` for User or Organization Pages) - the example site should now be live on your domain
8. Create your own site
   - Write your own React components, create your own routes, and add your own style
     - Note that the example site is styled with [Stitches][stitches] and uses [React Interactive][reactinteractive] for the links and other interactive components.
   - Change the [title in `index.html`][indexhtmltitle] and the [title in `404.html`][404htmltitle] to your site's title
   - Remove the [favicon links][favicon] from the header of `index.html` and the [`favicon` directory][favicondir].
   - Update or delete [`robots.txt`][robots] and [`sitemap.txt`][sitemap] as you see fit (see SEO section below for more info)
   - Change the readme, license and package.json as you see fit
   - For testing changes locally see development environment info below
   - To publish your changes to GitHub Pages run `$ npm run build` (this runs `webpack -p` for [production][webpackproduction]) to update the build, then `$ git commit` and `$ git push` to make your changes live

**Serving from the `/docs` folder on the `main` branch** - alternatively you can serve your site from the `/docs` folder instead of the root folder while your source code remains in the root folder.

1. After following the previous set of instructions for using this repo as a boilerplate, create a `/docs` folder in the root and move `index.html`, `404.html` and the `/build` folder into `/docs`
2. Add `--content-base docs/` to the [start script][startscript] in `package.json`
3. In `webpack.config.js` change the [output path][webpackoutputpath] to `` path: `${__dirname}/docs/build`, ``
4. On GitHub in your repo settings select the `/docs` folder as the source for GitHub Pages

#### Development environment

I have included `webpack-dev-server` for testing changes locally. It can be accessed by running `$ npm start` (details below). Note that `webpack-dev-server` automatically creates a new bundle whenever the source files change and serves the bundle from memory, so you'll never see the bundle as a file saved to disk.

- `$ npm start` runs the [start script][startscript] in `package.json`, which runs the command `$ webpack-dev-server --host 0.0.0.0 --disable-host-check --open`
  - `--host 0.0.0.0 --disable-host-check` is so you can access the site on your local network from other devices at `http://[YOUR COMPUTER'S IP ADDRESS]:8080`
  - `--open` will open automatically open the site in your browser
- `webpack-dev-server` will serve `index.html` at `http://localhost:8080` (port `8080` is the default). Note that you must load the `index.html` from the server and not just open it directly in the browser or the scripts won't load.

#### SEO

When I first created this solution in 2016 Google treated the redirect in `404.html` the same as a 301 redirect and indexed pages without issue. Around 2019 Google changed their algorithm and no longer follows redirects in `404.html`. In order to have all the pages on your site indexed by Google you need to create a `robots.txt` and `sitemap.txt` file to let Google know what pages exist. The [`robots.txt`][robots] file needs to contain the location of the sitemap, and the [`sitemap.txt`][sitemap] file needs to contain the redirect links for each page of your site so the crawler doesn't get a 404 response when it requests the page. To make this easier I created a [sitemap link generator][sitemaplinkgenerator] that transforms normal links into redirect links to use in the sitemap. I have done this for the demo site (this repo) and you can see the [pages indexed here][googlesitesearch]. Note that since Google is no longer associating the redirect links with the real paths, incoming links from other sites won't help your site's page rank. If you are creating a site where page rank on generic search terms is important, then I'd suggest looking for another solution. Some options are using GitHub Pages with a static site generator like [Gatsby][gatsby] which generates an `html` file for each page as part of its build process, or hosting your single page app on a service that has native support for spas, like [Netlify][netlify].

#### Miscellaneous

- The `.nojekyll` file in this repo turns off Jekyll for GitHub Pages
- One of the great things about the GitHub Pages CDN is that all files are automatically compressed with gzip, so no need to worry about compressing your JavaScript, HTML or CSS files for production

<!-- links to within repo -->

[indexhtmltitle]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/index.html#L6
[favicon]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/index.html#L13
[indexhtmlscript]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/index.html#L21-L42
[indexhtmlspa]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/index.html#L49
[404html]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html
[404htmltitle]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html#L5
[pathsegmentstokeep]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html#L25
[browserrouter]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/src/index.tsx#L8
[webpackoutputpath]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/webpack.config.js#L6
[webpackpublicpath]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/webpack.config.js#L7
[webpackdevrewrites]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/webpack.config.js#L48
[startscript]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/package.json#L7
[cnamefile]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/CNAME
[favicondir]: https://github.com/rafgraph/spa-github-pages/tree/gh-pages/favicon
[robots]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/robots.txt
[sitemap]: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/sitemap.txt
[spa-github-pages-v6]: https://github.com/rafgraph/spa-github-pages/tree/v6.0.0

<!-- links to github docs -->

[ghpagesoverview]: https://pages.github.com/
[ghpagesbasics]: https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/getting-started-with-github-pages
[ghpagestypes]: https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/about-github-pages#types-of-github-pages-sites
[customdomain]: https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site

<!-- other links -->

[demoapp]: https://spa-github-pages.rafgraph.dev
[sitemaplinkgenerator]: https://spa-github-pages.rafgraph.dev/sitemap-link-generator
[react]: https://github.com/facebook/react
[reactrouter]: https://github.com/ReactTraining/react-router
[webpackproduction]: https://webpack.js.org/guides/production-build/#the-automatic-way
[stitches]: https://stitches.dev/
[reactinteractive]: https://github.com/rafgraph/react-interactive
[googlesitesearch]: https://www.google.com/search?q=site%3Aspa-github-pages.rafgraph.dev
[gatsby]: https://github.com/gatsbyjs/gatsby
[netlify]: https://www.netlify.com/blog/2020/04/07/creating-better-more-predictable-redirect-rules-for-spas
