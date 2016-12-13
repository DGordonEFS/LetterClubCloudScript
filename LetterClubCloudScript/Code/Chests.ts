
var getRandomIntBetween = function (min, max) {
    return min + Math.round((max - min) * Math.random());
}

var chestData =
    {
        small_letter_chest: {
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
            OnPurchase: function (data) {
                log.debug("small_letter_chest.onPurchase()");
                return purchaseChest(data.ChestId,
                    data.PriceCode,
                    data.PriceCost,
                    getRandomIntBetween(data.GemsMin, data.GemsMax),
                    getRandomIntBetween(data.CoinsMin, data.CoinsMax),
                    data.LetterTiers,
                    [],
                    []);
            }
        },

        medium_letter_chest: {
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
            OnPurchase: function (data) {
                return purchaseChest(data.ChestId,
                    data.PriceCode,
                    data.PriceCost,
                    getRandomIntBetween(data.GemsMin, data.GemsMax),
                    getRandomIntBetween(data.CoinsMin, data.CoinsMax),
                    data.LetterTiers,
                    [],
                    []);
            }
        },

        large_letter_chest: {
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
            OnPurchase: function (data) {
                return purchaseChest(data.ChestId,
                    data.PriceCode,
                    data.PriceCost,
                    getRandomIntBetween(data.GemsMin, data.GemsMax),
                    getRandomIntBetween(data.CoinsMin, data.CoinsMax),
                    data.LetterTiers,
                    [],
                    []);
            }
        }
    };


var purchaseChest = function (chestId, priceCode, priceCost, awardGems, awardCoins, letterTiers, itemsToAdd, specificLetters) {
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
        Keys: [Constants.Letters]
    });
    log.debug("set letters total");
    log.debug(internalDataResult.Data[Constants.Letters].Value);
    chestResult.Letters = JSON.parse(internalDataResult.Data[Constants.Letters].Value);

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

    log.debug("send internal data");
    // send the modified values back to the player's internal data
    var data: { [keys: string]: string } = {};
    data[Constants.Letters] = JSON.stringify(chestResult.Letters);
    internalDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: data
    });

    if (itemsToAdd.length > 0) {
        //	log.debug("add items");
        var grantItemsResult = server.GrantItemsToUser({
            PlayFabId: currentPlayerId,
            ItemIds: itemsToAdd
        });

        // reupdate the inventory
        inventoryResult = server.GetUserInventory({ PlayFabId: currentPlayerId });
    }

    log.debug("complete");
    chestResult.Success = true;
    return chestResult;
}


