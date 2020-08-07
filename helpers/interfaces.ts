
/**
 * Data description as specified in "Contrat des données" v3.8 made 05/10/2016
 * To be used in typescript files whenever doing calls to API
 * 
 * For now every item too complex is optional (? symbol)
 */
export interface ShoppingCart {
    Items?: ShoppingCartItem[],
    Id: string,
    TotalPrice: number,
    CartType: string,
}

export interface ShoppingCartItem {
    Signature?: ShoppingCartItemSignature,
    Item?: ItemRepresentation_large,
    Quantity: number,
    UnitPrice: number,
    TotalPrice: number,
}

export interface ShoppingCartItemSignature {
    ItemReference?: CatalogItemReference,
    OfferReference: string,
    AssociatedItems?: ShoppingCartItemSignature[],
    Quantity: number,
    
}

export interface ShoppingCartResult {
    Size:number
}

export interface CatalogItemReference {
    Id: number,
    EanIsbn: string,
    Prid: number,
    Catalog: Catalog,
}

export enum Catalog {
'FnacDirect' = 1,
'FnacMusic' = 2,
'MarketPlace' = 3,
}

export interface ItemRepresentation {
    DisplayName: string,
    InfosPrice: InfosPrice,
    IsTechnical: boolean,
    Prid: CatalogItemReference,
    Title: string,
    Format: string,
    ReleaseDate: Date,
    FnacAvailable: boolean,
    HasOffers: boolean,
    HasRelatedItems: boolean,
    HasTracks: boolean,
    IsActive: boolean,
    IsEbook: boolean,
    Links: Link[];
}


export interface ItemRepresentation_medium extends ItemRepresentation{
    ArticleOpcInfo: ArticleOpcInfo,
    Awards:	Award[],
    Brand: Brand, //Inconsistent, not Brand found in contrat de données
    Content: string,
    Editor:	string,
    Format:	string,
    ItemProperties:	ItemProperties,
    ItemType: string,
    LabDatas: InfoLab,
    MainInternalReview:	string,
    Medias:	Media[]
    Participants: Participant[],
    Subtitle: string,
    Support: string,
    UserReviewSummary: UserReviews,
    IsOneClickAvailable: boolean,
    InstallmentPaymentOffers: InstallmentPaymentOffer,
    Plateform: string,
    ReleaseDate: Date;
    IsAvailableInOneTwoHour: boolean;
    OfferSummary: OfferSummary;
    AvailabilityOnFnacCom: AvailabilityOnFnacCom;
    FnacAvailable: boolean;
    HasOffers: boolean;
    HasRelatedItems: boolean;
    HasTracks: boolean;
    IsActive: boolean;
    IsEbook: boolean;
    PriceBlocs: PriceBlocs;
    Links: Link[];

}

export interface Award {
    AwardName: string,
    AwardId: number,
}

export interface ItemProperties {
    Summary: string
    ItemCaracteristics: PropertiesGroup[]
}


export interface ItemRepresentation_selfcheckouts extends ItemRepresentation_medium{
    InternalReviews: InternalReview[],
    SpiderDatas: LaboSpider[],
    UserReviewsInfos: UserReviewsInfos,
}

export interface ItemRepresentation_large extends ItemRepresentation_selfcheckouts {
    Collection: string,
    Distributor: string,
    DvdContent: DvdVolume[],
    Ean: string,
    Family: string,
    FnacAvailable: boolean,
    HasOffers: boolean,
    HasRelatedItems: boolean,
    HasTracks: boolean,
    IncludedAccessories: string[],
    IsActive: boolean,
    IsEbook: boolean,
    Isbn: string,
    ItemsMatched: CatalogItemReference[],
    LegalPublic: string,
    LinkUrl: string,
    Mpn: string,
    OfferCollection: PageOf<Offer>,
    OfferSummary: OfferSummary,
    OnlyOnline?: boolean,
    PhysicalStoreAvailabilities: StockInfo[],
    Relationships: Relationship[],
    SellerReviewsSummary: SellerReviewsSummary,
    ShippingMethods: ShippingMethodMinify[],
    Sku: string,
    Stimulis: Stimuli[],
    SubFamily: string,
    TrackVolumes: TrackVolume[],
    WArranty: string,
    AvailabilityOnFnacCom: AvailabilityOnFnacCom,
    WebPageUrl: string,
    OtherFormats: ItemRepresentation[],
    RelatedParticipants: RelatedParticipant[],
}

