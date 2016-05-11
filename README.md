## React for GitHub Pages
[Live example](http://react-github-pages.rafrex.com)  

React for GitHub Pages is a lightweight solution for deploying [React][react] single page apps with [React Router][reactRouter] `browserHistory` using [GitHub Pages][ghPagesOverview].

I love React with React Router. Need complex views with lifecycle methods and dynamic routing? Done. Need a simple site with a few fixed routes? Use functional stateless components and JSX. Done. And I love GitHub Pages. `git push` on a `gh-pages` branch and it's live on a great CDN (for free), does it get any easier than that? But unfortunately GitHub Pages doesn't play nice with React, until now...

##### Why it's necessary
GitHub Pages is a static server that doesn't support single page apps. When there is a fresh page load for a url like `example.tld/foo`, where `/foo` is a frontend route, GitHub Pages returns a 404 because it knows nothing of `/foo`. This only affects fresh page loads, however, as navigating to `/foo` from within the single page app is not a problem because the server never receives a request for `/foo`. (Note you could use `hashHistory` instead, but really no one wants to use `hashHistory` with its janky urls and incompatibility with `#hash-fragments`, e.g. `example.tld/foo` becomes `example.tld/#/foo?_k=yknaj`, ugh).

Also, [GitHub Pages are always available at `example.tld/my-repo-name`][ghPagesMyRepoName], even when a custom domain is in use. Accessing the site at `/my-repo-name` will cause frontend routing to break, so when the site is accessed at `/my-repo-name`, a redirect to just the domain with no path is required.

##### How it works
When the GitHub Pages server gets a request for a path defined with frontend routes, e.g. `example.tld/foo`, it returns a custom `404.html` page. The [custom `404.html` page contains a script][404html] that takes the current url and converts the path, query string and hash fragment into just a query string, and then redirects the browser to the new url with only a query string and no path or hash fragment. For example, `example.tld/one/two?a=b&c=d#qwe`, becomes `example.tld/?redirect=true&pathname=%2Fone%2Ftwo&query=a=b%26c=d&hash=qwe`.

The GitHub Pages server receives the new request, e.g. `example.tld?redirect=true...`, ignores the query string and returns the `index.html` file, which loads the React single page app. The [root React Router route][onEnterRedirect] has an `onEnter` hook that calls a function to check for a redirect in the query string. If a redirect is present in the query string, it's converted back into the correct url and React Router redirects to the url which loads the respective routes and components. (Note that these redirects are only needed with fresh page loads, and not when navigating within the single page app once it's loaded).

The other issue of GitHub Pages always being available at `/my-repo-name` is handled by the same [root route onEnter hook][onEnterRedirect] function, which checks for the `/my-repo-name` path and redirects to just the domain (with no path) if needed.


## Usage instructions
*For general information on using GitHub Pages please see [GitHub Pages Basics][ghPagesBasics], note that pages can be [User, Organization or Project Pages][ghPagesTypes]*  

