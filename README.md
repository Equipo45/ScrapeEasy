# ScrapeEasy
A web scraper for testing if a web page is secure towards scrapers and web spiders.

## How to use it
1. The scraper is a **command-line tool** that first needs a .txt with all the pages that are going to be wrapped:

  ![image](https://github.com/Equipo45/ScrapeEasy/assets/35577277/8b58abc5-3726-4bde-a2f5-d519b3af31a9)

2. Then you **only need to execute the index.js** with node ``node src/index.js``

  ![image](https://github.com/Equipo45/ScrapeEasy/assets/35577277/24a8dd15-51ea-4579-bb11-1047e265abab)

3. This will **create one folder for each web page** containing the headers and the data.html
   
   ![image](https://github.com/Equipo45/ScrapeEasy/assets/35577277/f40cbb0b-def4-4ceb-860b-4493ca4bc53b)
   
4. **Amazon example**
   ![image](https://github.com/Equipo45/ScrapeEasy/assets/35577277/96ebf205-0389-4bf9-8ada-173bef3c10f9)
   ![image](https://github.com/Equipo45/ScrapeEasy/assets/35577277/28389dd0-05df-49e7-bff6-458a8a10ea52)

5. **For cleaning** the scraped folder just execute ``node src/index.js --clean``
  ![image](https://github.com/Equipo45/ScrapeEasy/assets/35577277/ec1ae007-4471-4b0e-ba64-8a514c031bf2)