export interface InfosPrice {
    MainOffer: Offer,
    StandardPrice: number,
    ExpressShipping: ShippingInformation,
    AlternateOffers: Offer[],
    MemberOffer: Offer,
    DigitalOffer: DigitalOffer[],
    BestUsedOffer: Offer, 
    BestNewOffer: Offer, 
}

export interface Offer {
    CarriageCost: number,
    OfferType: OfferType,
    Price: number,
    MemberPrice: number,
    //PublicPrice: number,
    //StandardPrice: number,
    //DefaultPrice: number,
    IsBest: boolean,
    IntermediaryBasketURL: string,
    //Currency: string,
    Seller: string,
    IsSellerPro: boolean,
    SellerComment: string,
    SellerSalesCount:number,
    SellerRate:number,
    OfferAvailability: string,
    OfferState: string,
    PromotionType: string,
    //PromotionText: string,
    //MemberPromotionType: string,
    //MemberPromotionText: string,
    IsAvailable: boolean,
    OfferId: string,

    //CityDelivery: string,
    //ZipCodeDelivery: string,
    CountryDelivery: string,
    //PriceDetail: PriceDetail,
    IsMPOffer: boolean,
    UserPrice: number,
    ShippingSentence: string,
    ArticleOpcInfo: ArticleOpcInfo,
    Links: string[],
}

export enum OfferType{
    'Fnac' = 1,
    'Member' = 2,
    'New' = 3,
    'Used' = 4,
}

export interface ArticleOpcInfo {
    IsCallerErgoBasket?: boolean,
    IsBigPriceForFA?: boolean,
    JumpLineFlashLine?: boolean,
    HasPromoToShow: boolean,
    PromoCssClass: string,
    Label: string,
    FlashSaleEndDate: string,
    EconomyDetails: string, //Missing ArticlePromotionLabel ?
    //SubscriberPrice: number,
    UserPrice: number, //From usage, not in contrat de données
    OldPrice: number, //From usage, not in contrat de données
    ShowReduction5PourCent: boolean,
    ShowDeferredPromo: boolean,
    ShowDateFlashSale:boolean,
}

export interface PriceDetail {
    PublicPrice: number,
    StandartPrice: number,
    EuroPrice: number,
    MemberPrice: number,
    Ecotax: number,
    CarriageCost: number,
    PromotionMember: Promotion,
}

export interface Promotion {
    PromotionStartDate: Date,
    PromotionEndDate: Date,
    PromotionText: string,
    PromotionLongText: string,
    PromotionCode: string,
    PromotionType: PromotionType,
    PromotionPercent: number
    PromotionAmount: number
    PromotionUsage: PromotionUsage
    IsMember: boolean
}


export interface ShippingInformation {
    IsAvailable: boolean,
    DeliveryDate: Date,
    OrderDueDate: Date,
    EffectiveDelay: number,
}

export interface DigitalOffer{
    Price: number,
    PublicPrice: number,
    DigitalSupportName: string,
    IntermediaryBasketURL: string,
}

export interface Node {
    NodeName: string,
    Id: number,
    ChildNodes: Node[],
    LinkUrl: string,
    Medias: Media[],
    HasChildNodes:boolean,
    HasItems:boolean,
    Links:string[], //Inconsistent in Contrat de données
    IsLeftMenu:boolean,
    IsSmallPrice:Boolean,
    IsBestOf:boolean,
    IsDistinguished:boolean,
    IsMobile:boolean,
    NodePathIdDefault: number;
    Type: number;
}

export interface Media {
    Title: string,
    Url:string,
    Type:MediaType,
    Id:string,
    ChildMedias:Media[]
}

