const PRE =
  'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=';

export const getFaviconPath = async (pageUrl: string) => {
  return `${PRE}${pageUrl}`;
};

let headDom = document.createElement('head');
export async function getParsedFavicon(pageUrl: string) {
  let favicon = '';
  const res = await fetch(pageUrl);
  const html = await res.text();

  headDom.innerHTML =
    html.replaceAll('\n', '').match(/<head>(.*)<\/head>/)?.[1] || '';
  // @ts-ignore
  favicon = headDom.querySelector('link[rel*="icon"]')?.attributes?.href?.value;
  console.log('xxx::: ', favicon);
  if (favicon && !(favicon || '').startsWith('http')) {
    favicon = `${new URL(pageUrl).origin}${favicon}`;
  }

  return favicon || '';
}
