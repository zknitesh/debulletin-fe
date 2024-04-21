import type { AddEthereumChainParameter } from "@web3-react/types";

export interface ZkMetaMaskData {
    activeNetwork: string;
    activeNetworkChainId: string;
}

export interface BasicChainInformation {
    urls: string[];
    name: string;
}

export interface ExtendedChainInformation extends BasicChainInformation {
    nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
    blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

export type ChainConfig = {
    [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};
