import { ChangeEventHandler, useState } from 'react'
import { Box, Button, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Cloud } from '@mui/icons-material'
import CloudinaryUploadWidget from '../cloudinary/CloudinaryUploadWidget'

interface ControlledFileInputProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  multiple?: boolean
}

export const ControlledFileFieldUpload = <TFieldValues extends FieldValues>({
  controller,
  label,
  multiple
}: ControlledFileInputProps<TFieldValues>) => {
  const [publicId, setPublicId] = useState('')
  console.log(publicId)

  const {
    field: { value, onChange, ...field },
    fieldState: { error }
  } = useController(controller)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleClick = () => {
    document.getElementById(`${label}-file-input`)!.click()
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      if (multiple) {
        onChange([...selectedFiles, ...files])
        setSelectedFiles((prev) => [...prev, ...files])
      } else {
        onChange(files[0])
        setSelectedFiles([files[0]])
      }
    }
  }

  return (
    <Box>
      <InputLabel sx={{ marginBottom: '0.7rem', color: '#000000' }}>{label}</InputLabel>
      <Box display='flex'>
        {/* <Button sx={{ marginRight: '8px' }} onClick={handleClick}>
          Tải lên
        </Button> */}
        <CloudinaryUploadWidget setPublicId={setPublicId} />
        {/* <input
          {...field}
          id={`${label}-file-input`}
          type='file'
          multiple={multiple}
          value={value?.fileName}
          onChange={handleChange}
          style={{ display: 'none' }}
        /> */}
        <OutlinedInput
          size='small'
          value={selectedFiles.map((file) => file.name).join(', ')}
          disabled={!error}
          readOnly={!!error}
          error={!!error}
          sx={{
            flexGrow: 1
          }}
        />
      </Box>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </Box>
  )
}

export const ControlledFileAreaUpload = <TFieldValues extends FieldValues>({
  controller,
  label,
  multiple
}: ControlledFileInputProps<TFieldValues>) => {
  const {
    field: { value, onChange, ...field },
    fieldState: { error }
  } = useController(controller)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleClick = () => {
    document.getElementById(`${label}-file-input`)!.click()
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      if (multiple) {
        onChange([...selectedFiles, ...files])
        setSelectedFiles((prev) => [...prev, ...files])
      } else {
        onChange(files[0])
        setSelectedFiles([files[0]])
      }
    }
  }

  return (
    <Box>
      <InputLabel sx={{ marginBottom: '0.7rem', color: '#000000' }}>{label}</InputLabel>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight={200}
        border='1px solid #0000001F'
      >
        <Cloud sx={{ width: 35, height: 35 }} color='primary' />
        <Typography variant='caption' margin='10px 0'>
          Kéo thả ảnh vào đây hoặc bấm tải lên
        </Typography>
        <Button sx={{ width: 'fit-content' }} onClick={handleClick}>
          Tải lên
        </Button>
        <input
          {...field}
          id={`${label}-file-input`}
          type='file'
          multiple={multiple}
          value={value?.fileName}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </Box>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </Box>
  )
}
