/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { areTokensEqual } from 'utilities';

import { TOKENS } from 'constants/tokens';

import { NoticeInfo, NoticeWarning } from '../Notice';

export interface TokenAnnouncementProps {
  token: Token;
  className?: string;
}

export const TokenAnnouncement: React.FC<TokenAnnouncementProps> = ({ token, className }) => {
  const { Trans, t } = useTranslation();

  // TUSD migration
  if (areTokensEqual(token, TOKENS.tusdold)) {
    return (
      <NoticeInfo
        css={className}
        description={
          <Trans
            i18nKey="announcements.tusdMigration.description"
            components={{
              Link: (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  href="https://www.binance.com/en/support/announcement/binance-will-support-the-trueusd-tusd-contract-swap-52b29fadf71542afabf23acf3454f9c7"
                  rel="noreferrer"
                  target="_blank"
                />
              ),
            }}
          />
        }
      />
    );
  }

  // TRX migration
  if (areTokensEqual(token, TOKENS.trxold)) {
    return (
      <NoticeWarning
        css={className}
        description={
          <Trans
            i18nKey="announcements.trxMigration.description"
            components={{
              Link: (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  href="https://www.binance.com/en/support/announcement/binance-will-support-the-tron-trx-contract-swap-494f53e94eb64adc8335b88f7e14006a"
                  rel="noreferrer"
                />
              ),
            }}
          />
        }
      />
    );
  }

  // SXP disabling
  if (areTokensEqual(token, TOKENS.sxp)) {
    return (
      <NoticeWarning css={className} description={t('announcements.sxpDisabling.description')} />
    );
  }

  // BETH update
  if (areTokensEqual(token, TOKENS.beth)) {
    return (
      <NoticeWarning
        css={className}
        description={
          <Trans
            i18nKey="announcements.bethUpdate.description"
            components={{
              Link: (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  href="https://www.binance.com/en/support/announcement/binance-supports-beth-to-wbeth-conversion-on-bnb-smart-chain-a7d439452e034c3c85fcc7128d0973b0"
                  rel="noreferrer"
                  target="_blank"
                />
              ),
            }}
          />
        }
      />
    );
  }

  return null;
};
