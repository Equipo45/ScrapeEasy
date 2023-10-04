import * as cheerio from 'cheerio'

const SECURE_HTTP_WWW = 'https://www.'
const SECURE_HTTP = 'https://'

export function baseCleanName (url) {
  url = cleanHttpFromString(url)
  return url.split('/')[0]
}

export function findCommandArgs (command) {
  return process.argv.slice(2).find((arg) => arg.startsWith(command) || arg.startsWith(command))
}

export function getAllLinksHtml (htmlData, baseUrl) {
  const $ = cheerio.load(htmlData)
  const anchors = $('a')
  const hrefLinks = []
  for (const anchor of anchors) {
    hrefLinks.push(anchor.attr('href'))
  }
  return cleanedHtmlLinks(hrefLinks, baseUrl)
}

function cleanedHtmlLinks (linkList, baseUrl) {
  const cleanedList = []
  linkList.forEach(link => {
    link = cleanHttpFromString(link)
    if (link.indexOf('.') === -1) link = createFullPath(link, baseUrl)
    cleanedList.push(link)
  })

  return cleanedList
}

function cleanHttpFromString (urlStr) {
  if (urlStr.indexOf(SECURE_HTTP_WWW) !== -1) return urlStr.replace(SECURE_HTTP_WWW, '')
  else if (urlStr.indexOf(SECURE_HTTP) !== -1) return urlStr.replace(SECURE_HTTP, '')
}

function createFullPath (relativeUrl, baseUrl) {
  return baseUrl + relativeUrl
}
