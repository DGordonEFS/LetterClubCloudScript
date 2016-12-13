/*
	Copyright (c) 2016 Flying Car Games Inc.
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
	associated documentation files (the "Software"), to deal in the Software without restriction, including 
	without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
	copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the 
	following conditions:
	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO 
	EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/** Static object you add your CloudScript endpoints to*/
declare var handlers: any;
/** The playfab id for the user who called into CloudScript*/
declare var currentPlayerId: string;

/** Static object containing cloudscript logging functions
  debug (message:string, exc?:any) : void,
  error (message:string, exc?:any) : void,
  info  (message:string, exc?:any) : void
*/
declare var log: Logger;
interface Logger {
    debug(message: string, exc?: any): void,
    error(message: string, exc?: any): void,
    info(message: string, exc?: any): void
}

/** Static object containing cloudscript external request functions
  request(url:string, method?:string, content?:string, contentType?:string) : string
*/
declare var http: Http;
/** */
interface Http {
    request(url: string, method?: string, content?: string, contentType?: string): string
}

//server api data interfaces

/** */
interface AddCharacterVirtualCurrencyRequest {

    /** PlayFab unique identifier of the user whose virtual currency balance is to be incremented.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Name of the virtual currency which is to be incremented.*/
    VirtualCurrency: string,
    /** Amount to be added to the character balance of the specified virtual currency. Maximum VC balance is Int32 (2,147,483,647). Any increase over this value will be discarded.*/
    Amount: number,
}

/** */
interface AddSharedGroupMembersRequest {

    /** Unique identifier for the shared group.*/
    SharedGroupId: string,
    /** An array of unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabIds?: string[],
}

/** */
interface AddSharedGroupMembersResult {

}

/** */
interface AddUserVirtualCurrencyRequest {

    /** PlayFab unique identifier of the user whose virtual currency balance is to be increased.*/
    PlayFabId: string,
    /** Name of the virtual currency which is to be incremented.*/
    VirtualCurrency: string,
    /** Amount to be added to the user balance of the specified virtual currency. Maximum VC balance is Int32 (2,147,483,647). Any increase over this value will be discarded.*/
    Amount: number,
}

/** */
interface AuthenticateSessionTicketRequest {

    /** Session ticket as issued by a PlayFab client login API.*/
    SessionTicket: string,
}

/** */
interface AuthenticateSessionTicketResult {

    /** Account info for the user whose session ticket was supplied.*/
    UserInfo?: UserAccountInfo,
}

/** */
interface AwardSteamAchievementItem {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique Steam achievement name.*/
    AchievementName: string,
    /** Result of the award attempt (only valid on response, not on request).*/
    Result: boolean,
}

/** */
interface AwardSteamAchievementRequest {

    /** Array of achievements to grant and the users to whom they are to be granted.*/
    Achievements: AwardSteamAchievementItem[],
}

/** */
interface AwardSteamAchievementResult {

    /** Array of achievements granted.*/
    AchievementResults?: AwardSteamAchievementItem[],
}

/** A purchasable item from the item catalog*/
interface CatalogItem {

    /** unique identifier for this item*/
    ItemId: string,
    /** class to which the item belongs*/
    ItemClass?: string,
    /** catalog version for this item*/
    CatalogVersion?: string,
    /** text name for the item, to show in-game*/
    DisplayName?: string,
    /** text description of item, to show in-game*/
    Description?: string,
    /** price of this item in virtual currencies and "RM" (the base Real Money purchase price, in USD pennies)*/
    VirtualCurrencyPrices?: { [key: string]: number },
    /** override prices for this item for specific currencies*/
    RealCurrencyPrices?: { [key: string]: number },
    /** list of item tags*/
    Tags?: string[],
    /** game specific custom data*/
    CustomData?: string,
    /** defines the consumable properties (number of uses, timeout) for the item*/
    Consumable?: CatalogItemConsumableInfo,
    /** defines the container properties for the item - what items it contains, including random drop tables and virtual currencies, and what item (if any) is required to open it via the UnlockContainerItem API*/
    Container?: CatalogItemContainerInfo,
    /** defines the bundle properties for the item - bundles are items which contain other items, including random drop tables and virtual currencies*/
    Bundle?: CatalogItemBundleInfo,
    /** if true, then an item instance of this type can be used to grant a character to a user.*/
    CanBecomeCharacter: boolean,
    /** if true, then only one item instance of this type will exist and its remaininguses will be incremented instead. RemainingUses will cap out at Int32.Max (2,147,483,647). All subsequent increases will be discarded*/
    IsStackable: boolean,
    /** if true, then an item instance of this type can be traded between players using the trading APIs*/
    IsTradable: boolean,
    /** URL to the item image. For Facebook purchase to display the image on the item purchase page, this must be set to an HTTP URL.*/
    ItemImageUrl?: string,
}

/** */
interface CatalogItemBundleInfo {

    /** unique ItemId values for all items which will be added to the player inventory when the bundle is added*/
    BundledItems?: string[],
    /** unique TableId values for all RandomResultTable objects which are part of the bundle (random tables will be resolved and add the relevant items to the player inventory when the bundle is added)*/
    BundledResultTables?: string[],
    /** virtual currency types and balances which will be added to the player inventory when the bundle is added*/
    BundledVirtualCurrencies?: { [key: string]: number },
}

/** */
interface CatalogItemConsumableInfo {

    /** number of times this object can be used, after which it will be removed from the player inventory*/
    UsageCount?: number,
    /** duration in seconds for how long the item will remain in the player inventory - once elapsed, the item will be removed*/
    UsagePeriod?: number,
    /** all inventory item instances in the player inventory sharing a non-null UsagePeriodGroup have their UsagePeriod values added together, and share the result - when that period has elapsed, all the items in the group will be removed*/
    UsagePeriodGroup?: string,
}

/** Containers are inventory items that can hold other items defined in the catalog, as well as virtual currency, which is added to the player inventory when the container is unlocked, using the UnlockContainerItem API. The items can be anything defined in the catalog, as well as RandomResultTable objects which will be resolved when the container is unlocked. Containers and their keys should be defined as Consumable (having a limited number of uses) in their catalog defintiions, unless the intent is for the player to be able to re-use them infinitely.*/
interface CatalogItemContainerInfo {

    /** ItemId for the catalog item used to unlock the container, if any (if not specified, a call to UnlockContainerItem will open the container, adding the contents to the player inventory and currency balances)*/
    KeyItemId?: string,
    /** unique ItemId values for all items which will be added to the player inventory, once the container has been unlocked*/
    ItemContents?: string[],
    /** unique TableId values for all RandomResultTable objects which are part of the container (once unlocked, random tables will be resolved and add the relevant items to the player inventory)*/
    ResultTableContents?: string[],
    /** virtual currency types and balances which will be added to the player inventory when the container is unlocked*/
    VirtualCurrencyContents?: { [key: string]: number },
}

/** */
interface CharacterLeaderboardEntry {

    /** PlayFab unique identifier of the user for this leaderboard entry.*/
    PlayFabId?: string,
    /** PlayFab unique identifier of the character that belongs to the user for this leaderboard entry.*/
    CharacterId?: string,
    /** Title-specific display name of the character for this leaderboard entry.*/
    CharacterName?: string,
    /** Title-specific display name of the user for this leaderboard entry.*/
    DisplayName?: string,
    /** Name of the character class for this entry.*/
    CharacterType?: string,
    /** Specific value of the user's statistic.*/
    StatValue: number,
    /** User's overall position in the leaderboard.*/
    Position: number,
}

/** */
interface CharacterResult {

    /** The id for this character on this player.*/
    CharacterId?: string,
    /** The name of this character.*/
    CharacterName?: string,
    /** The type-string that was given to this character on creation.*/
    CharacterType?: string,
}

/** */
type CloudScriptRevisionOption = "Live "
    | "Latest "
    | "Specific ";

/** */
interface ConsumeItemRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique instance identifier of the item to be consumed.*/
    ItemInstanceId: string,
    /** Number of uses to consume from the item.*/
    ConsumeCount: number,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
}

/** */
interface ConsumeItemResult {

    /** Unique instance identifier of the item with uses consumed.*/
    ItemInstanceId?: string,
    /** Number of uses remaining on the item.*/
    RemainingUses: number,
}

/** */
interface CreateSharedGroupRequest {

    /** Unique identifier for the shared group (a random identifier will be assigned, if one is not specified).*/
    SharedGroupId?: string,
}

/** */
interface CreateSharedGroupResult {

    /** Unique identifier for the shared group.*/
    SharedGroupId?: string,
}

