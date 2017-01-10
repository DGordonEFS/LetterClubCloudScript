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
            RandomAvatars: 1,
            RandomAvatarRarityWeights: [1, 0, 0, 0],
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
            RandomHeadGears: 2,
            RandomHeadGearsRarityWeights: [0, 3, 1, 0],
            SpecificItems: [],
            RandomAvatars: 1,
            RandomAvatarRarityWeights: [1, 0, 0, 0],
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
            RandomAvatarRarityWeights: [1, 0, 0, 0],
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
            RandomAvatarRarityWeights: [900, 90, 5, 0],
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
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 0, 0, 0],
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
            RandomHeadGears: 0,
            RandomHeadGearsRarityWeights: [0, 0, 0, 0],
            SpecificItems: [],
            RandomAvatars: 0,
            RandomAvatarRarityWeights: [0, 0, 0, 0],
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
    return ChestData;
}());
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
        Inventory: null,
        AvatarsAdded: [],
        Avatars: null
    };
    log.debug("getInventory()");
    var inventoryResult = server.GetUserInventory({ PlayFabId: currentPlayerId });
    if (priceCost > 0) {
        if (inventoryResult.VirtualCurrency[priceCode] < priceCost) {
            chestResult.Success = false;
            chestResult.Message = "Not enough currency of type: " + priceCode;
            return chestResult;
        }
        var currencyResult = server.SubtractUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: priceCode,
            Amount: priceCost
        });
    }
    if (awardGems > 0) {
        var currencyResult = server.AddUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: "GM",
            Amount: awardGems
        });
        chestResult.GemsTotal = currencyResult.Balance;
    }
    if (awardCoins > 0) {
        var currencyResult = server.AddUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: "CO",
            Amount: awardCoins
        });
        chestResult.CoinsTotal = currencyResult.Balance;
    }
    log.debug("get user internal data!");
    var internalDataResult = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [Constants.Letters, Constants.Avatars, Constants.Equipment, Constants.UniqueEquipment]
    });
    log.debug("set letters total");
    log.debug(internalDataResult.Data[Constants.Letters].Value);
    chestResult.Letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);
    chestResult.Inventory = JSON.parse(internalDataResult.Data[Constants.Equipment].Value);
    log.debug("pull letters");
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
        amount = 1 + Math.floor(Math.random() * 3);
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
    chestResult.Avatars = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
    for (var i = 0; i < data.RandomAvatars; i++) {
        log.debug("   - create random avatar");
        var rarityIndex = Math.floor(Math.random() * randomItemRarityWeightTotal);
        var rarity;
        if (rarityIndex < data.RandomAvatarRarityWeights[0])
            rarity = Constants.Common;
        else if (rarityIndex < data.RandomAvatarRarityWeights[0] + data.RandomAvatarRarityWeights[1])
            rarity = Constants.Rare;
        else if (rarityIndex < data.RandomAvatarRarityWeights[0] + data.RandomAvatarRarityWeights[1] + data.RandomAvatarRarityWeights[2])
            rarity = Constants.Epic;
        else
            rarity = Constants.Legendary;
        log.debug("rarity: " + rarity);
        var avatar = AvatarData.GetRandomAvatar(rarity);
        chestResult.AvatarsAdded.push(avatar.Id);
        if (!chestResult.Avatars[avatar.Id].Owned)
            chestResult.Avatars[avatar.Id].Owned = true;
        else
            chestResult.Avatars[avatar.Id].Xp += Constants.XpPerAvatar;
    }
    for (var i = 0; i < data.SpecificAvatars.length; i++) {
        var avatarId = data.SpecificAvatars[i];
        chestResult.AvatarsAdded.push(avatarId);
        if (!chestResult.Avatars[avatarId].Owned)
            chestResult.Avatars[avatarId].Owned = true;
        else
            chestResult.Avatars[avatarId].Xp += Constants.XpPerAvatar;
    }
    log.debug("send internal data");
    var returnData = {};
    returnData[Constants.Letters] = JSON.stringify(chestResult.Letters);
    returnData[Constants.Equipment] = JSON.stringify(chestResult.Inventory);
    returnData[Constants.Avatars] = JSON.stringify(chestResult.Avatars);
    returnData[Constants.UniqueEquipment] = JSON.stringify(uniqueEquipmentId);
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: returnData
    });
    log.debug("complete");
    chestResult.Success = true;
    return chestResult;
};
var getRandomIntBetween = function (min, max) {
    return min + Math.round((max - min) * Math.random());
};
var Constants = (function () {
    function Constants() {
    }
    return Constants;
}());
Constants.Letters = "letters";
Constants.Avatars = "Avatars";
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
Constants.XpPerAvatar = 500;
Constants.Coins = "CO";
Constants.Gems = "Gems";
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
        var baseAvatars = AvatarData.GetAvatars();
        log.debug("avatar key: " + Constants.Avatars);
        log.debug("   " + internalDataResult.Data[Constants.Avatars]);
        if (internalDataResult.Data[Constants.Avatars] != null) {
            log.debug("has avatars already");
            var playerAvatarData = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
            for (var key in playerAvatarData) {
                var playerAvatar = playerAvatarData[key];
                var baseAvatar = baseAvatars[key];
                if (playerAvatar.Owned)
                    baseAvatar.Owned = true;
                if (playerAvatar.Xp > 0)
                    baseAvatar.Xp = playerAvatar.Xp;
                if (playerAvatar.Rank > 0)
                    baseAvatar.Xp = playerAvatar.Rank;
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
            var currencyResult = server.AddUserVirtualCurrency({
                PlayFabId: currentPlayerId,
                VirtualCurrency: "GM",
                Amount: args.MigrateGems
            });
            result.Gems = currencyResult.Balance;
            log.debug("migrate coins");
            var currencyResult = server.AddUserVirtualCurrency({
                PlayFabId: currentPlayerId,
                VirtualCurrency: "CO",
                Amount: args.MigrateCoins
            });
            result.Coins = currencyResult.Balance;
            log.debug("migrate letters");
            for (var id in args.MigrateLetters) {
                log.debug("letter: " + id + ", " + args.MigrateLetters[id]);
                var letter = args.MigrateLetters[id];
                result.Letters[id].Amount = letter.Amount;
                result.Letters[id].Rank = letter.Rank;
            }
            log.debug("migrate avatars");
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
    return EquipmentData;
}());
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
var AvatarData = (function () {
    function AvatarData() {
    }
    AvatarData.GetAvatars = function () {
        return {
            alien: { Owned: false, Xp: 0, Rank: 0 },
            blue: { Owned: true, Xp: 0, Rank: 0 },
            boxer: { Owned: false, Xp: 0, Rank: 0 },
            cat: { Owned: false, Xp: 0, Rank: 0 },
            clown: { Owned: false, Xp: 0, Rank: 0 },
            cow: { Owned: false, Xp: 0, Rank: 0 },
            dinosaur: { Owned: false, Xp: 0, Rank: 0 },
            dog: { Owned: false, Xp: 0, Rank: 0 },
            dragon: { Owned: false, Xp: 0, Rank: 0 },
            fairy: { Owned: false, Xp: 0, Rank: 0 },
            frank: { Owned: false, Xp: 0, Rank: 0 },
            pirate: { Owned: false, Xp: 0, Rank: 0 },
            red: { Owned: true, Xp: 0, Rank: 0 },
            robber: { Owned: false, Xp: 0, Rank: 0 },
            robot: { Owned: false, Xp: 0, Rank: 0 },
            superhero: { Owned: false, Xp: 0, Rank: 0 },
            teddy: { Owned: false, Xp: 0, Rank: 0 },
            wizard: { Owned: false, Xp: 0, Rank: 0 }
        };
    };
    AvatarData.GetRandomAvatar = function (rarity) {
        var dataResult = server.GetTitleData({
            Keys: ["Avatars"]
        });
        var avatarsData = JSON.parse(dataResult.Data["Avatars"]);
        var avatars = AvatarData.GetAvatars();
        var pool = [];
        for (var id in avatars) {
            var avatar = avatars[id];
            var avatarRarity = avatarsData[id].Rarity;
            if (avatarRarity == rarity)
                pool.push({ Id: id, Avatar: avatar });
        }
        return pool[Math.floor(Math.random() * pool.length)];
    };
    AvatarData.IncreaseAvatarRank = function (args) {
        var titleDataResult = server.GetTitleData({
            Keys: [Constants.AvatarRanks, Constants.Avatars]
        });
        var avatarRanks = JSON.parse(titleDataResult.Data[Constants.AvatarRanks]);
        var avatarsData = JSON.parse(titleDataResult.Data[Constants.Avatars]);
        var internalDataResult = server.GetUserInternalData({
            PlayFabId: currentPlayerId,
            Keys: [Constants.Avatars]
        });
        var avatars = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);
        var avatar = avatars[args.Id];
        var rankData = avatarRanks[avatar.Rank];
        var currencyResult = server.SubtractUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: Constants.Coins,
            Amount: rankData.Cost
        });
        avatar.Rank++;
        var data = {};
        data[Constants.Avatars] = JSON.stringify(avatars);
        internalDataResult = server.UpdateUserInternalData({
            PlayFabId: currentPlayerId,
            Data: data
        });
        return avatars;
    };
    return AvatarData;
}());
handlers.AttemptClaimReward = function () {
    var key = "hasClaimedRewardThisWeek";
    var request = {
        Keys: [key],
        PlayFabId: currentPlayerId,
        IfChangedFromDataVersion: -1
    };
    var result = server.GetUserInternalData(request);
    try {
        var hasClaimedRewardThisWeek = JSON.parse(result.Data[key].Value);
        if (!hasClaimedRewardThisWeek) {
            var data = {};
            data[key] = true;
            var updateRequest = {
                Data: data,
                PlayFabId: currentPlayerId
            };
            server.UpdateUserInternalData(updateRequest);
        }
    }
    catch (e) {
    }
};
handlers.pickNewDailyLetters = function () {
    var lettersForThisMonthKey = "DailyLettersForThisMonth";
    var titleData = server.GetTitleInternalData({ Keys: [lettersForThisMonthKey] });
    var lettersForThisMonth = JSON.parse(titleData["Data"][lettersForThisMonthKey]);
    if (lettersForThisMonth.length > 0) {
        var lettersForToday = lettersForThisMonth.pop();
        server.SetTitleData({ Key: "DailySaleLetter0", Value: lettersForToday[0] });
        server.SetTitleData({ Key: "DailySaleLetter1", Value: lettersForToday[1] });
        server.SetTitleData({ Key: "DailySaleLetter2", Value: lettersForToday[2] });
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
handlers.awardTopPlayers = function () {
    var request = {
        StatisticName: "Game Score",
        MaxResultsCount: 10,
        StartPosition: 0
    };
    var leaderboard = server.GetLeaderboard(request);
    leaderboard.Leaderboard.forEach(function (e, i) {
    });
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
    return AvatarData.IncreaseAvatarRank(args);
};
handlers.hash = function (args, context) {
    var str = args.str;
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
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
    var internalDataResult = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [Constants.Letters]
    });
    var letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);
    log.debug("increase letter: " + args.Letter);
    letters[args.Letter].Amount++;
    log.debug("increase letter amount: " + letters[args.Letter].Amount);
    var data = {};
    data[Constants.Letters] = JSON.stringify(letters);
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });
    log.debug("complete");
    return { CurrencyAmount: currencyResult.Balance, Amount: letters[args.Letter].Amount };
};
var SpellData = (function () {
    function SpellData() {
    }
    return SpellData;
}());
//# sourceMappingURL=LetterClubCloudScript.js.map