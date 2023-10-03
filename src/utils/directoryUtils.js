import fs from 'node:fs'
import chalk from 'chalk'

const SCRAPED_DIRECTORY_PATH = './scrapedPages'

async function createFolder (urlName) {
  try {
    fs.promises.mkdir('./scrapedPages/' + urlName, { recursive: true })
    console.log(chalk.bgBlue(urlName + ' folder create successfully'))
  } catch (err) {
    console.error(chalk.bgRed('Some error ocurr while creating the folder ' + urlName))
  }
}

export async function writeData (data, urlName) {
  try {
    await createFolder(urlName)
    await fs.promises.writeFile('./scrapedPages/' + `${urlName}/data.html`, data, { flag: 'a+' })
    console.log(chalk.blueBright(urlName + ' data written successfully'))
  } catch (err) {
    console.error(chalk.redBright('Some error ocurr while writting data on folder ' + urlName + ' ' + err))
  }
}

export async function deleteScrapeDirectory () {
  try {
    const filesAndDirectories = await fs.promises.readdir(SCRAPED_DIRECTORY_PATH)

    for (const fileOrDirectory of filesAndDirectories) {
      const path = `${SCRAPED_DIRECTORY_PATH}/${fileOrDirectory}`
      const stats = await fs.promises.stat(path)
      if (stats.isDirectory()) {
        await fs.rmSync(path, { recursive: true, force: true })
      }
    }
    console.error(chalk.bgGray('ScrapedPaged cleaned!'))
  } catch (err) {
    console.error(chalk.bgRed('Error while deleting the scrape folder ' + err))
  }
}
