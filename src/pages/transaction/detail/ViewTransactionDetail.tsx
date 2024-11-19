import Header from './components/Header'
import Information from './components/Information'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import { useTransactionApi } from '~/hooks/api/useTransactionApi'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { TransactionDetailResponseDto } from '~/data/transaction.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import Loading from '~/components/loading/Loading'
import Histories from './components/Histories'
import { PaymentType } from '~/global/constants'

export default function ViewTransactionDetail() {
  const [data, setData] = useState<TransactionDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const transactionId = params.id
  const { getTransactionById } = useTransactionApi()

  useEffect(() => {
    if (transactionId) {
      ;(async () => {
        const { data: transaction, error: apiError } = await getTransactionById(transactionId)
        setData(transaction)
        setError(apiError)
      })()
    }
  }, [transactionId, getTransactionById])

  if (error) {
    notifyError(error.message)
    return <Navigate to={protectedRoute.transactionList.path} replace />
  }

  return data ? (
    <>
      <Header />
      <Information transaction={data} />
      <Histories
        histories={
          data.type === PaymentType.PAYMENT
            ? data.payment.histories
            : data.type === PaymentType.PAYOUT
              ? data.payout.histories
              : []
        }
      />
    </>
  ) : (
    <Loading />
  )
}