export enum MediaType {
    None = 0,
    Smallscan = 1,
    Scan = 2,
    BigScan = 4,
    Zoom = 8,
    RIAScan = 16,
    View360 = 32,
    Verso = 64,
    Mp3Extract = 128,
    CategoryIconSmall = 256,
    CategoryIconLarge = 512,
    SmallScanNB = 1024,
    ScanNB = 2048,
    BigScanNB = 4096,
    ZoomPlanchBD = 8192
}

export enum PromotionType {
    Undefined = 0,
    Member = 1,
    Member3Years = 2,
    FlashSale = 5,
    FnacOffer = 6,
    InternetSpecialOffer = 7,
    MemberWelcomeOffer = 8,
    Member3YearsWelcomeOffer = 9,
    SpecialOffer = 10,
    Solde = 11,
    DynamicBundle = 12,
    Gamer = 13,
}

export enum PromotionUsage {
    Undefined = 0,
    Member = 1,
    Member3Years = 2,
    FlashSale = 5,
    FnacOffer = 6,
    InternetSpecialOffer = 7,
    MemberWelcomeOffer = 8,
    Member3YearsWelcomeOffer = 9,
    SpecialOffer = 10,
    Solde = 11,
    DynamicBundle = 12,
    Gamer = 13,
    Degressive = 14,
    Personalized = 15,

}

export interface Banner{
    onClickLink: string,
    imageName: string,
    imageFile: any, //File ?
    debut: string,
    fin: string,
    id: number,
    height:number,
    width: number,
    emplacement: number,
}

export interface MainCategory {
    Id: string,
    Name: string,
    IconName: string,
    Principal: boolean,
    Type: string,
    Activated: boolean,
    Ignore: string[],
    HasFnacSelectionAndAdvice: boolean,
    MoreFnacSelectionAndAdvice: {
        IsPresent:boolean,
        Condition?:string,
    },
    CustomCategorie: {
        IsPresent:boolean,
        HasMultiple?:boolean,
        Title?: string,
        Selector?: string,
        Value?: string,
    },
    MoreActu: {
        IsPresent:boolean,
        Condition?:string,
    },
}

export interface PageOf<T> {
    PageOfResults: T[],
    Selector: PageSelector,
    Filters: Filter[],
    Categories: MainCategory[],
}

export interface Filter {
    Id: number,
    Label: string,
    Values: FilterValue[]
}

export interface FilterValue {
    Id: number,
    Label: string,
    Count: number,
    max_price: string, 
    min_price: string,
}

export interface Category {
    Id:number,
    Label:string,
    Level:number,
    Count:number,
    Children:Category[],
}

export interface PageSelector {
    PageCount: number,
    PageNumber: number,
    PageSize: number,
    TotalItems:number,
}

export interface Store {
    StoreId: number,
    StoreGu: string,
    StoreName: string,
    StoreOpeningHours: string,
    StoreExceptionalOpeningHours: string,
    StoreAddress: StoreAddress,
    StoreEmail: string,
    StoreMedias: ContentMedia, //StoreMediaUrl from API
    StoreMediaUrl:string,
    StoreFax: string,
    StoreTel: string,
    SpaceId: string,
    Area: StoreArea,
    BoxOfficeStatus: number,
    City: StoreCity,
    Country: StoreCountry,
    DelayTypeId: number,
    FullName: string,
    GeoLocalizationAddress: string,
    LegalEntity: StoreLegalEntity,
    PhotoId: number,
    SpecilityIds: number[],
    StoreTicketDeliveryStatus: number,
    StoreTypeId: number,
    Trigramme: string,
    ZipCode: string,
    IsSelfcheckoutAvailable: boolean,
    Timetables: Timetable[]
	TimetableExceptionnals: TimetableExceptionnals[]
}

//There is no record of these events in Contrat de donnée, this is from usage
export interface StoreEvent {
    title_event:string,
    id:number,
    event_id:number,
    debut:string,
    fin:string,
    time_start:string,
    type_name:string,
    path:string
}

export interface Timetable {
    DayOfWeek:number,
    OpeningPeriods: {
        Closing:string,
        Opening:string,
    }[]
}

