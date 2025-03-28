const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')
const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // stats te da la informacion del archivo
    } catch {
      console.error(`No se pudo leer el directorio ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType}  ${pc.blue(file.padEnd(12))} ${pc.green(fileSize.padStart(5))} ${pc.yellowBright(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach((filesInfo) => console.log(filesInfo))
}

ls(folder)
