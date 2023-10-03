import { getResponse } from './getPageHtml.js'
import { cleanName } from './utils/stringUtils.js'
import { writeData, deleteScrapeDirectory } from './utils/directoryUtils.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main () {
  if (process.argv.slice(2).find((arg) => arg.startsWith('--clean') || arg.startsWith('-c'))) deleteScrapeDirectory()
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
