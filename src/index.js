import { getResponse } from './html/getPageHtml.js'
import { cleanName, findCommandArgs } from './utils/stringUtils.js'
import { writeData, deleteScrapeDirectory } from './utils/directoryUtils.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main () {
  if (findCommandArgs('--clean') || findCommandArgs('-c')) deleteScrapeDirectory()
  else {
    const textPath = path.join(__dirname, 'urlsToScrape.txt')
    const urlList = fs.readFileSync(textPath, 'utf8').split('\n')
    urlList.forEach(async (url) => {
      const dataReponse = await getResponse(url)
      const cleanUrl = cleanName(url)
      await writeData(dataReponse, cleanUrl)
    })
  }
}

main()
