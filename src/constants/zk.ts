import { ZkChainId } from 'types';

export const BLOCK_TIME_MS = 3000;
// 20 blocks a minute, 60 minutes an hour, 24 hours a day
export const BLOCKS_PER_DAY = (60 / (BLOCK_TIME_MS / 1000)) * 60 * 24;
export const SECONDS_PER_DAY = 86400;

export const ZK_SCAN_URLS = {
  [ZkChainId.MAINNET]: 'https://explorer.zksync.io',
  [ZkChainId.TESTNET]: 'https://zksync2-testnet.zkscan.io',
};
