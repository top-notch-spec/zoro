/** @jsxImportSource @emotion/react */
import SwapSummary from '../../SwapSummary'
import { FormError } from '../useForm/types'
import { ApproveTokenSteps, PrimaryButton } from 'components'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'translation'
import { Swap, Token } from 'types'
//import { areTokensEqual, getSwapRouterContractAddress } from 'utilities';
import { areTokensEqual } from 'utilities'
import { GeolocationContext } from 'context/GeolocationContext'

export interface SubmitSectionProps {
  isFormValid: boolean
  isFormSubmitting: boolean
  toToken: Token
  fromToken: Token
  poolComptrollerAddress: string
  fromTokenAmountTokens: string
  isSwapLoading: boolean
  swap?: Swap
  formError?: FormError,
  isApprove: boolean,
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({
  isFormValid,
  isFormSubmitting,
  toToken,
  fromToken,
  poolComptrollerAddress,
  fromTokenAmountTokens,
  formError,
  swap,
  isSwapLoading,
  isApprove,
}) => {
  const { t } = useTranslation()
  const { geolocation } = useContext(GeolocationContext)

  const submitButtonLabel = useMemo(() => {
    if (geolocation) {
      return t('blockedRegion')
    }

    if (isSwapLoading && Number(fromTokenAmountTokens) > 0) {
      return t('operationModal.supply.submitButtonLabel.processing')
    }

    if (!isFormSubmitting && formError === 'SUPPLY_CAP_ALREADY_REACHED') {
      return t('operationModal.supply.submitButtonLabel.supplyCapReached')
    }

    if (!isFormSubmitting && formError === 'SWAP_INSUFFICIENT_LIQUIDITY') {
      return t(
        'operationModal.supply.submitButtonLabel.insufficientSwapLiquidity'
      )
    }

    if (!isFormSubmitting && formError === 'SWAP_WRAPPING_UNSUPPORTED') {
      return t('operationModal.supply.submitButtonLabel.wrappingUnsupported')
    }

    if (!isFormSubmitting && formError === 'SWAP_UNWRAPPING_UNSUPPORTED') {
      return t('operationModal.supply.submitButtonLabel.unwrappingUnsupported')
    }

    if (!isFormSubmitting && formError === 'HIGHER_THAN_SUPPLY_CAP') {
      return t(
        'operationModal.supply.submitButtonLabel.amountHigherThanSupplyCap'
      )
    }

    if (!isFormSubmitting && formError === 'HIGHER_THAN_WALLET_BALANCE') {
      return t(
        'operationModal.supply.submitButtonLabel.insufficientWalletBalance',
        {
          tokenSymbol: fromToken.symbol
        }
      )
    }

    if (!isFormValid) {
      return t('operationModal.supply.submitButtonLabel.enterValidAmount')
    }

    if (isFormSubmitting) {
      return t('operationModal.supply.submitButtonLabel.supplying')
    }
    return isApprove ? t('approveToken.approveButtonLabel') : t('operationModal.supply.submitButtonLabel.supply')
  }, [
    isSwapLoading,
    fromTokenAmountTokens,
    isFormValid,
    formError,
    isFormSubmitting
  ])

  // removed the swap router contract
  //spenderAddress={getSwapRouterContractAddress(poolComptrollerAddress)}
  return (
    <ApproveTokenSteps
      token={fromToken}
      spenderAddress={poolComptrollerAddress}
      submitButtonLabel={t('operationModal.supply.submitButtonLabel.supply')}
      hideTokenEnablingStep={!isFormValid || areTokensEqual(fromToken, toToken)}
    >
      {({ isTokenApprovalStatusLoading }) => (
        <>
          <PrimaryButton
            type='submit'
            loading={isFormSubmitting}
            disabled={
              geolocation ||
              !isFormValid ||
              isFormSubmitting ||
              isSwapLoading ||
              isTokenApprovalStatusLoading
            }
            fullWidth
            className='custom-btn-wrap'
            style={{
              backgroundImage: isFormSubmitting
                ? 'linear-gradient(114deg, #ecaf54 0%, #e9bc11 100%)'
                : ''
            }}
          >
            {submitButtonLabel}
          </PrimaryButton>

          {isFormValid && !isSwapLoading && !isTokenApprovalStatusLoading && (
            <SwapSummary swap={swap} type='supply' />
          )}
        </>
      )}
    </ApproveTokenSteps>
  )
}

export default SubmitSection
