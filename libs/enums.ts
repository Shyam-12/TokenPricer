export enum AlgorandTransactionType {
  TRADE = 'TRADE',
  RECHARGE_WALLET = 'RECHARGE_WALLET',
  CREATE_ASSET = 'CREATE_ASSET',
  CREATE_ASSET_SMART_CONTRACT = 'CREATE_ASSET_SMART_CONTRACT',
  ASSET_SMART_CONTRACT_OPTIN = 'ASSET_SMART_CONTRACT_OPTIN',
  CASH_WITHDRAWL = 'CASH_WITHDRAWL',
  TRANSFER_ALGO = 'TRANSFER_ALGO',
  FUND_UNITS_TOKENIZED = 'FUND_UNITS_TOKENIZED',
  MAKE_BUY_OFFER = 'MAKE_BUY_OFFER',
  MAKE_SELL_OFFER = 'MAKE_SELL_OFFER',
  CANCEL_OFFER = 'CANCEL_OFFER',
  OFFER_EXPIRED = 'OFFER_EXPIRED',
  WELCOME_GIFT = 'WELCOME_GIFT',
  CREATE_RETIREMENT_ASSET = 'CREATE_RETIREMENT_ASSET',
  BLOCKED_CARBON_CREDITS = 'BLOCKED_CARBON_CREDITS',
  MAKE_COMMITMENT = 'MAKE_COMMITMENT',
  WITHDRAW_COMMITMENT = 'WITHDRAW_COMMITMENT',
  REJECT_COMMITMENT = 'REJECT_COMMITMENT',
  CANCEL_COMMITMENT = 'CANCEL_COMMITMENT',
  DISBURSE_TOKEN = 'DISBURSE_TOKEN',
  DISBURSE_FEES = 'DISBURSE_FEES',
  DISBURSE_MONEY = 'DISBURSE_MONEY',
  POOLING_ASSET = 'POOLING_ASSET',
}

export enum SupportTicketType {
  AddMoney = 'AddMoney',
  WithdrawMoney = 'WithdrawMoney',
  AllocateShares = 'AllocateShares',
  AssetIssuance = 'AssetIssuance',
  Tokenize = 'Tokenize',
  Retirement = 'Retirement',
}

export enum SupportTicketStatus {
  OPEN = 'Open',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  IN_PROGRESS = 'In_Progress',
  CANCELED = 'Canceled',
}

