/// <reference path="./Code/Chests.ts"/>
/// <reference path="./Code/Constants.ts"/>
/// <reference path="./Code/PlayerInit.ts"/>
/// <reference path="./Code/Equipment.ts"/>
/// <reference path="./Code/Avatars.ts"/>

interface IChallengeData {
    HasUnclaimedPrize: boolean;
    BypassNextTaskSweep?: boolean;
}

// called by a task
handlers.grantChallengeRewardToPlayer = () => {
    var challengeDataRecord = server.GetUserData({
        PlayFabId: currentPlayerId,
        Keys: [Constants.ChallengeData]
    }).Data[Constants.ChallengeData];

    var challengeData: IChallengeData;

    if (challengeDataRecord) {
        challengeData = JSON.parse(challengeDataRecord.Value);
        if (challengeData.BypassNextTaskSweep) {
            delete challengeData.BypassNextTaskSweep;
        } else {
            challengeData.HasUnclaimedPrize = true;
        }
    } else {
        challengeData = {
            HasUnclaimedPrize: true
        }
    }

    var data = {};
    data[Constants.ChallengeData] = JSON.stringify(challengeData);

    server.UpdateUserData({
        PlayFabId: currentPlayerId,
        Data: data
    });
}

handlers.checkIfUserQualifiesForChallengeReward = function (): boolean {
    var challengeDataRecord = server.GetUserData({
        Keys: [Constants.ChallengeData],
        PlayFabId: currentPlayerId
    }).Data[Constants.ChallengeData];

    var leaderboard = server.GetLeaderboardAroundUser({
        PlayFabId: currentPlayerId,
        StatisticName: Constants.GameScoreStatisticId,
        MaxResultsCount: 1
    });

    // todo: figure out the real conditions for whether a player qualifies for a reward.
    var qualifies = (leaderboard.Leaderboard[0]) && leaderboard.Leaderboard[0].Position < 500;

    var challengeData: IChallengeData;

    if (!challengeDataRecord) {
        return qualifies;
    }
    else {
        challengeData = JSON.parse(challengeDataRecord.Value);
    }

    log.debug(JSON.stringify(leaderboard));
    return challengeData.HasUnclaimedPrize;
}

interface IAttemptClaimChallengeRewardResult {
    DidClaimSuccessfully: boolean;
}

// called by the client. Assuming that checkIfUserQualifiesForChallengeReward was checked already. 
handlers.claimChallengeReward = function (): IAttemptClaimChallengeRewardResult {
    var challengeDataRecord = server.GetUserData({
        Keys: [Constants.ChallengeData],
        PlayFabId: currentPlayerId
    }).Data[Constants.ChallengeData];

    var challengeData: IChallengeData;

    if (!challengeDataRecord) {
        challengeData = {
            HasUnclaimedPrize: false
        };
    } else {
        challengeData = JSON.parse(challengeDataRecord.Value);
    }

    // if the task has swept through us, HasUnclaimedPrize will be true.
    // (HasUnclaimedPrize exists mainly so that the app can know on startup if there's a prize available)
    // if the task hasn't swept through us yet, we might still be able to claim the prize. If we were 
    // hanging around in the app when the timer expired, the task probably won't have had a chance to run
    // so to provide a fluid UX, we need to just take the client's word for it.
    // we can, however, make sure that the client only gets to have one reward per week.
    // if the client is calling this method and HasUnclaimedPrize is false, we will claim the prize and then set BypassNextTaskSweep to true 
    // if BypassNextTaskSweep is true, we won't claim the prize (because we've already claimed it)
    // the next time the task runs, BypassNextTaskSweep will be removed and everything will be restored to normal.
    // we may then claim another prize... locking us out until the next time the task runs.

    function grantPrize() { log.debug("you got a prize!"); /*todo!*/ };
    function writeChallengeData(challengeData) {
        var data = {}
        data[Constants.ChallengeData] = JSON.stringify(challengeData);
        var result = server.UpdateUserData({
            PlayFabId: currentPlayerId,
            Data: data
        });
    };

    if (challengeData.HasUnclaimedPrize) {
        grantPrize();
        log.debug("has unclaimed prize");
        challengeData.HasUnclaimedPrize = false;
        writeChallengeData(challengeData);
        return {
            DidClaimSuccessfully: true
        };
    }

    if (!challengeData.BypassNextTaskSweep) {
        grantPrize();
        log.debug("bypass sweep");
        challengeData.BypassNextTaskSweep = true;
        writeChallengeData(challengeData);
        return {
            DidClaimSuccessfully: true
        };
    }

    return {
        DidClaimSuccessfully: false
    };
}

handlers.pickNewDailyLetters = () => {
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
}

handlers.resetLeaderboard = data => {
    var url = "https://53BC.playfabapi.com/admin/IncrementPlayerStatisticVersion";
    var method = "post";
    var contentBody = JSON.stringify({ StatisticName: "Game Score" });
    var contentType = "application/json";
    var headers = { "X-SecretKey": "I8NPY91Y3BJ8XRG975AHSP81XJ4J336OHDRSZSJEP4G4NJPA1G" };
    var responseString = (http.request as any)(url, method, contentBody, contentType, headers);
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

handlers.increaseAvatarRank = function (args, context): AvatarList {
    return AvatarData.IncreaseAvatarRank(args);
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
    Message: string
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