export interface TimetableExceptionnals { //infered from Tanguy's work
    Day:string,
    OpeningPeriods: {
        Closing:string,
        Opening:string,
    }[]
}

export interface MyTimeTable extends Timetable { //Extension from our end
    IsOpened:boolean,
    IsExcept:boolean,
    Day:string,
}



export interface StoreAddress {
    DisplayName: string,
    ZipCode: string,
    City: string,
    Country: string,
    Line1: string,
    Line2: string,
    Line3: string,
    Geolocalisation: string,
}

export interface StoreArea {
    CountryId: number,
    CountryName: string,
    Id: number,
    Name: string,
}

export interface StoreCity {
    AreaId: number,
    AreaName: string,
    CountryId: number,
    CountryName: string,
    Id: number,
    Name: string,
}

export interface StoreCountry {
    Code: string,
    Id: number,
    Name: string,
}

export interface StoreLegalEntity {
    Address: string
    Capital: string
    Id: number
    LegalForm: string
    Name: string
    RCS: string
    Siret: string
    TVA: string
}

export interface ContentMedia {
    Id: string
    Type: string
    Title: string
    Description: string
    Copyright: string
    Watermark: boolean
    Position: number
    ContentMediaTypes: ContentMediaType[]
}

export interface ContentMediaType {
    Id: string,
    Url: string,
    Size: string,
}

export interface Customer {
    UserId: string,
    UserPrimaryKey: number,
    FirstName: string,
    LastName: string,
    Gender: Gender,
    Password: string,
    BirthDate: Date,
    CardHolders: CardHolder[],
    Contracts: string[], //Inconsistent
    IsRenew: boolean,
    IsValidAdherent: boolean,
    HasFnacAccount: boolean,
    FavoriteStore: Store,
    HasAcceptedNewsletterFnac: boolean,
    HasAcceptedSendSMS: boolean,
    AID: string,
    BasketListCount: number,
    WishListCount: number,
    PendingOrderCount: number,
    OneClickBuyInfos: OneClickBuyInfosSummary,

}

export enum Gender{
    "Undefined" = 1,
    "M" = 2,
    "Mrs" = 3,
    "Ms" = 4,
}

export interface CardHolder {
    BirthDay: Date,
    NumberCard: string,
}

export interface OneClickBuyInfosSummary{
    IsActive: boolean
    DefaultShippingAddress: OneClickBuyAddress
    DefaultBillingAddress: OneClickBuyAddress
    CreditCard:	CreditCard
    AvailableCreditCards: CreditCard[]

}

export interface OneClickBuyAddress {
    IsShippingAvailable: boolean,
}

export interface CreditCard {
    ExpirationDate: string
    CardBrandLabel: string
}

export interface UserReviews {
    AverageRating: number,
    CommentCount: number,
}

export interface PropertiesGroup {
    GroupName: string,
    Properties:Properties[]
}

export interface Properties {
    PropertyName:string
    PropertyText:string[]
}

export interface InfoLab {
    Code: string,
    Sku: string,
    MainZoomImageRadar: string,
    MainBigImageRadar: string,
    MainSmallImageRadar: string,
    Preuves: Preuve[],
    ContreTest: string,
    Avis: string,
    Axes: Axe[],
    LaboNotations: LabDataProperty[],
    OtherZoomImageRadar: string[],
    OtherSmallImageRadar: string[],
    TechnicalNote: number,
    EnvironmentalNote: number,
}

export interface Preuve {
    TypeMesure: MeasureType,
    Code: string,
    Libelle: string,
    Definition: string,
    DataType: MeasureDataType,
    Axe: string,
    DisplayOrder: number,
    Type: number,
    ImageCible: string,
    PetitImageCible: string,
}

export enum MeasureType {
    'NONE',
    'AXE',
    'MESURE',
    'PREUVE',
}

export enum MeasureDataType {
    'NONE',
    'TEXTE',
    'NOTE20',
    'NOTE10',
    'NOTES',
}

