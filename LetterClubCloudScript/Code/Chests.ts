

interface Chest {
    Type: string,
    ChestId: string,
    Index: number,
    PriceCode: string,
    PriceCost: number,
    IsSale: boolean,
    SalePrice: number,
    CoinsMin: number,
    CoinsMax: number,
    GemsMin: number,
    GemsMax: number,
    LetterTiers: [number, number, number, number],
    UniqueLetters: number,
    SpecificLetters: { Letter: string, Amount: number }[],
    RandomHeadGears: number,
    RandomHeadGearsRarityWeights: [number, number, number, number],
    SpecificItems: Equipment[],
    RandomAvatars: number,
    RandomAvatarRarityWeights: [number, number, number, number],
    SpecificAvatars: string[]
}

class ChestData
{
    public static GetSmallChest() : Chest
    {
        return {
            Type: "letter_chest",
            ChestId: "brown",
            Index: 0,
            PriceCode: "GM",
            PriceCost: 35,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: 150,
            CoinsMax: 250,
            GemsMin: 0,
            GemsMax: 0,
            UniqueLetters: 4,
            LetterTiers: [9, 1, 0, 0],
            SpecificLetters: [],
            RandomHeadGears: 1,
            RandomHeadGearsRarityWeights: [0, 1, 0, 0],
            SpecificItems: [],
            RandomAvatars: 0,
            RandomAvatarRarityWeights: [0, 0, 0, 0],
            SpecificAvatars: []
        };
    }

    public static GetMediumChest(): Chest {
        return {
            Type: "letter_chest",
            ChestId: "red",
            Index: 1,
            PriceCode: "GM",
            PriceCost: 180,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: 1050,
            CoinsMax: 1350,
            GemsMin: 0,
            GemsMax: 0,
            UniqueLetters: 6,
            LetterTiers: [5, 9, 4, 0],
            SpecificLetters: [],
            RandomHeadGears: 1,
            RandomHeadGearsRarityWeights: [0, 3, 1, 0],
            SpecificItems: [],
            RandomAvatars: 1,
            RandomAvatarRarityWeights: [0, 4, 1, 0],
            SpecificAvatars: []
        };
    }

    public static GetLargeChest(): Chest {
        return {
            Type: "letter_chest",
            ChestId: "gold",
            Index: 2,
            PriceCode: "GM",
            PriceCost: 450,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: 2250,
            CoinsMax: 3000,
            GemsMin: 0,
            GemsMax: 0,
            UniqueLetters: 8,
            LetterTiers: [0, 16, 12, 2],
            SpecificLetters: [],
            RandomHeadGears: 2,
            RandomHeadGearsRarityWeights: [0, 0, 1, 0],
            SpecificItems: [],
            RandomAvatars: 1,
            RandomAvatarRarityWeights: [0, 0, 1, 0],
            SpecificAvatars: []
        };
    }