/** */
type Currency = "AED "
    | "AFN "
    | "ALL "
    | "AMD "
    | "ANG "
    | "AOA "
    | "ARS "
    | "AUD "
    | "AWG "
    | "AZN "
    | "BAM "
    | "BBD "
    | "BDT "
    | "BGN "
    | "BHD "
    | "BIF "
    | "BMD "
    | "BND "
    | "BOB "
    | "BRL "
    | "BSD "
    | "BTN "
    | "BWP "
    | "BYR "
    | "BZD "
    | "CAD "
    | "CDF "
    | "CHF "
    | "CLP "
    | "CNY "
    | "COP "
    | "CRC "
    | "CUC "
    | "CUP "
    | "CVE "
    | "CZK "
    | "DJF "
    | "DKK "
    | "DOP "
    | "DZD "
    | "EGP "
    | "ERN "
    | "ETB "
    | "EUR "
    | "FJD "
    | "FKP "
    | "GBP "
    | "GEL "
    | "GGP "
    | "GHS "
    | "GIP "
    | "GMD "
    | "GNF "
    | "GTQ "
    | "GYD "
    | "HKD "
    | "HNL "
    | "HRK "
    | "HTG "
    | "HUF "
    | "IDR "
    | "ILS "
    | "IMP "
    | "INR "
    | "IQD "
    | "IRR "
    | "ISK "
    | "JEP "
    | "JMD "
    | "JOD "
    | "JPY "
    | "KES "
    | "KGS "
    | "KHR "
    | "KMF "
    | "KPW "
    | "KRW "
    | "KWD "
    | "KYD "
    | "KZT "
    | "LAK "
    | "LBP "
    | "LKR "
    | "LRD "
    | "LSL "
    | "LYD "
    | "MAD "
    | "MDL "
    | "MGA "
    | "MKD "
    | "MMK "
    | "MNT "
    | "MOP "
    | "MRO "
    | "MUR "
    | "MVR "
    | "MWK "
    | "MXN "
    | "MYR "
    | "MZN "
    | "NAD "
    | "NGN "
    | "NIO "
    | "NOK "
    | "NPR "
    | "NZD "
    | "OMR "
    | "PAB "
    | "PEN "
    | "PGK "
    | "PHP "
    | "PKR "
    | "PLN "
    | "PYG "
    | "QAR "
    | "RON "
    | "RSD "
    | "RUB "
    | "RWF "
    | "SAR "
    | "SBD "
    | "SCR "
    | "SDG "
    | "SEK "
    | "SGD "
    | "SHP "
    | "SLL "
    | "SOS "
    | "SPL "
    | "SRD "
    | "STD "
    | "SVC "
    | "SYP "
    | "SZL "
    | "THB "
    | "TJS "
    | "TMT "
    | "TND "
    | "TOP "
    | "TRY "
    | "TTD "
    | "TVD "
    | "TWD "
    | "TZS "
    | "UAH "
    | "UGX "
    | "USD "
    | "UYU "
    | "UZS "
    | "VEF "
    | "VND "
    | "VUV "
    | "WST "
    | "XAF "
    | "XCD "
    | "XDR "
    | "XOF "
    | "XPF "
    | "YER "
    | "ZAR "
    | "ZMW "
    | "ZWD ";

/** */
interface DeleteCharacterFromUserRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** If true, the character's inventory will be transferred up to the owning user; otherwise, this request will purge those items.*/
    SaveCharacterInventory: boolean,
}

/** */
interface DeleteCharacterFromUserResult {

}

/** */
interface DeleteSharedGroupRequest {

    /** Unique identifier for the shared group.*/
    SharedGroupId?: string,
}

/** */
interface DeleteUsersRequest {

    /** An array of unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabIds: string[],
    /** Unique identifier for the title, found in the Settings > Game Properties section of the PlayFab developer site when a title has been selected.*/
    TitleId: string,
}

/** */
interface DeleteUsersResult {

}

/** */
interface EmptyResult {

}

/** */
interface EvaluateRandomResultTableRequest {

    /** The unique identifier of the Random Result Table to use.*/
    TableId: string,
    /** Specifies the catalog version that should be used to evaluate the Random Result Table.  If unspecified, uses default/primary catalog.*/
    CatalogVersion?: string,
}

/** */
interface EvaluateRandomResultTableResult {

    /** Unique identifier for the item returned from the Random Result Table evaluation, for the given catalog.*/
    ResultItemId?: string,
}

/** */
interface ExecuteCloudScriptResult {

    /** The name of the function that executed*/
    FunctionName?: string,
    /** The revision of the CloudScript that executed*/
    Revision: number,
    /** The object returned from the CloudScript function, if any*/
    FunctionResult?: any,
    /** Entries logged during the function execution. These include both entries logged in the function code using log.info() and log.error() and error entries for API and HTTP request failures.*/
    Logs?: LogStatement[],
    /** */
    ExecutionTimeSeconds: number,
    /** */
    MemoryConsumedBytes: number,
    /** Number of PlayFab API requests issued by the CloudScript function*/
    APIRequestsIssued: number,
    /** Number of external HTTP requests issued by the CloudScript function*/
    HttpRequestsIssued: number,
    /** Information about the error, if any, that occured during execution*/
    Error?: ScriptExecutionError,
}

/** */
interface ExecuteCloudScriptServerRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId?: string,
    /** The name of the CloudScript function to execute*/
    FunctionName: string,
    /** Object that is passed in to the function as the first argument*/
    FunctionParameter?: any,
    /** Option for which revision of the CloudScript to execute. 'Latest' executes the most recently created revision, 'Live' executes the current live, published revision, and 'Specific' executes the specified revision. The default value is 'Specific', if the SpeificRevision parameter is specified, otherwise it is 'Live'.*/
    RevisionSelection?: CloudScriptRevisionOption,
    /** The specivic revision to execute, when RevisionSelection is set to 'Specific'*/
    SpecificRevision?: number,
    /** Generate a 'player_executed_cloudscript' PlayStream event containing the results of the function execution and other contextual information. This event will show up in the PlayStream debugger console for the player in Game Manager.*/
    GeneratePlayStreamEvent?: boolean,
}

/** */
interface FacebookPlayFabIdPair {

    /** Unique Facebook identifier for a user.*/
    FacebookId?: string,
    /** Unique PlayFab identifier for a user, or null if no PlayFab account is linked to the Facebook identifier.*/
    PlayFabId?: string,
}

/** */
interface FriendInfo {

    /** PlayFab unique identifier for this friend.*/
    FriendPlayFabId?: string,
    /** PlayFab unique username for this friend.*/
    Username?: string,
    /** Title-specific display name for this friend.*/
    TitleDisplayName?: string,
    /** Tags which have been associated with this friend.*/
    Tags?: string[],
    /** Unique lobby identifier of the Game Server Instance to which this player is currently connected.*/
    CurrentMatchmakerLobbyId?: string,
    /** Available Facebook information (if the user and PlayFab friend are also connected in Facebook).*/
    FacebookInfo?: UserFacebookInfo,
    /** Available Steam information (if the user and PlayFab friend are also connected in Steam).*/
    SteamInfo?: UserSteamInfo,
    /** Available Game Center information (if the user and PlayFab friend are also connected in Game Center).*/
    GameCenterInfo?: UserGameCenterInfo,
}

/** */
type GameInstanceState = "Open "
    | "Closed ";

/** */
interface GetCatalogItemsRequest {

    /** Which catalog is being requested.*/
    CatalogVersion?: string,
}

/** */
interface GetCatalogItemsResult {

    /** Array of items which can be purchased.*/
    Catalog?: CatalogItem[],
}

/** */
interface GetCharacterDataRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Specific keys to search for in the custom user data.*/
    Keys?: string[],
    /** The version that currently exists according to the caller. The call will return the data for all of the keys if the version in the system is greater than this.*/
    IfChangedFromDataVersion?: number,
}

/** */
interface GetCharacterDataResult {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId?: string,
    /** Indicates the current version of the data that has been set. This is incremented with every set call for that type of data (read-only, internal, etc). This version can be provided in Get calls to find updated data.*/
    DataVersion: number,
    /** User specific data for this title.*/
    Data?: { [key: string]: UserDataRecord },
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
}

/** */
interface GetCharacterInventoryRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Used to limit results to only those from a specific catalog version.*/
    CatalogVersion?: string,
}

/** */
interface GetCharacterInventoryResult {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId?: string,
    /** Unique identifier of the character for this inventory.*/
    CharacterId?: string,
    /** Array of inventory items belonging to the character.*/
    Inventory?: ItemInstance[],
    /** Array of virtual currency balance(s) belonging to the character.*/
    VirtualCurrency?: { [key: string]: number },
    /** Array of remaining times and timestamps for virtual currencies.*/
    VirtualCurrencyRechargeTimes?: { [key: string]: VirtualCurrencyRechargeTime },
}

/** */
interface GetCharacterLeaderboardRequest {

    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Optional character type on which to filter the leaderboard entries.*/
    CharacterType?: string,
    /** Unique identifier for the title-specific statistic for the leaderboard.*/
    StatisticName: string,
    /** First entry in the leaderboard to be retrieved.*/
    StartPosition: number,
    /** Maximum number of entries to retrieve.*/
    MaxResultsCount: number,
}

/** */
interface GetCharacterLeaderboardResult {

    /** Ordered list of leaderboard entries.*/
    Leaderboard?: CharacterLeaderboardEntry[],
}

/** */
interface GetCharacterStatisticsRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
}

