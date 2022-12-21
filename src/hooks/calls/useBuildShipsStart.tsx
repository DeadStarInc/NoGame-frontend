import { useAccount, useStarknet } from "@starknet-react/core";
import { useCallback } from "react";
import {
    InvokeTransactionResponse,
    constants,
    CommonTransactionReceiptResponse,
    Sequencer,
} from "starknet";
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

export default function useBuildShipStart(
    shipName: ShipType,
    quantity: number
) {
    // const { account } = useStarknet();
    const { account, address } = useAccount();
    console.log("account", account);
    console.log("address", address);
    const { contract } = useGameContract();

    const { addTransaction } = useS2MTransactionManager();
    return useCallback(async () => {
        if (!contract || !account) {
            throw new Error("Missing Dependencies");
        }

        return contract
            .invoke(`${shipName}BuildStart`, [quantity])
            .then((tx: Sequencer.AddTransactionResponse) => {
                console.log("Transaction hash: ", tx.transaction_hash);

                addTransaction({
                    code: tx.code!,
                    status: "NOT_RECEIVED",
                    transactionHash: tx.transaction_hash!,
                    address: address,
                    lastUpdatedAt: 0,
                    summary: `Build ${shipName}`,
                });

                return tx.transaction_hash;
            })
            .catch((e) => {
                console.error(e);
            });
    }, [account, addTransaction, contract, quantity]);
}
