import axios from 'axios'
import NodeCache from 'node-cache'
import fs from 'node:fs'
import { baseCleanName, getAllLinksHtml } from '../utils/stringUtils.js'
import { writeData } from '../utils/directoryUtils.js'
import chalk from 'chalk'

const WINDOWS_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
const LINUX_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
const cache = []

function setOptions() {
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

export async function getResponses() {
  const textPath = './src/urlsToScrape.txt'
  const urlList = fs.readFileSync(textPath, 'utf8').split('\n')
  urlList.forEach(async (url) => {
    const { data, headers } = await getHtmlResponse(url)
    const cleanUrl = baseCleanName(url)
    await writeData(data, headers, cleanUrl)
  })
}

export async function getSpiderResponse (htmlLinks = null) {
  const textPath = './src/urlsToScrape.txt'
  const urlList = htmlLinks || fs.readFileSync(textPath, 'utf8').split('\n');

  for (const url of urlList) {
    try {
      const { data, headers } = await getHtmlResponse(url)
      const cleanUrl = baseCleanName(url)
      const innerHtmlLinks = getAllLinksHtml(data)
      const newUrls = innerHtmlLinks.filter(link => !cache.includes(link))
      cache.push(...newUrls)

      await getSpiderResponse(newUrls)

      await writeData(data, headers, cleanUrl)
    } catch (error) {
      console.error(`Error processing URL ${url}: ${error}`)
    }
  }
}

async function getHtmlResponse(url) {
  try {
    const res = await axios.get(url, setOptions())
    return { data: res.data, headers: JSON.stringify(res.headers.toJSON()) }
  } catch (err) {
    console.error(chalk.redBright('Error while requestings the file ' + url + ' ' + err))
    return { data: '<h1> 503 ERROR CODE </h1>', headers: { statusCode: 503 } }
  }
}
