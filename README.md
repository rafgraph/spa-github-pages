# Single Page Apps for GitHub Pages

[Live example][liveExample]  

This is a lightweight solution for deploying single page apps with [GitHub Pages][ghPagesOverview]. You can easily deploy a [React][react] single page app with [React Router][reactRouter] `browserHostory`, like the one in the [live example][liveExample], or a single page app built with any frontend library or framework.

##### Why it's necessary
GitHub Pages is a static server that doesn't support single page apps. When there is a fresh page load for a url like `example.tld/foo`, where `/foo` is a frontend route, GitHub Pages returns a 404 because it knows nothing of `/foo`. This only affects fresh page loads, however, as navigating to `/foo` from within the single page app is not a problem because the server never receives a request for `/foo`.

Also, [GitHub Pages are always available at `example.tld/my-repo-name`][ghPagesMyRepoName], even when a custom domain is in use. Accessing the site at `/my-repo-name` can cause frontend routing to break, so when the site is accessed at `/my-repo-name`, a redirect to just the domain with no path is required.

##### How it works
When the GitHub Pages server gets a request for a path defined with frontend routes, e.g. `example.tld/foo`, it returns a custom `404.html` page. The [custom `404.html` page contains a script][404html] that takes the current url and converts the path and query string into just a query string, and then redirects the browser to the new url with only a query string and hash fragment. For example, `example.tld/one/two?a=b&c=d#qwe`, becomes `example.tld/?redirect=true&pathname=/one/two&query=a=b%26c=d#qwe`.

The GitHub Pages server receives the new request, e.g. `example.tld?redirect=true...`, ignores the query string and hash fragment and returns the `index.html` file, which has a [script that checks for a redirect in the query string][indexHtmlScript] before the single page app is loaded. If a redirect is present it is converted back into the correct url and added to the browser's history with `window.history.replaceState(...)`, but the browser won't attempt to load the new url. When the [single page app is loaded][indexHtmlSpa] further down in the `index.html` file, the correct url will be waiting in the browser's history for the single page app to route accordingly. (Note that these redirects are only needed with fresh page loads, and not when navigating within the single page app once it's loaded).

The other issue of GitHub Pages always being available at `/my-repo-name` is handled by the same [redirect script][indexHtmlScript] in `index.html`, which checks for the `/my-repo-name` path and redirects to just the domain (with no path) if needed.

A quick SEO note - while it is never good to have a 404 response, it appears based on [Search Engine Land's testing][seoLand] that Google's crawler will treat the JavaScript `window.location` redirect in the `404.html` file the same as a 301 redirect for its indexing.


<!-- links to within repo -->
[404html]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/404.html
[indexHtmlScript]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html#L9
[indexHtmlSpa]: https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html#L80

<!-- links to github docs -->
[ghPagesOverview]: https://pages.github.com/
[ghPagesMyRepoName]: https://help.github.com/articles/custom-domain-redirects-for-github-pages-sites/

<!-- other links -->
[liveExample]: http://spa-github-pages.rafrex.com
[react]: https://github.com/facebook/react
[reactRouter]: https://github.com/reactjs/react-router
[seoLand]: http://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157