/** */
interface GetCharacterStatisticsResult {

    /** PlayFab unique identifier of the user whose character statistics are being returned.*/
    PlayFabId?: string,
    /** Unique identifier of the character for the statistics.*/
    CharacterId?: string,
    /** Character statistics for the requested user.*/
    CharacterStatistics?: { [key: string]: number },
}

/** */
interface GetContentDownloadUrlRequest {

    /** Key of the content item to fetch, usually formatted as a path, e.g. images/a.png*/
    Key: string,
    /** HTTP method to fetch item - GET or HEAD. Use HEAD when only fetching metadata. Default is GET.*/
    HttpMethod?: string,
    /** True if download through CDN. CDN provides better download bandwidth and time. However, if you want latest, non-cached version of the content, set this to false. Default is true.*/
    ThruCDN?: boolean,
}

/** */
interface GetContentDownloadUrlResult {

    /** URL for downloading content via HTTP GET or HEAD method. The URL will expire in 1 hour.*/
    URL?: string,
}

/** */
interface GetLeaderboardAroundCharacterRequest {

    /** Unique identifier for the title-specific statistic for the leaderboard.*/
    StatisticName: string,
    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Optional character type on which to filter the leaderboard entries.*/
    CharacterType?: string,
    /** Maximum number of entries to retrieve.*/
    MaxResultsCount: number,
}

/** */
interface GetLeaderboardAroundCharacterResult {

    /** Ordered list of leaderboard entries.*/
    Leaderboard?: CharacterLeaderboardEntry[],
}

/** */
interface GetLeaderboardAroundUserRequest {

    /** Unique identifier for the title-specific statistic for the leaderboard.*/
    StatisticName: string,
    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Maximum number of entries to retrieve.*/
    MaxResultsCount: number,
}

/** */
interface GetLeaderboardAroundUserResult {

    /** Ordered list of leaderboard entries.*/
    Leaderboard?: PlayerLeaderboardEntry[],
}

/** */
interface GetLeaderboardForUsersCharactersRequest {

    /** Unique identifier for the title-specific statistic for the leaderboard.*/
    StatisticName: string,
    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Maximum number of entries to retrieve.*/
    MaxResultsCount: number,
}

/** */
interface GetLeaderboardForUsersCharactersResult {

    /** Ordered list of leaderboard entries.*/
    Leaderboard?: CharacterLeaderboardEntry[],
}

/** */
interface GetLeaderboardRequest {

    /** Unique identifier for the title-specific statistic for the leaderboard.*/
    StatisticName: string,
    /** First entry in the leaderboard to be retrieved.*/
    StartPosition: number,
    /** Maximum number of entries to retrieve.*/
    MaxResultsCount: number,
}

/** */
interface GetLeaderboardResult {

    /** Ordered list of leaderboard entries.*/
    Leaderboard?: PlayerLeaderboardEntry[],
}

/** */
interface GetPlayerStatisticsRequest {

    /** user for whom statistics are being requested*/
    PlayFabId: string,
    /** statistics to return*/
    StatisticNames?: string[],
    /** statistics to return, if StatisticNames is not set (only statistics which have a version matching that provided will be returned)*/
    StatisticNameVersions?: StatisticNameVersion[],
}

/** */
interface GetPlayerStatisticsResult {

    /** PlayFab unique identifier of the user whose statistics are being returned*/
    PlayFabId?: string,
    /** User statistics for the requested user.*/
    Statistics?: StatisticValue[],
}

/** */
interface GetPlayerStatisticVersionsRequest {

    /** unique name of the statistic*/
    StatisticName?: string,
}

/** */
interface GetPlayerStatisticVersionsResult {

    /** version change history of the statistic*/
    StatisticVersions?: PlayerStatisticVersion[],
}

/** */
interface GetPlayFabIDsFromFacebookIDsRequest {

    /** Array of unique Facebook identifiers for which the title needs to get PlayFab identifiers.*/
    FacebookIDs: string[],
}

/** */
interface GetPlayFabIDsFromFacebookIDsResult {

    /** Mapping of Facebook identifiers to PlayFab identifiers.*/
    Data?: FacebookPlayFabIdPair[],
}

/** */
interface GetPlayFabIDsFromSteamIDsRequest {

    /** Deprecated: Please use SteamStringIDs*/
    SteamIDs?: number[],
    /** Array of unique Steam identifiers (Steam profile IDs) for which the title needs to get PlayFab identifiers.*/
    SteamStringIDs?: string[],
}

/** */
interface GetPlayFabIDsFromSteamIDsResult {

    /** Mapping of Steam identifiers to PlayFab identifiers.*/
    Data?: SteamPlayFabIdPair[],
}

/** */
interface GetPublisherDataRequest {

    /**  array of keys to get back data from the Publisher data blob, set by the admin tools*/
    Keys: string[],
}

/** */
interface GetPublisherDataResult {

    /** a dictionary object of key / value pairs*/
    Data?: { [key: string]: string },
}

/** */
interface GetSharedGroupDataRequest {

    /** Unique identifier for the shared group.*/
    SharedGroupId?: string,
    /** Specific keys to retrieve from the shared group (if not specified, all keys will be returned, while an empty array indicates that no keys should be returned).*/
    Keys?: string[],
    /** If true, return the list of all members of the shared group.*/
    GetMembers?: boolean,
}

/** */
interface GetSharedGroupDataResult {

    /** Data for the requested keys.*/
    Data?: { [key: string]: SharedGroupDataRecord },
    /** List of PlayFabId identifiers for the members of this group, if requested.*/
    Members?: string[],
}

/** */
interface GetTitleDataRequest {

    /** Specific keys to search for in the title data (leave null to get all keys)*/
    Keys?: string[],
}

/** */
interface GetTitleDataResult {

    /** a dictionary object of key / value pairs*/
    Data?: { [key: string]: string },
}

/** */
interface GetTitleNewsRequest {

    /** Limits the results to the last n entries. Defaults to 10 if not set.*/
    Count?: number,
}

/** */
interface GetTitleNewsResult {

    /** Array of news items.*/
    News?: TitleNewsItem[],
}

/** */
interface GetUserAccountInfoRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
}

/** */
interface GetUserAccountInfoResult {

    /** Account details for the user whose information was requested.*/
    UserInfo?: UserAccountInfo,
}

/** */
interface GetUserDataRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Specific keys to search for in the custom user data.*/
    Keys?: string[],
    /** The version that currently exists according to the caller. The call will return the data for all of the keys if the version in the system is greater than this.*/
    IfChangedFromDataVersion?: number,
}

/** */
interface GetUserDataResult {

    /** PlayFab unique identifier of the user whose custom data is being returned.*/
    PlayFabId?: string,
    /** Indicates the current version of the data that has been set. This is incremented with every set call for that type of data (read-only, internal, etc). This version can be provided in Get calls to find updated data.*/
    DataVersion: number,
    /** User specific data for this title.*/
    Data?: { [key: string]: UserDataRecord },
}

/** */
interface GetUserInventoryRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
}

/** */
interface GetUserInventoryResult {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId?: string,
    /** Array of inventory items belonging to the user.*/
    Inventory?: ItemInstance[],
    /** Array of virtual currency balance(s) belonging to the user.*/
    VirtualCurrency?: { [key: string]: number },
    /** Array of remaining times and timestamps for virtual currencies.*/
    VirtualCurrencyRechargeTimes?: { [key: string]: VirtualCurrencyRechargeTime },
}

/** */
interface GetUserStatisticsRequest {

    /** User for whom statistics are being requested.*/
    PlayFabId: string,
}

/** */
interface GetUserStatisticsResult {

    /** PlayFab unique identifier of the user whose statistics are being returned.*/
    PlayFabId?: string,
    /** User statistics for the requested user.*/
    UserStatistics?: { [key: string]: number },
}

/** */
interface GrantCharacterToUserRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Non-unique display name of the character being granted.*/
    CharacterName: string,
    /** Type of the character being granted; statistics can be sliced based on this value.*/
    CharacterType: string,
}

/** */
interface GrantCharacterToUserResult {

    /** Unique identifier tagged to this character.*/
    CharacterId?: string,
}

/** Result of granting an item to a user*/
interface GrantedItemInstance {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId?: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
    /** Result of this operation.*/
    Result: boolean,
    /** Unique identifier for the inventory item, as defined in the catalog.*/
    ItemId?: string,
    /** Unique item identifier for this specific instance of the item.*/
    ItemInstanceId?: string,
    /** Class name for the inventory item, as defined in the catalog.*/
    ItemClass?: string,
    /** Timestamp for when this instance was purchased.*/
    PurchaseDate?: string,
    /** Timestamp for when this instance will expire.*/
    Expiration?: string,
    /** Total number of remaining uses, if this is a consumable item.*/
    RemainingUses?: number,
    /** The number of uses that were added or removed to this item in this call.*/
    UsesIncrementedBy?: number,
    /** Game specific comment associated with this instance when it was added to the user inventory.*/
    Annotation?: string,
    /** Catalog version for the inventory item, when this instance was created.*/
    CatalogVersion?: string,
    /** Unique identifier for the parent inventory item, as defined in the catalog, for object which were added from a bundle or container.*/
    BundleParent?: string,
    /** CatalogItem.DisplayName at the time this item was purchased.*/
    DisplayName?: string,
    /** Currency type for the cost of the catalog item.*/
    UnitCurrency?: string,
    /** Cost of the catalog item in the given currency.*/
    UnitPrice: number,
    /** Array of unique items that were awarded when this catalog item was purchased.*/
    BundleContents?: string[],
    /** A set of custom key-value pairs on the inventory item.*/
    CustomData?: { [key: string]: string },
}

