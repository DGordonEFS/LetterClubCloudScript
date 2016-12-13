﻿/// <reference path="./Code/Chests"/>
/// <reference path="./Code/Constants"/>

handlers.initPlayer = function (args, context) {
    log.debug("initPlayer");
    var result = { Letters: null, Avatars: null, Migration: false, Coins: -1, Gems: -1 };

    log.debug("getinternaldata");
    // get the user's letter values
    var internalDataResult = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: [Constants.Letters, Constants.Avatars]
    });

    if (internalDataResult.Data[Constants.Letters] != null) {
        result.Letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);
    }
    else {
        result.Letters = {
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
        log.debug("new letters " + result.Letters);
    }

    var baseAvatars = {
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

    if (internalDataResult.Data[Constants.Avatars] != null) {
        var playerAvatarData = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);

        for (var key in playerAvatarData) {
            var playerAvatar = playerAvatarData[key];
            var baseAvatar = baseAvatars[key];
            baseAvatar.isPurchased = playerAvatar.IsPurchased;
        }
    }

    result.Avatars = baseAvatars;
    log.debug("avatars " + result.Avatars);

    if (args.IsMigrating) {
        log.debug("migration");

        // add gems
        var currencyResult = server.AddUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: "GM",
            Amount: args.MigrateGems
        });
        result.Gems = currencyResult.Balance;

        log.debug("migrate coins")
        // add coins
        var currencyResult = server.AddUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: "CO",
            Amount: args.MigrateCoins
        });
        result.Coins = currencyResult.Balance;

        log.debug("migrate letters")

        // set letters
        for (var id in args.MigrateLetters) {
            log.debug("letter: " + id + ", " + args.MigrateLetters[id]);
            var letter = args.MigrateLetters[id];
            result.Letters[id].Amount = letter.Amount;
            result.Letters[id].Rank = letter.Rank;
        }

        log.debug("migrate avatars")
        // unlock avatars
        for (var i = 0; i < args.MigrateAvatars.length; i++) {
            log.debug("avatar: " + args.MigrateAvatars[i]);
            result.Avatars[args.MigrateAvatars[i]].IsPurchased = true;
        }

        result.Migration = true;
    }

    log.debug("send back up");
    var data: { [keys: string]: string } = {};
    data[Constants.Letters] = JSON.stringify(result.Letters);
    data[Constants.Avatars] = JSON.stringify(result.Avatars);
    data[Constants.Migration] = JSON.stringify(result.Migration);

    log.debug("sending avatars: " + data[Constants.Avatars]);

    // send the modified values back to the player's internal data
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });

    log.debug(result.Letters);
    log.debug(result.Avatars);
    log.debug("complete");
    return result;
}

handlers.increaseLetterRank = function (args, context) {
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

    var data: { [keys: string]: string } = {};
    data[Constants.Letters] = JSON.stringify(result.Letters);
    // send the modified values back to the player's internal data
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });

    log.debug("complete");
    return result;
}

handlers.purchaseRandomAvatar = function (args, context) {
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
    var data: { [keys: string]: string } = {};
    data[Constants.Avatars] = JSON.stringify(result.Avatars);
    // send the modified values back to the player's internal data
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });

    log.debug("complete");
    return result;
}


handlers.purchaseRewardChest = function (args, context) {
    var userDataResult = server.GetUserData({
        PlayFabId: currentPlayerId,
        Keys: ["profile"]
    });

    var userProfile = JSON.parse(userDataResult.Data["profile"].Value);

    var chestId = "purple";
    var priceCode = null;
    var priceCost = 0;
    var awardGems = Math.ceil(Math.random() * 3);
    var awardCoins = (userProfile.ArenaIndex + 1) * 50;
    var letterTiers = [userProfile.ArenaIndex + 2, 0, 0, 0]
    var items = [];
    var specificLetters = [];

    // arena 1, 2 letters goes up by one per arena
    // gold = 50 + (50 * arena)
    return purchaseChest(chestId, priceCode, priceCost, awardGems, awardCoins, letterTiers, items, specificLetters);
}

handlers.firstTimeChest = function (args, context) {
    var userDataResult = server.GetUserData({
        PlayFabId: currentPlayerId,
        Keys: ["profile"]
    });

    var userProfile = JSON.parse(userDataResult.Data["profile"].Value);

    var chestId = "purple";
    var priceCode = null;
    var priceCost = 0;
    var awardGems = 10;
    var awardCoins = 100;
    var letterTiers = [0, 0, 0, 0]
    var items = [];
    var specificLetters = [];
    specificLetters.push({ Letter: "g", Amount: 3 });
    specificLetters.push({ Letter: "i", Amount: 3 });
    specificLetters.push({ Letter: "a", Amount: 5 });


    return purchaseChest(chestId, priceCode, priceCost, awardGems, awardCoins, letterTiers, items, specificLetters);
}


handlers.getChestData = function (args, context) {
    return chestData;
}

handlers.purchaseChest = function (args, context) {
    // log.debug("handlers.purchasechest: " + args.Id);
    var chest = chestData[args.Id];
    //log.debug("chest item: " + chest);
    return chest.OnPurchase(chest);
}


handlers.purchaseDailyLetter = function (args, context) {
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

    log.debug("get letters");
    // update the letter
    letters[args.Letter].Amount++;

    log.debug("increase letter amount");
    var data: { [keys: string]: string } = {};
    data[Constants.Letters] = JSON.stringify(letters);
    // send the modified values back to the player's internal data
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });

    log.debug("complete");
    return { CurrencyAmount: currencyResult.Balance, Amount: letters[args.Letter].Amount };
}

handlers.hash = function (args, context) {
    var str = args.str;
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}