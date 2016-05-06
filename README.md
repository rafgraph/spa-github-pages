## React for GitHub Pages
[Live example](http://react-github-pages.rafrex.com)  

React for GitHub Pages is a lightweight solution for deploying [React](https://github.com/facebook/react) single page apps (with [React Router](https://github.com/reactjs/react-router) `browserHistory`) using [GitHub Pages](https://pages.github.com/).

I love React with React Router. Need complex views with lifecycle methods and dynamic routing? Done. Need a simple site with a few fixed routes? Use functional stateless components and JSX. Done. And I love GitHub Pages. Git push on a gh-pages branch and it's live on a great CDN (for free), does it get any better than that? But unfortunately GitHub Pages doesn't get along with React, until now...

##### Why it's necessary
GitHub Pages is a static server that doesn't support single page apps. When there is a fresh page load for a url like `example.tld/foo`, where `/foo` is a frontend route, GitHub Pages returns a 404 becasue it knows nothing of `/foo`. (Note you could use `hashHistory` instead, but really no one wants to use `hashHistory` with its janky urls and incompatibility with `#hash-fragments`, e.g. `example.tld/foo` becomes `example.tld/#/foo?_k=yknaj`, ugh).

Also, [gh-pages are always available at /my-repo-name](https://help.github.com/articles/custom-domain-redirects-for-github-pages-sites/), even when a custom domain is in use. Accessing the site at `/my-repo-name` will cause frontend routing to break, so when the site is accessed at `/my-repo-name`, a redirect to the custom domain is required.

##### How it works
When the GitHub Pages server gets a request for a path defined with frontend routes, e.g. `example.tld/foo`, it returns a custom `404.html` page. The [custom `404.html` page contains a script](https://github.com/rafrex/react-github-pages/blob/gh-pages/404.html) that takes the current url and converts the path, query string and hash fragment into just a query string, and then redirects the browser to the new url with only a query string and no path or hash fragment. For example, `example.tld/one/two?a=b&c=d#qwe`, becomes `example.tld/?redirect=true&pathname=%2Fone%2Ftwo&query=a=b%26c=d&hash=qwe`.

The GitHub pages server receives the new request, e.g. `example.tld?redirect=true...`, ignores the query string and returns the `index.html` file, which loads the React single page app. The [root React Router route](https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L73) has an `onEnter` hook that calls a function to check for a redirect in the query string. If a redirect query string is present, the function converts the query string back into the correct url, then uses React Router to redirect to the correct url which loads the respective routes and components. (Note that these redirects are only needed with fresh page loads, and not when navigating within the single page app once it's loaded).

The other issue of gh-pages always being available at `/my-repo-name` is handled by defining a frontend [route with path `/my-repo-name` and an `onEnter` hook](https://github.com/rafrex/react-github-pages/blob/gh-pages/index.js#L81) that redirects to the custom domain.


### Usage instructions