/** */
interface GrantItemsToCharacterRequest {

    /** Catalog version from which items are to be granted.*/
    CatalogVersion?: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** String detailing any additional information concerning this operation.*/
    Annotation?: string,
    /** Array of itemIds to grant to the user.*/
    ItemIds?: string[],
}

/** */
interface GrantItemsToCharacterResult {

    /** Array of items granted to users.*/
    ItemGrantResults?: GrantedItemInstance[],
}

/** */
interface GrantItemsToUserRequest {

    /** Catalog version from which items are to be granted.*/
    CatalogVersion?: string,
    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** String detailing any additional information concerning this operation.*/
    Annotation?: string,
    /** Array of itemIds to grant to the user.*/
    ItemIds: string[],
}

/** */
interface GrantItemsToUserResult {

    /** Array of items granted to users.*/
    ItemGrantResults?: GrantedItemInstance[],
}

/** */
interface GrantItemsToUsersRequest {

    /** Catalog version from which items are to be granted.*/
    CatalogVersion?: string,
    /** Array of items to grant and the users to whom the items are to be granted.*/
    ItemGrants: ItemGrant[],
}

/** */
interface GrantItemsToUsersResult {

    /** Array of items granted to users.*/
    ItemGrantResults?: GrantedItemInstance[],
}

/** */
interface ItemGrant {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique identifier of the catalog item to be granted to the user.*/
    ItemId: string,
    /** String detailing any additional information concerning this operation.*/
    Annotation?: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
    /** Key-value pairs to be written to the custom data. Note that keys are trimmed of whitespace, are limited in size, and may not begin with a '!' character.*/
    Data?: { [key: string]: string },
    /** Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert null-values into Data due to language constraints.  Use this to delete the keys directly.*/
    KeysToRemove?: string[],
}

/** A unique instance of an item in a user's inventory*/
interface ItemInstance {

    /** Unique identifier for the inventory item, as defined in the catalog.*/
    ItemId?: string,
    /** Unique item identifier for this specific instance of the item.*/
    ItemInstanceId?: string,
    /** Class name for the inventory item, as defined in the catalog.*/
    ItemClass?: string,
    /** Timestamp for when this instance was purchased.*/
    PurchaseDate?: string,
    /** Timestamp for when this instance will expire.*/
    Expiration?: string,
    /** Total number of remaining uses, if this is a consumable item.*/
    RemainingUses?: number,
    /** The number of uses that were added or removed to this item in this call.*/
    UsesIncrementedBy?: number,
    /** Game specific comment associated with this instance when it was added to the user inventory.*/
    Annotation?: string,
    /** Catalog version for the inventory item, when this instance was created.*/
    CatalogVersion?: string,
    /** Unique identifier for the parent inventory item, as defined in the catalog, for object which were added from a bundle or container.*/
    BundleParent?: string,
    /** CatalogItem.DisplayName at the time this item was purchased.*/
    DisplayName?: string,
    /** Currency type for the cost of the catalog item.*/
    UnitCurrency?: string,
    /** Cost of the catalog item in the given currency.*/
    UnitPrice: number,
    /** Array of unique items that were awarded when this catalog item was purchased.*/
    BundleContents?: string[],
    /** A set of custom key-value pairs on the inventory item.*/
    CustomData?: { [key: string]: string },
}

/** */
interface ListUsersCharactersRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
}

/** */
interface ListUsersCharactersResult {

    /** The requested list of characters.*/
    Characters?: CharacterResult[],
}

/** */
interface LogEventRequest {

    /** PlayFab User Id of the player associated with this event. For non-player associated events, this must be null and EntityId must be set.*/
    PlayFabId?: string,
    /** For non player-associated events, a unique ID for the entity associated with this event. For player associated events, this must be null and PlayFabId must be set.*/
    EntityId?: string,
    /** For non player-associated events, the type of entity associated with this event. For player associated events, this must be null.*/
    EntityType?: string,
    /** Optional timestamp for this event. If null, the a timestamp is auto-assigned to the event on the server.*/
    Timestamp?: string,
    /** A unique event name which will be used as the table name in the Redshift database. The name will be made lower case, and cannot not contain spaces. The use of underscores is recommended, for readability. Events also cannot match reserved terms. The PlayFab reserved terms are 'log_in' and 'purchase', 'create' and 'request', while the Redshift reserved terms can be found here: http://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html.*/
    EventName?: string,
    /** Contains all the data for this event. Event Values can be strings, booleans or numerics (float, double, integer, long) and must be consistent on a per-event basis (if the Value for Key 'A' in Event 'Foo' is an integer the first time it is sent, it must be an integer in all subsequent 'Foo' events). As with event names, Keys must also not use reserved words (see above). Finally, the size of the Body for an event must be less than 32KB (UTF-8 format).*/
    Body?: { [key: string]: any },
    /** Flag to set event Body as profile details in the Redshift database as well as a standard event.*/
    ProfileSetEvent: boolean,
}

/** */
interface LogEventResult {

}

/** */
interface LogStatement {

    /** 'Debug', 'Info', or 'Error'*/
    Level?: string,
    /** */
    Message?: string,
    /** Optional object accompanying the message as contextual information*/
    Data?: any,
}

/** */
interface ModifyCharacterVirtualCurrencyResult {

    /** Name of the virtual currency which was modified.*/
    VirtualCurrency?: string,
    /** Balance of the virtual currency after modification.*/
    Balance: number,
}

/** */
interface ModifyItemUsesRequest {

    /** PlayFab unique identifier of the user whose item is being modified.*/
    PlayFabId: string,
    /** Unique instance identifier of the item to be modified.*/
    ItemInstanceId: string,
    /** Number of uses to add to the item. Can be negative to remove uses.*/
    UsesToAdd: number,
}

/** */
interface ModifyItemUsesResult {

    /** Unique instance identifier of the item with uses consumed.*/
    ItemInstanceId?: string,
    /** Number of uses remaining on the item.*/
    RemainingUses: number,
}

/** */
interface ModifyUserVirtualCurrencyResult {

    /** User currency was subtracted from.*/
    PlayFabId?: string,
    /** Name of the virtual currency which was modified.*/
    VirtualCurrency?: string,
    /** Amount added or subtracted from the user's virtual currency. Maximum VC balance is Int32 (2,147,483,647). Any increase over this value will be discarded.*/
    BalanceChange: number,
    /** Balance of the virtual currency after modification.*/
    Balance: number,
}

/** */
interface MoveItemToCharacterFromCharacterRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique identifier of the character that currently has the item.*/
    GivingCharacterId: string,
    /** Unique identifier of the character that will be receiving the item.*/
    ReceivingCharacterId: string,
    /** Unique PlayFab assigned instance identifier of the item*/
    ItemInstanceId: string,
}

/** */
interface MoveItemToCharacterFromCharacterResult {

}

/** */
interface MoveItemToCharacterFromUserRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Unique PlayFab assigned instance identifier of the item*/
    ItemInstanceId: string,
}

/** */
interface MoveItemToCharacterFromUserResult {

}

/** */
interface MoveItemToUserFromCharacterRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Unique PlayFab assigned instance identifier of the item*/
    ItemInstanceId: string,
}

/** */
interface MoveItemToUserFromCharacterResult {

}

/** */
interface NotifyMatchmakerPlayerLeftRequest {

    /** Unique identifier of the Game Instance the user is leaving.*/
    LobbyId: string,
    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
}

/** */
interface NotifyMatchmakerPlayerLeftResult {

    /** State of user leaving the Game Server Instance.*/
    PlayerState?: PlayerConnectionState,
}

/** */
type PlayerConnectionState = "Unassigned "
    | "Connecting "
    | "Participating "
    | "Participated "
    | "Reconnecting ";

/** */
interface PlayerLeaderboardEntry {

    /** PlayFab unique identifier of the user for this leaderboard entry.*/
    PlayFabId?: string,
    /** Title-specific display name of the user for this leaderboard entry.*/
    DisplayName?: string,
    /** Specific value of the user's statistic.*/
    StatValue: number,
    /** User's overall position in the leaderboard.*/
    Position: number,
}

/** */
interface PlayerStatisticVersion {

    /** name of the statistic when the version became active*/
    StatisticName?: string,
    /** version of the statistic*/
    Version: number,
    /** time at which the statistic version was scheduled to become active, based on the configured ResetInterval*/
    ScheduledActivationTime?: string,
    /** time when the statistic version became active*/
    ActivationTime: string,
    /** time at which the statistic version was scheduled to become inactive, based on the configured ResetInterval*/
    ScheduledDeactivationTime?: string,
    /** time when the statistic version became inactive due to statistic version incrementing*/
    DeactivationTime?: string,
}

