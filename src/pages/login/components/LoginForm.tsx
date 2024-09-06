import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ControlledTextField from '~/components/form/ControlledTextField'
import { StyledForm } from './LoginForm.styled'
import { PrimaryButton } from '~/components/button/Button.styled'
import ControlledSelect from '~/components/form/ControlledSelect'
import { UserRole } from '~/global/constants'
import useAuth from '~/auth/useAuth'
import { notifyError, notifySuccess } from '~/utils/toastify'

type FormValues = {
  role: UserRole
  email: string
  password: string
}

const defaultFormValues: FormValues = {
  role: UserRole.STAFF,
  email: '',
  password: ''
}

const validationSchema = z.object({
  role: z.nativeEnum(UserRole),
  email: z
    .string()
    .email('Email không hợp lệ')
    .min(1, 'Email không được bỏ trống')
    .max(50, { message: 'Tối đa 50 ký tự' }),
  password: z.string().min(1, 'Mật khẩu không được bỏ trống').max(50, { message: 'Tối đa 50 ký tự' })
})

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })
  const { login } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const error = await login(data.role, data.email, data.password)

    if (error) {
      notifyError(error.message)
    } else {
      notifySuccess('Đăng nhập thành công')
    }
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <ControlledSelect
        controller={{ name: 'role', control: control }}
        label='Chức vụ'
        labelId='role-select-label'
        placeholder='Chọn chức vụ'
        items={[
          { name: 'Staff', value: UserRole.STAFF },
          { name: 'Garden Manager', value: UserRole.GARDEN_MANAGER }
        ]}
        fullWidth
        sx={{ marginBottom: '0.7rem' }}
      />
      <ControlledTextField
        controller={{ name: 'email', control: control }}
        label='Email'
        placeholder='Nhập địa chỉ email'
        fullWidth
        sx={{ marginBottom: '0.7rem' }}
      />
      <ControlledTextField
        controller={{ name: 'password', control: control }}
        type='password'
        label='Mật khẩu'
        placeholder='Nhập mật khẩu'
        fullWidth
        sx={{ marginBottom: '0.7rem' }}
      />
      <PrimaryButton disabled={isSubmitting} variant='contained' type='submit' fullWidth sx={{ marginTop: '0.7rem' }}>
        Đăng nhập
      </PrimaryButton>
    </StyledForm>
  )
}

export default LoginForm
