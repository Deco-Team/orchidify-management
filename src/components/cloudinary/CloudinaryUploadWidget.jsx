import { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FileSize } from '~/global/constants'
import { text } from './cloudinary-text'
import { APP_MESSAGE } from '~/global/app-message'

const CloudinaryUploadWidget = ({ onSuccess, minFile, maxFile, clientAllowedFormats, maxFileSize, multiple, buttonStyle = {} }) => {
  const [widget, setWidget] = useState(null)
  const initializeCloudinaryWidget = useCallback(() => {
    setWidget(
      window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          sources: ['local'],
          language: 'vi',
          text: {
            ...text,
            vi: {
              ...text.vi,
              uploader: {
                ...text.vi.uploader,
                errors: {
                  ...text.vi.uploader.errors,
                  file_too_large: APP_MESSAGE.INVALID_FILE_FORMAT_OR_SIZE(
                    clientAllowedFormats.join(', '),
                    maxFileSize.text
                  ),
                  unavailable: 'Không có sẵn',
                  max_number_of_files: APP_MESSAGE.INCORRECT_NUMBER_OF_FILES(minFile, maxFile),
                  allowed_formats: APP_MESSAGE.INVALID_FILE_FORMAT_OR_SIZE(
                    clientAllowedFormats.join(', '),
                    maxFileSize.text
                  ),
                  max_file_size: APP_MESSAGE.INVALID_FILE_FORMAT_OR_SIZE(
                    clientAllowedFormats.join(', '),
                    maxFileSize.text
                  ),
                  min_file_size: APP_MESSAGE.INVALID_FILE_FORMAT_OR_SIZE(
                    clientAllowedFormats.join(', '),
                    maxFileSize.text
                  )
                }
              }
            }
          },
          clientAllowedFormats: clientAllowedFormats ? clientAllowedFormats : null,
          maxFile: maxFile ? maxFile : null,
          maxFileSize: maxFileSize ? maxFileSize.size : 'unlimited',
          multiple: !!multiple
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            onSuccess(result.info)
          }
        }
      )
    )
  }, [])

  useEffect(() => {
    initializeCloudinaryWidget()
    return () => {
      if (widget) widget.destroy()
    }
  }, [])

  return (
    <Button id='upload_widget' sx={buttonStyle} onClick={() => widget.open()}>
      Tải lên
    </Button>
  )
}

export default CloudinaryUploadWidget