/** */
interface RedeemCouponRequest {

    /** Generated coupon code to redeem.*/
    CouponCode: string,
    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Catalog version of the coupon.*/
    CatalogVersion?: string,
}

/** */
interface RedeemCouponResult {

    /** Items granted to the player as a result of redeeming the coupon.*/
    GrantedItems?: ItemInstance[],
}

/** */
interface RedeemMatchmakerTicketRequest {

    /** Server authorization ticket passed back from a call to Matchmake or StartGame.*/
    Ticket: string,
    /** Unique identifier of the Game Server Instance that is asking for validation of the authorization ticket.*/
    LobbyId: string,
}

/** */
interface RedeemMatchmakerTicketResult {

    /** Boolean indicating whether the ticket was validated by the PlayFab service.*/
    TicketIsValid: boolean,
    /** Error value if the ticket was not validated.*/
    Error?: string,
    /** User account information for the user validated.*/
    UserInfo?: UserAccountInfo,
}

/** */
interface RemoveSharedGroupMembersRequest {

    /** Unique identifier for the shared group.*/
    SharedGroupId: string,
    /** An array of unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabIds?: string[],
}

/** */
interface RemoveSharedGroupMembersResult {

}

/** */
interface ReportPlayerServerRequest {

    /** PlayFabId of the reporting player.*/
    ReporterId: string,
    /** PlayFabId of the reported player.*/
    ReporteeId: string,
    /** Title player was reported in, optional if report not for specific title.*/
    TitleId?: string,
    /** Optional additional comment by reporting player.*/
    Comment?: string,
}

/** */
interface ReportPlayerServerResult {

    /** Indicates whether this action completed successfully.*/
    Updated: boolean,
    /** The number of remaining reports which may be filed today by this reporting player.*/
    SubmissionsRemaining: number,
}

/** */
interface RevokeInventoryItemRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
    /** Unique PlayFab assigned instance identifier of the item*/
    ItemInstanceId: string,
}

/** */
interface RevokeInventoryResult {

}

/** */
interface ScriptExecutionError {

    /** Error code, such as CloudScriptNotFound, JavascriptException, CloudScriptFunctionArgumentSizeExceeded, CloudScriptAPIRequestCountExceeded, CloudScriptAPIRequestError, or CloudScriptHTTPRequestError*/
    Error?: string,
    /** Details about the error*/
    Message?: string,
    /** Point during the execution of the script at which the error occurred, if any*/
    StackTrace?: string,
}

/** */
interface SendPushNotificationRequest {

    /** PlayFabId of the recipient of the push notification.*/
    Recipient: string,
    /** Text of message to send.*/
    Message: string,
    /** Subject of message to send (may not be displayed in all platforms.*/
    Subject?: string,
}

/** */
interface SendPushNotificationResult {

}

/** */
interface SetGameServerInstanceDataRequest {

    /** Unique identifier of the Game Instance to be updated.*/
    LobbyId: string,
    /** Custom data to set for the specified game server instance.*/
    GameServerData: string,
}

/** */
interface SetGameServerInstanceDataResult {

}

/** */
interface SetGameServerInstanceStateRequest {

    /** Unique identifier of the Game Instance to be updated.*/
    LobbyId: string,
    /** State to set for the specified game server instance.*/
    State: GameInstanceState,
}

/** */
interface SetGameServerInstanceStateResult {

}

/** */
interface SetPublisherDataRequest {

    /** key we want to set a value on (note, this is additive - will only replace an existing key's value if they are the same name.) Keys are trimmed of whitespace. Keys may not begin with the '!' character.*/
    Key: string,
    /** new value to set. Set to null to remove a value*/
    Value?: string,
}

/** */
interface SetPublisherDataResult {

}

/** */
interface SetTitleDataRequest {

    /** key we want to set a value on (note, this is additive - will only replace an existing key's value if they are the same name.) Keys are trimmed of whitespace. Keys may not begin with the '!' character.*/
    Key: string,
    /** new value to set. Set to null to remove a value*/
    Value?: string,
}

/** */
interface SetTitleDataResult {

}

/** */
interface SharedGroupDataRecord {

    /** Data stored for the specified group data key.*/
    Value?: string,
    /** PlayFabId of the user to last update this value.*/
    LastUpdatedBy?: string,
    /** Timestamp for when this data was last updated.*/
    LastUpdated: string,
    /** Indicates whether this data can be read by all users (public) or only members of the group (private).*/
    Permission?: UserDataPermission,
}

/** */
interface StatisticNameVersion {

    /** unique name of the statistic*/
    StatisticName: string,
    /** the version of the statistic to be returned*/
    Version: number,
}

/** */
interface StatisticUpdate {

    /** unique name of the statistic*/
    StatisticName: string,
    /** for updates to an existing statistic value for a player, the version of the statistic when it was loaded. Null when setting the statistic value for the first time.*/
    Version?: number,
    /** statistic value for the player*/
    Value: number,
}

/** */
interface StatisticValue {

    /** unique name of the statistic*/
    StatisticName?: string,
    /** statistic value for the player*/
    Value: number,
    /** for updates to an existing statistic value for a player, the version of the statistic when it was loaded*/
    Version: number,
}

/** */
interface SteamPlayFabIdPair {

    /** Deprecated: Please use SteamStringId*/
    SteamId: number,
    /** Unique Steam identifier for a user.*/
    SteamStringId?: string,
    /** Unique PlayFab identifier for a user, or null if no PlayFab account is linked to the Steam identifier.*/
    PlayFabId?: string,
}

/** */
interface SubtractCharacterVirtualCurrencyRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Name of the virtual currency which is to be decremented.*/
    VirtualCurrency: string,
    /** Amount to be subtracted from the user balance of the specified virtual currency.*/
    Amount: number,
}

/** */
interface SubtractUserVirtualCurrencyRequest {

    /** PlayFab unique identifier of the user whose virtual currency balance is to be decreased.*/
    PlayFabId: string,
    /** Name of the virtual currency which is to be decremented.*/
    VirtualCurrency: string,
    /** Amount to be subtracted from the user balance of the specified virtual currency.*/
    Amount: number,
}

/** */
type TitleActivationStatus = "None "
    | "ActivatedTitleKey "
    | "PendingSteam "
    | "ActivatedSteam "
    | "RevokedSteam ";

/** */
interface TitleNewsItem {

    /** Date and time when the news items was posted.*/
    Timestamp: string,
    /** Unique identifier of news item.*/
    NewsId?: string,
    /** Title of the news item.*/
    Title?: string,
    /** News item text.*/
    Body?: string,
}

/** */
interface UnlockContainerInstanceRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
    /** ItemInstanceId of the container to unlock.*/
    ContainerItemInstanceId: string,
    /** ItemInstanceId of the key that will be consumed by unlocking this container.  If the container requires a key, this parameter is required.*/
    KeyItemInstanceId?: string,
    /** Specifies the catalog version that should be used to determine container contents.  If unspecified, uses catalog associated with the item instance.*/
    CatalogVersion?: string,
}

/** */
interface UnlockContainerItemRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
    /** Catalog ItemId of the container type to unlock.*/
    ContainerItemId: string,
    /** Specifies the catalog version that should be used to determine container contents.  If unspecified, uses default/primary catalog.*/
    CatalogVersion?: string,
}

/** */
interface UnlockContainerItemResult {

    /** Unique instance identifier of the container unlocked.*/
    UnlockedItemInstanceId?: string,
    /** Unique instance identifier of the key used to unlock the container, if applicable.*/
    UnlockedWithItemInstanceId?: string,
    /** Items granted to the player as a result of unlocking the container.*/
    GrantedItems?: ItemInstance[],
    /** Virtual currency granted to the player as a result of unlocking the container.*/
    VirtualCurrency?: { [key: string]: number },
}

/** */
interface UpdateCharacterDataRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Key-value pairs to be written to the custom data. Note that keys are trimmed of whitespace, are limited in size, and may not begin with a '!' character.*/
    Data?: { [key: string]: string },
    /** Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert null-values into Data due to language constraints.  Use this to delete the keys directly.*/
    KeysToRemove?: string[],
    /** Permission to be applied to all user data keys written in this request. Defaults to "private" if not set.*/
    Permission?: UserDataPermission,
}

/** */
interface UpdateCharacterDataResult {

    /** Indicates the current version of the data that has been set. This is incremented with every set call for that type of data (read-only, internal, etc). This version can be provided in Get calls to find updated data.*/
    DataVersion: number,
}

/** */
interface UpdateCharacterStatisticsRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** Statistics to be updated with the provided values.*/
    CharacterStatistics?: { [key: string]: number },
}

/** */
interface UpdateCharacterStatisticsResult {

}

/** */
interface UpdatePlayerStatisticsRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Statistics to be updated with the provided values*/
    Statistics: StatisticUpdate[],
}