export interface Axe {
    TypeMesure: MeasureType,
    Code: string,
    Libelle: string,
    Definition: string,
    DataType: MeasureDataType,
    Axe: string,
    DisplayOrder: number,
    Type: number,
    Mesures: Mesure[],
}

export interface LabDataProperty {
    PropertyName: string,
    PropertyValue: string,
    GroupType: LaboGroupType,
    SousGroupeId?: number,
    SousGroupeName: string,
    PropertyType: LaboPropertyType,
    SortIndex: number,
    ImageFormat: PictureType
}

export enum LaboGroupType {
    'None',
    'TOP',
    'AVIS',
    'MEASURE',
    'IMAGES',
}

export enum LaboPropertyType {
    'None',
    'TexteValue',
    'DecimalValue',
    'NoteOn20',
    'NoteOn10',
    'NoteOn5',
    'StarOn5',
    'SheetOn5',
    'Image',
    'Label',
}

export enum PictureType {
    'SmallScan',
    'Scan',
    'BigScan',
    'Zoom',
    'RIAScan',
    'View360',
    'Verso',
    'SmallScanNB',
    'ScanNB',
    'BigScanNB',
    'Big_90x100',
    'Big_90xAuto',
    'Big_90x200',
    'Big_110x110',
    'Big_150x150',
}

export interface Mesure {
    TypeMesure: MeasureType,
    Code: string,
    Libelle: string,
    Definition: string,
    DataType: MeasureDataType,
    Axe: string,
    DisplayOrder: number,
    Type: number,
    DisplayType: number,
    Value: string,
    ImagePreuve: string,
    ImageDefMesure: string,
}

export interface Participant {
    ParticipantId:number,
    ParticipantType: ContributorType,
    ParticipantName:string,
    LinkUrl:string,
}

export enum ContributorType {
    None = 0,
    Author = 1,
    Actor = 2,
    ComicDesigner = 3,
    Director = 4,
    Distributor = 5,
    Editor = 6,
    Compositor = 7,
    Conductor = 8,
    Performer = 9,
    Heros = 10,
    Scenario = 14,
    Translator = 15
}

export interface InstallmentPaymentOffer {
    OfferName: string,
    CreditCardTypeId: number,
    Cost: number,
    Installments: Installment[]
}
export interface Installment {
    Amount: number,
}

export interface LaboSpider {
    LabDatas: InfoLab,
    SpiderDatas: LaboSpider[]
}

export interface OfferSummary {
    NewOffersCount:number,
    OffersCount:number,
    UsedOffersCount:number,
    LinkUrl:string,
}

export interface InternalReview {
    IntReviewType: InternalReviewType
    IntReviewTitle: string,
    IntReviewText: string,
    IntReviewPseudo: string,
    IntReviewCity: string,
    IntReviewDate: Date
    IntReviewTypeLabel: string,
}

export enum InternalReviewType {
    Seller = 1,
    Summary = 2,
    Fnac = 3,
    Editor = 4,
}

export interface UserReviewsInfos {
    AverageRating:number,
    NumCustomerComments:number,
    Reviews:	PageOf<UserReview>
}

export interface UserReview {
    CreatedDate: Date,
    Text: string,
    Title: string,
    Rating: number,
    IsAnonymous: boolean,
    AuthorDisplayName: string,
    AuthorLocation: string,
    HasProductRatingInfos: boolean,
    //ProductRatingInfos: ProductRatingInfosRepresentation,
}

export interface DvdVolume {
    VolumeName: string,
    Content: string[],
}

export interface StockInfo {
    Availability: boolean
    StockQuantity: number,
    StoreQuantity: number,
    AdhPrice: number,
    StorePrice: number,
    Store: Store
}

export interface Relationship {
    To: ItemRepresentation
    Type: string,
    RelationshipType: string,
    ItemName: string,
    ItemId: CatalogItemReference
    ItemUrl: string,
}

export interface SellerReviewsSummary {
    SellerReviewsSummary:number
}

export interface ShippingMethodMinify {
    Cost: number
    MethodName: string,
    Description: string,
}

export interface Stimuli {
    LongDescription: string,
    ShortDescription: string,
}

