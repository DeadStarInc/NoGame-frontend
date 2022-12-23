import { StyledTabPanel } from "./styleds";
import { useState } from "react";
import {
    DefenceCost,
    DefenceLevels,
    Points,
    EndDefenceCompletion,
} from "~/utils/types";
import DefencesBox from "../DefencesBox";
import { calculEnoughResources } from "~/utils";
import RocketImg from "~/assets/defences/rocket.jpg";
import LightLaserImg from "~/assets/defences/light-laser.jpg";
import HeavyLaserImg from "~/assets/defences/heavy-laser.jpg";
import IonCannonImg from "~/assets/defences/ion-cannon.jpg";
import GaussImg from "~/assets/defences/gauss.jpg";
import PlasmaTurretImg from "~/assets/defences/plasma-turret.jpg";
import SmallDomeImg from "~/assets/defences/small-dome.jpg";
import LargeDomeImg from "~/assets/defences/large-dome.jpg";

interface Props {
    endDefenceCompletion?: EndDefenceCompletion;
    playerResources?: Points;
    defenceLevels?: DefenceLevels;
    defenceCost?: DefenceCost;
}

export const DefenceTabPanel = ({
    endDefenceCompletion,
    playerResources,
    defenceLevels,
    defenceCost,
    ...rest
}: Props) => {
    const [isUpgrading, setIsUpgrading] = useState(false);
    const getEndTime = (defenceId: number) => {
        if (endDefenceCompletion?.defenceId === defenceId) {
            if (endDefenceCompletion?.timeEnd > 0 && !isUpgrading) {
                setIsUpgrading(true);
            }
            return endDefenceCompletion.timeEnd;
        }
        return undefined;
    };

    return (
        <StyledTabPanel {...rest}>
            <DefencesBox
                img={RocketImg}
                title="Missiles Launcher"
                functionCallName="rocket"
                level={defenceLevels?.rocket}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.rocket}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(defenceCost.rocket, playerResources)
                }
            />
            <DefencesBox
                img={LightLaserImg}
                title="Light Photon Gun"
                functionCallName="lightLaser"
                level={defenceLevels?.lightLaser}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.lightLaser}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(
                        defenceCost.lightLaser,
                        playerResources
                    )
                }
            />
            <DefencesBox
                img={HeavyLaserImg}
                title="Heavy Photon Gun"
                functionCallName="heavyLaser"
                level={defenceLevels?.heavyLaser}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.heavyLaser}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(
                        defenceCost.heavyLaser,
                        playerResources
                    )
                }
            />
            <DefencesBox
                img={IonCannonImg}
                title="Electron Cannon"
                functionCallName="ionCannon"
                level={defenceLevels?.ionCannon}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.ionCannon}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(
                        defenceCost.ionCannon,
                        playerResources
                    )
                }
            />
            <DefencesBox
                img={GaussImg}
                title="Electromagnetic Cannon"
                functionCallName="gauss"
                level={defenceLevels?.gauss}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.gauss}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(defenceCost.gauss, playerResources)
                }
            />
            <DefencesBox
                img={PlasmaTurretImg}
                title="Plasma Projector"
                functionCallName="plasmaTurret"
                level={defenceLevels?.plasmaTurret}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.plasmaTurret}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(
                        defenceCost.plasmaTurret,
                        playerResources
                    )
                }
            />
            <DefencesBox
                img={SmallDomeImg}
                title="Small Energy Shield"
                functionCallName="smallDome"
                level={defenceLevels?.smallDome}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.smallDome}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(
                        defenceCost.smallDome,
                        playerResources
                    )
                }
            />
            <DefencesBox
                img={LargeDomeImg}
                title="Large Energy Shield"
                functionCallName="largeDome"
                level={defenceLevels?.largeDome}
                time={getEndTime(31)}
                isUpgrading={isUpgrading}
                costUpdate={defenceCost?.largeDome}
                hasEnoughResources={
                    playerResources &&
                    defenceCost &&
                    calculEnoughResources(
                        defenceCost.largeDome,
                        playerResources
                    )
                }
            />
        </StyledTabPanel>
    );
};

DefenceTabPanel.tabsRole = "TabPanel";