/** */
interface UpdatePlayerStatisticsResult {

}

/** */
interface UpdateSharedGroupDataRequest {

    /** Unique identifier for the shared group.*/
    SharedGroupId: string,
    /** Key-value pairs to be written to the custom data. Note that keys are trimmed of whitespace, are limited in size, and may not begin with a '!' character.*/
    Data?: { [key: string]: string },
    /** Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert null-values into Data due to language constraints.  Use this to delete the keys directly.*/
    KeysToRemove?: string[],
    /** Permission to be applied to all user data keys in this request.*/
    Permission?: UserDataPermission,
}

/** */
interface UpdateSharedGroupDataResult {

}

/** */
interface UpdateUserDataRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Key-value pairs to be written to the custom data. Note that keys are trimmed of whitespace, are limited in size, and may not begin with a '!' character.*/
    Data?: { [key: string]: string },
    /** Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert null-values into Data due to language constraints.  Use this to delete the keys directly.*/
    KeysToRemove?: string[],
    /** Permission to be applied to all user data keys written in this request. Defaults to "private" if not set.*/
    Permission?: UserDataPermission,
}

/** */
interface UpdateUserDataResult {

    /** Indicates the current version of the data that has been set. This is incremented with every set call for that type of data (read-only, internal, etc). This version can be provided in Get calls to find updated data.*/
    DataVersion: number,
}

/** */
interface UpdateUserInternalDataRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Key-value pairs to be written to the custom data. Note that keys are trimmed of whitespace, are limited in size, and may not begin with a '!' character.*/
    Data?: { [key: string]: string },
    /** Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert null-values into Data due to language constraints.  Use this to delete the keys directly.*/
    KeysToRemove?: string[],
}

/** */
interface UpdateUserInventoryItemDataRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId?: string,
    /** Unique PlayFab assigned instance identifier of the item*/
    ItemInstanceId: string,
    /** Key-value pairs to be written to the custom data. Note that keys are trimmed of whitespace, are limited in size, and may not begin with a '!' character.*/
    Data?: { [key: string]: string },
    /** Optional list of Data-keys to remove from UserData.  Some SDKs cannot insert null-values into Data due to language constraints.  Use this to delete the keys directly.*/
    KeysToRemove?: string[],
}

/** */
interface UpdateUserStatisticsRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Statistics to be updated with the provided values.*/
    UserStatistics?: { [key: string]: number },
}

/** */
interface UpdateUserStatisticsResult {

}

/** */
interface UserAccountInfo {

    /** Unique identifier for the user account*/
    PlayFabId?: string,
    /** Timestamp indicating when the user account was created*/
    Created: string,
    /** User account name in the PlayFab service*/
    Username?: string,
    /** Title-specific information for the user account*/
    TitleInfo?: UserTitleInfo,
    /** Personal information for the user which is considered more sensitive*/
    PrivateInfo?: UserPrivateAccountInfo,
    /** User Facebook information, if a Facebook account has been linked*/
    FacebookInfo?: UserFacebookInfo,
    /** User Steam information, if a Steam account has been linked*/
    SteamInfo?: UserSteamInfo,
    /** User Gamecenter information, if a Gamecenter account has been linked*/
    GameCenterInfo?: UserGameCenterInfo,
    /** User iOS device information, if an iOS device has been linked*/
    IosDeviceInfo?: UserIosDeviceInfo,
    /** User Android device information, if an Android device has been linked*/
    AndroidDeviceInfo?: UserAndroidDeviceInfo,
    /** User Kongregate account information, if a Kongregate account has been linked*/
    KongregateInfo?: UserKongregateInfo,
    /** User Twitch account information, if a Twitch account has been linked*/
    TwitchInfo?: UserTwitchInfo,
    /** User PSN account information, if a PSN account has been linked*/
    PsnInfo?: UserPsnInfo,
    /** User Google account information, if a Google account has been linked*/
    GoogleInfo?: UserGoogleInfo,
    /** User XBox account information, if a XBox account has been linked*/
    XboxInfo?: UserXboxInfo,
    /** Custom ID information, if a custom ID has been assigned*/
    CustomIdInfo?: UserCustomIdInfo,
}

/** */
interface UserAndroidDeviceInfo {

    /** Android device ID*/
    AndroidDeviceId?: string,
}

/** */
interface UserCustomIdInfo {

    /** Custom ID*/
    CustomId?: string,
}

/** Indicates whether a given data key is private (readable only by the player) or public (readable by all players). When a player makes a GetUserData request about another player, only keys marked Public will be returned.*/
type UserDataPermission = "Private "
    | "Public ";

/** */
interface UserDataRecord {

    /** User-supplied data for this user data key.*/
    Value?: string,
    /** Timestamp indicating when this data was last updated.*/
    LastUpdated: string,
    /** Permissions on this data key.*/
    Permission?: UserDataPermission,
}

/** */
interface UserFacebookInfo {

    /** Facebook identifier*/
    FacebookId?: string,
    /** Facebook full name*/
    FullName?: string,
}

/** */
interface UserGameCenterInfo {

    /** Gamecenter identifier*/
    GameCenterId?: string,
}

/** */
interface UserGoogleInfo {

    /** Google ID*/
    GoogleId?: string,
    /** Email address of the Google account*/
    GoogleEmail?: string,
    /** Locale of the Google account*/
    GoogleLocale?: string,
    /** Gender information of the Google account*/
    GoogleGender?: string,
}

/** */
interface UserIosDeviceInfo {

    /** iOS device ID*/
    IosDeviceId?: string,
}

/** */
interface UserKongregateInfo {

    /** Kongregate ID*/
    KongregateId?: string,
    /** Kongregate Username*/
    KongregateName?: string,
}

/** */
type UserOrigination = "Organic "
    | "Steam "
    | "Google "
    | "Amazon "
    | "Facebook "
    | "Kongregate "
    | "GamersFirst "
    | "Unknown "
    | "IOS "
    | "LoadTest "
    | "Android "
    | "PSN "
    | "GameCenter "
    | "CustomId "
    | "XboxLive "
    | "Parse "
    | "Twitch ";

/** */
interface UserPrivateAccountInfo {

    /** user email address*/
    Email?: string,
}

/** */
interface UserPsnInfo {

    /** PSN account ID*/
    PsnAccountId?: string,
    /** PSN online ID*/
    PsnOnlineId?: string,
}

/** */
interface UserSteamInfo {

    /** Steam identifier*/
    SteamId?: string,
    /** the country in which the player resides, from Steam data*/
    SteamCountry?: string,
    /** currency type set in the user Steam account*/
    SteamCurrency?: Currency,
    /** what stage of game ownership the user is listed as being in, from Steam*/
    SteamActivationStatus?: TitleActivationStatus,
}

/** */
interface UserTitleInfo {

    /** name of the user, as it is displayed in-game*/
    DisplayName?: string,
    /** source by which the user first joined the game, if known*/
    Origination?: UserOrigination,
    /** timestamp indicating when the user was first associated with this game (this can differ significantly from when the user first registered with PlayFab)*/
    Created: string,
    /** timestamp for the last user login for this title*/
    LastLogin?: string,
    /** timestamp indicating when the user first signed into this game (this can differ from the Created timestamp, as other events, such as issuing a beta key to the user, can associate the title to the user)*/
    FirstLogin?: string,
    /** boolean indicating whether or not the user is currently banned for a title*/
    isBanned?: boolean,
}

/** */
interface UserTwitchInfo {

    /** Twitch ID*/
    TwitchId?: string,
    /** Twitch Username*/
    TwitchUserName?: string,
}

/** */
interface UserXboxInfo {

    /** XBox user ID*/
    XboxUserId?: string,
}

/** */
interface VirtualCurrencyRechargeTime {

    /** Time remaining (in seconds) before the next recharge increment of the virtual currency.*/
    SecondsToRecharge: number,
    /** Server timestamp in UTC indicating the next time the virtual currency will be incremented.*/
    RechargeTime: string,
    /** Maximum value to which the regenerating currency will automatically increment. Note that it can exceed this value through use of the AddUserVirtualCurrency API call. However, it will not regenerate automatically until it has fallen below this value.*/
    RechargeMax: number,
}

/** */
interface WriteEventResponse {

    /** The unique identifier of the event. This can be used to retrieve the event's properties using the GetEvent API. The values of this identifier consist of ASCII characters and are not constrained to any particular format.*/
    EventId?: string,
}

/** */
interface WriteServerCharacterEventRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** Unique PlayFab assigned ID for a specific character owned by a user*/
    CharacterId: string,
    /** The name of the event, within the namespace scoped to the title. The naming convention is up to the caller, but it commonly follows the subject_verb_object pattern (e.g. player_logged_in).*/
    EventName: string,
    /** The time (in UTC) associated with this event. The value dafaults to the current time.*/
    Timestamp?: string,
    /** Custom event properties. Each property consists of a name (string) and a value (JSON object).*/
    Body?: { [key: string]: any },
}

/** */
interface WriteServerPlayerEventRequest {

