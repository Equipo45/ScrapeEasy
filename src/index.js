import { findCommandArgs } from './utils/stringUtils.js'
import { deleteScrapeDirectory } from './utils/directoryUtils.js'
import { getResponses } from './html/getPageHtml.js'
import { getLinksFromHtml } from './html/spider.js'

// const TURN_ON_SPIDER = true

async function main () {
  if (findCommandArgs('--clean') || findCommandArgs('-c')) deleteScrapeDirectory()
  else if (findCommandArgs('--spider') || findCommandArgs('-s')) getLinksFromHtml(await getResponses())
  else await getResponses()
}

main()
