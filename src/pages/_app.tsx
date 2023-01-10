import type { AppProps } from "next/app";
import NextHead from "next/head";
import { FixedGlobalStyle, ThemedGlobalStyle } from "../theme";
import {
    StarknetConfig,
    InjectedConnector,
    StarknetProvider,
    useAccount,
    useConnectors,
    useStarknet,
    useStarknetCall,
} from "@starknet-react/core";
import { BigNumber } from "bignumber.js";
import React, { useEffect, useMemo, useState } from "react";
import { S2MTransactionManagerProvider } from "~/providers/transaction";
import { useErc721Contract } from "~/hooks/erc721";
import Popups from "~/components/Popups";
import { AppWrapper } from "~/components/Core/AppWrapper";
import useGeneratePlanet from "~/hooks/calls/useGeneratePlanet";
import AuthScreen from "~/pages/loginOrGenerate";
import { uint256 } from "starknet";
import Dashboard from "./dashboard";
import "react-tabs/style/react-tabs.css";

const AuthController = ({ Component, pageProps }: AppProps) => {
    const { account } = useStarknet();
    const { address } = useAccount();
    // const { connect } = useConnectors();

    const [walletConnectLoading, setWalletConnectLoading] =
        useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setWalletConnectLoading(false);
        }, 2500);
    }, [walletConnectLoading]);

    const { contract: erc721Contract } = useErc721Contract();
    // Not sure about the returned result of this call, if 0 then no planet?
    const { data, error, loading } = useStarknetCall({
        contract: erc721Contract,
        method: "ownerToPlanet",
        args: [address],
    });
    const generatePlanet = useGeneratePlanet();

    const hasGeneratedPlanets = useMemo(() => {
        if (data) {
            const planetIdBN = new BigNumber(
                uint256.uint256ToBN(data["token_id"])
            ).toNumber();

            return planetIdBN > 0;
        }
    }, [data]);

    if (!address || !hasGeneratedPlanets || loading || walletConnectLoading) {
        return (
            <AuthScreen
                address={account}
                generatePlanet={() => generatePlanet()}
                walletConnectLoading={walletConnectLoading}
                loading={loading || !data}
                hasGeneratedPlanets={hasGeneratedPlanets}
            />
        );
    }

    return <Dashboard />;
};

function MyApp(props: AppProps) {
    BigNumber.config({ EXPONENTIAL_AT: 76 });

    const { address } = useAccount();
    console.log("account", typeof address);

    const connectors = [
        new InjectedConnector({ options: { id: "braavos" } }),
        new InjectedConnector({ options: { id: "argentX" } }),
    ];

    return (
        <StarknetConfig connectors={connectors}>
            <S2MTransactionManagerProvider>
                <NextHead>
                    <title>NoGame</title>
                </NextHead>
                <FixedGlobalStyle />
                <ThemedGlobalStyle />
                <Popups />
                <AppWrapper>
                    <AuthController {...props} />
                </AppWrapper>
            </S2MTransactionManagerProvider>
        </StarknetConfig>
    );
}

export default MyApp;