    /** Unique PlayFab assigned ID of the user on whom the operation will be performed.*/
    PlayFabId: string,
    /** The name of the event, within the namespace scoped to the title. The naming convention is up to the caller, but it commonly follows the subject_verb_object pattern (e.g. player_logged_in).*/
    EventName: string,
    /** The time (in UTC) associated with this event. The value dafaults to the current time.*/
    Timestamp?: string,
    /** Custom data properties associated with the event. Each property consists of a name (string) and a value (JSON object).*/
    Body?: { [key: string]: any },
}

/** */
interface WriteTitleEventRequest {

    /** The name of the event, within the namespace scoped to the title. The naming convention is up to the caller, but it commonly follows the subject_verb_object pattern (e.g. player_logged_in).*/
    EventName: string,
    /** The time (in UTC) associated with this event. The value dafaults to the current time.*/
    Timestamp?: string,
    /** Custom event properties. Each property consists of a name (string) and a value (JSON object).*/
    Body?: { [key: string]: any },
}



//server api functions

declare var server: PlayFabServerAPI

interface PlayFabServerAPI {

    /** Validated a client's session ticket, and if successful, returns details for that user*/
    AuthenticateSessionTicket(request: AuthenticateSessionTicketRequest): AuthenticateSessionTicketResult


    /** Retrieves the unique PlayFab identifiers for the given set of Facebook identifiers.*/
    GetPlayFabIDsFromFacebookIDs(request: GetPlayFabIDsFromFacebookIDsRequest): GetPlayFabIDsFromFacebookIDsResult


    /** Retrieves the unique PlayFab identifiers for the given set of Steam identifiers. The Steam identifiers  are the profile IDs for the user accounts, available as SteamId in the Steamworks Community API calls.*/
    GetPlayFabIDsFromSteamIDs(request: GetPlayFabIDsFromSteamIDsRequest): GetPlayFabIDsFromSteamIDsResult


    /** Retrieves the relevant details for a specified user*/
    GetUserAccountInfo(request: GetUserAccountInfoRequest): GetUserAccountInfoResult


    /** Sends an iOS/Android Push Notification to a specific user, if that user's device has been configured for Push Notifications in PlayFab. If a user has linked both Android and iOS devices, both will be notified.*/
    SendPushNotification(request: SendPushNotificationRequest): SendPushNotificationResult


    /** Deletes the users for the provided game. Deletes custom data, all account linkages, and statistics.*/
    DeleteUsers(request: DeleteUsersRequest): DeleteUsersResult


    /** Retrieves a list of ranked users for the given statistic, starting from the indicated point in the leaderboard*/
    GetLeaderboard(request: GetLeaderboardRequest): GetLeaderboardResult


    /** Retrieves a list of ranked users for the given statistic, centered on the currently signed-in user*/
    GetLeaderboardAroundUser(request: GetLeaderboardAroundUserRequest): GetLeaderboardAroundUserResult


    /** Retrieves the current version and values for the indicated statistics, for the local player.*/
    GetPlayerStatistics(request: GetPlayerStatisticsRequest): GetPlayerStatisticsResult


    /** Retrieves the information on the available versions of the specified statistic.*/
    GetPlayerStatisticVersions(request: GetPlayerStatisticVersionsRequest): GetPlayerStatisticVersionsResult


    /** Retrieves the title-specific custom data for the user which is readable and writable by the client*/
    GetUserData(request: GetUserDataRequest): GetUserDataResult


    /** Retrieves the title-specific custom data for the user which cannot be accessed by the client*/
    GetUserInternalData(request: GetUserDataRequest): GetUserDataResult


    /** Retrieves the publisher-specific custom data for the user which is readable and writable by the client*/
    GetUserPublisherData(request: GetUserDataRequest): GetUserDataResult


    /** Retrieves the publisher-specific custom data for the user which cannot be accessed by the client*/
    GetUserPublisherInternalData(request: GetUserDataRequest): GetUserDataResult


    /** Retrieves the publisher-specific custom data for the user which can only be read by the client*/
    GetUserPublisherReadOnlyData(request: GetUserDataRequest): GetUserDataResult


    /** Retrieves the title-specific custom data for the user which can only be read by the client*/
    GetUserReadOnlyData(request: GetUserDataRequest): GetUserDataResult


    /** Retrieves the details of all title-specific statistics for the user*/
    GetUserStatistics(request: GetUserStatisticsRequest): GetUserStatisticsResult


    /** Updates the values of the specified title-specific statistics for the user*/
    UpdatePlayerStatistics(request: UpdatePlayerStatisticsRequest): UpdatePlayerStatisticsResult


    /** Updates the title-specific custom data for the user which is readable and writable by the client*/
    UpdateUserData(request: UpdateUserDataRequest): UpdateUserDataResult


    /** Updates the title-specific custom data for the user which cannot be accessed by the client*/
    UpdateUserInternalData(request: UpdateUserInternalDataRequest): UpdateUserDataResult


    /** Updates the publisher-specific custom data for the user which is readable and writable by the client*/
    UpdateUserPublisherData(request: UpdateUserDataRequest): UpdateUserDataResult


    /** Updates the publisher-specific custom data for the user which cannot be accessed by the client*/
    UpdateUserPublisherInternalData(request: UpdateUserInternalDataRequest): UpdateUserDataResult


    /** Updates the publisher-specific custom data for the user which can only be read by the client*/
    UpdateUserPublisherReadOnlyData(request: UpdateUserDataRequest): UpdateUserDataResult


    /** Updates the title-specific custom data for the user which can only be read by the client*/
    UpdateUserReadOnlyData(request: UpdateUserDataRequest): UpdateUserDataResult


    /** Updates the values of the specified title-specific statistics for the user. By default, clients are not permitted to update statistics. Developers may override this setting in the Game Manager > Settings > API Features.*/
    UpdateUserStatistics(request: UpdateUserStatisticsRequest): UpdateUserStatisticsResult


    /** Retrieves the specified version of the title's catalog of virtual goods, including all defined properties*/
    GetCatalogItems(request: GetCatalogItemsRequest): GetCatalogItemsResult


    /** Retrieves the key-value store of custom publisher settings*/
    GetPublisherData(request: GetPublisherDataRequest): GetPublisherDataResult


    /** Retrieves the key-value store of custom title settings*/
    GetTitleData(request: GetTitleDataRequest): GetTitleDataResult


    /** Retrieves the key-value store of custom internal title settings*/
    GetTitleInternalData(request: GetTitleDataRequest): GetTitleDataResult


    /** Retrieves the title news feed, as configured in the developer portal*/
    GetTitleNews(request: GetTitleNewsRequest): GetTitleNewsResult


    /** Updates the key-value store of custom publisher settings*/
    SetPublisherData(request: SetPublisherDataRequest): SetPublisherDataResult


    /** Updates the key-value store of custom title settings*/
    SetTitleData(request: SetTitleDataRequest): SetTitleDataResult


    /** Updates the key-value store of custom title settings*/
    SetTitleInternalData(request: SetTitleDataRequest): SetTitleDataResult


    /** Increments  the character's balance of the specified virtual currency by the stated amount*/
    AddCharacterVirtualCurrency(request: AddCharacterVirtualCurrencyRequest): ModifyCharacterVirtualCurrencyResult


    /** Increments  the user's balance of the specified virtual currency by the stated amount*/
    AddUserVirtualCurrency(request: AddUserVirtualCurrencyRequest): ModifyUserVirtualCurrencyResult


    /** Consume uses of a consumable item. When all uses are consumed, it will be removed from the player's inventory.*/
    ConsumeItem(request: ConsumeItemRequest): ConsumeItemResult


    /** Returns the result of an evaluation of a Random Result Table - the ItemId from the game Catalog which would have been added to the player inventory, if the Random Result Table were added via a Bundle or a call to UnlockContainer.*/
    EvaluateRandomResultTable(request: EvaluateRandomResultTableRequest): EvaluateRandomResultTableResult


    /** Retrieves the specified character's current inventory of virtual goods*/
    GetCharacterInventory(request: GetCharacterInventoryRequest): GetCharacterInventoryResult


    /** Retrieves the specified user's current inventory of virtual goods*/
    GetUserInventory(request: GetUserInventoryRequest): GetUserInventoryResult


    /** Adds the specified items to the specified character's inventory*/
    GrantItemsToCharacter(request: GrantItemsToCharacterRequest): GrantItemsToCharacterResult


    /** Adds the specified items to the specified user's inventory*/
    GrantItemsToUser(request: GrantItemsToUserRequest): GrantItemsToUserResult


    /** Adds the specified items to the specified user inventories*/
    GrantItemsToUsers(request: GrantItemsToUsersRequest): GrantItemsToUsersResult


    /** Modifies the number of remaining uses of a player's inventory item*/
    ModifyItemUses(request: ModifyItemUsesRequest): ModifyItemUsesResult


    /** Moves an item from a character's inventory into another of the users's character's inventory.*/
    MoveItemToCharacterFromCharacter(request: MoveItemToCharacterFromCharacterRequest): MoveItemToCharacterFromCharacterResult


