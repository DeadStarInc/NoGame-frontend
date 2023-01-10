import { useAccount, useConnectors, useStarknet } from "@starknet-react/core";
import { InjectedConnector } from "@starknet-react/core";
import { useEffect, useMemo } from "react";
import ClassicButton from "~/components/UIComponents/Buttons/ClassicButton";
import { ButtonPrimary } from "./Button";
import ControllerConnector from "@cartridge/connector";

const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
    new ControllerConnector()
];

export function ConnectWalletButton() {
    const { connect } = useConnectors();
    const { address } = useAccount();

    useEffect(() => {
        if (window.starknet) {
            window.starknet.on("accountsChanged", () => {
                connect(connectors[1]);
            });
        }
    }, [connect, connectors[1]]);

    if (address) {
        const shortenedAddress = `${address.substring(
            0,
            6
        )}...${address.substring(59)}`;
        return <ButtonPrimary>{shortenedAddress}</ButtonPrimary>;
    }

    return (
        <>
            <ButtonPrimary
                letterSpacing={"0.02em"}
                onClick={() => connect(connectors[0])}
            >
                CONNECT BRAVOOS
            </ButtonPrimary>
            <div
                style={{
                    width: "4px",
                    height: "auto",
                    display: "inline-block",
                }}
            ></div>
            <ButtonPrimary
                letterSpacing={"0.02em"}
                onClick={() => connect(connectors[1])}
            >
                CONNECT ARGENT
            </ButtonPrimary>
            <div
                style={{
                    width: "4px",
                    height: "auto",
                    display: "inline-block",
                }}
            ></div>
            <ButtonPrimary
                letterSpacing={"0.02em"}
                onClick={() => connect(connectors[2])}
            >
                CONNECT TO CARTRIDGE
            </ButtonPrimary>
        </>
    );
}
