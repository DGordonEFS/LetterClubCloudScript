
interface Equipment {
    Id: string,
    Rarity: number,
    Image:string,
    LetterData: EquipmentLetterData,
    Version:number
}

type EquipmentLetterData = { [keys: string]: number };
class EquipmentData {
    
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
        
        var tiersByRarity = [
            [
                [1],
                [2],
                [3],
                [4]
            ],
            [
                [1, 1],
                [2, 1, 1],
                [3, 2, 1],
                [4, 3, 2]
            ],
            [
                [2, 1, 1],
                [3, 2, 1],
                [4, 3, 2],
                [5, 4, 3]
            ]
        ];
        var tiersByArena = tiersByRarity[rarity];
        var tier = tiersByArena[arenaIndex];
        for (var i = 0; i < tier.length; i++) {
            letterData[getUniqueLetter()] = tier[i];
        }
        
        return letterData;
    }

    private static GetRandomRarity(): number {
        var random: number = Math.random();
        if (random > 0.95)
            return Constants.Epic;
        else if (random > 0.8)
            return Constants.Rare;
        else
            return Constants.Common;
    }

    public static GetRandomHeadGear(): Equipment {
        var arenaIndex: number = 1;
        var rarity = EquipmentData.GetRandomRarity();
        

        var equipment: Equipment = {
            Id: "",
            Rarity: rarity,
            Image:EquipmentData.GetRandomHeadgearImage(),
            LetterData: EquipmentData.GetRandomLetters(arenaIndex, rarity),
            Version: Constants.EquipmentVersion
        };

        return equipment;
    }

    private static GetRandomHeadgearImage(): string {
        return "";
    }

}