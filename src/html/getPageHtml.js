import axios from 'axios'

const WINDOWS_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
const LINUX_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'

function setOptions () {
  const userAgent = process.platform === 'win32' ? WINDOWS_AGENT : LINUX_AGENT
  return {
    'User-Agent': userAgent,
    Accept: 'text/html',
    Referrer: 'https://example.com/',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache',
    'Accept-Encoding': 'gzip, deflate'
  }
}

export async function getResponse (url) {
  const res = await axios.get(url, setOptions())
  return res.data
}
