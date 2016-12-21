

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
    SpecificLetters: { Letter: string, Amount: number }[],
    RandomHeadGears: number,
    RandomHeadGearsRarityWeights: [number, number, number, number],
    SpecificItems: Equipment[]
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
            CoinsMin: 350,
            CoinsMax: 450,
            GemsMin: 0,
            GemsMax: 0,
            LetterTiers: [9, 1, 0, 0],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [1000, 100, 10, 0],
            SpecificItems: []
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
            CoinsMin: 2150,
            CoinsMax: 2450,
            GemsMin: 0,
            GemsMax: 0,
            LetterTiers: [9, 5, 9, 0],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 100, 1, 0],
            SpecificItems: []
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
            CoinsMin: 5550,
            CoinsMax: 6050,
            GemsMin: 0,
            GemsMax: 0,
            LetterTiers: [0, 16, 12, 2],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 10, 1, 0],
            SpecificItems: []
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
            LetterTiers: [0, 0, 0, 0],
            SpecificLetters: [{ Letter: "g", Amount: 3 }, { Letter: "i", Amount: 3 }, { Letter: "a", Amount: 5 }],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 0, 0, 0],
            SpecificItems: []
        };
    }

    public static GetRewardChest(): Chest {

        var userDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: ["profile"]
        });

        var userProfile = JSON.parse(userDataResult.Data["profile"].Value);

        return {
            Type: "reward_chest",
            ChestId: "purple",
            Index: -1,
            PriceCode: null,
            PriceCost: 0,
            IsSale: false,
            SalePrice: -1,
            CoinsMin: (userProfile.ArenaIndex + 1) * 50,
            CoinsMax: (userProfile.ArenaIndex + 1) * 50,
            GemsMin: 1,
            GemsMax: 3,
            LetterTiers: [userProfile.ArenaIndex + 2, 0, 0, 0],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [1000, 10, 0, 0],
            SpecificItems:[]
        };
    }

    
    public static GetChests() {
        return {
            small_letter_chest: ChestData.GetSmallChest(),
            medium_letter_chest: ChestData.GetMediumChest(),
            large_letter_chest: ChestData.GetLargeChest(),
            new_user_chest: ChestData.GetNewUserChest(),
            reward_chest: ChestData.GetRewardChest()
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
            Inventory: null
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

        log.debug("letters tier 0");
        // add the new letter values to the existing
        var letters = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
            "w", "x", "y", "z"
        ];

        var letter: string;
        var amount: number;
        for (var i = 0; i < letterTiers[0]; i++) {
            letter = letters[Math.floor(Math.random() * 26)];
            amount = 1 + Math.floor(Math.random() * 5); // 1 - 5

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        log.debug("letters tier 1");
        for (var i = 0; i < letterTiers[1]; i++) {
            letter = letters[Math.floor(Math.random() * 26)];
            amount = 10;

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        log.debug("letters tier 2");
        for (var i = 0; i < letterTiers[2]; i++) {
            letter = letters[Math.floor(Math.random() * 26)];
            amount = 20;

            chestResult.LettersAdded.push({ Letter: letter, Amount: amount });
            chestResult.Letters[letter].Amount += amount;
        }

        log.debug("letters tier 3");
        for (var i = 0; i < letterTiers[3]; i++) {
            letter = letters[Math.floor(Math.random() * 26)];
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

        log.debug("send internal data");
        // send the modified values back to the player's internal data
        var returnData: { [keys: string]: string } = {};
        returnData[Constants.Letters] = JSON.stringify(chestResult.Letters);
        returnData[Constants.Equipment] = JSON.stringify(chestResult.Inventory);
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
    Inventory: Equipment[]
}