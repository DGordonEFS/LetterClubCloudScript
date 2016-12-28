var ChestData = (function () {
    function ChestData() {
    }
    ChestData.GetSmallChest = function () {
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
            UniqueLetters: 4,
            LetterTiers: [9, 1, 0, 0],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [1000, 100, 10, 0],
            SpecificItems: []
        };
    };
    ChestData.GetMediumChest = function () {
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
            UniqueLetters: 6,
            LetterTiers: [5, 9, 4, 0],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 100, 1, 0],
            SpecificItems: []
        };
    };
    ChestData.GetLargeChest = function () {
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
            UniqueLetters: 8,
            LetterTiers: [0, 16, 12, 2],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 10, 1, 0],
            SpecificItems: []
        };
    };
    ChestData.GetNewUserChest = function () {
        return {
            Type: "new_user_chest",
            ChestId: "purple",
            Index: -1,
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
            SpecificItems: []
        };
    };
    ChestData.GetRewardChest = function () {
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
            UniqueLetters: 26,
            LetterTiers: [userProfile.ArenaIndex + 2, 0, 0, 0],
            SpecificLetters: [],
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [1000, 10, 0, 0],
            SpecificItems: []
        };
    };
    ChestData.GetStarterChestSmall = function () {
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
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 0, 0, 0],
            SpecificItems: []
        };
    };
    ChestData.GetStarterChestLarge = function () {
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
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 0, 0, 0],
            SpecificItems: []
        };
    };
    ChestData.GetChests = function () {
        return {
            small_letter_chest: ChestData.GetSmallChest(),
            medium_letter_chest: ChestData.GetMediumChest(),
            large_letter_chest: ChestData.GetLargeChest(),
            new_user_chest: ChestData.GetNewUserChest(),
            reward_chest: ChestData.GetRewardChest(),
            starter_chest_small: ChestData.GetStarterChestSmall(),
            starter_chest_large: ChestData.GetStarterChestLarge()
        };
    };
    ChestData.PurchaseChest = function (data) {
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
        var chestResult = {
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
        };
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
        for (var i = 0; i < data.UniqueLetters; i++) {
            var index = Math.floor(Math.random() * alphabet.length);
            letters.push(alphabet[index]);
            alphabet.splice(index, 1);
        }
        log.debug("random letters assigned");
        var pulledLetter = -1;
        var getLetter = function () {
            pulledLetter++;
            if (pulledLetter < letters.length)
                return letters[pulledLetter];
            return letters[Math.floor(Math.random() * letters.length)];
        };
        log.debug("letters tier 0");
        var letter;
        var amount;
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
        var returnData = {};
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
    };
    return ChestData;
}());
var getRandomIntBetween = function (min, max) {
    return min + Math.round((max - min) * Math.random());
};
var Constants = (function () {
    function Constants() {
    }
    Constants.Letters = "letters";
    Constants.Avatars = "avatars";
    Constants.Equipment = "equipment";
    Constants.UniqueEquipment = "unique_equipment";
    Constants.Migration = "migration";
    Constants.EquipmentVersion = 1;
    Constants.Common = 0;
    Constants.Rare = 1;
    Constants.Epic = 2;
    Constants.Legendary = 3;
    Constants.Sunglasses = 0;
    return Constants;
}());
var PlayerInit = (function () {
    function PlayerInit() {
    }
    PlayerInit.GetBaseLetters = function () {
        return {
            a: { Letter: "a", Amount: 0, Rank: 0 },
            b: { Letter: "b", Amount: 0, Rank: 0 },
            c: { Letter: "c", Amount: 0, Rank: 0 },
            d: { Letter: "d", Amount: 0, Rank: 0 },
            e: { Letter: "e", Amount: 0, Rank: 0 },
            f: { Letter: "f", Amount: 0, Rank: 0 },
            g: { Letter: "g", Amount: 0, Rank: 0 },
            h: { Letter: "h", Amount: 0, Rank: 0 },
            i: { Letter: "i", Amount: 0, Rank: 0 },
            j: { Letter: "j", Amount: 0, Rank: 0 },
            k: { Letter: "k", Amount: 0, Rank: 0 },
            l: { Letter: "l", Amount: 0, Rank: 0 },
            m: { Letter: "m", Amount: 0, Rank: 0 },
            n: { Letter: "n", Amount: 0, Rank: 0 },
            o: { Letter: "o", Amount: 0, Rank: 0 },
            p: { Letter: "p", Amount: 0, Rank: 0 },
            q: { Letter: "q", Amount: 0, Rank: 0 },
            r: { Letter: "r", Amount: 0, Rank: 0 },
            s: { Letter: "s", Amount: 0, Rank: 0 },
            t: { Letter: "t", Amount: 0, Rank: 0 },
            u: { Letter: "u", Amount: 0, Rank: 0 },
            v: { Letter: "v", Amount: 0, Rank: 0 },
            w: { Letter: "w", Amount: 0, Rank: 0 },
            x: { Letter: "x", Amount: 0, Rank: 0 },
            y: { Letter: "y", Amount: 0, Rank: 0 },
            z: { Letter: "z", Amount: 0, Rank: 0 }
        };
    };
    PlayerInit.GetBaseAvatars = function () {
        return {
            alien: { IsPurchased: false, Index: 0 },
            blue: { IsPurchased: true, Index: 1 },
            boxer: { IsPurchased: false, Index: 2 },
            cat: { IsPurchased: false, Index: 3 },
            clown: { IsPurchased: false, Index: 4 },
            cow: { IsPurchased: false, Index: 5 },
            dinosaur: { IsPurchased: false, Index: 6 },
            dog: { IsPurchased: false, Index: 7 },
            dragon: { IsPurchased: false, Index: 8 },
            fairy: { IsPurchased: false, Index: 9 },
            frank: { IsPurchased: false, Index: 10 },
            pirate: { IsPurchased: false, Index: 11 },
            red: { IsPurchased: false, Index: 12 },
            robber: { IsPurchased: false, Index: 13 },
            robot: { IsPurchased: false, Index: 14 },
            superhero: { IsPurchased: false, Index: 15 },
            teddy: { IsPurchased: false, Index: 16 },
            wizard: { IsPurchased: false, Index: 17 }
        };
    };
    PlayerInit.GetBaseEquipment = function () {
        return [];
    };
    PlayerInit.InitPlayer = function (args) {
        log.debug("initPlayer");
        var result = { Letters: null, Avatars: null, Inventory: null, Migration: false, Coins: -1, Gems: -1 };
        log.debug("getinternaldata");
        // get the user's letter values
        var internalDataResult = server.GetUserInternalData({
            PlayFabId: currentPlayerId,
            Keys: [Constants.Letters, Constants.Avatars, Constants.Equipment]
        });
        if (internalDataResult.Data[Constants.Letters] != null) {
            result.Letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);
        }
        else {
            result.Letters = PlayerInit.GetBaseLetters();
            log.debug("new letters " + result.Letters);
        }
        var baseAvatars = PlayerInit.GetBaseAvatars();
        log.debug("avatar key: " + Constants.Avatars);
        log.debug("   " + internalDataResult.Data[Constants.Avatars]);
        if (internalDataResult.Data[Constants.Avatars] != null) {
            log.debug("has avatars already");
            var playerAvatarData = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
            for (var key in playerAvatarData) {
                var playerAvatar = playerAvatarData[key];
                var baseAvatar = baseAvatars[key];
                baseAvatar.IsPurchased = playerAvatar.IsPurchased;
                log.debug(" - avatar: " + key + ", " + playerAvatar.IsPurchased);
            }
        }
        result.Avatars = baseAvatars;
        var baseEquipment = PlayerInit.GetBaseEquipment();
        if (internalDataResult.Data[Constants.Equipment] != null) {
            log.debug("has equipment already");
            baseEquipment = JSON.parse(internalDataResult.Data[Constants.Equipment].Value);
        }
        result.Inventory = baseEquipment;
        if (args.IsMigrating) {
            log.debug("migration");
            // add gems
            var currencyResult = server.AddUserVirtualCurrency({
                PlayFabId: currentPlayerId,
                VirtualCurrency: "GM",
                Amount: args.MigrateGems
            });
            result.Gems = currencyResult.Balance;
            log.debug("migrate coins");
            // add coins
            var currencyResult = server.AddUserVirtualCurrency({
                PlayFabId: currentPlayerId,
                VirtualCurrency: "CO",
                Amount: args.MigrateCoins
            });
            result.Coins = currencyResult.Balance;
            log.debug("migrate letters");
            // set letters
            for (var id in args.MigrateLetters) {
                log.debug("letter: " + id + ", " + args.MigrateLetters[id]);
                var letter = args.MigrateLetters[id];
                result.Letters[id].Amount = letter.Amount;
                result.Letters[id].Rank = letter.Rank;
            }
            log.debug("migrate avatars");
            // unlock avatars
            for (var i = 0; i < args.MigrateAvatars.length; i++) {
                log.debug("avatar: " + args.MigrateAvatars[i]);
                result.Avatars[args.MigrateAvatars[i]].IsPurchased = true;
            }
            result.Migration = true;
        }
        log.debug("send back up");
        var data = {};
        data[Constants.Letters] = JSON.stringify(result.Letters);
        data[Constants.Avatars] = JSON.stringify(result.Avatars);
        data[Constants.Equipment] = JSON.stringify(result.Inventory);
        data[Constants.Migration] = JSON.stringify(result.Migration);
        log.debug("sending avatars: " + data[Constants.Avatars]);
        // send the modified values back to the player's internal data
        internalDataResult = server.UpdateUserInternalData({
            PlayFabId: currentPlayerId,
            Data: data
        });
        log.debug(result.Letters);
        log.debug(result.Avatars);
        log.debug(result.Inventory);
        log.debug("complete");
        return result;
    };
    return PlayerInit;
}());
var EquipmentData = (function () {
    function EquipmentData() {
    }
    EquipmentData.GetRandomLetters = function (arenaIndex, rarity) {
        log.debug("getrandomletters");
        var letterData = {};
        var letters = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
            "w", "x", "y", "z"
        ];
        var getUniqueLetter = function () {
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
    };
    EquipmentData.GetRandomHeadGear = function (rarity) {
        log.debug("get random headgear");
        var userDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: ["profile"]
        });
        var userProfile = JSON.parse(userDataResult.Data["profile"].Value);
        var arenaIndex = userProfile.ArenaIndex;
        log.debug("arenaindex");
        var equipment = {
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
    };
    EquipmentData.GetRandomHeadgearImage = function (rarity, catagories) {
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
    };
    EquipmentData.LetterDataByArenaAndRarity = {
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
    EquipmentData.HeadgearImages = {
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
    return EquipmentData;
}());
/// <reference path="./Code/Chests"/>
/// <reference path="./Code/Constants"/>
/// <reference path="./Code/PlayerInit"/>
/// <reference path="./Code/Equipment"/>
handlers.initPlayer = function (args, context) {
    return PlayerInit.InitPlayer(args);
};
handlers.increaseLetterRank = function (args, context) {
    return increaseLetterRank(args);
};
handlers.purchaseRandomAvatar = function (args, context) {
    return purchaseRandomAvatar(args);
};
handlers.getChestData = function (args, context) {
    return ChestData.GetChests();
};
handlers.purchaseChest = function (args, context) {
    return ChestData.PurchaseChest(ChestData.GetChests()[args.Id]);
};
handlers.purchaseDailyLetter = function (args, context) {
    return purchaseDailyLetter(args);
};
handlers.hash = function (args, context) {
    var str = args.str;
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
var increaseLetterRank = function (args) {
    var result = {
        CoinsTotal: -1,
        Letters: null,
        Success: true,
        Message: null
    };
    log.debug("increase letter rank for letter: " + args.Letter);
    var priceCost = args.PriceCost;
    var priceCode = args.PriceCode;
    log.debug("checking price " + priceCode + ", " + priceCost);
    var inventoryResult = server.GetUserInventory({ PlayFabId: currentPlayerId });
    if (inventoryResult.VirtualCurrency[priceCode] < priceCost) {
        result.Success = false;
        result.Message = "Not enough currency of type: " + priceCode;
        return result;
    }
    log.debug("purchasing");
    // subtract price
    var currencyResult = server.SubtractUserVirtualCurrency({
        PlayFabId: currentPlayerId,
        VirtualCurrency: priceCode,
        Amount: priceCost
    });
    result.CoinsTotal = currencyResult.Balance;
    var internalDataResult = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [Constants.Letters]
    });
    result.Letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);
    result.Letters[args.Letter].Rank++;
    var data = {};
    data[Constants.Letters] = JSON.stringify(result.Letters);
    // send the modified values back to the player's internal data
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });
    log.debug("complete");
    return result;
};
;
var purchaseRandomAvatar = function (args) {
    log.debug("purchaseRandomAvatar");
    var result = {
        CoinsTotal: -1,
        Avatars: null,
        PurchasedAvatarId: null,
        Success: true,
        Message: null
    };
    var priceCode = "CO";
    var priceCost = 500;
    var inventoryResult = server.GetUserInventory({ PlayFabId: currentPlayerId });
    log.debug("price");
    if (inventoryResult.VirtualCurrency[priceCode] < priceCost) {
        result.Success = false;
        result.Message = "Not enough currency of type: CO";
        return result;
    }
    log.debug("purchase");
    // subtract price
    var currencyResult = server.SubtractUserVirtualCurrency({
        PlayFabId: currentPlayerId,
        VirtualCurrency: priceCode,
        Amount: priceCost
    });
    result.CoinsTotal = currencyResult.Balance;
    log.debug("get internal data");
    var internalDataResult = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [Constants.Avatars]
    });
    log.debug("randomize");
    result.Avatars = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
    var unpurchasedAvatars = [];
    log.debug("avatars: " + result.Avatars);
    for (var id in result.Avatars) {
        log.debug("avatar id: " + id);
        var avatar = result.Avatars[id];
        log.debug("avatar: " + id + ", " + avatar + ", " + avatar.IsPurchased);
        if (!avatar.IsPurchased)
            unpurchasedAvatars.push(id);
    }
    log.debug("num unpurchased: " + unpurchasedAvatars.length);
    result.PurchasedAvatarId = unpurchasedAvatars[Math.floor(Math.random() * unpurchasedAvatars.length)];
    result.Avatars[result.PurchasedAvatarId].IsPurchased = true;
    log.debug("send back up");
    var data = {};
    data[Constants.Avatars] = JSON.stringify(result.Avatars);
    // send the modified values back to the player's internal data
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });
    log.debug("complete");
    return result;
};
var purchaseDailyLetter = function (args) {
    log.debug("purchaseDailyLeter");
    var currencyResult = server.SubtractUserVirtualCurrency({
        PlayFabId: currentPlayerId,
        VirtualCurrency: args.CurrencyCode,
        Amount: args.Cost
    });
    log.debug("get internal data");
    // get the user's letter values
    var internalDataResult = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [Constants.Letters]
    });
    var letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);
    log.debug("increase letter: " + args.Letter);
    // update the letter
    letters[args.Letter].Amount++;
    log.debug("increase letter amount: " + letters[args.Letter].Amount);
    var data = {};
    data[Constants.Letters] = JSON.stringify(letters);
    // send the modified values back to the player's internal data
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });
    log.debug("complete");
    return { CurrencyAmount: currencyResult.Balance, Amount: letters[args.Letter].Amount };
};
//# sourceMappingURL=LetterClubCloudScript.js.map