import { create } from "zustand";

import { ZkMetaMaskData } from "../model/web3.models";
import { MetaMask } from "@web3-react/metamask";
import { Web3ReactHooks, initializeConnector } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { URLS } from "./chains";

interface ZkMetaMaskDataState {
    zkMetaMaskData: ZkMetaMaskData | undefined;
    metaMask: MetaMask | undefined;
    metaMaskHooks: Web3ReactHooks | undefined;
    network: Network | undefined;
    networkHooks: Web3ReactHooks | undefined;
    isLoggedIn: boolean;
    connectMetaMask: () => void;
    disconnectMetaMask: () => void;
    connectNetwork: () => void;
    disconnectNetwork: () => void;
    setLoginState: (loginState: boolean) => void;
}

export const useStore = create<ZkMetaMaskDataState>((set) => ({
    // initial state
    zkMetaMaskData: undefined,
    metaMask: undefined,
    metaMaskHooks: undefined,
    network: undefined,
    networkHooks: undefined,
    isLoggedIn: false,
    // methods for manipulating state
    connectMetaMask: () => {
        set((state: ZkMetaMaskDataState) => {
            console.log("Connecting to Metamask...");
            const [_metaMask, _metaMaskHooks] = initializeConnector<MetaMask>(
                (actions) => new MetaMask({ actions })
            );
            return {
                zkMetaMaskData: state.zkMetaMaskData,
                metaMask: _metaMask,
                metaMaskHooks: _metaMaskHooks,
                network: state.network,
                networkHooks: state.networkHooks,
                isLoggedIn: state.isLoggedIn,
            };
        });
    },
    disconnectMetaMask: () => {
        set((state: ZkMetaMaskDataState) => {
            if (state.metaMask?.deactivate) {
                state.metaMask?.deactivate();
            } else {
                state.metaMask?.resetState();
            }
            return {
                zkMetaMaskData: state.zkMetaMaskData,
                metaMask: undefined,
                metaMaskHooks: undefined,
                network: state.network,
                networkHooks: state.networkHooks,
                isLoggedIn: state.isLoggedIn,
            };
        });
    },
    connectNetwork: () => {
        set((state: ZkMetaMaskDataState) => {
            console.log("Connecting to Network...");
            const [_network, _networkHooks] = initializeConnector<Network>(
                (actions) => new Network({ actions, urlMap: URLS })
            );
            return {
                zkMetaMaskData: state.zkMetaMaskData,
                metaMask: state.metaMask,
                metaMaskHooks: state.metaMaskHooks,
                network: _network,
                networkHooks: _networkHooks,
                isLoggedIn: state.isLoggedIn,
            };
        });
    },
    disconnectNetwork: () => {
        set((state: ZkMetaMaskDataState) => {
            if (state.network?.deactivate) {
                state.network?.deactivate();
            } else {
                state.network?.resetState();
            }
            return {
                zkMetaMaskData: state.zkMetaMaskData,
                metaMask: state.metaMask,
                metaMaskHooks: state.metaMaskHooks,
                network: undefined,
                networkHooks: undefined,
                isLoggedIn: state.isLoggedIn,
            };
        });
    },
    setLoginState: (loginState: boolean) => {
        set((state: ZkMetaMaskDataState) => {
            console.log("Is Logged In:", loginState);
            return {
                zkMetaMaskData: state.zkMetaMaskData,
                metaMask: state.metaMask,
                metaMaskHooks: state.metaMaskHooks,
                network: state.network,
                networkHooks: state.networkHooks,
                isLoggedIn: loginState,
            };
        });
    },
}));
