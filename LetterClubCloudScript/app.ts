/// <reference path="./Code/Chests.ts"/>
/// <reference path="./Code/Constants.ts"/>
/// <reference path="./Code/PlayerInit.ts"/>
/// <reference path="./Code/Equipment.ts"/>
/// <reference path="./Code/Avatars.ts"/>

handlers.pickNewDailyLetters = function(){
  var lettersForThisMonthKey = "DailyLettersForThisMonth";
  var lettersForThisMonthData = server.GetTitleInternalData({Keys: [lettersForThisMonthKey]})["Data"][lettersForThisMonthKey];
  var dailySaleCurrentData = parseInt(server.GetTitleData({Keys:["DailySaleCurrentDay"]})["Data"]["DailySaleCurrentDay"]);
  var lettersForThisMonth = JSON.parse(lettersForThisMonthData);
  if(lettersForThisMonth.length > 0) {
    var lettersForToday = lettersForThisMonth.pop();
    server.SetTitleData({Key:"DailySaleLetter0", Value:lettersForToday[0]});
    server.SetTitleData({Key:"DailySaleLetter1", Value:lettersForToday[1]});
    server.SetTitleData({Key:"DailySaleLetter2", Value:lettersForToday[2]});
    server.SetTitleData({Key:"DailySaleCurrentDay", Value: (dailySaleCurrentData+1).toString()});
    server.SetTitleInternalData({Key: lettersForThisMonthKey, Value:JSON.stringify(lettersForThisMonth)});
  }
}

handlers.resetLeaderboard = function(data){
    handlers.awardTopPlayers();
    var url = "https://53BC.playfabapi.com/admin/IncrementPlayerStatisticVersion";
    var method = "post";
    var contentBody = JSON.stringify({StatisticName: "Game Score"});
    var contentType = "application/json";
    var headers = {"X-SecretKey" : "I8NPY91Y3BJ8XRG975AHSP81XJ4J336OHDRSZSJEP4G4NJPA1G"};
    var responseString =  (<any>http.request)(url,method,contentBody,contentType,headers); 
    log.debug(responseString);  
}

handlers.initPlayer = function (args, context) {
    return PlayerInit.InitPlayer(args);
}

handlers.increaseLetterRank = function (args, context) {
    return increaseLetterRank(args);
}

handlers.purchaseRandomAvatar = function (args, context): PurchaseRandomAvatarResult {
    return purchaseRandomAvatar(args);
}

handlers.getChestData = function (args, context) {
    return ChestData.GetChests();
}

handlers.purchaseChest = function (args, context): ChestResult {
    return ChestData.PurchaseChest(ChestData.GetChests()[args.Id]);
}

handlers.purchaseDailyLetter = function (args, context) {
    return purchaseDailyLetter(args);
}

handlers.increaseAvatarRank = function (args, context) {
    return AvatarData.IncreaseAvatarRank(args.Id);
}

handlers.getAvatarData = function (args, context): AvatarDataList {
    return AvatarData.GetAvatarData();
}

handlers.getAvatarRankMetaData = function (args, context): AvatarRankMetaData {
    return AvatarData.GetAvatarRankMetaData();
}

handlers.gainAvatarXp = function (args, context) {
    return AvatarData.GainXp(args.Id, args.Xp);
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

interface PurchaseRandomAvatarResult {
    CoinsTotal: number,
    Avatars: {
        IsPurchased: boolean,
        Index: number
    },
    PurchasedAvatarId: string,
    Success: boolean,
    Message:string
};


var purchaseRandomAvatar = function (args): PurchaseRandomAvatarResult {

    log.debug("purchaseRandomAvatar");
    var result: PurchaseRandomAvatarResult = {
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