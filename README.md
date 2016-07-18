# Single Page Apps for GitHub Pages

> Version 2.0 has an improved redirect query for better SEO performance. The redirect query is what search engines index as the url, which has no negative side effects other than that it is what the user sees as the url on the search results page. The updated query is much more readable by humans so the user has a better semantic understanding of where the search result links to.

[Live example][liveExample]  

This is a lightweight solution for deploying single page apps with [GitHub Pages][ghPagesOverview]. You can easily deploy a [React][react] single page app with [React Router][reactRouter] `browserHistory`, like the one in the [live example][liveExample], or a single page app built with any frontend library or framework.

#### Why it's necessary
GitHub Pages doesn't natively support single page apps. When there is a fresh page load for a url like `example.tld/foo`, where `/foo` is a frontend route, the GitHub Pages server returns 404 because it knows nothing of `/foo`.

#### How it works
When the GitHub Pages server gets a request for a path defined with frontend routes, e.g. `example.tld/foo`, it returns a custom `404.html` page. The [custom `404.html` page contains a script][404html] that takes the current url and converts the path and query string into just a query string, and then redirects the browser to the new url with only a query string and hash fragment. For example, `example.tld/one/two?a=b&c=d#qwe`, becomes `example.tld/?p=/one/two&q=a=b~and~c=d#qwe`.

The GitHub Pages server receives the new request, e.g. `example.tld?p=/...`, ignores the query string and hash fragment and returns the `index.html` file, which has a [script that checks for a redirect in the query string][indexHtmlScript] before the single page app is loaded. If a redirect is present it is converted back into the correct url and added to the browser's history with `window.history.replaceState(...)`, but the browser won't attempt to load the new url. When the [single page app is loaded][indexHtmlSPA] further down in the `index.html` file, the correct url will be waiting in the browser's history for the single page app to route accordingly. (Note that these redirects are only needed with fresh page loads, and not when navigating within the single page app once it's loaded).

A quick SEO note - while it's never good to have a 404 response, it appears based on [Search Engine Land's testing][seoLand] that Google's crawler will treat the JavaScript `window.location` redirect in the `404.html` file the same as a 301 redirect for its indexing. From my testing I can confirm that Google will index all pages without issue, the only caveat is that the redirect query is what Google indexes as the url. For example, the url `example.tld/about` will get indexed as `example.tld/?p=/about`. When the user clicks on the search result, the url will change back to `example.tld/about` once the site loads.


## Usage instructions
*For general information on using GitHub Pages please see [GitHub Pages Basics][ghPagesBasics], note that pages can be [User, Organization or Project Pages][ghPagesTypes]*  
&nbsp;

**Basic instructions** - there are two things you need from this repo for your single page app to run on GitHub Pages
  1. Copy over the [`404.html`][404html] file to your repo as is
    - Note that you must use a [custom domain][customDomain] if you are setting up a Project Pages site in order for GitHub Pages to serve the custom 404 page (if you are creating a User or Organization Pages site, then using a custom domain is optional)
  2. Copy the [redirect script][indexHtmlScript] in the `index.html` file and add it to your `index.html` file
    - Note that the redirect script must be placed *before* your single page app script in your `index.html` file
&nbsp;

