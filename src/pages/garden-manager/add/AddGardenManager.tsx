import { Typography } from '@mui/material'
import Breadcrumbs from '~/components/breadscrumbs/Breadscrumbs'
import { protectedRoute } from '~/routes/routes'

export default function AddGardenManager() {
  const items = [protectedRoute.gardenManagerList, protectedRoute.addGardenManager]
  return (
    <>
      <Typography variant='h1'>h1. Add Garden Manager</Typography>
      <Breadcrumbs items={items} />
    </>
  )
}
