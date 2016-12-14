
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
            Common: ["glasses_common_arena_0"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena1: {
            Common: ["glasses_common_arena_1"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena2: {
            Common: ["glasses_common_arena_1"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena3: {
            Common: ["glasses_common_arena_2"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Shared: {
            Common: [],
            Rare: ["glasses_rare_shared_0"],
            Epic: ["glasses_epic_shared_0"],
            Legendary: ["glasses_legendary_shared_0"]
        }
    };

    
    private static GetRandomLetters(arenaIndex:number, rarity:number) : EquipmentLetterData {

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
        
        var tier = EquipmentData.LetterDataByArenaAndRarity["Arena" + arenaIndex][rarity];
        for (var i = 0; i < tier.length; i++) {
            letterData[getUniqueLetter()] = tier[i];
        }
        
        return letterData;
    }
    
    public static GetRandomHeadGear(rarity:number): Equipment {
        var arenaIndex: number = 1;
        
        var equipment: Equipment = {
            Id: "",
            Type: Constants.HeadGear,
            Rarity: rarity,
            Image: EquipmentData.GetRandomHeadgearImage(rarity, ["Arena" + arenaIndex, "Shared"]),
            LetterData: EquipmentData.GetRandomLetters(arenaIndex, rarity),
            Version: Constants.EquipmentVersion
        };

        return equipment;
    }

    private static GetRandomHeadgearImage(rarity:number, catagories: string[]): string {
        var pool = [];

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
    Version: number
}

interface HeadgearImages {
    Common: string[],
    Rare: string[],
    Epic: string[],
    Legendary: string[]
}

type EquipmentLetterData = { [keys: string]: number };
type HeadgearImageData = { [keys: string]: HeadgearImages };