    /** Moves an item from a user's inventory into their character's inventory.*/
    MoveItemToCharacterFromUser(request: MoveItemToCharacterFromUserRequest): MoveItemToCharacterFromUserResult


    /** Moves an item from a character's inventory into the owning user's inventory.*/
    MoveItemToUserFromCharacter(request: MoveItemToUserFromCharacterRequest): MoveItemToUserFromCharacterResult


    /** Adds the virtual goods associated with the coupon to the user's inventory. Coupons can be generated  via the Promotions->Coupons tab in the PlayFab Game Manager. See this post for more information on coupons:  https://playfab.com/blog/2015/06/18/using-stores-and-coupons-game-manager*/
    RedeemCoupon(request: RedeemCouponRequest): RedeemCouponResult


    /** Submit a report about a player (due to bad bahavior, etc.) on behalf of another player, so that customer service representatives for the title can take action concerning potentially toxic players.*/
    ReportPlayer(request: ReportPlayerServerRequest): ReportPlayerServerResult


    /** Revokes access to an item in a user's inventory*/
    RevokeInventoryItem(request: RevokeInventoryItemRequest): RevokeInventoryResult


    /** Decrements the character's balance of the specified virtual currency by the stated amount*/
    SubtractCharacterVirtualCurrency(request: SubtractCharacterVirtualCurrencyRequest): ModifyCharacterVirtualCurrencyResult


    /** Decrements the user's balance of the specified virtual currency by the stated amount*/
    SubtractUserVirtualCurrency(request: SubtractUserVirtualCurrencyRequest): ModifyUserVirtualCurrencyResult


    /** Opens a specific container (ContainerItemInstanceId), with a specific key (KeyItemInstanceId, when required), and returns the contents of the opened container. If the container (and key when relevant) are consumable (RemainingUses > 0), their RemainingUses will be decremented, consistent with the operation of ConsumeItem.*/
    UnlockContainerInstance(request: UnlockContainerInstanceRequest): UnlockContainerItemResult


    /** Searches Player or Character inventory for any ItemInstance matching the given CatalogItemId, if necessary unlocks it using any appropriate key, and returns the contents of the opened container. If the container (and key when relevant) are consumable (RemainingUses > 0), their RemainingUses will be decremented, consistent with the operation of ConsumeItem.*/
    UnlockContainerItem(request: UnlockContainerItemRequest): UnlockContainerItemResult


    /** Updates the key-value pair data tagged to the specified item, which is read-only from the client.*/
    UpdateUserInventoryItemCustomData(request: UpdateUserInventoryItemDataRequest): EmptyResult


    /** Informs the PlayFab match-making service that the user specified has left the Game Server Instance*/
    NotifyMatchmakerPlayerLeft(request: NotifyMatchmakerPlayerLeftRequest): NotifyMatchmakerPlayerLeftResult


    /** Validates a Game Server session ticket and returns details about the user*/
    RedeemMatchmakerTicket(request: RedeemMatchmakerTicketRequest): RedeemMatchmakerTicketResult


    /** Sets the custom data of the indicated Game Server Instance*/
    SetGameServerInstanceData(request: SetGameServerInstanceDataRequest): SetGameServerInstanceDataResult


    /** Sets the state of the indicated Game Server Instance*/
    SetGameServerInstanceState(request: SetGameServerInstanceStateRequest): SetGameServerInstanceStateResult


    /** Awards the specified users the specified Steam achievements*/
    AwardSteamAchievement(request: AwardSteamAchievementRequest): AwardSteamAchievementResult


    /** Logs a custom analytics event*/
    LogEvent(request: LogEventRequest): LogEventResult


    /** Writes a character-based event into PlayStream.*/
    WriteCharacterEvent(request: WriteServerCharacterEventRequest): WriteEventResponse


    /** Writes a player-based event into PlayStream.*/
    WritePlayerEvent(request: WriteServerPlayerEventRequest): WriteEventResponse


    /** Writes a title-based event into PlayStream.*/
    WriteTitleEvent(request: WriteTitleEventRequest): WriteEventResponse


    /** Adds users to the set of those able to update both the shared data, as well as the set of users in the group. Only users in the group (and the server) can add new members.*/
    AddSharedGroupMembers(request: AddSharedGroupMembersRequest): AddSharedGroupMembersResult


    /** Requests the creation of a shared group object, containing key/value pairs which may be updated by all members of the group. When created by a server, the group will initially have no members.*/
    CreateSharedGroup(request: CreateSharedGroupRequest): CreateSharedGroupResult


    /** Deletes a shared group, freeing up the shared group ID to be reused for a new group*/
    DeleteSharedGroup(request: DeleteSharedGroupRequest): EmptyResult


    /** Retrieves data stored in a shared group object, as well as the list of members in the group. The server can access all public and private group data.*/
    GetSharedGroupData(request: GetSharedGroupDataRequest): GetSharedGroupDataResult


    /** Removes users from the set of those able to update the shared data and the set of users in the group. Only users in the group can remove members. If as a result of the call, zero users remain with access, the group and its associated data will be deleted.*/
    RemoveSharedGroupMembers(request: RemoveSharedGroupMembersRequest): RemoveSharedGroupMembersResult


    /** Adds, updates, and removes data keys for a shared group object. If the permission is set to Public, all fields updated or added in this call will be readable by users not in the group. By default, data permissions are set to Private. Regardless of the permission setting, only members of the group (and the server) can update the data.*/
    UpdateSharedGroupData(request: UpdateSharedGroupDataRequest): UpdateSharedGroupDataResult


    /** Executes a CloudScript function, with the 'currentPlayerId' variable set to the specified PlayFabId parameter value.*/
    ExecuteCloudScript(request: ExecuteCloudScriptServerRequest): ExecuteCloudScriptResult


    /** This API retrieves a pre-signed URL for accessing a content file for the title. A subsequent  HTTP GET to the returned URL will attempt to download the content. A HEAD query to the returned URL will attempt to  retrieve the metadata of the content. Note that a successful result does not guarantee the existence of this content -  if it has not been uploaded, the query to retrieve the data will fail. See this post for more information:  https://community.playfab.com/hc/en-us/community/posts/205469488-How-to-upload-files-to-PlayFab-s-Content-Service*/
    GetContentDownloadUrl(request: GetContentDownloadUrlRequest): GetContentDownloadUrlResult


    /** Deletes the specific character ID from the specified user.*/
    DeleteCharacterFromUser(request: DeleteCharacterFromUserRequest): DeleteCharacterFromUserResult


    /** Lists all of the characters that belong to a specific user. CharacterIds are not globally unique; characterId must be evaluated with the parent PlayFabId to guarantee uniqueness.*/
    GetAllUsersCharacters(request: ListUsersCharactersRequest): ListUsersCharactersResult


    /** Retrieves a list of ranked characters for the given statistic, starting from the indicated point in the leaderboard*/
    GetCharacterLeaderboard(request: GetCharacterLeaderboardRequest): GetCharacterLeaderboardResult


    /** Retrieves the details of all title-specific statistics for the specific character*/
    GetCharacterStatistics(request: GetCharacterStatisticsRequest): GetCharacterStatisticsResult


    /** Retrieves a list of ranked characters for the given statistic, centered on the requested user*/
    GetLeaderboardAroundCharacter(request: GetLeaderboardAroundCharacterRequest): GetLeaderboardAroundCharacterResult


    /** Retrieves a list of all of the user's characters for the given statistic.*/
    GetLeaderboardForUserCharacters(request: GetLeaderboardForUsersCharactersRequest): GetLeaderboardForUsersCharactersResult


    /** Grants the specified character type to the user. CharacterIds are not globally unique; characterId must be evaluated with the parent PlayFabId to guarantee uniqueness.*/
    GrantCharacterToUser(request: GrantCharacterToUserRequest): GrantCharacterToUserResult


    /** Updates the values of the specified title-specific statistics for the specific character*/
    UpdateCharacterStatistics(request: UpdateCharacterStatisticsRequest): UpdateCharacterStatisticsResult


    /** Retrieves the title-specific custom data for the user which is readable and writable by the client*/
    GetCharacterData(request: GetCharacterDataRequest): GetCharacterDataResult


    /** Retrieves the title-specific custom data for the user's character which cannot be accessed by the client*/
    GetCharacterInternalData(request: GetCharacterDataRequest): GetCharacterDataResult


    /** Retrieves the title-specific custom data for the user's character which can only be read by the client*/
    GetCharacterReadOnlyData(request: GetCharacterDataRequest): GetCharacterDataResult


    /** Updates the title-specific custom data for the user's chjaracter which is readable and writable by the client*/
    UpdateCharacterData(request: UpdateCharacterDataRequest): UpdateCharacterDataResult


    /** Updates the title-specific custom data for the user's character which cannot  be accessed by the client*/
    UpdateCharacterInternalData(request: UpdateCharacterDataRequest): UpdateCharacterDataResult


    /** Updates the title-specific custom data for the user's character which can only be read by the client*/
    UpdateCharacterReadOnlyData(request: UpdateCharacterDataRequest): UpdateCharacterDataResult


}