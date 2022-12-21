import { useStarknet } from "@starknet-react/core";
import { useCallback } from "react";
import { Sequencer } from "starknet";
import { useS2MTransactionManager } from "~/providers/transaction";
import { useGameContract } from "../game";

export default function useCollectResources() {
    const { account } = useStarknet();
    const { contract } = useGameContract();

    const { addTransaction } = useS2MTransactionManager();

    return useCallback(async () => {
        if (!contract || !account) {
            throw new Error("Missing Dependencies");
        }

        return contract
            .invoke("collectResources", [])
            .then((tx: Sequencer.AddTransactionResponse) => {
                console.log("Transaction hash: ", tx.transaction_hash);

                addTransaction({
                    code: tx.code!,
                    status: "NOT_RECEIVED",
                    lastUpdatedAt: 0,
                    transactionHash: tx.transaction_hash,
                    address: account,
                    summary: `Collecting resources`,
                });

                return tx.transaction_hash;
            })
            .catch((e) => {
                console.error(e);
            });
    }, [account, addTransaction, contract]);
}
