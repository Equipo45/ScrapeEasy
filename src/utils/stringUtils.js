export function cleanName (url) {
  const SECURE_HTTP_WWW = 'https://www.'
  const SECURE_HTTP = 'https://'
  if (url.indexOf(SECURE_HTTP_WWW) !== -1) url = url.replace(SECURE_HTTP_WWW, '')
  else if (url.indexOf(SECURE_HTTP) !== -1) url = url.replace(SECURE_HTTP, '')
  return url.split('/')[0]
}
