import { MenuBookSharp, SchoolOutlined, CoPresentOutlined, ContactPageOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import StatisticCard from '~/components/card/StatisticCard'

const StaffStatisticSection = () => {
  return (
    <Grid container gap='1.875rem' marginBottom='1.25rem'>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Khóa học'
          value={100}
          Icon={MenuBookSharp}
          bgcolor='#F88C3D66'
          borderColor='#FF9242'
          iconBgcolor='#FF9242'
        />
      </Grid>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Học viên'
          value={10000}
          Icon={SchoolOutlined}
          bgcolor='#5BADD066'
          borderColor='#5BADD0'
          iconBgcolor='#5BADD0'
        />
      </Grid>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Giảng viên'
          value={1000}
          Icon={CoPresentOutlined}
          bgcolor='#FFCF2266'
          borderColor='#FFCF22'
          iconBgcolor='#FFCF22'
        />
      </Grid>
      <Grid item xs={5.6} lg={2.7}>
        <StatisticCard
          title='Combo khóa học'
          value={20}
          Icon={ContactPageOutlined}
          bgcolor='#20C01766'
          borderColor='#20C017'
          iconBgcolor='#20C017'
        />
      </Grid>
    </Grid>
  )
}

export default StaffStatisticSection
