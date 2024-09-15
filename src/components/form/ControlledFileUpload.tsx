import { Box, FormHelperText, InputLabel, OutlinedInput, Typography, useTheme } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Cloud } from '@mui/icons-material'
import CloudinaryUploadWidget from '../cloudinary/CloudinaryUploadWidget'
import { CloudinaryFileUploadedInfo } from '../cloudinary/cloudinary-type'

interface ControlledFileInputProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  multiple?: boolean
  minFile: number
  maxFile?: number
  clientAllowedFormats?: string[]
  maxFileSize?: { text: string; size: number }
}

export const ControlledFileFieldUpload = <TFieldValues extends FieldValues>({
  controller,
  label,
  multiple,
  minFile,
  maxFile,
  clientAllowedFormats,
  maxFileSize
}: ControlledFileInputProps<TFieldValues>) => {
  const {
    field: { value, onChange, ...field },
    fieldState: { error }
  } = useController(controller)

  const handleUploadSuccess = (info: CloudinaryFileUploadedInfo) => {
    if (multiple) {
      onChange([...value, info])
    } else {
      onChange([info])
    }
  }

  return (
    <Box>
      <InputLabel sx={{ marginBottom: '0.7rem', color: '#000000' }}>{label}</InputLabel>
      <Box display='flex'>
        <CloudinaryUploadWidget
          buttonStyle={{ marginRight: '8px' }}
          onSuccess={handleUploadSuccess}
          minFile={minFile}
          maxFile={maxFile}
          clientAllowedFormats={clientAllowedFormats}
          maxFileSize={maxFileSize}
          multiple={multiple}
        />
        <OutlinedInput
          {...field}
          size='small'
          value={value.map((file: CloudinaryFileUploadedInfo) => file.original_filename).join(', ')}
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
  multiple,
  minFile,
  maxFile,
  clientAllowedFormats,
  maxFileSize
}: ControlledFileInputProps<TFieldValues>) => {
  const theme = useTheme()
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController(controller)

  const handleUploadSuccess = (info: CloudinaryFileUploadedInfo) => {
    if (multiple) {
      onChange([...value, info])
    } else {
      onChange([info])
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
        border={`1px solid ${error ? theme.palette.error.main : ' #0000001F'}`}
      >
        <Cloud sx={{ width: 35, height: 35 }} color='primary' />
        <Typography variant='caption' margin='10px 0'>
          Bấm tải lên
        </Typography>
        <CloudinaryUploadWidget
          buttonStyle={{ width: 'fit-content' }}
          onSuccess={handleUploadSuccess}
          minFile={minFile}
          maxFile={maxFile}
          clientAllowedFormats={clientAllowedFormats}
          maxFileSize={maxFileSize}
          multiple={multiple}
        />
      </Box>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </Box>
  )
}
