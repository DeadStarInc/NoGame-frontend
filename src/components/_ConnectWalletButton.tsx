import { useConnectors } from "@starknet-react/core";

export function ConnectWalletButton() {
    const { connect, connectors } = useConnectors();

    return (
        <ul>
            {connectors.map((connector) => (
                <li key={connector.id()}>
                    <button onClick={() => connect(connector)}>
                        Connect {connector.id()}
                    </button>
                </li>
            ))}
        </ul>
    );
}
