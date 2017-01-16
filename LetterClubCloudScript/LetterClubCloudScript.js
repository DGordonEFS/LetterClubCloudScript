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
            SpecificItems: [],
            RandomAvatars: 0,
            RandomAvatarRarityWeights: [0, 0, 0, 0],
            SpecificAvatars: []
        };
    };
    ChestData.GetRewardChest = function () {
        var userDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: ["profile"]
        });
        var userProfile = JSON.parse(userDataResult.Data["profile"].Value);
        var glassesRandom = Math.random();
        var randomHeadGear = 0;
        if (glassesRandom < 0.33)
            randomHeadGear = 1;
        var avatarRandom = Math.random();
        var randomAvatar = 0;
        if (avatarRandom < 0.1)
            randomAvatar = 1;
        log.debug("glassesRandom: " + glassesRandom + ", " + randomHeadGear + ", " + (glassesRandom < 0.33));
        log.debug("avatarRandom: " + avatarRandom + ", " + randomAvatar + ", " + (avatarRandom < 0.1));
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
            RandomHeadGears: 1,
            RandomHeadGearsRarityWeights: [0, 1, 0, 0],
            SpecificItems: [],
            RandomAvatars: 0,
            RandomAvatarRarityWeights: [0, 0, 0, 0],
            SpecificAvatars: []
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
            RandomHeadGears: 1,
            RandomHeadGearsRarityWeights: [0, 0, 1, 0],
            SpecificItems: [],
            RandomAvatars: 1,
            RandomAvatarRarityWeights: [0, 1, 0, 0],
            SpecificAvatars: []
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
        var userDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: ["profile"]
        });
        var userProfile = JSON.parse(userDataResult.Data["profile"].Value);
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
            Inventory: null,
            AvatarsAdded: [],
            Avatars: null
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
        var maxEquipment = 24 - randomHeadGears;
        var overflow = chestResult.Inventory.length - maxEquipment;
        log.debug("overflow: " + chestResult.Inventory.length + ", " + overflow);
        for (var i = 0; i < overflow; i++) {
            var lowestPower = 999999;
            var lowestIndex = 0;
            // get the worst equipment and junk it.
            for (var j = 0; j < chestResult.Inventory.length; j++) {
                var equipment = chestResult.Inventory[j];
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
            var commonWeight = data.RandomAvatarRarityWeights[0];
            log.debug("common weight: " + commonWeight);
            var rareWeight = data.RandomAvatarRarityWeights[1];
            log.debug("rare weight: " + rareWeight);
            var epicWeight = data.RandomAvatarRarityWeights[2];
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
        var returnData = {};
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
    Constants.AvatarRanks = "AvatarRanks";
    Constants.EquipmentVersion = 1;
    Constants.Common = 0;
    Constants.Rare = 1;
    Constants.Epic = 2;
    Constants.Legendary = 3;
    Constants.Sunglasses = 0;
    Constants.XpPerAvatar = 20;
    Constants.Coins = "CO";
    Constants.Gems = "Gems";
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
        var baseAvatars = AvatarData.GetPlayerAvatarInfo();
        log.debug("avatar key: " + Constants.Avatars);
        log.debug("   " + internalDataResult.Data[Constants.Avatars]);
        if (internalDataResult.Data[Constants.Avatars] != null) {
            log.debug("has avatars already");
            var playerAvatarData = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
            for (var key in playerAvatarData) {
                var playerAvatar = playerAvatarData[key];
                var baseAvatar = baseAvatars[key];
                if (playerAvatar.IsPurchased) {
                    baseAvatar.IsPurchased = true;
                }
                if (playerAvatar.Xp != null)
                    baseAvatar.Xp = playerAvatar.Xp;
                if (playerAvatar.Rank != null)
                    baseAvatar.Rank = playerAvatar.Rank;
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
        log.debug("sending equipment: " + data[Constants.Letters]);
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
        var letterData = EquipmentData.GetRandomLetters(arenaIndex, rarity);
        var headgearImage;
        switch (rarity) {
            case Constants.Common:
                var letters = [
                    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
                    "w", "x", "y", "z"
                ];
                var highestLetter;
                var highestAmount = 0;
                for (var letter in letterData) {
                    var amount = letterData[letter];
                    if (amount > highestAmount) {
                        highestAmount = amount;
                        highestLetter = letter;
                    }
                }
                var letterIndex = letters.indexOf(highestLetter);
                headgearImage = EquipmentData.HeadgearImages["Arena" + arenaIndex]["Common"][letterIndex];
                break;
            default:
                headgearImage = EquipmentData.GetRandomHeadgearImage(rarity, ["Arena" + arenaIndex, "Shared"]);
                break;
        }
        log.debug("arenaindex");
        var equipment = {
            Id: "",
            Type: Constants.Sunglasses,
            Rarity: rarity,
            Level: arenaIndex,
            BuffData: {},
            Image: headgearImage,
            LetterData: letterData,
            Version: Constants.EquipmentVersion,
            Locked: false
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
            [2, 1]
        ],
        Arena1: [
            [1, 1],
            [2, 1],
            [2, 1, 1]
        ],
        Arena2: [
            [2, 1],
            [2, 2],
            [2, 2, 1]
        ],
        Arena3: [
            [2, 2],
            [3, 2],
            [3, 2, 1]
        ]
    };
    EquipmentData.HeadgearImages = {
        Arena0: {
            Common: ["c_a0_0", "c_a0_1", "c_a0_2", "c_a0_3", "c_a0_4", "c_a0_5", "c_a0_6", "c_a0_7", "c_a0_8", "c_a0_9", "c_a0_10", "c_a0_11", "c_a0_12", "c_a0_13", "c_a0_14", "c_a0_15",
                "c_a0_16", "c_a0_17", "c_a0_18", "c_a0_19", "c_a0_20", "c_a0_21", "c_a0_22", "c_a0_23", "c_a0_24", "c_a0_25"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena1: {
            Common: ["c_a1_0", "c_a1_1", "c_a1_2", "c_a1_3", "c_a1_4", "c_a1_5", "c_a1_6", "c_a1_7", "c_a1_8", "c_a1_9", "c_a1_10", "c_a1_11", "c_a1_12", "c_a1_13", "c_a1_14", "c_a1_15",
                "c_a1_16", "c_a1_17", "c_a1_18", "c_a1_19", "c_a1_20", "c_a1_21", "c_a1_22", "c_a1_23", "c_a1_24", "c_a1_25"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena2: {
            Common: ["c_a2_0", "c_a2_1", "c_a2_2", "c_a2_3", "c_a2_4", "c_a2_5", "c_a2_6", "c_a2_7", "c_a2_8", "c_a2_9", "c_a2_10", "c_a2_11", "c_a2_12", "c_a2_13", "c_a2_14", "c_a2_15",
                "c_a2_16", "c_a2_17", "c_a2_18", "c_a2_19", "c_a2_20", "c_a2_21", "c_a2_22", "c_a2_23", "c_a2_24", "c_a2_25"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Arena3: {
            Common: ["c_a3_0", "c_a3_1", "c_a3_2", "c_a3_3", "c_a3_4", "c_a3_5", "c_a3_6", "c_a3_7", "c_a3_8", "c_a3_9", "c_a3_10", "c_a3_11", "c_a3_12", "c_a3_13", "c_a3_14", "c_a3_15",
                "c_a3_16", "c_a3_17", "c_a3_18", "c_a3_19", "c_a3_20", "c_a3_21", "c_a3_22", "c_a3_23", "c_a3_24", "c_a3_25"],
            Rare: [],
            Epic: [],
            Legendary: []
        },
        Shared: {
            Common: [],
            Rare: ["r_twoHearts_0", "r_twoHearts_1", "r_twoHearts_2", "r_twoHearts_3", "r_twoHearts_4", "r_twoHearts_5", "r_twoHearts_6", "r_twoHearts_7", "r_twoHearts_8", "r_twoHearts_9",
                "r_fourEyes_0", "r_fourEyes_1", "r_fourEyes_2", "r_fourEyes_3", "r_fourEyes_4", "r_fourEyes_5", "r_fourEyes_6", "r_fourEyes_7", "r_fourEyes_8", "r_fourEyes_9",
                "r_anime_0", "r_anime_1", "r_anime_2", "r_anime_3", "r_anime_4", "r_anime_5", "r_anime_6", "r_anime_7", "r_anime_8", "r_anime_9",
                "r_cat_0", "r_cat_1", "r_cat_2", "r_cat_3", "r_cat_4", "r_cat_5", "r_cat_6", "r_cat_7", "r_cat_8", "r_cat_9",
                "r_pyramid_0", "r_pyramid_1", "r_pyramid_2", "r_pyramid_3", "r_pyramid_4", "r_pyramid_5", "r_pyramid_6", "r_pyramid_7", "r_pyramid_8", "r_pyramid_9",
                "r_round_0", "r_round_1", "r_round_2", "r_round_3", "r_round_4", "r_round_5", "r_round_6", "r_round_7", "r_round_8", "r_round_9",
                "r_shutter_0", "r_shutter_1", "r_shutter_2", "r_shutter_3", "r_shutter_4", "r_shutter_5", "r_shutter_6", "r_shutter_7", "r_shutter_8", "r_shutter_9",
                "r_star_0", "r_star_1", "r_star_2", "r_star_3", "r_star_4", "r_star_5", "r_star_6", "r_star_7", "r_star_8", "r_star_9",
                "r_visor_0", "r_visor_1", "r_visor_2", "r_visor_3", "r_visor_4", "r_visor_5", "r_visor_6", "r_visor_7", "r_visor_8", "r_visor_9",
                "r_vr_0", "r_vr_1", "r_vr_2", "r_vr_3", "r_vr_4", "r_vr_5", "r_vr_6", "r_vr_7", "r_vr_8", "r_vr_9",
                "r_wings_0", "r_wings_1", "r_wings_2", "r_wings_3", "r_wings_4", "r_wings_5", "r_wings_6", "r_wings_7", "r_wings_8", "r_wings_9"],
            Epic: ["e_bunny_0", "e_bunny_1", "e_bunny_2", "e_bunny_3", "e_bunny_4",
                "e_donut_0", "e_donut_1", "e_donut_2", "e_donut_3", "e_donut_4",
                "e_eyepatch_0", "e_eyepatch_1", "e_eyepatch_2", "e_eyepatch_3", "e_eyepatch_4",
                "e_hypno_0", "e_hypno_1", "e_hypno_2", "e_hypno_3", "e_hypno_4",
                "e_mustache_0", "e_mustache_1", "e_mustache_2", "e_mustache_3", "e_mustache_4",
                "e_scuba_0", "e_scuba_1", "e_scuba_2", "e_scuba_3", "e_scuba_4",
                "e_steampunk_0", "e_steampunk_1", "e_steampunk_2", "e_steampunk_3", "e_steampunk_4",
                "e_oldman_0", "e_oldman_1", "e_oldman_2", "e_oldman_3", "e_oldman_4"],
            Legendary: []
        }
    };
    return EquipmentData;
}());
var AvatarData = (function () {
    function AvatarData() {
    }
    AvatarData.GetAvatarData = function () {
        return {
            alien: {
                Rarity: 2,
                RankData: {
                    0: {
                        LetterData: { a: 1, e: 0, o: 0, i: 0 },
                        BuffData: { hp: { value: "-5" } }
                    },
                    1: {
                        LetterData: { a: 1, e: 1, o: 0, i: 0 },
                        BuffData: { hp: { value: "-10" } }
                    },
                    2: {
                        LetterData: { a: 1, e: 1, o: 1, i: 0 },
                        BuffData: { hp: { value: "-15" } }
                    },
                    3: {
                        LetterData: { a: 1, e: 1, o: 1, i: 1 },
                        BuffData: { hp: { value: "-20" } }
                    },
                    4: {
                        LetterData: { a: 2, e: 2, o: 1, i: 1 },
                        BuffData: { hp: { value: "-25" } }
                    },
                    5: {
                        LetterData: { a: 2, e: 2, o: 2, i: 2 },
                        BuffData: { hp: { value: "-30" } }
                    }
                }
            },
            blue: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { y: 0 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { y: 1 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { y: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { y: 2 },
                        BuffData: { hp: { value: "20" } }
                    },
                    4: {
                        LetterData: { y: 2 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { y: 3 },
                        BuffData: { hp: { value: "30" } }
                    }
                }
            },
            boxer: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { p: 0, k: 0 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { p: 1, k: 0 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { p: 1, k: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { p: 2, k: 1 },
                        BuffData: { hp: { value: "20" } }
                    },
                    4: {
                        LetterData: { p: 2, k: 2 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { p: 3, k: 4 },
                        BuffData: { hp: { value: "35" } }
                    }
                }
            },
            cat: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { d: -1, c: 1 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { d: -2, c: 2 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { d: -3, c: 3 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { d: -4, c: 4 },
                        BuffData: { hp: { value: "20" } }
                    },
                    4: {
                        LetterData: { d: -5, c: 5 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { d: -6, c: 6 },
                        BuffData: { hp: { value: "30" } }
                    }
                }
            },
            clown: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { a: 0, h: 0 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { a: 0, h: 1 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { a: 1, h: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { a: 1, h: 2 },
                        BuffData: { hp: { value: "20" } }
                    },
                    4: {
                        LetterData: { a: 1, h: 3 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { a: 2, h: 4 },
                        BuffData: { hp: { value: "30" } }
                    }
                }
            },
            cow: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { m: 0 },
                        BuffData: { hp: { value: "10" } }
                    },
                    1: {
                        LetterData: { m: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    2: {
                        LetterData: { m: 1 },
                        BuffData: { hp: { value: "25" } }
                    },
                    3: {
                        LetterData: { m: 2 },
                        BuffData: { hp: { value: "35" } }
                    },
                    4: {
                        LetterData: { m: 3 },
                        BuffData: { hp: { value: "50" } }
                    },
                    5: {
                        LetterData: { m: 4 },
                        BuffData: { hp: { value: "70" } }
                    }
                }
            },
            dinosaur: {
                Rarity: 1,
                RankData: {
                    0: {
                        LetterData: { t: 0 },
                        BuffData: { hp: { value: "10" } }
                    },
                    1: {
                        LetterData: { t: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    2: {
                        LetterData: { t: 1 },
                        BuffData: { hp: { value: "25" } }
                    },
                    3: {
                        LetterData: { t: 2 },
                        BuffData: { hp: { value: "35" } }
                    },
                    4: {
                        LetterData: { t: 2 },
                        BuffData: { hp: { value: "50" } }
                    },
                    5: {
                        LetterData: { t: 3 },
                        BuffData: { hp: { value: "70" } }
                    }
                }
            },
            dog: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { d: 1, c: -1 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { d: 2, c: -2 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { d: 3, c: -3 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { d: 4, c: -4 },
                        BuffData: { hp: { value: "20" } }
                    },
                    4: {
                        LetterData: { d: 5, c: -5 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { d: 6, c: -6 },
                        BuffData: { hp: { value: "30" } }
                    }
                }
            },
            dragon: {
                Rarity: 2,
                RankData: {
                    0: {
                        LetterData: { f: 0, i: 0, r: 1, e: 0 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { f: 1, i: 0, r: 1, e: 0 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { f: 1, i: 1, r: 1, e: 0 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { f: 1, i: 1, r: 1, e: 1 },
                        BuffData: { hp: { value: "20" } }
                    },
                    4: {
                        LetterData: { f: 2, i: 1, r: 2, e: 1 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { f: 2, i: 2, r: 2, e: 2 },
                        BuffData: { hp: { value: "30" } }
                    }
                }
            },
            fairy: {
                Rarity: 1,
                RankData: {
                    0: {
                        LetterData: { l: 1, g: 0, n: 0 },
                        BuffData: { hp: { value: "-5" } }
                    },
                    1: {
                        LetterData: { l: 1, g: 1, n: 0 },
                        BuffData: { hp: { value: "-10" } }
                    },
                    2: {
                        LetterData: { l: 1, g: 2, n: 1 },
                        BuffData: { hp: { value: "-15" } }
                    },
                    3: {
                        LetterData: { l: 2, g: 2, n: 1 },
                        BuffData: { hp: { value: "-25" } }
                    },
                    4: {
                        LetterData: { l: 2, g: 3, n: 1 },
                        BuffData: { hp: { value: "-35" } }
                    },
                    5: {
                        LetterData: { l: 2, g: 4, n: 2 },
                        BuffData: { hp: { value: "-40" } }
                    }
                }
            },
            frank: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: {},
                        BuffData: { hp: { value: "10" } }
                    },
                    1: {
                        LetterData: {},
                        BuffData: { hp: { value: "15" } }
                    },
                    2: {
                        LetterData: {},
                        BuffData: { hp: { value: "25" } }
                    },
                    3: {
                        LetterData: {},
                        BuffData: { hp: { value: "40" } }
                    },
                    4: {
                        LetterData: {},
                        BuffData: { hp: { value: "60" } }
                    },
                    5: {
                        LetterData: {},
                        BuffData: { hp: { value: "90" } }
                    }
                }
            },
            pirate: {
                Rarity: 1,
                RankData: {
                    0: {
                        LetterData: { r: 1 },
                        BuffData: { hp: { value: "0" } }
                    },
                    1: {
                        LetterData: { r: 1 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { r: 2 },
                        BuffData: { hp: { value: "20" } }
                    },
                    3: {
                        LetterData: { r: 2 },
                        BuffData: { hp: { value: "30" } }
                    },
                    4: {
                        LetterData: { r: 2 },
                        BuffData: { hp: { value: "50" } }
                    },
                    5: {
                        LetterData: { r: 3 },
                        BuffData: { hp: { value: "50" } }
                    }
                }
            },
            red: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { x: 0 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { x: 1 },
                        BuffData: { hp: { value: "10" } }
                    },
                    2: {
                        LetterData: { x: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { x: 2 },
                        BuffData: { hp: { value: "20" } }
                    },
                    4: {
                        LetterData: { x: 3 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { x: 4 },
                        BuffData: { hp: { value: "30" } }
                    }
                }
            },
            robber: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { a: -1, b: 1, d: 1 },
                        BuffData: { hp: { value: "5" } }
                    },
                    1: {
                        LetterData: { a: -1, b: 1, d: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    2: {
                        LetterData: { a: -1, b: 2, d: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    3: {
                        LetterData: { a: -1, b: 2, d: 1 },
                        BuffData: { hp: { value: "25" } }
                    },
                    4: {
                        LetterData: { a: -1, b: 2, d: 2 },
                        BuffData: { hp: { value: "25" } }
                    },
                    5: {
                        LetterData: { a: -1, b: 3, d: 3 },
                        BuffData: { hp: { value: "35" } }
                    }
                }
            },
            robot: {
                Rarity: 1,
                RankData: {
                    0: {
                        LetterData: { q: 1 },
                        BuffData: { hp: { value: "0" } }
                    },
                    1: {
                        LetterData: { q: 2 },
                        BuffData: { hp: { value: "0" } }
                    },
                    2: {
                        LetterData: { q: 4 },
                        BuffData: { hp: { value: "0" } }
                    },
                    3: {
                        LetterData: { q: 6 },
                        BuffData: { hp: { value: "0" } }
                    },
                    4: {
                        LetterData: { q: 8 },
                        BuffData: { hp: { value: "0" } }
                    },
                    5: {
                        LetterData: { q: 11 },
                        BuffData: { hp: { value: "0" } }
                    }
                }
            },
            superhero: {
                Rarity: 1,
                RankData: {
                    0: {
                        LetterData: { s: 0, u: 0, p: 1 },
                        BuffData: { hp: { value: "10" } }
                    },
                    1: {
                        LetterData: { s: 0, u: 1, p: 1 },
                        BuffData: { hp: { value: "20" } }
                    },
                    2: {
                        LetterData: { s: 1, u: 1, p: 1 },
                        BuffData: { hp: { value: "30" } }
                    },
                    3: {
                        LetterData: { s: 1, u: 1, p: 2 },
                        BuffData: { hp: { value: "30" } }
                    },
                    4: {
                        LetterData: { s: 1, u: 1, p: 3 },
                        BuffData: { hp: { value: "40" } }
                    },
                    5: {
                        LetterData: { s: 1, u: 2, p: 3 },
                        BuffData: { hp: { value: "50" } }
                    }
                }
            },
            teddy: {
                Rarity: 0,
                RankData: {
                    0: {
                        LetterData: { b: 0 },
                        BuffData: { hp: { value: "10" } }
                    },
                    1: {
                        LetterData: { b: 1 },
                        BuffData: { hp: { value: "15" } }
                    },
                    2: {
                        LetterData: { b: 1 },
                        BuffData: { hp: { value: "25" } }
                    },
                    3: {
                        LetterData: { b: 2 },
                        BuffData: { hp: { value: "35" } }
                    },
                    4: {
                        LetterData: { b: 3 },
                        BuffData: { hp: { value: "50" } }
                    },
                    5: {
                        LetterData: { b: 4 },
                        BuffData: { hp: { value: "70" } }
                    }
                }
            },
            wizard: {
                Rarity: 1,
                RankData: {
                    0: {
                        LetterData: { w: 1, i: 0, z: 0 },
                        BuffData: { hp: { value: "0" } }
                    },
                    1: {
                        LetterData: { w: 1, i: 0, z: 1 },
                        BuffData: { hp: { value: "0" } }
                    },
                    2: {
                        LetterData: { w: 1, i: 1, z: 1 },
                        BuffData: { hp: { value: "0" } }
                    },
                    3: {
                        LetterData: { w: 2, i: 1, z: 2 },
                        BuffData: { hp: { value: "0" } }
                    },
                    4: {
                        LetterData: { w: 3, i: 1, z: 3 },
                        BuffData: { hp: { value: "0" } }
                    },
                    5: {
                        LetterData: { w: 4, i: 2, z: 4 },
                        BuffData: { hp: { value: "0" } }
                    }
                }
            }
        };
    };
    AvatarData.GetAvatarRankMetaData = function () {
        return {
            0: {
                0: {
                    Xp: 10,
                    Cost: 50
                },
                1: {
                    Xp: 20,
                    Cost: 200
                },
                2: {
                    Xp: 50,
                    Cost: 500
                },
                3: {
                    Xp: 100,
                    Cost: 1000
                },
                4: {
                    Xp: 200,
                    Cost: 2000
                },
                5: {
                    Xp: 400,
                    Cost: 4000
                },
                6: {
                    Xp: 1000,
                    Cost: 10000
                },
                7: {
                    Xp: 2000,
                    Cost: 20000
                },
                8: {
                    Xp: 4000,
                    Cost: 40000
                }
            },
            1: {
                0: {
                    Xp: 10,
                    Cost: 50
                },
                1: {
                    Xp: 20,
                    Cost: 200
                },
                2: {
                    Xp: 50,
                    Cost: 500
                },
                3: {
                    Xp: 100,
                    Cost: 1000
                },
                4: {
                    Xp: 200,
                    Cost: 2000
                },
                5: {
                    Xp: 400,
                    Cost: 4000
                },
                6: {
                    Xp: 1000,
                    Cost: 10000
                },
                7: {
                    Xp: 2000,
                    Cost: 20000
                },
                8: {
                    Xp: 4000,
                    Cost: 40000
                }
            },
            2: {
                0: {
                    Xp: 10,
                    Cost: 50
                },
                1: {
                    Xp: 20,
                    Cost: 200
                },
                2: {
                    Xp: 50,
                    Cost: 500
                },
                3: {
                    Xp: 100,
                    Cost: 1000
                },
                4: {
                    Xp: 200,
                    Cost: 2000
                },
                5: {
                    Xp: 400,
                    Cost: 4000
                },
                6: {
                    Xp: 1000,
                    Cost: 10000
                },
                7: {
                    Xp: 2000,
                    Cost: 20000
                },
                8: {
                    Xp: 4000,
                    Cost: 40000
                }
            },
            3: {
                0: {
                    Xp: 10,
                    Cost: 50
                },
                1: {
                    Xp: 20,
                    Cost: 200
                },
                2: {
                    Xp: 50,
                    Cost: 500
                },
                3: {
                    Xp: 100,
                    Cost: 1000
                },
                4: {
                    Xp: 200,
                    Cost: 2000
                },
                5: {
                    Xp: 400,
                    Cost: 4000
                },
                6: {
                    Xp: 1000,
                    Cost: 10000
                },
                7: {
                    Xp: 2000,
                    Cost: 20000
                },
                8: {
                    Xp: 4000,
                    Cost: 40000
                }
            }
        };
    };
    ;
    AvatarData.GetPlayerAvatarInfo = function () {
        return {
            alien: { IsPurchased: false, Xp: 0, Rank: 0 },
            blue: { IsPurchased: true, Xp: 0, Rank: 0 },
            boxer: { IsPurchased: false, Xp: 0, Rank: 0 },
            cat: { IsPurchased: false, Xp: 0, Rank: 0 },
            clown: { IsPurchased: false, Xp: 0, Rank: 0 },
            cow: { IsPurchased: false, Xp: 0, Rank: 0 },
            dinosaur: { IsPurchased: false, Xp: 0, Rank: 0 },
            dog: { IsPurchased: false, Xp: 0, Rank: 0 },
            dragon: { IsPurchased: false, Xp: 0, Rank: 0 },
            fairy: { IsPurchased: false, Xp: 0, Rank: 0 },
            frank: { IsPurchased: false, Xp: 0, Rank: 0 },
            pirate: { IsPurchased: false, Xp: 0, Rank: 0 },
            red: { IsPurchased: true, Xp: 0, Rank: 0 },
            robber: { IsPurchased: false, Xp: 0, Rank: 0 },
            robot: { IsPurchased: false, Xp: 0, Rank: 0 },
            superhero: { IsPurchased: false, Xp: 0, Rank: 0 },
            teddy: { IsPurchased: false, Xp: 0, Rank: 0 },
            wizard: { IsPurchased: false, Xp: 0, Rank: 0 }
        };
    };
    AvatarData.GetRandomAvatar = function (rarity) {
        log.debug("get random avatar: " + rarity);
        var avatarsData = AvatarData.GetAvatarData();
        log.debug("avatars data: " + avatarsData);
        var avatars = AvatarData.GetPlayerAvatarInfo();
        log.debug("avatars: " + avatarsData);
        var pool = [];
        for (var id in avatars) {
            var avatar = avatars[id];
            var avatarRarity = avatarsData[id].Rarity;
            if (avatarRarity == rarity)
                pool.push({ Id: id, Avatar: avatar });
        }
        log.debug("pick random: " + pool);
        return pool[Math.floor(Math.random() * pool.length)];
    };
    AvatarData.GainXp = function (id, xp) {
        var result = { Avatars: null };
        log.debug("gain xp: " + id + ", " + xp);
        var internalDataResult = server.GetUserInternalData({
            PlayFabId: currentPlayerId,
            Keys: [Constants.Avatars]
        });
        result.Avatars = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
        result.Avatars[id].Xp += xp;
        log.debug("avatar xp: " + result.Avatars[id].Xp);
        var returnData = {};
        returnData[Constants.Avatars] = JSON.stringify(result.Avatars);
        internalDataResult = server.UpdateUserInternalData({
            PlayFabId: currentPlayerId,
            Data: returnData
        });
        log.debug("complete");
        return result;
    };
    AvatarData.IncreaseAvatarRank = function (id) {
        var result = { Coins: -1, Avatars: null };
        log.debug("get avatar rank");
        var avatarRanks = AvatarData.GetAvatarRankMetaData();
        log.debug("get avatar data");
        var avatarsData = AvatarData.GetAvatarData();
        var internalDataResult = server.GetUserInternalData({
            PlayFabId: currentPlayerId,
            Keys: [Constants.Avatars]
        });
        log.debug("get avatars");
        var avatars = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
        log.debug("get avatar " + id);
        var avatar = avatars[id];
        var rarity = avatarsData[id].Rarity;
        log.debug("rarity: " + rarity);
        log.debug("rank: " + avatar.Rank);
        var rankData = avatarRanks[rarity][avatar.Rank];
        log.debug("rank data " + rankData);
        log.debug("cost: " + rankData.Cost);
        log.debug("xp: " + rankData.Xp);
        var currencyResult = server.SubtractUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: Constants.Coins,
            Amount: rankData.Cost
        });
        log.debug("purchased");
        avatar.Xp -= rankData.Xp;
        avatar.Rank++;
        log.debug("increase rank");
        var data = {};
        data[Constants.Avatars] = JSON.stringify(avatars);
        log.debug("json");
        // send the modified values back to the player's internal data
        internalDataResult = server.UpdateUserInternalData({
            PlayFabId: currentPlayerId,
            Data: data
        });
        log.debug("complete");
        result.Coins = currencyResult.Balance;
        result.Avatars = avatars;
        return result;
    };
    return AvatarData;
}());
/// <reference path="./Code/Chests.ts"/>
/// <reference path="./Code/Constants.ts"/>
/// <reference path="./Code/PlayerInit.ts"/>
/// <reference path="./Code/Equipment.ts"/>
/// <reference path="./Code/Avatars.ts"/>
handlers.pickNewDailyLetters = function () {
    var lettersForThisMonthKey = "DailyLettersForThisMonth";
    var lettersForThisMonthData = server.GetTitleInternalData({ Keys: [lettersForThisMonthKey] })["Data"][lettersForThisMonthKey];
    var dailySaleCurrentData = parseInt(server.GetTitleData({ Keys: ["DailySaleCurrentDay"] })["Data"]["DailySaleCurrentDay"]);
    var lettersForThisMonth = JSON.parse(lettersForThisMonthData);
    if (lettersForThisMonth.length > 0) {
        var lettersForToday = lettersForThisMonth.pop();
        server.SetTitleData({ Key: "DailySaleLetter0", Value: lettersForToday[0] });
        server.SetTitleData({ Key: "DailySaleLetter1", Value: lettersForToday[1] });
        server.SetTitleData({ Key: "DailySaleLetter2", Value: lettersForToday[2] });
        server.SetTitleData({ Key: "DailySaleCurrentDay", Value: (dailySaleCurrentData + 1).toString() });
        server.SetTitleInternalData({ Key: lettersForThisMonthKey, Value: JSON.stringify(lettersForThisMonth) });
    }
};
handlers.resetLeaderboard = function (data) {
    handlers.awardTopPlayers();
    var url = "https://53BC.playfabapi.com/admin/IncrementPlayerStatisticVersion";
    var method = "post";
    var contentBody = JSON.stringify({ StatisticName: "Game Score" });
    var contentType = "application/json";
    var headers = { "X-SecretKey": "I8NPY91Y3BJ8XRG975AHSP81XJ4J336OHDRSZSJEP4G4NJPA1G" };
    var responseString = http.request(url, method, contentBody, contentType, headers);
    log.debug(responseString);
};
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
handlers.increaseAvatarRank = function (args, context) {
    return AvatarData.IncreaseAvatarRank(args.Id);
};
handlers.getAvatarData = function (args, context) {
    return AvatarData.GetAvatarData();
};
handlers.getAvatarRankMetaData = function (args, context) {
    return AvatarData.GetAvatarRankMetaData();
};
handlers.gainAvatarXp = function (args, context) {
    return AvatarData.GainXp(args.Id, args.Xp);
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