1. Clone this repo (`$ git clone https://github.com/rafrex/react-github-pages.git`)
2. Delete the `.git` directory (`cd` into the `react-github-pages` directory and run `$ rm -rf .git`)
3. Instantiate the repository
  - If you're using this boilerplate as a new repository
    - `$ git init` in the `react-github-pages` directory, and then `$ git add .` and `$ git commit -m "Add React for GitHub Pages boilerplate"` to initialize a fresh repository
    - If this will be a Project Pages site, then change the branch name from `master` to `gh-pages` (`$ git branch -m gh-pages`), if this will be a User or Organization Pages site, then leave the branch name as `master`
    - Create an empty repo on GitHub.com (don't add a readme, gitignore or license), and add it as a remote to the local repo (`$ git remote add origin <your-new-github-repo-url>`)
    - Feel free to rename the local `react-github-pages` directory to anything you wnat (e.g. `your-project-name`)
  - If you're adding this boilerplate as the `gh-pages` branch of an existing repository
    - Create and checkout a new orphaned branch named `gh-pages` for your existing repo (`$ git checkout --orphan gh-pages`), note that the `gh-pages` branch won't appear in the list of branches until you make your first commit
    - Delete all of the files and directories from the working directory of your existing repo (`$ git rm -rf .`)
    - Copy all of the files and directories from the cloned `react-github-pages` directory into your project's now empty working directory
    - `$ git add .` and `$ git commit -m "Add React for GitHub Pages boilerplate"` to instantiate the `gh-pages` branch
4. Set up your custom domain - see GitHub Pages instructions for [setting up a custom domain][customDomain]
 - *Note that you must use a custom domain if you are setting up a Project Pages site in order for GitHub Pages to serve the custom 404 page, however, if you are creating a User or Organization Pages site, then using a custom domain is optional (if you don't use a custom domain delete the `CNAME` file)*
 - Update the [`CNAME` file][cnameFile] with your custom domain, don't include `http://`, but do include a subdomain if desired, e.g. `www` or `your-subdomain`
 - Update your `CNAME` and/a `A` record with your DNS provider
5. [Set your repo name in index.js][setRepoName], this should match your repository name as it is listed on GitHub
6. [Set your domain name in index.js][setDomain], if you are using a custom domain then this should match the domain in your `CNAME` file (except include the `http://`), if you are not using a custom domain, then this will be `http://<your github username or orgname>.github.io`
7. Run `$ npm install` to install React and other dependencies, and then run `$ webpack` to update the build
8. `$ git commit` and then push to GitHub (`$ git push origin gh-pages` for Project Pages or `$ git push origin master` for User or Organization Pages)

The example site should now be live on your domain

##### Creating your own site
- Write your own React components, create your own [routes][routes], and add some style!
- Change the [title in `index.html`][indexHtmlTitle] and the [title in `404.html`][404htmlTitle] to your site's title, also [remove the Google analytics script][googleAnalytics] from the header of `index.html` (the analytics function is wrapped in an `if` statement so that it will only run on the example site's domain (http://react-github-pages.rafrex.com), but you don't need it, so remove it or replace it with your own analytics)
- Change the readme and license as you see fit
- After you update your code run `$ webpack` to update the build, then `$ git commit` and `$ git push` to make your changes live

##### Miscellaneous
- The `.nojekyll` file in this repo [turns off Jekyll for GitHub Pages][nojekyll]
- Need form submission on your static site? Use [Formspree][formspree]


## Want to help?
- Fork this repo and port the boilerplate over to another frontend framework
- This should be pretty straight forward as the [`404.html`][404html] page and most of the logic in [`index.js`][indexjs] can remain the same
- You'll have to figure out the equivalent of:
  - Checking if a redirect is required before loading the app (the equivalent of the [`checkForRedirect` onEnter hook][onEnterRedirect])
  - Accessing the query string from within the framework (the equivalent of [`nextState`][nextState], alternatively you could get this from `window.location.search`)
  - Using the framework's router to goto the correct path after parsing the redirect query (the equivalent of [`replace(redirectTo)`][redirectTo], note that you can't use `window.location.replace` as that will make a request to GitHub Pages' static server, which will return the 404 page and start an infinite redirect loop)

Pull requests welcome. Please open [issues][issues] to report bugs.  
Thoughts, questions, suggestions? Contact me via [email][email] or [twitter][twitter].





<!-- links to within repo -->
[indexjs]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js
[nextState]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L20
[redirectTo]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L60
[setRepoName]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L74
[setDomain]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L77
[routes]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L84
[onEnterRedirect]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L86
[indexHtmlTitle]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.html#L6
[googleAnalytics]: https://github.com/rafrex/react-github-pages/blob/gh-pages/index.html#L9
[404html]: https://github.com/rafrex/react-github-pages/blob/gh-pages/404.html
[404htmlTitle]: https://github.com/rafrex/react-github-pages/blob/gh-pages/404.html#L5
[cnameFile]: https://github.com/rafrex/react-github-pages/blob/gh-pages/CNAME
[issues]: https://github.com/rafrex/react-github-pages/issues

<!-- links to github docs -->
[ghPagesOverview]: https://pages.github.com/
[ghPagesBasics]: https://help.github.com/categories/github-pages-basics/
[ghPagesTypes]: https://help.github.com/articles/user-organization-and-project-pages/
[customDomain]: https://help.github.com/articles/quick-start-setting-up-a-custom-domain/
[nojekyll]: https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/
[ghPagesMyRepoName]: https://help.github.com/articles/custom-domain-redirects-for-github-pages-sites/

<!-- other links -->
[react]: https://github.com/facebook/react
[reactRouter]: https://github.com/reactjs/react-router
[formspree]: http://formspree.io/
[email]: mailto:code@rafrex.com
[twitter]: https://twitter.com/rafrrex
