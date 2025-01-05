/** @jsxImportSource @emotion/react */
import { SecondaryButton } from "../Button";
import {
  LabeledInlineContent,
  LabeledInlineContentProps,
} from "../LabeledInlineContent";
import { Spinner } from "../Spinner";
import { toast } from "../Toast";
import { TokenIcon } from "../TokenIcon";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import { useAuth } from "context/AuthContext";
import { GeolocationContext } from "context/GeolocationContext";
import { VError, formatVErrorToReadableString } from "errors";
import { ContractReceipt } from "ethers";
import useTokenApproval from "hooks/useTokenApproval";
import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "translation";
import { Token } from "types";

export interface ApproveTokenUiProps {
  token: Token;
  title: string | React.ReactElement;
  isTokenApproved: boolean;
  approveToken: () => Promise<ContractReceipt | undefined>;
  isInitialLoading?: boolean;
  isApproveTokenLoading?: boolean;
  assetInfo?: LabeledInlineContentProps[];
  disabled?: boolean;
  setIsValidAllowance: () => void;
  isValidAllowance?: boolean;
}

export const ApproveTokenUi: React.FC<ApproveTokenUiProps> = ({
  token,
  title,
  assetInfo = [],
  children,
  approveToken,
  isTokenApproved,
  isInitialLoading = false,
  isApproveTokenLoading = false,
  disabled = false,
  isValidAllowance,
  setIsValidAllowance,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { geolocation } = useContext(GeolocationContext);
  const [loading, setLoading] = useState(false);
  const handleApproveToken = async () => {
    try {
      setLoading(true);
      await approveToken();
      setLoading(false);
      setIsValidAllowance(true);
    } catch (error) {
      setLoading(false);

      let { message } = error as Error;

      if (error instanceof VError) {
        message = formatVErrorToReadableString(error);
      }

      toast.error({
        message,
      });
    }
  };

  useEffect(() => {
    if (!isValidAllowance) handleApproveToken();
  }, [isValidAllowance])

  if (isTokenApproved) {
    return <>{children}</>;
  }

  return (
    <div css={styles.container}>
      {isInitialLoading ? (
        <Spinner />
      ) : (
        <>
          <TokenIcon token={token} css={styles.mainLogo} />

          <Typography component="h3" variant="h3" css={styles.mainText}>
            {title}
          </Typography>

          {assetInfo.length > 0 && (
            <div css={styles.assetInfoContainer}>
              {assetInfo.map((info) => (
                <LabeledInlineContent
                  {...info}
                  key={info.label}
                  css={styles.labeledInlineContent}
                />
              ))}
            </div>
          )}

          <SecondaryButton
            disabled={geolocation || disabled || isApproveTokenLoading}
            loading={isApproveTokenLoading}
            fullWidth
            onClick={handleApproveToken}
            className="custom-btn-wrap"
            style={{
              backgroundImage: loading
                ? "linear-gradient(114deg, #ecaf54 0%, #e9bc11 100%)"
                : "",
            }}
          >
            {geolocation
              ? t("blockedRegion")
              : loading
              ? t("approveToken.approvingButtonLabel")
              : t("approveToken.approveButtonLabel")}
          </SecondaryButton>
        </>
      )}
    </div>
  );
};

export interface ApproveTokenProps
  extends Pick<
    ApproveTokenUiProps,
    "assetInfo" | "disabled" | "title" | "token"
  > {
  spenderAddress: string;
  setIsValidAllowance: () => void;
  isValidAllowance: boolean;
}

export const ApproveToken: React.FC<ApproveTokenProps> = ({
  token,
  spenderAddress,
  isValidAllowance,
  setIsValidAllowance,
  ...rest
}) => {
  const { accountAddress } = useAuth();

  const {
    isTokenApprovalStatusLoading,
    isTokenApproved,
    approveToken,
    isApproveTokenLoading,
  } = useTokenApproval({
    token,
    spenderAddress,
    accountAddress,
  });

  return (
    <ApproveTokenUi
      {...rest}
      token={token}
      approveToken={approveToken}
      setIsValidAllowance={setIsValidAllowance}
      isValidAllowance={isValidAllowance}
      isTokenApproved={isValidAllowance? isTokenApproved ?? false : false}
      isApproveTokenLoading={isApproveTokenLoading}
      isInitialLoading={isTokenApprovalStatusLoading}
      disabled={!accountAddress}
    />
  );
};

export default ApproveToken;