    public static GetNewUserChest(): Chest {
        return {
            Type: "new_user_chest",
            ChestId: "purple",
            Index:-1,
            PriceCode: null,
            PriceCost: 0,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: 100,
            CoinsMax: 100,
            GemsMin: 10,
            GemsMax: 10,
            UniqueLetters: 26,
            LetterTiers: [0, 0, 0, 0],
            SpecificLetters: [{ Letter: "g", Amount: 3 }, { Letter: "i", Amount: 3 }, { Letter: "a", Amount: 5 }],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 0, 0, 0],
            SpecificItems: [],
            RandomAvatars: 0,
            RandomAvatarRarityWeights: [0, 0, 0, 0],
            SpecificAvatars: []
        };
    }

    public static GetRewardChest(): Chest {

        var userDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: ["profile"]
        });

        var userProfile = JSON.parse(userDataResult.Data["profile"].Value);


        var randomHeadGear = 0;
        if (Math.random() < 0.33) 
            randomHeadGear = 1;

        var randomAvatar = 0;
        if (Math.random() < 0.1)
            randomAvatar = 1;
        
        return {
            Type: "reward_chest",
            ChestId: "purple",
            Index: -1,
            PriceCode: null,
            PriceCost: 0,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: (userProfile.ArenaIndex + 1) * 20,
            CoinsMax: (userProfile.ArenaIndex + 1) * 20,
            GemsMin: 1,
            GemsMax: 3,
            UniqueLetters: 26,
            LetterTiers: [userProfile.ArenaIndex + 2, 0, 0, 0],
            SpecificLetters: [],
            RandomHeadGears: randomHeadGear,
            RandomHeadGearsRarityWeights: [900, 95, 5, 0],
            SpecificItems: [],
            RandomAvatars: randomAvatar,
            RandomAvatarRarityWeights: [900, 100, 0, 0],
            SpecificAvatars: []
        };
    }

    public static GetStarterChestSmall(): Chest
    {
        return {
            Type: "starter_chest_small",
            ChestId: "purple",
            Index: -1,
            PriceCode: null,
            PriceCost: 0,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: 500,
            CoinsMax: 500,
            GemsMin: 65,
            GemsMax: 65,
            UniqueLetters: 4,
            LetterTiers: [0, 5, 0, 0],
            SpecificLetters: [],
            RandomHeadGears: 1,
            RandomHeadGearsRarityWeights: [0, 1, 0, 0],
            SpecificItems: [],
            RandomAvatars: 0,
            RandomAvatarRarityWeights: [0, 0, 0, 0],
            SpecificAvatars: []
        };
    }

    public static GetStarterChestLarge(): Chest {
        return {
            Type: "starter_chest_large",
            ChestId: "purple",
            Index: -1,
            PriceCode: null,
            PriceCost: 0,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: 2500,
            CoinsMax: 2500,
            GemsMin: 325,
            GemsMax: 325,
            UniqueLetters: 7,
            LetterTiers: [0, 1, 2, 4],
            SpecificLetters: [],
            RandomHeadGears: 1,
            RandomHeadGearsRarityWeights: [0, 0, 1, 0],
            SpecificItems: [],
            RandomAvatars: 1,
            RandomAvatarRarityWeights: [0, 1, 0, 0],
            SpecificAvatars: []
        };
    }

    
    public static GetChests() {
        return {
            small_letter_chest: ChestData.GetSmallChest(),
            medium_letter_chest: ChestData.GetMediumChest(),
            large_letter_chest: ChestData.GetLargeChest(),
            new_user_chest: ChestData.GetNewUserChest(),
            reward_chest: ChestData.GetRewardChest(),
            starter_chest_small: ChestData.GetStarterChestSmall(),
            starter_chest_large: ChestData.GetStarterChestLarge()
        };
    }

    public static PurchaseChest = function (data: Chest): ChestResult {
        var chestId = data.ChestId;
        var priceCode = data.PriceCode;
        var priceCost = data.PriceCost;
        var awardGems = getRandomIntBetween(data.GemsMin, data.GemsMax);
        var awardCoins = getRandomIntBetween(data.CoinsMin, data.CoinsMax);
        var letterTiers = data.LetterTiers;
        var specificLetters = data.SpecificLetters;
        var randomHeadGears = data.RandomHeadGears;
        var randomHeadGearsRarityWeights = data.RandomHeadGearsRarityWeights;
        var specificItems = data.SpecificItems;

        var randomItemRarityWeightTotal = randomHeadGearsRarityWeights[0] + randomHeadGearsRarityWeights[1] + randomHeadGearsRarityWeights[2] + randomHeadGearsRarityWeights[3];

        var userDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: ["profile"]
        });

        var userProfile = JSON.parse(userDataResult.Data["profile"].Value);
        
        log.debug("purchaseChest()");
        var chestResult: ChestResult = {
            Success: false,
            Message: "",
            ChestId: chestId,
            GemsAdded: awardGems,
            GemsTotal: -1,
            CoinsAdded: awardCoins,
            CoinsTotal: -1,
            LettersAdded: [],
            Letters: null,
            ItemsAdded: [],
            Inventory: null,
            AvatarsAdded: [],
            Avatars: null
        }

        log.debug("getInventory()");
        var inventoryResult = server.GetUserInventory({ PlayFabId: currentPlayerId });

        if (priceCost > 0) {
            //log.debug("subtract price");
            if (inventoryResult.VirtualCurrency[priceCode] < priceCost) {
                chestResult.Success = false;
                chestResult.Message = "Not enough currency of type: " + priceCode;
                return chestResult;
            }

            // subtract price
            var currencyResult = server.SubtractUserVirtualCurrency({
                PlayFabId: currentPlayerId,
                VirtualCurrency: priceCode,
                Amount: priceCost
            });
        }

        if (awardGems > 0) {
            //	log.debug("award gems");
            // add gems
            var currencyResult = server.AddUserVirtualCurrency({
                PlayFabId: currentPlayerId,
                VirtualCurrency: "GM",
                Amount: awardGems
            });
            chestResult.GemsTotal = currencyResult.Balance;
        }

        if (awardCoins > 0) {
            //log.debug("award coins");
            // add coins
            var currencyResult = server.AddUserVirtualCurrency({
                PlayFabId: currentPlayerId,
                VirtualCurrency: "CO",
                Amount: awardCoins
            });
            chestResult.CoinsTotal = currencyResult.Balance;
        }

        log.debug("get user internal data!");
        // get the user's letter values
        var internalDataResult = server.GetUserInternalData({
            PlayFabId: currentPlayerId,
            Keys: [Constants.Letters, Constants.Avatars, Constants.Equipment, Constants.UniqueEquipment]
        });
        log.debug("set letters total");
        log.debug(internalDataResult.Data[Constants.Letters].Value);
        chestResult.Letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);
        chestResult.Inventory = JSON.parse(internalDataResult.Data[Constants.Equipment].Value);

        log.debug("pull letters");
        // add the new letter values to the existing
        var alphabet = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
            "w", "x", "y", "z"
        ];

        var letters = [];

        for (var i = 0; i < data.UniqueLetters; i++)
        {
            var index = Math.floor(Math.random() * alphabet.length);
            letters.push(alphabet[index]);
            alphabet.splice(index, 1);
        }

        log.debug("random letters assigned");

        var pulledLetter = -1;
        var getLetter = () =>
        {
            pulledLetter++;

            if (pulledLetter < letters.length)
                return letters[pulledLetter];

            return letters[Math.floor(Math.random() * letters.length)];
        }

        log.debug("letters tier 0");
        var letter: string;
        var amount: number;
        for (var i = 0; i < letterTiers[0]; i++) {
            letter = getLetter();
            amount = 1 + Math.floor(Math.random() * 3); // 1 - 3

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        log.debug("letters tier 1");
        for (var i = 0; i < letterTiers[1]; i++) {
            letter = getLetter();
            amount = 10;

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        log.debug("letters tier 2");
        for (var i = 0; i < letterTiers[2]; i++) {
            letter = getLetter();
            amount = 20;

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        log.debug("letters tier 3");
        for (var i = 0; i < letterTiers[3]; i++) {
            letter = getLetter();
            amount = 50;

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        for (var i = 0; i < specificLetters.length; i++) {
            letter = specificLetters[i].Letter;
            amount = specificLetters[i].Amount;

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        log.debug("equipment");

        var uniqueEquipmentId = 0;
        if (internalDataResult.Data[Constants.UniqueEquipment] != null)
            uniqueEquipmentId = JSON.parse(internalDataResult.Data[Constants.UniqueEquipment].Value);
        log.debug("uniqueEquipment: " + uniqueEquipmentId);
        if (uniqueEquipmentId == null)
            uniqueEquipmentId = 0;

        var maxEquipment = 24 - randomHeadGears;
        var overflow = chestResult.Inventory.length - maxEquipment;
        log.debug("overflow: " + chestResult.Inventory.length + ", " + overflow);
        for (var i = 0; i < overflow; i++)
        {
            var lowestPower: number = 999999;
            var lowestIndex: number = 0;
            // get the worst equipment and junk it.
            for (var j = 0; j < chestResult.Inventory.length; j++) {
                var equipment: Equipment = chestResult.Inventory[j];

                if (equipment.Id == userProfile.SunglassesId || equipment.Locked)
                    continue;

                var power = equipment.Level + equipment.Rarity;

                if (power < lowestPower) {
                    lowestPower = power;
                    lowestIndex = j;
                }
            }

            log.debug("remove item at: " + lowestIndex);
            chestResult.Inventory.splice(lowestIndex, 1);
        }

        log.debug("num items after overflow: " + chestResult.Inventory.length);

        for (var i = 0; i < randomHeadGears; i++) {
            log.debug("   - create random headgear");
            var rarityIndex = Math.floor(Math.random() * randomItemRarityWeightTotal);
            var rarity;


            if (rarityIndex < randomHeadGearsRarityWeights[0])
                rarity = Constants.Common;
            else if (rarityIndex < randomHeadGearsRarityWeights[0] + randomHeadGearsRarityWeights[1])
                rarity = Constants.Rare;
            else if (rarityIndex < randomHeadGearsRarityWeights[0] + randomHeadGearsRarityWeights[1] + randomHeadGearsRarityWeights[2])
                rarity = Constants.Epic;
            else
                rarity = Constants.Legendary;


            log.debug("rarity: " + rarity);

            var equipment = EquipmentData.GetRandomHeadGear(rarity);

            equipment.Id = "headgear_" + uniqueEquipmentId++;

            log.debug("instance: " + equipment);

            chestResult.ItemsAdded.push(equipment);
            chestResult.Inventory.push(equipment);
        }


        
        
        chestResult.Avatars = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);

        log.debug("random avatars");
        for (var i = 0; i < data.RandomAvatars; i++) {
            log.debug("   - create random avatar");
            var rarityIndex = Math.floor(Math.random() * randomItemRarityWeightTotal);
            var rarity;


            log.debug("rarityIndex: " + rarityIndex);

            log.debug("data: " + data);
            log.debug("RandomAvatarRarityWeights: " + data.RandomAvatarRarityWeights);
            log.debug("RandomAvatarRarityWeights len: " + data.RandomAvatarRarityWeights.length);
            log.debug("RandomAvatarRarityWeights 0: " + data.RandomAvatarRarityWeights[0]);
            log.debug("RandomAvatarRarityWeights 1: " + data.RandomAvatarRarityWeights[1]);
            log.debug("RandomAvatarRarityWeights 2: " + data.RandomAvatarRarityWeights[2]);

            var commonWeight: number = data.RandomAvatarRarityWeights[0];
            log.debug("common weight: " + commonWeight);

            var rareWeight: number = data.RandomAvatarRarityWeights[1];
            log.debug("rare weight: " + rareWeight);

            var epicWeight: number = data.RandomAvatarRarityWeights[2];
            log.debug("epic weight: " + epicWeight);

            if (rarityIndex < commonWeight) {
                log.debug("setting common");
                rarity = Constants.Common;
                log.debug("set common");
            }
            else if (rarityIndex < commonWeight + rareWeight) {
                log.debug("setting rare");
                rarity = Constants.Rare;
                log.debug("set rare");
            }
            else if (rarityIndex < commonWeight + rareWeight + epicWeight) {
                log.debug("setting epic");
                rarity = Constants.Epic;
                log.debug("set epic");
            }

            log.debug("rarity selected");
            log.debug("rarity: " + rarity);

            var avatar = AvatarData.GetRandomAvatar(rarity);

            log.debug("avatar: " + avatar.Id);
            chestResult.AvatarsAdded.push(avatar.Id);


            if (!chestResult.Avatars[avatar.Id].IsPurchased) {
                log.debug("new avatar: " + avatar.Id);
                chestResult.Avatars[avatar.Id].IsPurchased = true;
            }
            else {
                log.debug("xp avatar: " + avatar.Id);
                chestResult.Avatars[avatar.Id].Xp += Constants.XpPerAvatar;
            }
        }

        log.debug("specific avatars");
        for (var i = 0; i < data.SpecificAvatars.length; i++) {
            var avatarId = data.SpecificAvatars[i];

            chestResult.AvatarsAdded.push(avatarId);

            if (!chestResult.Avatars[avatarId].IsPurchased)
                chestResult.Avatars[avatarId].IsPurchased = true;
            else
                chestResult.Avatars[avatarId].Xp += Constants.XpPerAvatar;
        }


        log.debug("send internal data");
        // send the modified values back to the player's internal data
        var returnData: { [keys: string]: string } = {};
        returnData[Constants.Letters] = JSON.stringify(chestResult.Letters);
        returnData[Constants.Equipment] = JSON.stringify(chestResult.Inventory);
        returnData[Constants.Avatars] = JSON.stringify(chestResult.Avatars);
        returnData[Constants.UniqueEquipment] = JSON.stringify(uniqueEquipmentId);
        internalDataResult = server.UpdateUserInternalData({
            PlayFabId: currentPlayerId,
            Data: returnData
        });

        

            /*
        if (itemsToAdd.length > 0) {
            //	log.debug("add items");
            var grantItemsResult = server.GrantItemsToUser({
                PlayFabId: currentPlayerId,
                ItemIds: itemsToAdd
            });

            // reupdate the inventory
            inventoryResult = server.GetUserInventory({ PlayFabId: currentPlayerId });
        }*/

        log.debug("complete");
        chestResult.Success = true;
        return chestResult;
    }
}

var getRandomIntBetween = function (min, max) {
    return min + Math.round((max - min) * Math.random());
}






interface ChestResult {
    Success: boolean,
    Message: string,
    ChestId: string,
    GemsAdded: number,
    GemsTotal: number,
    CoinsAdded: number,
    CoinsTotal: number,
    LettersAdded: { Letter: string, Amount: number }[],
    Letters: {},
    ItemsAdded: Equipment[],
    Inventory: Equipment[],
    AvatarsAdded: string[],
    Avatars: AvatarList
}