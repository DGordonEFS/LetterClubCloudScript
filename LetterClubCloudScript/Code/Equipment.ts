
class EquipmentData {
    public static readonly LetterDataByArenaAndRarity = {
        Arena0: [
            [1],
            [1, 1],
            [2, 1, 1]
        ],
        Arena1: [
            [2],
            [2, 1, 1],
            [3, 2, 1]
        ],
        Arena2: [
            [3],
            [3, 2, 1],
            [4, 3, 2]
        ],
        Arena3: [
            [4],
            [4, 3, 2],
            [5, 4, 3]
        ]
    };

    public static readonly HeadgearImages: HeadgearImageData = {
        Arena0: {
            Common: ["glasses_common_arena_0_a", "glasses_common_arena_0_b", "glasses_common_arena_0_c", "glasses_common_arena_0_d", "glasses_common_arena_0_e"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena1: {
            Common: ["glasses_common_arena_0_a", "glasses_common_arena_0_b", "glasses_common_arena_0_c", "glasses_common_arena_0_d", "glasses_common_arena_0_e",
                    "glasses_common_arena_1_a", "glasses_common_arena_1_b", "glasses_common_arena_1_c", "glasses_common_arena_1_d", "glasses_common_arena_1_e"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena2: {
            Common: ["glasses_common_arena_0_a", "glasses_common_arena_0_b", "glasses_common_arena_0_c", "glasses_common_arena_0_d", "glasses_common_arena_0_e",
                "glasses_common_arena_1_a", "glasses_common_arena_1_b", "glasses_common_arena_1_c", "glasses_common_arena_1_d", "glasses_common_arena_1_e",
                "glasses_common_arena_2_a", "glasses_common_arena_2_b", "glasses_common_arena_2_c", "glasses_common_arena_2_d", "glasses_common_arena_2_e"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena3: {
            Common: ["glasses_common_arena_0_a", "glasses_common_arena_0_b", "glasses_common_arena_0_c", "glasses_common_arena_0_d", "glasses_common_arena_0_e",
                "glasses_common_arena_1_a", "glasses_common_arena_1_b", "glasses_common_arena_1_c", "glasses_common_arena_1_d", "glasses_common_arena_1_e",
                "glasses_common_arena_2_a", "glasses_common_arena_2_b", "glasses_common_arena_2_c", "glasses_common_arena_2_d", "glasses_common_arena_2_e",
                "glasses_common_arena_3_a", "glasses_common_arena_3_b", "glasses_common_arena_3_c", "glasses_common_arena_3_d", "glasses_common_arena_3_e"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Shared: {
            Common: ["glasses_common_shared_a", "glasses_common_shared_b", "glasses_common_shared_c", "glasses_common_shared_d", "glasses_common_shared_e"],
            Rare: ["glasses_rare_shared_f", "glasses_rare_shared_g", "glasses_rare_shared_h", "glasses_rare_shared_i", "glasses_rare_shared_j",
                "glasses_rare_shared_k", "glasses_rare_shared_l", "glasses_rare_shared_m", "glasses_rare_shared_n", "glasses_rare_shared_o",
                "glasses_rare_shared_p", "glasses_rare_shared_q", "glasses_rare_shared_r"],
            Epic: ["glasses_epic_shared_f", "glasses_epic_shared_g", "glasses_epic_shared_h", "glasses_epic_shared_i", "glasses_epic_shared_j",
                "glasses_epic_shared_k", "glasses_epic_shared_l", "glasses_epic_shared_m", "glasses_epic_shared_n", "glasses_epic_shared_o",
                "glasses_epic_shared_p", "glasses_epic_shared_q", "glasses_epic_shared_r"],
            Legendary: []
        }
    };

    
    private static GetRandomLetters(arenaIndex:number, rarity:number) : EquipmentLetterData {
        log.debug("getrandomletters");
        var letterData: EquipmentLetterData = {};

        var letters = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
            "w", "x", "y", "z"
        ];
        
        var getUniqueLetter = () => {
            var index = Math.floor(Math.random() * letters.length);
            var letter = letters[index];
            letters.splice(index, 1);
            return letter;
        };

        var arena = "Arena" + arenaIndex;
        log.debug(arena + ", " + rarity);

        var tier = EquipmentData.LetterDataByArenaAndRarity["Arena" + arenaIndex][rarity];
        log.debug("tier: " + tier);
        for (var i = 0; i < tier.length; i++) {
            letterData[getUniqueLetter()] = tier[i];
        }

        log.debug("created letters");
        
        return letterData;
    }
    
    public static GetRandomHeadGear(rarity: number): Equipment {
        log.debug("get random headgear");
        var userDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: ["profile"]
        });

        var userProfile = JSON.parse(userDataResult.Data["profile"].Value);

        var arenaIndex: number = userProfile.ArenaIndex;

        log.debug("arenaindex");

        var equipment: Equipment = {
            Id: "",
            Type: Constants.Sunglasses,
            Rarity: rarity,
            Level: arenaIndex,
            Image: EquipmentData.GetRandomHeadgearImage(rarity, ["Arena" + arenaIndex, "Shared"]),
            LetterData: EquipmentData.GetRandomLetters(arenaIndex, rarity),
            Version: Constants.EquipmentVersion
        };

        log.debug("equipment: " + equipment);
        return equipment;
    }

    private static GetRandomHeadgearImage(rarity:number, catagories: string[]): string {
        var pool = [];
        log.debug("getrandomheadgearimage");

        for (var i = 0; i < catagories.length; i++) {
            var catagory = EquipmentData.HeadgearImages[catagories[i]];
            var poolToAdd = catagory[["Common", "Rare", "Epic", "Legendary"][rarity]];

            for (var j = 0; j < poolToAdd.length; j++) {
                pool[pool.length] = poolToAdd[j];
            }
        }

        var index = Math.floor(Math.random() * pool.length);
        return pool[index];
    }

}


interface Equipment {
    Id: string,
    Type:number,
    Rarity: number,
    Image: string,
    LetterData: EquipmentLetterData,
    Version: number,
    Level: number
}

interface HeadgearImages {
    Common: string[],
    Rare: string[],
    Epic: string[],
    Legendary: string[]
}

type EquipmentLetterData = { [keys: string]: number };
type HeadgearImageData = { [keys: string]: HeadgearImages };