**Detailed instructions** - using this repo as a boilerplate for a React single page app hosted with GitHub Pages  
  1. Clone this repo (`$ git clone https://github.com/rafrex/spa-github-pages.git`)
  2. Delete the `.git` directory (`cd` into the `spa-github-pages` directory and run `$ rm -rf .git`)
  3. Instantiate the repository
    - If you're using this boilerplate as a new repository
      - `$ git init` in the `spa-github-pages` directory, and then `$ git add .` and `$ git commit -m "Add SPA for GitHub Pages boilerplate"` to initialize a fresh repository
      - If this will be a Project Pages site, then change the branch name from `master` to `gh-pages` (`$ git branch -m gh-pages`), if this will be a User or Organization Pages site, then leave the branch name as `master`
      - Create an empty repo on GitHub.com (don't add a readme, gitignore or license), and add it as a remote to the local repo (`$ git remote add origin <your-new-github-repo-url>`)
      - Feel free to rename the local `spa-github-pages` directory to anything you want (e.g. `your-project-name`)
    - If you're adding this boilerplate as the `gh-pages` branch of an existing repository
      - Create and checkout a new orphaned branch named `gh-pages` for your existing repo (`$ git checkout --orphan gh-pages`), note that the `gh-pages` branch won't appear in the list of branches until you make your first commit
      - Delete all of the files and directories (except the `.git` directory) from the directory of your existing repo (`$ git rm -rf .`)
      - Copy all of the files and directories (including hidden dot files) from the cloned `spa-github-pages` directory into your project's now empty directory (`$ mv path/to/spa-github-pages/{.[!.],}* path/to/your-projects-directory`)
      - `$ git add .` and `$ git commit -m "Add SPA for GitHub Pages boilerplate"` to instantiate the `gh-pages` branch
  4. Set up your custom domain - see GitHub Pages instructions for [setting up a custom domain][customDomain]
    - *Note that you must use a custom domain if you are setting up a Project Pages site in order for GitHub Pages to serve the custom 404 page, however, if you are creating a User or Organization Pages site, then using a custom domain is optional (if you don't use a custom domain delete the `CNAME` file)*
    - Update the [`CNAME` file][cnameFile] with your custom domain, don't include `http://`, but do include a subdomain if desired, e.g. `www` or `your-subdomain`
    - Update your `CNAME` and/or `A` record with your DNS provider
    - Run `$ dig your-subdomain.your-domain.tld` to make sure it's set up properly with your DNS (don't include `http://`)
  5. Run `$ npm install` to install React and other dependencies, and then run `$ webpack` to update the build
  6. `$ git add .` and `$ git commit -m "Update boilerplate for use with my domain"` and then push to GitHub (`$ git push origin gh-pages` for Project Pages or `$ git push origin master` for User or Organization Pages) - the example site should now be live on your domain
  7. Creating your own site
    - Write your own React components, create your own routes, and add your own style!
    - Change the [title in `index.html`][indexHtmlTitle] and the [title in `404.html`][404htmlTitle] to your site's title
    - Remove the [favicon links][favicon] from the header of `index.html`
    - Remove the [Google analytics script][googleAnalytics] from the header of `index.html` (the analytics function is wrapped in an `if` statement so that it will only run on the example site's domain (http://spa-github-pages.rafrex.com), but you don't need it, so remove it or replace it with your own analytics)
    - Change the readme, license and package.json as you see fit
    - For testing changes locally see development environment info below
    - To publish your changes to GitHub Pages run `$ webpack -p` for [production][webpackProduction] to update the build, then `$ git commit` and `$ git push` to make your changes live
      - Note that `$ webpack -p` is [overloaded in the webpack config][webpackConfigOverload] to strip out dead code not needed in production (e.g. PropTypes validation, comments, etc)

#### Development environment
I have included my preferred development environment for testing changes locally, which will auto refresh the browser any time changes are made, and can be accessed by running `$ npm start` (details below). Or you can use your own setup by running `$ webpack` and serving the `index.html` file and the `404.html` file for 404s.
- `$ npm start` runs the [start script][startScript] in `package.json`, which runs both of the following commands simultaneously:
    - `$ webpack -d --watch`
      - `-d` is for [development mode with source maps][webpackDevelopment]
      - `--watch` will automatically run `webpack -d` whenever the files change
    - `$ live-server --entry-file=404.html`
      - [`live-server`][liveServer] does live reloading of all assets - `bundle.js`, `app.css`, etc - the `--entry-file=404.html` will serve `404.html` when the requested file can't be found so it mimics how GitHub Pages works (normally I would set `--entry-file=index.html` which is basically how servers that support single page apps work - and what I wish GitHub Pages would do)

#### Miscellaneous
- The `.nojekyll` file in this repo [turns off Jekyll for GitHub Pages][nojekyll]
- Need form submission on your static site? Use [Formspree][formspree]
- One of the awesome things about the GitHub Pages CDN is that all files are automatically compressed with gzip, so no need to worry about compressing your JavaScript, HTML or CSS files for production


Pull requests welcome. Please open [issues][issues] to report bugs.  
Thoughts, questions, suggestions? Contact me via [email][email] or [twitter][twitter].

<!-- links to within repo -->
[404html]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/404.html
[indexHtmlScript]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html#L37
[indexHtmlSPA]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html#L95
[cnameFile]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/CNAME
[indexHtmlTitle]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html#L6
[404htmlTitle]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/404.html#L5
[favicon]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html#L11
[googleAnalytics]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html#L73
[webpackConfigOverload]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/webpack.config.babel.js#L19
[startScript]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/package.json#L5
[liveServer]: https://github.com/tapio/live-server
[issues]: https://github.com/rafrex/spa-github-pages/issues

<!-- links to github docs -->
[ghPagesOverview]: https://pages.github.com/
[ghPagesBasics]: https://help.github.com/categories/github-pages-basics/
[ghPagesTypes]: https://help.github.com/articles/user-organization-and-project-pages/
[customDomain]: https://help.github.com/articles/quick-start-setting-up-a-custom-domain/
[nojekyll]: https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/

<!-- other links -->
[liveExample]: http://spa-github-pages.rafrex.com
[react]: https://github.com/facebook/react
[reactRouter]: https://github.com/reactjs/react-router
[seoLand]: http://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157
[webpackProduction]: https://webpack.github.io/docs/cli.html#production-shortcut-p
[webpackDevelopment]: https://webpack.github.io/docs/cli.html#development-shortcut-d
[formspree]: http://formspree.io/
[email]: mailto:code@rafrex.com
[twitter]: https://twitter.com/rafrrex
