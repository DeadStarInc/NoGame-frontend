import { useAccount } from "@starknet-react/core";
import { type } from "os";
import { useCallback } from "react";
import { Sequencer } from "starknet";
import { useS2MTransactionManager } from "~/providers/transaction";
import { useGameContract } from "../game";

export type DefenceType =
    | "rocket"
    | "lightLaser"
    | "heavyLaser"
    | "ionCannon"
    | "gauss"
    | "plasmaTurret"
    | "smallDome"
    | "largeDome";

export default function useBuildDefenceStart(
    defenceName: DefenceType,
    quantity: number
) {
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
            .invoke(`${defenceName}BuildStart`, [quantity])
            .then((tx: Sequencer.AddTransactionResponse) => {
                console.log("Transaction hash: ", tx.transaction_hash);

                addTransaction({
                    code: tx.code!,
                    status: "NOT_RECEIVED",
                    transactionHash: tx.transaction_hash!,
                    address: address,
                    lastUpdatedAt: 0,
                    summary: `Build ${defenceName}`,
                });

                return tx.transaction_hash;
            })
            .catch((e) => {
                console.error(e);
            });
    }, [account, addTransaction, contract, quantity]);
}
