import { ChangeEventHandler, useState } from 'react'
import { Box, Button, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Cloud } from '@mui/icons-material'

interface ControlledFileInputProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  accept?: string
  multiple?: boolean
}

export const ControlledFileFieldUpload = <TFieldValues extends FieldValues>({
  controller,
  label,
  accept,
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
    if (files) {
      const newFiles = new DataTransfer()
      Array.from([...selectedFiles, ...files]).forEach((file) => newFiles.items.add(file))
      onChange(newFiles.files)
      setSelectedFiles((prev) => [...prev, ...files])
    } else {
      const newFiles = new DataTransfer()
      selectedFiles.forEach((file) => newFiles.items.add(file))
      onChange(newFiles)
    }
  }

  return (
    <Box>
      <InputLabel sx={{ marginBottom: '0.7rem', color: '#000000' }}>{label}</InputLabel>
      <Box display='flex'>
        <Button sx={{ marginRight: '8px' }} onClick={handleClick}>
          Tải lên
        </Button>
        <input
          {...field}
          id={`${label}-file-input`}
          type='file'
          accept={accept}
          multiple={multiple}
          value={value?.fileName}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
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
  accept,
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
    if (files) {
      const newFiles = new DataTransfer()
      Array.from([...selectedFiles, ...files]).forEach((file) => newFiles.items.add(file))
      onChange(newFiles.files)
      setSelectedFiles((prev) => [...prev, ...files])
    } else {
      const newFiles = new DataTransfer()
      selectedFiles.forEach((file) => newFiles.items.add(file))
      onChange(newFiles)
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
          accept={accept}
          value={value?.fileName}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </Box>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </Box>
  )
}
