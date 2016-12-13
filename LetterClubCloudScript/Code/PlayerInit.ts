
class PlayerInit {
    
    public static GetBaseLetters() {
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
    }

    public static GetBaseAvatars() {
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
    }
    
    public static InitPlayer(args) {
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

}

