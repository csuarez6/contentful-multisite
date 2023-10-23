// Docs: https://www.contentful.com/developers/docs/references/images-api/
export default function contentfulLoader({ src, width, height, quality }) {
  try {
    let url = src;

    if (url.toString().startsWith('http')) {
      const urlObject = new URL(src);

      urlObject.searchParams.delete('w');
      urlObject.searchParams.delete('q');
      urlObject.searchParams.delete('h');
      urlObject.searchParams.delete('fm');

      url = urlObject.toString() + (urlObject.searchParams.size > 0 ? '&' : '?');
    } else {
      url += '?';
    }

    let params = 'fm=webp'
      + '&q=' + (quality || 75).toString()
      + '&w=' + width.toString();

    if (height) {
      params += 'h=' + height.toString();
    }

    return url + params;
  } catch (e) {
    console.error('Error trying to serve image asset:', e);
  }
  return src;
}