export enum WalletTransactionMode {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export enum WalletTransactionType {
  BANK = 'bank',
  WALLET = 'wallet',
  CARD = 'card',
  CRYPTO = 'crypto',
}

export enum WalletTransactionStatus {
  CREATED = 'Created',
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CLEARED = 'Cleared',
  CANCELLED = 'Cancelled',
  FAILED = 'Failed',
}

export enum Permissions {
  CAN_VIEW_ASSETS = 'CAN_VIEW_ASSETS',
  CAN_TRADE_ASSETS = 'CAN_TRADE_ASSETS',
  CAN_MANAGE_ASSETS = 'CAN_MANAGE_ASSETS',
  CAN_MANAGE_TEAM_MEMBERS = 'CAN_MANAGE_TEAM_MEMBERS',
  CAN_MANAGE_SERVICE_REQUESTS = 'CAN_MANAGE_SERVICE_REQUESTS',
  CAN_MANAGE_FUNDS = 'CAN_MANAGE_FUNDS',
  CAN_MANAGE_PLATFORM = 'CAN_MANAGE_PLATFORM',
  CAN_MANAGE_CUSTODY = 'CAN_MANAGE_CUSTODY',
  CAN_MANAGE_ORGANIZATION = 'CAN_MANAGE_ORGANIZATION',
  CAN_MANAGE_INVESTMENTS = 'CAN_MANAGE_INVESTMENTS',
  CAN_PERFORM_ACTIONS_LEGAL_AGREEMENTS = 'CAN_PERFORM_ACTIONS_LEGAL_AGREEMENTS',
}

export enum Status {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  IN_VOTING = 'In Voting',
  IN_TRADING = 'IN_TRADING',
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export enum AssetStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  IN_VOTING = 'in_voting',
  IN_TRADING = 'in_trading',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export enum CommitmentStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ENDED = 'ENDED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum InvestorCommitmentStatus {
  ACTIVE = 'ACTIVE',
  ALLOTED = 'ALLOTED',
  COMMITTED = 'COMMITTED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  WITHDREW = 'WITHDREW',
}

export enum InvestmentMode {
  COMMITMENT = 'Commitment',
  TRADING = 'Trading',
}

export enum UserStatus {
  APPROVED = 'approved',
  BLOCKED = 'blocked',
}

export enum InvitationStatus {
  REGISTERED = 'registered',
  INVITED = 'invited',
  RESENT = 'resent',
}

export enum InvitationSource {
  EMAIL = 'email',
  CODE = 'code',
}

export enum CountryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum SpvStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export enum MemberTypes {
  GPNP = 'GPNP',
  GPONP = 'GPONP',
  ARNP = 'ARNP',
  ARONP = 'ARONP',
  IMNP = 'IMNP',
  IMONP = 'IMONP',
  RPNP = 'RPNP',
  RPONP = 'RPONP',
  PRESENTOR = 'PRESENTOR',
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum Role {
  MANAGER = 'MANAGER',
  FOUNDER = 'FOUNDER',
  ASSET_OWNER = 'ASSET_OWNER',
  CARBON_CREDITS = 'CARBON_CREDITS',
}

export enum PrimaryFunction {
  INSTITUTIONAL_INVESTOR = 'INSTITUTIONAL_INVESTOR',
  FAMILY_OFFICE = 'FAMILY_OFFICE',
  INVESTMENT_MANAGER = 'INVESTMENT_MANAGER',
  ANGEL_SYNDICATE_LEAD = 'ANGEL_SYNDICATE_LEAD',
  ANGEL_INVESTOR = 'ANGEL_INVESTOR',
  COMPANY_FOUNDER = 'COMPANY_FOUNDER',
  COMPANY_EXECUTIVE = 'COMPANY_EXECUTIVE',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  COMPANY = 'COMPANY',
  ASSET_SHAREHOLDER = 'ASSET_SHAREHOLDER',
  ASSET_OWNER = 'ASSET_OWNER',
  OTHER = 'OTHER',
}

export enum InitialAssetValue {
  LESS_THAN_1M = 'LESS_THAN_1M',
  LESS_THAN_3M = 'LESS_THAN_3M',
  LESS_THAN_10M = 'LESS_THAN_10M',
  MORE_THAN_10M = 'MORE_THAN_10M',
}

export enum Jurisdiction {
  DONT_KNOW = 'DONT_KNOW',
  HONG_KONG = 'HONG_KONG',
  SINGAPORE = 'SINGAPORE',
  LUXEMBORG = 'LUXEMBORG',
  UNITED_KINGDOM = 'UNITED_KINGDOM',
  UNITED_STATES_AMERICA = 'UNITED_STATES_AMERICA',
  CAYMAN_ISLANDS = 'CAYMAN_ISLANDS',
  BRITISH_VIRGIN_ISLANDS = 'BRITISH_VIRGIN_ISLANDS',
  MAURITIUS = 'MAURITIUS',
}

export enum GeneralStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AuthorizationRepresentativeStatus {
  REQUESTED = 'REQUESTED',
  REVIEW = 'REVIEW',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export enum NavUpdateRequestStatus {
  REQUESTED = 'REQUESTED',
  REVIEW = 'REVIEW',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export enum InjectionStatus {
  REQUESTED = 'REQUESTED',
  REVIEW = 'REVIEW',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  TOKENIZED = 'TOKENIZED',
}

export enum InjectionDocumentTypes {
  INJECTION = 'INJECTION',
  VALUE = 'VALUE',
}

export enum InjectionValuationSource {
  FUND_RAISING = 'FUND_RAISING',
  CAMPAIGN = 'CAMPAIGN',
  MARKET_TRANSACTIONS = 'MARKET_TRANSACTIONS',
  EXTERNAL_APPRAISERS = 'EXTERNAL_APPRAISERS',
  FINANCIAL_STATEMENTS = 'FINANCIAL_STATEMENTS',
  INDEPENDENT_VALUATION_FIRM = 'INDEPENDENT_VALUATION_FIRM',
  HISTORICAL_COST_DATA = 'HISTORICAL_COST_DATA',
  COMPARABLE_ASSET_ANALYSIS = 'COMPARABLE_ASSET_ANALYSIS',
}

export enum AssetAgreementsType {
  ASSET = 'ASSET',
  NDA = 'NDA',
}

export enum CommitmentInvitationsType {
  AWAITING_RESPONSE = 'AWAITING_RESPONSE',
  INVITATION_ACCEPTED = 'INVITATION_ACCEPTED',
  AWAITING_KYC = 'AWAITING_KYC',
  COMMITTED = 'COMMITTED',
  SENDING_FAILED = 'SENDING_FAILED',
}

export enum AssetSpecificAgreementDefaultValues {
  TITLE = 'Asset Specific Terms Agreement',
  ACCEPTANCE_TEXT = 'I accept the asset specific terms agreement',
}

export enum SourceTypes {
  EVIDENT = 'EVIDENT',
  MANAGER = 'Manager',
  INVESTOR = 'Investor',
  CUSTODIAN = 'Custodian',
}

export enum Purposes {
  INVESTMENT = 'Investment',
  DIVESTMENT = 'Divestment',
  OPERATION_EXPENSES = 'Operation Expenses',
  MANAGEMENT_FEES = 'Management Fees',
  PERFORMANCE_FEES = 'Performance Fees',
  CUSTODIAN_FEES = 'Custodian Fees',
  ADMINISTRATOR_FEES = 'Administrator Fees',
  AUDIT_AND_LEGAL_FEES = 'Audit And Legal Fees',
  TAX_PAYMENTS = 'Tax Payments',
  INVESTOR_DISTRIBUTIONS = 'Investor Distributions',
  INVESTOR_REDEMPTIONS = 'Investor Redemptions',
  MARGIN_CALLS = 'Margin Calls',
  COLLATERAL_MANAGEMENT = 'Collateral Management',
  CURRENCY_HEDGING = 'Currency Hedging',
  CASH_BUFFER = 'Cash Buffer',
  OTHER = 'Other',
}

export enum NavUpdateTypes {
  ASSET_INJECTION = 'ASSET_INJECTION',
  CAPITAL_COMMITMENTS = 'CAPITAL_COMMITMENTS',
  TOKENIZATION = 'TOKENIZATION',
  NAV_UPDATE_REQUEST = 'NAV_UPDATE_REQUEST',
  CASH_MOVEMENTS = 'CASH_MOVEMENTS',
}

export interface BlockchainData {
  custodianAddress: string
  custodianPassPhrase: string
  assetId: string | number
  receiverAddress?: string
  receiverPassPhrase?: string
  amount: string | number
  transactionNote: string
  senderAddress?: string
  senderPassPhrase?: string
  feesAddress?: string
}

export interface CommitmentDetailInterface {
  poolTokens: BlockchainData
  disburseTokens: BlockchainData[]
  disburseMoney?: BlockchainData
  disburseFees: BlockchainData
  disburseMoneyAnchor?: BlockchainData[]
}

export enum ProfileStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum PortfolioStatementTypes {
  ACCOUNT_STATEMENT_OR_PORTFOLIO = 'ACCOUNT_STATEMENT_OR_PORTFOLIO',
  CONFIRMATION_OR_PUBLIC_FILING = 'CONFIRMATION_OR_PUBLIC_FILING',
  CONFIRMATION_LETTER = 'CONFIRMATION_LETTER',
}

export enum NavUpdateRequestDocumentType {
  VALUATION_DOCUMENT = 'VALUATION_DOCUMENT',
  LIABILITIES_DOCUMENT = 'LIABILITIES_DOCUMENT',
}

export enum AgreementSignedTypes {
  TRADE = 'TRADE',
  COMMITMENT = 'COMMITMENT',
  OTHER = 'OTHER',
  ASSET_INFO = 'ASSET_INFO',
  ASSET = 'ASSET',
}
