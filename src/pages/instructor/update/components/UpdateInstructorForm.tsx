import { zodResolver } from '@hookform/resolvers/zod'
import { Paper, Box, Typography, Divider, Grid, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { Instructor } from '~/data/instructor.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { StyledForm } from './UpdateInstructorForm.styled'
import dayjs from 'dayjs'

type FormValues = {
  name: string
  dateOfBirth: string
  phone: string
}

const validationSchema = z.object({
  name: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên giảng viên'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên giảng viên', 50)),
  phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, APP_MESSAGE.WRONG_PHONE_FORMAT),
  dateOfBirth: z.string().min(1, APP_MESSAGE.REQUIRED_FIELD('Ngày sinh'))
})

interface UpdateInstructorFormProps {
  instructor: Instructor
  onSubmit: SubmitHandler<FormValues>
}

const UpdateInstructorForm = ({ instructor, onSubmit }: UpdateInstructorFormProps) => {
  const minDate = dayjs().subtract(18, 'years').format('YYYY-MM-DD')
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      name: instructor.name,
      dateOfBirth: dayjs(instructor.dateOfBirth).format('YYYY-MM-DD'),
      phone: instructor.phone
    },
    resolver: zodResolver(validationSchema)
  })

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ width: '100%', marginY: '40px', padding: '24px' }}>
        <Box display='flex' alignItems='center' marginBottom='20px'>
          <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '10px' }}>
            Thông tin giảng viên
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Grid container columnSpacing='30px' rowSpacing='20px'>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'name', control: control }}
              label='Tên giảng viên'
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'dateOfBirth', control: control }}
              label='Ngày sinh'
              type='date'
              fullWidth
              size='small'
              inputProps={{
                max: minDate
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'phone', control: control }}
              label='Số điện thoại'
              fullWidth
              size='small'
            />
          </Grid>
        </Grid>
      </Paper>
      <Button disabled={isSubmitting} type='submit'>
        Lưu
      </Button>
    </StyledForm>
  )
}

export default UpdateInstructorForm
