import { useAccount } from "@starknet-react/core";
import { useCallback } from "react";
import { Sequencer } from "starknet";
import { useS2MTransactionManager } from "~/providers/transaction";
import { useGameContract } from "../game";

export type ShipType =
    | "cargoShip"
    | "recyclerShip"
    | "espionageProbe"
    | "solarSatellite"
    | "lightFighter"
    | "cruiser"
    | "battleShip";

export default function useBuildShipComplete(resourceName: ShipType) {
    // const { account } = useStarknet();
    const { address } = useAccount();
    const { contract } = useGameContract();

    const { addTransaction } = useS2MTransactionManager();

    return useCallback(async () => {
        if (!contract || !address) {
            throw new Error("Missing Dependencies");
        }

        return contract
            .invoke(`${resourceName}BuildComplete`, [])
            .then((tx: Sequencer.AddTransactionResponse) => {
                console.log("Transaction hash: ", tx.transaction_hash);

                addTransaction({
                    status: "NOT_RECEIVED",
                    code: tx.code!,
                    transactionHash: tx.transaction_hash,
                    address: address,
                    lastUpdatedAt: 0,
                    summary: `Complete ${resourceName}`,
                });

                return tx.transaction_hash;
            })
            .catch((e) => {
                console.error(e);
            });
    }, [address, addTransaction, contract]);
}
