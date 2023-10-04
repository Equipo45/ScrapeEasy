import { findCommandArgs } from './utils/stringUtils.js'
import { deleteScrapeDirectory } from './utils/directoryUtils.js'
import { getResponses } from './html/getPageHtml.js'

const TURN_ON_SPIDER = true

async function main () {
  if (findCommandArgs('--clean') || findCommandArgs('-c')) deleteScrapeDirectory()
  else if (findCommandArgs('--spider') || findCommandArgs('-s')) getResponses(TURN_ON_SPIDER)
  else getResponses()
}

main()