export interface TrackVolume {
    TrackVolumeName: string,
    TrackIndex: string,
    Tracks: Track[],
}


export interface RelatedParticipant {
    FirstLastName: string,
    LinkUrl: string,
    ImageUrl: string,
}

export interface Track {
    TrackArtistName: string,
    TrackUrl: string,
    TrackTitle: string,
    TrackIndex: string,
    TrackTime: string,
    IntermediaryBasketURL: string,
    TrackDuration: string,
    TrackAlbumMedias: Media[],
    ItemId: number,
    Prid: CatalogItemReference,
    IsPlayListType: boolean,
    HasAlbumItem: boolean,
    Links: string[], //No Link in contrat de donnée
}

export interface AvailabilityOnFnacCom {
    Color: string,
    Label: string,
    SubLabel: string,
    Status: number,
    IsPreOrder: boolean,
}

export interface Brand {
    BrandName: string,
    BrandUrl: string,
    BrandId:number,
}

export interface PushList {
    LiteralRebate: string;
    PushType: number;
    IsChainable: boolean;
    ChainIndex: number;
}

export interface FnacBlocPriceList {
    IsChecked: boolean;
    ShowRadio: boolean;
    IsStriked: boolean;
    IsNumerical: boolean;
    HasFlashSale: boolean;
    Label: string;
    CssClass: string;
    Format: string;
    Price: number;
    LiteralPrice: string;
    Type: number;
    PushList: PushList[];
    WithAdhCard: boolean;
    FlashSaleProgressionPercent: number;
    IsWebUpPriceCreation: boolean;
}

export interface BlocPriceUnderPrice {
    IsChecked: boolean;
    ShowRadio: boolean;
    IsStriked: boolean;
    IsNumerical: boolean;
    HasFlashSale: boolean;
    Price: number;
    Type: number;
    PushList: any[];
    WithAdhCard: boolean;
    FlashSaleProgressionPercent: number;
    IsWebUpPriceCreation: boolean;
}

export interface PriceBlocs {
    FnacBlocPriceList: FnacBlocPriceList[];
    BlocPriceUnderPrice: BlocPriceUnderPrice[];
    OtherFormatBlocPriceList: any[];
    VodBlocPriceList: any[];
    AdherentCardId: number;
}


export interface AvailabilitySimple {
    AlertThresholdQuantity: number,
    Quantity: number,
    SKU: string,
    Status: Status, //Always 2 returned by FNAC API -_-
    RefGU: number,
    ClickCollectExpressAvailable: boolean,
    StatusLabel: string,
    IsAvailableInOneHour: boolean,
    IsAvailableInStore: boolean,
    AvailabilityDelay: string,
    IsOpen: boolean,
    OpeningMessage: string,
}

export interface Link {
    Href: string;
    Rel: string;
}


export enum Status{
    "Unavailable"  = 0,
    "LimitedStock" = 1, //Livraison 2-4 jours
    "Available" = 2, //Disponible en retrait en magasin
}

//Not from contrat de donnée, these functions are bridges
export interface LoadPageOfItemRepresentation {
    (pageIndex: number, pageSize: number, nameConfiguration:string): Promise<PageOf<ItemRepresentation>>
}

//Customers as in Entity in Symfony app
export interface Customer {
    chCivility: string,
    firstName: string,
    surname: string,
    eMail: string,
    cdFavouriteUg: string,
    card: string,
    dtBirth: string, //But date
    aEpurse: string,
    dEndValidDate: string, //But date
    qtLoyalPoint: number,
    id: number,
}
//user to create User in symfony app
export interface UserInfo {
    chCivility: string;
    firstName: string;
    surname: string;
    eMail: string;
    cdFavouriteUg: string;
    card: string;
    dtBirth: Date;
    aEpurse: string;
    dEndValidDate: Date;
    qtLoyalPoint: number;
    id: number;
}

export interface FormInfo{
    chCivility: string;
    firstName: string;
    surname: string;
    eMail: string;
    cdFavouriteUg: string;
    card: string;
    dtBirth: string,
    pin:string,
}