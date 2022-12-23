import { StyledTabPanel } from "./styleds";
import ResourceBox from "~/components/ResourceBox";

import MetalImg from "~/assets/resources/alt/metal-mine.jpg";
import CrystalImg from "~/assets/resources/alt/crystal-mine.jpg";
import DeuteriumImg from "~/assets/resources/alt/deuterium-mine.jpg";
import SolarPlantImg from "~/assets/resources/alt/solar-plant.jpg";
import {
    ResourcesCostUpgrade,
    ResourceLevels,
    Points,
    EndTimeCompletion,
} from "~/utils/types";
import { calculEnoughResources } from "~/utils";
import { useState } from "react";

interface Props {
    endTimeCompletion?: EndTimeCompletion;
    playerResources?: Points;
    resourceLevels?: ResourceLevels;
    ResourcesCostUpgrade?: ResourcesCostUpgrade;
}

export const ResourceTabPanel = ({
    endTimeCompletion,
    playerResources,
    resourceLevels,
    ResourcesCostUpgrade,
    ...rest
}: Props) => {
    const [isUpgrading, setIsUpgrading] = useState(false);
    const getEndTime = (resourceId: number) => {
        if (endTimeCompletion?.resourceId === resourceId) {
            if (endTimeCompletion?.timeEnd > 0 && !isUpgrading) {
                setIsUpgrading(true);
            }
            return endTimeCompletion.timeEnd;
        }
        return undefined;
    };

    return (
        <StyledTabPanel {...rest}>
            <ResourceBox
                img={MetalImg}
                title="Steel Mine"
                functionCallName="metal"
                level={resourceLevels?.metal}
                time={getEndTime(41)}
                isUpgrading={isUpgrading}
                costUpdate={ResourcesCostUpgrade?.metal}
                hasEnoughResources={
                    playerResources &&
                    ResourcesCostUpgrade &&
                    calculEnoughResources(
                        ResourcesCostUpgrade.metal,
                        playerResources
                    )
                }
            />
            <ResourceBox
                img={CrystalImg}
                title="Quartz Mine"
                functionCallName="crystal"
                level={resourceLevels?.crystal}
                time={getEndTime(42)}
                costUpdate={ResourcesCostUpgrade?.crystal}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    ResourcesCostUpgrade &&
                    calculEnoughResources(
                        ResourcesCostUpgrade.crystal,
                        playerResources
                    )
                }
            />
            <ResourceBox
                img={DeuteriumImg}
                title="Tritium Mine"
                functionCallName="deuterium"
                level={resourceLevels?.deuterium}
                time={getEndTime(43)}
                costUpdate={ResourcesCostUpgrade?.deuterium}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    ResourcesCostUpgrade &&
                    calculEnoughResources(
                        ResourcesCostUpgrade.deuterium,
                        playerResources
                    )
                }
            />
            <ResourceBox
                img={SolarPlantImg}
                title="Solar Plant"
                functionCallName="solar"
                level={resourceLevels?.solarPlant}
                time={getEndTime(44)}
                costUpdate={ResourcesCostUpgrade?.solarPlant}
                isUpgrading={isUpgrading}
                hasEnoughResources={
                    playerResources &&
                    ResourcesCostUpgrade &&
                    calculEnoughResources(
                        ResourcesCostUpgrade.solarPlant,
                        playerResources
                    )
                }
            />
        </StyledTabPanel>
    );
};

ResourceTabPanel.tabsRole = "TabPanel";
