// ============================================================
// FundKaro — Core Type Definitions
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  role: "backer" | "creator" | "admin";
  panNumber?: string;
  isKycVerified: boolean;
  createdAt: string;
}

export type CampaignCategory =
  | "hardware"
  | "saas"
  | "ai_ml"
  | "green_energy"
  | "consumer"
  | "food_beverage"
  | "health"
  | "education"
  | "gaming"
  | "art_design";

export type CampaignStatus =
  | "draft"
  | "pending_review"
  | "active"
  | "funded"
  | "failed"
  | "cancelled";

export type FundingModel = "all_or_nothing" | "flexible";

export type ProjectStage = "idea" | "prototype" | "production";

export interface RewardTier {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  pledgeAmount: number;
  estimatedDelivery: string;
  totalQuantity: number | null; // null = unlimited
  claimedQuantity: number;
  isLimited: boolean;
  itemsIncluded: string[];
}

export interface CampaignUpdate {
  id: string;
  campaignId: string;
  title: string;
  content: string;
  isBackerOnly: boolean;
  publishedAt: string;
}

export interface Comment {
  id: string;
  campaignId: string;
  user: User;
  content: string;
  parentId: string | null;
  isPinned: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface Campaign {
  id: string;
  creatorId: string;
  creator: User;
  title: string;
  slug: string;
  shortPitch: string;
  storyHtml: string;
  videoUrl?: string;
  coverImage: string;
  galleryImages: string[];
  category: CampaignCategory;
  fundingModel: FundingModel;
  goalAmount: number;
  raisedAmount: number;
  backersCount: number;
  status: CampaignStatus;
  startsAt: string;
  endsAt: string;
  rewards: RewardTier[];
  updates: CampaignUpdate[];
  tags: string[];
  location: string;
  isStaffPick: boolean;
  isFeatured: boolean;
  projectStage: ProjectStage;
  dpiitRecognized: boolean;
}

export interface Pledge {
  id: string;
  backerId: string;
  campaignId: string;
  rewardTierId?: string;
  amount: number;
  bonusSupport: number;
  shippingAddress?: ShippingAddress;
  status: "pending" | "successful" | "refunded" | "failed";
  createdAt: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Payment {
  id: string;
  pledgeId: string;
  gateway: "razorpay" | "cashfree";
  gatewayOrderId: string;
  gatewayPaymentId?: string;
  paymentMethod?: "upi" | "card" | "netbanking" | "wallet";
  amount: number;
  platformFee: number;
  gstOnFee: number;
  gatewayFee: number;
  status: "created" | "captured" | "refunded" | "failed";
  createdAt: string;
}

export interface CategoryInfo {
  id: CampaignCategory;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export interface PlatformStats {
  totalRaised: number;
  campaignsFunded: number;
  totalBackers: number;
  activeCampaigns: number;
}
