import { StyledTabPanel } from "./styleds";
import { useState } from "react";
import {
    FleetCost,
    EndShipsCompletion,
    Points,
    FleetLevels,
} from "~/utils/types";
import ShipyardBox from "../ShipyardBox";
import { calculEnoughResources } from "~/utils";
import BattleshipImg from "~/assets/shipyard/alt/battleship.jpg";
import CruiserImg from "~/assets/shipyard/alt/cruiser.jpg";
import ProbeImg from "~/assets/shipyard/alt/espionage-probe.jpg";
import CargoImg from "~/assets/shipyard/alt/light-cargo.jpg";
import FighterImg from "~/assets/shipyard/alt/light-fighter.jpg";
import RecyclerImg from "~/assets/shipyard/alt/recycler.jpg";
import SatelliteImg from "~/assets/shipyard/alt/solar-satellite.jpg";
import { createContext } from "vm";

interface Props {
    endShipsCompletion?: EndShipsCompletion;
    playerResources?: Points;
    fleetLevels?: FleetLevels;
    fleetCost?: FleetCost;
}

export const ShipyardTabPanel = ({
    endShipsCompletion,
    playerResources,
    fleetLevels,
    fleetCost,
    ...rest
}: Props) => {
    const [isUpgrading, setIsUpgrading] = useState(false);
    const getEndTime = (shipId: number) => {
        if (endShipsCompletion?.shipId === shipId) {
            if (endShipsCompletion?.timeEnd > 0 && !isUpgrading) {
                setIsUpgrading(true);
            }
            return endShipsCompletion.timeEnd;
        }
        return undefined;
    };

    return (
        <StyledTabPanel {...rest}>
            <ShipyardBox
                img={CargoImg}
                title="Light Transport Ship"
                functionCallName="cargoShip"
                level={fleetLevels?.cargo}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={fleetCost?.cargo}
                hasEnoughResources={
                    playerResources &&
                    fleetCost &&
                    calculEnoughResources(fleetCost.cargo, playerResources)
                }
            />
            <ShipyardBox
                img={ProbeImg}
                title="Sniffer"
                functionCallName="espionageProbe"
                level={fleetLevels?.probe}
                time={getEndTime(33)}
                costUpdate={fleetCost?.probe}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    fleetCost &&
                    calculEnoughResources(fleetCost.probe, playerResources)
                }
            />
            <ShipyardBox
                img={SatelliteImg}
                title="Solar Satellite"
                functionCallName="solarSatellite"
                level={fleetLevels?.satellite}
                time={getEndTime(34)}
                costUpdate={fleetCost?.satellite}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    fleetCost &&
                    calculEnoughResources(fleetCost.satellite, playerResources)
                }
            />
            <ShipyardBox
                img={FighterImg}
                title="Light Fighter"
                functionCallName="lightFighter"
                level={fleetLevels?.fighter}
                time={getEndTime(35)}
                costUpdate={fleetCost?.fighter}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    fleetCost &&
                    calculEnoughResources(fleetCost.fighter, playerResources)
                }
            />
            <ShipyardBox
                img={RecyclerImg}
                title="Debris Remover"
                functionCallName="recyclerShip"
                level={fleetLevels?.recycler}
                time={getEndTime(32)}
                costUpdate={fleetCost?.recycler}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    fleetCost &&
                    calculEnoughResources(fleetCost.recycler, playerResources)
                }
            />
            <ShipyardBox
                img={CruiserImg}
                title="Frigate"
                functionCallName="cruiser"
                level={fleetLevels?.cruiser}
                time={getEndTime(36)}
                costUpdate={fleetCost?.cruiser}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    fleetCost &&
                    calculEnoughResources(fleetCost.cruiser, playerResources)
                }
            />
            <ShipyardBox
                img={BattleshipImg}
                title="Warship"
                functionCallName="battleShip"
                level={fleetLevels?.battleship}
                time={getEndTime(37)}
                costUpdate={fleetCost?.battleship}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    fleetCost &&
                    calculEnoughResources(fleetCost.battleship, playerResources)
                }
            />
        </StyledTabPanel>
    );
};

ShipyardTabPanel.tabsRole = "TabPanel";
