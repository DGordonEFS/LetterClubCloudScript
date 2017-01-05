
class AvatarData {
    
    public static GetAvatars(): AvatarList  {
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
    }

    public static GetRandomAvatar(rarity: number): AvatarId
    {
        var dataResult = server.GetTitleData({
            Keys: ["Avatars"]
        });
        
        var avatarsData = JSON.parse(dataResult.Data["Avatars"]);
        var avatars = AvatarData.GetAvatars();
        var pool: AvatarId[] = [];

        for (var id in avatars) {
            var avatar = avatars[id];
            var avatarRarity:number = avatarsData[id].Rarity;
            if (avatarRarity == rarity)
                pool.push({ Id: id, Avatar: avatar });
        }

        return pool[Math.floor(Math.random() * pool.length)];
    }

    public static IncreaseAvatarRank(args): AvatarList
    {
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

interface Avatar {
    Owned: boolean,
    Xp: number,
    Rank: number
}


type AvatarRanksData = { [keys: string]: AvatarRankData }
type AvatarRankData = { LetterData: AvatarLetterData, BuffData: BuffData }
type AvatarLetterData = { [keys: string]: number };

interface AvatarRank {
    Xp: number,
    Cost: number
}

type AvatarId = { Id: string, Avatar: Avatar }