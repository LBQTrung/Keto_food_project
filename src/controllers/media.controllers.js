import { handleUploadImage } from '../utils/files.js'
import path from 'path'
import dotenv from 'dotenv'
import { UPLOAD_DIR } from '../constants/dir.js'
dotenv.config()

export const uploadFileController = async (req, res) => {
  const file = await handleUploadImage(req, res)

  const newFilename = file.newFilename

  const responseURL = `http://localhost:${process.env.PORT}/media/static/${newFilename}`

  return res.json({
    message: 'Upload image successfully',
    result: {
      image_url: responseURL,
      filename: newFilename
    }
  })
}

export const staticFileController = (req, res) => {
  const { name } = req.params

  return res.sendFile(path.resolve(UPLOAD_DIR, name), (err) => {
    if (err) {
      res.status(err.status).json({
        message: 'Not Found'
      })
    }
  })
}
