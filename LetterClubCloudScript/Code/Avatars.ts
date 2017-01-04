
class AvatarData {
    
    public static GetAvatars(): AvatarList  {
        return {
            alien: { Id:"alien", IsPurchased: false, Rarity: 2, Xp:0, Rank:0, LetterData: { a: 1, b: 2, c: 3 } },
            blue: { Id: "blue", IsPurchased: true, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            boxer: { Id: "boxer", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            cat: { Id: "cat", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            clown: { Id: "clown", IsPurchased: false, Rarity: 1, Xp: 0, Rank: 0, LetterData: { a: 3, t: 2, e: 2 } },
            cow: { Id: "cow", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            dinosaur: { Id: "dinosaur", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            dog: { Id: "dog", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            dragon: { Id: "dragon", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            fairy: { Id: "fairy", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            frank: { Id: "frank", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            pirate: { Id: "pirate", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            red: { Id: "red", IsPurchased: true, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            robber: { Id: "robber", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            robot: { Id: "robot", IsPurchased: false, Rarity: 2, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            superhero: { Id: "superhero", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            teddy: { Id: "teddy", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } },
            wizard: { Id: "wizard", IsPurchased: false, Rarity: 0, Xp: 0, Rank: 0, LetterData: { a: 1, b: 1, c: 1 } }
        };
    }

    public static GetRandomAvatar(rarity: number) : Avatar
    {
        var avatars = AvatarData.GetAvatars();
        var pool: Avatar[] = [];

        for (var id in avatars) {
            var avatar = avatars[id];

            if (avatar.Rarity == rarity)
                pool.push(avatar);
        }

        return pool[Math.floor(Math.random() * pool.length)];
    }

    public static IncreaseAvatarRank(args): AvatarList
    {
        var internalDataResult = server.GetUserData({
            PlayFabId: currentPlayerId,
            Keys: [Constants.AvatarRanks]
        });
        var avatarRanks = JSON.parse(internalDataResult.Data[Constants.AvatarRanks].Value);

        var internalDataResult = server.GetUserInternalData({
            PlayFabId: currentPlayerId,
            Keys: [Constants.Avatars]
        });
        var avatars: AvatarList = JSON.parse(internalDataResult.Data[Constants.Avatars].Value);

        var avatar:Avatar = avatars[args.Id];

        var rankData: AvatarRank = avatarRanks[avatar.Rank];
        
        var currencyResult = server.SubtractUserVirtualCurrency({
            PlayFabId: currentPlayerId,
            VirtualCurrency: Constants.Coins,
            Amount: rankData.Cost
        });

        avatar.Rank++;

        var data: { [keys: string]: string } = {};
        data[Constants.Avatars] = JSON.stringify(avatars);

        // send the modified values back to the player's internal data
        internalDataResult = server.UpdateUserInternalData({
            PlayFabId: currentPlayerId,
            Data: data
        });

        return avatars;
    }
}

type AvatarList = { [keys: string]: Avatar }
type AvatarLetterData = { [keys: string]: number };

interface Avatar {
    Id: string,
    IsPurchased: boolean,
    Rarity: number,
    Xp: number,
    Rank: number,
    LetterData: AvatarLetterData
}

interface AvatarRank {
    Xp: number,
    Cost: number
}
