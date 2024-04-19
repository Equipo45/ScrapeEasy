import { findCommandArgs } from './utils/stringUtils.js'
import { deleteScrapeDirectory } from './utils/directoryUtils.js'
import { getResponses, getSpiderResponse } from './html/getPageHtml.js'

// const TURN_ON_SPIDER = true

async function main () {
  if (findCommandArgs('--clean') || findCommandArgs('-c')) deleteScrapeDirectory()
  else if (findCommandArgs('--spider') || findCommandArgs('-s')) await getSpiderResponse()
  else await getResponses()
}

main()
