import fs from 'fs'
import { UPLOAD_DIR } from '../constants/dir.js'
import { ErrorWithStatus } from '../models/Errors.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import formidable from 'formidable'

export const initUploadsFolder = () => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, {
      recursive: true
    })
  }
}

export const handleUploadImage = async (req, res) => {
  // Upload file
  const form = formidable({
    uploadDir: UPLOAD_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 1024 * 1024, // 1MB
    filter: ({ name, originalFilename, mimetype }) => {
      console.log({ name, originalFilename, mimetype })
      const valid = name === 'image' && Boolean(mimetype?.includes('image'))
      if (!valid) {
        form.emit('error', new Error('File type is not valid'))
      }
      return valid
    }
  })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) throw err

      if (!Boolean(files.image)) {
        return reject(
          new ErrorWithStatus({
            message: 'File is empty',
            status: HTTP_STATUS.BAD_REQUEST
          })
        )
      }

      resolve(files.image[0])
    })
  })
}
