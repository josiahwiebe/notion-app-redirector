// Paths listed below shouldn't be redirect to application.
const exceptingPaths = [
  '/desktop', '/login', '/mobile', '/product', '/pricing', '/native',
];

function redirect(details) {
  // Ignore urls which are not for document pages, such as js/css file and more.
  if (details.documentUrl) {
    return {};
  }

  const element = document.createElement('a');
  element.href = details.url;

  // Ignore some reserved keywords for notion homepage.
  if (!element.pathname
      || element.pathname === '/'
      || exceptingPaths.find(path => element.pathname.startsWith(path))
  ) {
    return {};
  }

  // Redirect with scheme.
  const notionScheme = details.url.replace('https', 'notion');
  browser.tabs.create({ url: notionScheme }).then((tab) => setTimeout(() => { browser.tabs.remove(tab.id) }, 5000));
  return {};
}

const filters = { urls: ['https://*.notion.so/*'] };
browser.webRequest.onBeforeRequest.addListener(redirect, filters);
