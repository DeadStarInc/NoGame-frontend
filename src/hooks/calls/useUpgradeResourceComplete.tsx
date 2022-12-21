import { useStarknet } from "@starknet-react/core";
import { useCallback } from "react";
import { Sequencer } from "starknet";
import { useS2MTransactionManager } from "~/providers/transaction";
import { useGameContract } from "../game";

export type ResourceType =
    | "metal"
    | "crystal"
    | "deuterium"
    | "solar"
    | "robot"
    | "shipyard"
    | "research"
    | "nanite"
    | "cargoShip"
    | "recyclerShip"
    | "espionageProbe"
    | "solarSatellite"
    | "lightFighter"
    | "cruiserBuild"
    | "battleShip"
    | "armourTech"
    | "astrophysics"
    | "combustionDrive"
    | "computerTech"
    | "energyTech"
    | "espionageTech"
    | "hyperspaceDrive"
    | "hyperspaceTech"
    | "impulseDrive"
    | "ionTech"
    | "laserTech"
    | "plasmaTech"
    | "shieldingTech"
    | "weaponsTech";

export default function useCompleteResource(resourceName: ResourceType) {
    const { account } = useStarknet();
    const { contract } = useGameContract();

    const { addTransaction } = useS2MTransactionManager();

    return useCallback(async () => {
        if (!contract || !account) {
            throw new Error("Missing Dependencies");
        }

        return contract
            .invoke(`${resourceName}UpgradeComplete`, [])
            .then((tx: Sequencer.AddTransactionResponse) => {
                console.log("Transaction hash: ", tx.transaction_hash);

                addTransaction({
                    code: tx.code!,
                    status: "NOT_RECEIVED",
                    transactionHash: tx.transaction_hash,
                    address: account,
                    lastUpdatedAt: 0,
                    summary: `Complete ${resourceName}`,
                });

                return tx.transaction_hash;
            })
            .catch((e) => {
                console.error(e);
            });
    }, [account, addTransaction, contract]);
}
