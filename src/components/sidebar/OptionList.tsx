import LogoutIcon from '@mui/icons-material/Logout'
import StarIcon from '@mui/icons-material/Star'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { OptionsStaff } from './Option'

const OptionList = () => {
  enum UserRole {
    ADMIN = 'ADMIN',
    GARDENMNG = 'GARDENMNG',
    STAFF = 'STAFF'
  }

  const role = /*(user?.role.toLocaleUpperCase() as UserRole) ||*/ 'STAFF'

  const options = (() => {
    switch (role) {
      //   case UserRole.ADMIN:
      //     return OptionsAdmin
      case UserRole.STAFF:
        return OptionsStaff
      //   case UserRole.GARDENMNG:
      //     return OptionsGardenMng
      default:
        throw new Error('Unknown role')
    }
  })()

  const [button, setButton] = useState<number>(1)

  const handleClick = (id: number) => {
    setButton(id)
  }

  const location = useLocation()
  useEffect(() => {
    const option = options.find((option) => location.pathname.includes(`/${option.link}`))
    if (option) {
      setButton(option.id)
    } else {
      setButton(1)
    }
  }, [location, options])

  return (
    <>
      {options.map((option) => (
        <Link
          key={option.id}
          to={`/${option.link}`}
          style={{
            width: '100%',
            minHeight: 'fit-content'
          }}
        >
          <Button
            onClick={() => handleClick(option.id)}
            sx={{
              width: '100%',
              height: '100%',
              color: option.id === button ? '#2EC4B6' : '#3C3C4399',
              borderRadius: 0,
              padding: '5% 10%',
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontFamily: 'inherit',
              fontWeight: 'bold',
              backgroundColor: 'white',
              boxShadow: 'none',
              borderLeft: option.id === button ? '4px solid #2EC4B6' : 'none',
              ':hover': {
                backgroundColor: '#dffffbb3'
              }
            }}
            startIcon={<StarIcon />}
            variant={option.id === button ? 'contained' : 'text'}
          >
            {option.text}
          </Button>
        </Link>
      ))}
      <Button
        endIcon={<LogoutIcon />}
        sx={{
          width: '300px',
          color: '#ff022399',
          position: 'fixed',
          bottom: 10,
          textTransform: 'none',
          fontFamily: 'inherit',
          alignSelf: 'center',
          ':hover': { backgroundColor: 'none' },
          justifyContent: 'space-around'
        }}
        // onClick={logout}
      >
        Đăng xuất
      </Button>
    </>
  )
}

export default OptionList
