import axios from 'axios'
import fs from 'node:fs'
import path from 'node:path'
import { baseCleanName } from '../utils/stringUtils.js'
import { writeData } from '../utils/directoryUtils.js'

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

export async function getResponses (spiderActivated = false) {
  const textPath = path.parse('./src/urlsToScrape.txt')
  const urlList = fs.readFileSync(textPath, 'utf8').split('\n')
  urlList.forEach(async (url) => {
    const dataReponse = await getHtmlResponse(url)
    const cleanUrl = baseCleanName(url)
    await writeData(dataReponse, cleanUrl)
  })
}

async function getHtmlResponse (url) {
  const res = await axios.get(url, setOptions())
  return res.data
}
