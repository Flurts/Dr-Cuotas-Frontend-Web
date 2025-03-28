import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
}

export interface Adjudicated {
  __typename?: 'Adjudicated';
  adjudicated_status?: Maybe<Adjudicated_Status>;
  comments?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTimeISO']>;
  date_surgery?: Maybe<Scalars['DateTimeISO']>;
  deleted_at?: Maybe<Scalars['DateTimeISO']>;
  doctor?: Maybe<Doctor>;
  end_date_payment?: Maybe<Scalars['DateTimeISO']>;
  id: Scalars['ID'];
  locality?: Maybe<Locality>;
  quota_price?: Maybe<Scalars['Float']>;
  quotas_number?: Maybe<Scalars['Float']>;
  quotas_paid?: Maybe<Scalars['Float']>;
  start_date_payment?: Maybe<Scalars['DateTimeISO']>;
  status?: Maybe<Status>;
  surgery?: Maybe<Surgery>;
  total_price?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTimeISO']>;
  user?: Maybe<User>;
}

/** List of available adjudicated status */
export enum Adjudicated_Status {
  Active = 'Active',
  Blocked = 'Blocked',
  Rejected = 'Rejected',
  Validating = 'Validating',
  Verified = 'Verified'
}

export interface Doctor {
  doctor: any;
  __typename?: 'Doctor';
  adjudicateds: Adjudicated[];
  created_at?: Maybe<Scalars['DateTimeISO']>;
  curriculum?: Maybe<File_Db>;
  deleted_at?: Maybe<Scalars['DateTimeISO']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  profession?: Maybe<Scalars['String']>;
  status: Status;
  surgeries?: Maybe<Surgery[]>;
  updated_at?: Maybe<Scalars['DateTimeISO']>;
  user?: Maybe<User>;
}

export interface DoctorBasicData {
  __typename?: 'DoctorBasicData';
  curriculum?: Maybe<File_Db>;
  doctor?: Maybe<Doctor>;
  status: Scalars['Boolean'];
}

export interface File_Db {
  __typename?: 'File_DB';
  created_at?: Maybe<Scalars['DateTimeISO']>;
  deleted_at?: Maybe<Scalars['DateTimeISO']>;
  file_key?: Maybe<Scalars['String']>;
  file_link?: Maybe<Scalars['String']>;
  file_name?: Maybe<Scalars['String']>;
  file_type: File_Type;
  id: Scalars['ID'];
  surgery?: Maybe<Surgery>;
  updated_at?: Maybe<Scalars['DateTimeISO']>;
  user?: Maybe<User>;
}

/** List of available file types */
export enum File_Type {
  CurriculumVitae = 'CURRICULUM_VITAE',
  DoctorPhotos = 'DOCTOR_PHOTOS',
  DoctorVideos = 'DOCTOR_VIDEOS',
  PaymentReceipt = 'PAYMENT_RECEIPT',
  SurgeryPhotos = 'SURGERY_PHOTOS',
  SurgeryVideos = 'SURGERY_VIDEOS'
}

/** List of available genres */
export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other',
  PreferNotToSay = 'PreferNotToSay'
}

export interface Locality {
  __typename?: 'Locality';
  adjudicated: Adjudicated[];
  created_at: Scalars['DateTimeISO'];
  deleted_at?: Maybe<Scalars['DateTimeISO']>;
  id: Scalars['ID'];
  iso_code: Scalars['String'];
  name: Scalars['String'];
  updated_at: Scalars['DateTimeISO'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createNewApplicantDoctor: Scalars['Boolean'];
  createNewDoctor: Doctor;
  createNewSurgerie: Scalars['Boolean'];
  deleteSurgeries: Scalars['Boolean'];
  generatePresignedUrlCurriculumDoctor: PresignedUrlResponse;
  generatePresignedUrlPaymentReceipt: PresignedUrlResponse;
  generatePresignedUrlSurgeryImage: PresignedUrlResponse;
  generatePresignedUrlUserImage: PresignedUrlResponse;
  getCvFile: UpdateProfileCvResponse;
  handleGoogleSignInUp: Scalars['Boolean'];
  login: UserDataResponseSingInUp;
  loginWithGoogleToken: UserDataResponseSingInUp;
  paymentUpdateAdjudicated: Scalars['Boolean'];
  registerUser: UserDataResponseSingInUp;
  saveCurriculumVitaeDataBase: Scalars['Boolean'];
  saveImageUserS3: Scalars['Boolean'];
  savePaymentReceiptDataBase: Scalars['Boolean'];
  subscribeSurgerie: Scalars['Boolean'];
  updateAccountSettings: Scalars['Boolean'];
  updateInfoDoctor: Doctor;
  updateProfileSettings: Scalars['Boolean'];
  updateSurgerie: Scalars['Boolean'];
  updateUserProfileImage: UpdateProfileImageResponse;
  verifyAdjudicated: Scalars['Boolean'];
}


export interface MutationCreateNewApplicantDoctorArgs {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  registration_number: Scalars['String'];
  specialty: Scalars['String'];
}


export interface MutationCreateNewSurgerieArgs {
  surgery: SurgeryInput;
}


export interface MutationDeleteSurgeriesArgs {
  surgeriesId: Array<Scalars['String']>;
}


export interface MutationGeneratePresignedUrlCurriculumDoctorArgs {
  file_type: Scalars['String'];
}


export interface MutationGeneratePresignedUrlPaymentReceiptArgs {
  file_type: Scalars['String'];
}


export interface MutationGeneratePresignedUrlSurgeryImageArgs {
  file_type: Scalars['String'];
}


export interface MutationGeneratePresignedUrlUserImageArgs {
  file_type: Scalars['String'];
}


export interface MutationGetCvFileArgs {
  user_id: Scalars['String'];
}


export interface MutationHandleGoogleSignInUpArgs {
  token: Scalars['String'];
}


export interface MutationLoginArgs {
  password: Scalars['String'];
  phone_email: Scalars['String'];
}


export interface MutationLoginWithGoogleTokenArgs {
  token: Scalars['String'];
}


export interface MutationPaymentUpdateAdjudicatedArgs {
  adjudicatedId: Scalars['String'];
  quotas_number: Scalars['Float'];
}


export interface MutationRegisterUserArgs {
  birth_date: Scalars['String'];
  first_name: Scalars['String'];
  gender: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  phone_email: Scalars['String'];
}


export interface MutationSaveCurriculumVitaeDataBaseArgs {
  curriculumKey: Scalars['String'];
  curriculumLocation: Scalars['String'];
  file_type: Scalars['String'];
}


export interface MutationSaveImageUserS3Args {
  profileImageKey: Scalars['String'];
  profileImageLocation: Scalars['String'];
}


export interface MutationSavePaymentReceiptDataBaseArgs {
  paymentKey: Scalars['String'];
  paymentLocation: Scalars['String'];
}


export interface MutationSubscribeSurgerieArgs {
  coments?: InputMaybe<Scalars['String']>;
  document_identification: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  surgerieId: Scalars['String'];
}


export interface MutationUpdateAccountSettingsArgs {
  birth_date: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
}


export interface MutationUpdateInfoDoctorArgs {
  description?: InputMaybe<Scalars['String']>;
  profession: Scalars['String'];
  status: Scalars['String'];
}


export interface MutationUpdateProfileSettingsArgs {
  gender: Scalars['String'];
  identification_document: Scalars['String'];
  social_media: SocialMediaInput[];
}


export interface MutationUpdateSurgerieArgs {
  surgery: SurgeryInput;
}


export interface MutationUpdateUserProfileImageArgs {
  profile_image: Scalars['String'];
}


export interface MutationVerifyAdjudicatedArgs {
  adjudicatedId: Scalars['String'];
}

export interface PresignedUrlResponse {
  __typename?: 'PresignedUrlResponse';
  key: Scalars['String'];
  status: Scalars['Boolean'];
  url: Scalars['String'];
}

export interface Query {
  __typename?: 'Query';
  getAdjudicatedById?: Maybe<Adjudicated>;
  getAdjudicatedByMonthAndYear: Adjudicated[];
  getAdjudicatedByStatus: Adjudicated[];
  getAdjudicatedListDoctor: Adjudicated[];
  getAllAdjudicated: Adjudicated[];
  getAllSurgeriesWithValues: Surgery[];
  getDoctor: DoctorBasicData;
  getDoctorFilter: Doctor[];
  getDoctorsByName: Doctor[];
  getDoctorByStatus: Doctor[];
  getMyAdjudicated: Adjudicated[];
  getMySurgeries: Surgery[];
  getSurgerieById: Surgery;
  getSurgeriesDoctorById: Surgery[];
  getSurgeryStatus: Surgery[];
  getUserData: UserDataResponseSingInUp;
  ping: Scalars['String'];
}


export interface QueryGetAdjudicatedByIdArgs {
  adjudicatedId: Scalars['String'];
}


export interface QueryGetAdjudicatedByMonthAndYearArgs {
  limit?: InputMaybe<Scalars['Float']>;
  month: Scalars['Float'];
  offset?: InputMaybe<Scalars['Float']>;
  year: Scalars['Float'];
}


export interface QueryGetAdjudicatedByStatusArgs {
  status: Scalars['String'];
}


export interface QueryGetAllSurgeriesWithValuesArgs {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}


export interface QueryGetDoctorArgs {
  doctorId: Scalars['String'];
}


export interface QueryGetDoctorFilterArgs {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}


export interface QueryGetDoctorsByNameArgs {
  limit?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
}


export interface QueryGetSurgerieByIdArgs {
  id: Scalars['String'];
}


export interface QueryGetSurgeriesDoctorByIdArgs {
  doctorId: Scalars['String'];
}


export interface QueryGetSurgeryStatusArgs {
  status: Scalars['String'];
}

/** List of available roles */
export enum Role {
  Admin = 'Admin',
  Doctor = 'Doctor',
  Guest = 'Guest',
  User = 'User'
}

/** List of available social media */
export enum SocialMedia {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Pinterest = 'Pinterest',
  Snapchat = 'Snapchat',
  Telegram = 'Telegram',
  TikTok = 'TikTok',
  Twitter = 'Twitter',
  WhatsApp = 'WhatsApp',
  YouTube = 'YouTube'
}

export interface SocialMediaInput {
  link: Scalars['String'];
  type: Scalars['String'];
}

export interface Social_Media {
  __typename?: 'Social_Media';
  created_at: Scalars['DateTimeISO'];
  deleted_at?: Maybe<Scalars['DateTimeISO']>;
  id: Scalars['ID'];
  link: Scalars['String'];
  status: Status;
  type: SocialMedia;
  updated_at: Scalars['DateTimeISO'];
  user?: Maybe<User[]>;
}

/** List of available status */
export enum Status {
  Active = 'Active',
  Blocked = 'Blocked',
  Deleted = 'Deleted',
  Inactive = 'Inactive'
}

export interface Surgery {
  __typename?: 'Surgery';
  adjudicateds?: Maybe<Adjudicated[]>;
  amount: Scalars['Float'];
  category: SurgeryCategories;
  subCategory?: SubSurgeryCategories;
  created_at?: Maybe<Scalars['DateTimeISO']>;
  deleted_at?: Maybe<Scalars['DateTimeISO']>;
  description?: Maybe<Scalars['String']>;
  doctor?: Maybe<Doctor>;
  doctors: Array<{
    id: string;
    doctor: {
      provincia: string;
      user: {
        first_name: string;
        last_name: string;
      };
    };
  }>;
  file_banner?: Maybe<File_Db>;
  files?: Maybe<File_Db[]>;
  id: Scalars['ID'];
  name: Scalars['String'];
  rating: Scalars['Float'];
  status: Status;
  type: SurgeryTypes;
  updated_at?: Maybe<Scalars['DateTimeISO']>;
}

/** Categories of surgeries */
export enum SurgeryCategories {
  FacialSurgeries = "FacialSurgeries",
  BreastSurgeries = "BreastSurgeries",
  BodySurgeries = "BodySurgeries",
  ReconstructiveSurgeries = "ReconstructiveSurgeries",
  GeneralSurgeries = "GeneralSurgeries",
  CosmeticSurgeries = "CosmeticSurgeries",
  OrthopedicSurgeries = "OrthopedicSurgeries",
  NeurologicalSurgeries = "NeurologicalSurgeries",
  OphthalmicSurgeries = "OphthalmicSurgeries",
  PediatricSurgeries = "PediatricSurgeries",
  UrologicSurgeries = "UrologicSurgeries",
  GynecologicSurgeries = "GynecologicSurgeries",
  ThoracicSurgeries = "ThoracicSurgeries",
  TransplantSurgeries = "TransplantSurgeries",
  ENTSurgeries = "ENTSurgeries",
  DentalSurgeries = "DentalSurgeries"
}

export interface SurgeryInput {
  amount?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<SurgeryCategories>;
  subCategory?: InputMaybe<SubSurgeryCategories>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  surgeryImage?: InputMaybe<Scalars['String']>;
  surgeryImageKey?: InputMaybe<Scalars['String']>;
  surgeryImageLocation?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<SurgeryTypes>;
}

/** Types of surgeries */
export enum SurgeryTypes {
  // Facial Surgeries
  Rhinoplasty = "Rhinoplasty", // Incluye estética y funcional
  Facelift = "Facelift", // Lifting
  Blepharoplasty = "Blepharoplasty", // Eyelid Surgery
  Otoplasty = "Otoplasty", // Ear Surgery
  BuccalFatRemoval = "BuccalFatRemoval", // Bichectomía
  // BrowLift = "BrowLift",

  // Breast Surgeries
  BreastAugmentation = "BreastAugmentation",
  BreastLift = "BreastLift",
  BreastReduction = "BreastReduction",
  // BreastReconstruction = "BreastReconstruction",

  // Body Surgeries
  Liposuction = "Liposuction", // Liposucción
  TummyTuck = "TummyTuck", // Abdominoplastia convencional y circular
  LiposuctionWithTummyTuck = "LiposuctionWithTummyTuck", // Lipo + abdominoplastia
  LiposuctionWithButtockAugmentation = "LiposuctionWithButtockAugmentation", // Lipo + lipotransferencia glútea
  SkinLesionTreatment = "SkinLesionTreatment", // Lesiones de piel
  ButtockAugmentation = "ButtockAugmentation"
}

export enum SubSurgeryCategories {
  EyelidSurgery = "EyelidSurgery",
  Facelift = "Facelift",
  BreastAugmentation = "BreastAugmentation",
  BreastReduction = "BreastReduction",
  BreastLift = "BreastLift",
  Liposuction = "Liposuction",
  TummyTuck = "TummyTuck",
  ButtockLift = "ButtockLift"
}

export interface UpdateProfileCvResponse {
  __typename?: 'UpdateProfileCvResponse';
  cv?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
}

export interface UpdateProfileImageResponse {
  __typename?: 'UpdateProfileImageResponse';
  profile_picture?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
}

export interface User {
  __typename?: 'User';
  adjudicated?: Maybe<Adjudicated[]>;
  birth_date?: Maybe<Scalars['DateTimeISO']>;
  created_at: Scalars['DateTimeISO'];
  deleted_at?: Maybe<Scalars['DateTimeISO']>;
  doctor?: Maybe<Doctor>;
  email?: Maybe<Scalars['String']>;
  files?: Maybe<File_Db[]>;
  first_name: Scalars['String'];
  gender: Gender;
  id: Scalars['ID'];
  identification_document?: Maybe<Scalars['String']>;
  last_access?: Maybe<Scalars['DateTimeISO']>;
  last_name: Scalars['String'];
  password: Scalars['String'];
  phone_number?: Maybe<Scalars['String']>;
  profile_picture?: Maybe<Scalars['String']>;
  profile_picture_key?: Maybe<Scalars['String']>;
  role: Role;
  social_media?: Maybe<Social_Media[]>;
  status: Status;
  updated_at: Scalars['DateTimeISO'];
}

export interface UserDataResponseSingInUp {
  __typename?: 'UserDataResponseSingInUp';
  token: Scalars['String'];
  user: User;
}

export type CreateNewApplicantDoctorMutationVariables = Exact<{
  specialty: Scalars['String'];
  registrationNumber: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
}>;


export interface CreateNewApplicantDoctorMutation { __typename?: 'Mutation', createNewApplicantDoctor: boolean }

export type CreateNewDoctorMutationVariables = Exact<Record<string, never>>;


export interface CreateNewDoctorMutation { __typename?: 'Mutation', createNewDoctor: { __typename?: 'Doctor', id?: string | null, description?: string | null, status: Status, created_at?: any | null } }

export type CreateNewSurgerieMutationVariables = Exact<{
  surgery: SurgeryInput;
}>;


export interface CreateNewSurgerieMutation { __typename?: 'Mutation', createNewSurgerie: boolean }

export type DeleteSurgeriesMutationVariables = Exact<{
  surgeriesId: Array<Scalars['String']> | Scalars['String'];
}>;


export interface DeleteSurgeriesMutation { __typename?: 'Mutation', deleteSurgeries: boolean }

export type GeneratePresignedUrlCurriculumDoctorMutationVariables = Exact<{
  fileType: Scalars['String'];
}>;


export interface GeneratePresignedUrlCurriculumDoctorMutation { __typename?: 'Mutation', generatePresignedUrlCurriculumDoctor: { __typename?: 'PresignedUrlResponse', status: boolean, key: string, url: string } }

export type GeneratePresignedUrlSurgeryImageMutationVariables = Exact<{
  fileType: Scalars['String'];
}>;


export interface GeneratePresignedUrlSurgeryImageMutation { __typename?: 'Mutation', generatePresignedUrlSurgeryImage: { __typename?: 'PresignedUrlResponse', status: boolean, url: string, key: string } }

export type GeneratePresignedUrlUserImageMutationVariables = Exact<{
  fileType: Scalars['String'];
}>;


export interface GeneratePresignedUrlUserImageMutation { __typename?: 'Mutation', generatePresignedUrlUserImage: { __typename?: 'PresignedUrlResponse', status: boolean, key: string, url: string } }

export type GetAdjudicatedByIdQueryVariables = Exact<{
  adjudicatedId: Scalars['String'];
}>;


export interface GetAdjudicatedByIdQuery { __typename?: 'Query', getAdjudicatedById?: { __typename?: 'Adjudicated', id: string, comments?: string | null, doctor?: { __typename?: 'Doctor', id?: string | null, user?: { __typename?: 'User', first_name: string } | null } | null, surgery?: { __typename?: 'Surgery', name: string, type: SurgeryTypes, description?: string | null, category: SurgeryCategories, amount: number, status: Status } | null, user?: { __typename?: 'User', first_name: string, id: string, last_name: string } | null } | null }

export type GetAdjudicatedByMonthAndYearQueryVariables = Exact<{
  year: Scalars['Float'];
  month: Scalars['Float'];
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export interface GetAdjudicatedByMonthAndYearQuery { __typename?: 'Query', getAdjudicatedByMonthAndYear: Array<{ __typename?: 'Adjudicated', quotas_number?: number | null, quotas_paid?: number | null, total_price?: number | null, start_date_payment?: any | null, end_date_payment?: any | null, user?: { __typename?: 'User', first_name: string, last_name: string } | null, surgery?: { __typename?: 'Surgery', name: string } | null, locality?: { __typename?: 'Locality', name: string } | null }> }

export type GetAdjudicatedListDoctorQueryVariables = Exact<Record<string, never>>;


export interface GetAdjudicatedListDoctorQuery { __typename?: 'Query', getAdjudicatedListDoctor: Array<{ __typename?: 'Adjudicated', id: string, status?: Status | null, total_price?: number | null, adjudicated_status?: Adjudicated_Status | null, user?: { __typename?: 'User', id: string, first_name: string, last_name: string } | null }> }

export type GetAllSurgeriesWithValuesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export interface GetAllSurgeriesWithValuesQuery { 
  __typename?: 'Query', 
  getAllSurgeriesWithValues: Array<{ 
    __typename?: 'Surgery', 
    name: string, 
    description?: string | null, 
    rating: number, 
    type: SurgeryTypes, 
    id: string, 
    category: SurgeryCategories, 
    amount: number, 
    status: Status, 
    file_banner?: { 
      __typename?: 'File_DB', 
      file_link?: string | null 
    } | null, 
    doctors: Array<{ 
      __typename?: 'DoctorAssignment', 
      id: string, 
      doctor: { 
        __typename?: 'Doctor', 
        provincia: string, 
        user: { 
          first_name: string, 
          last_name: string 
        } 
        id: string,
      } 
    }> 
  }> 
}


export type GetCvFileMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export interface GetCvFileMutation { __typename?: 'Mutation', getCvFile: { __typename?: 'UpdateProfileCvResponse', status: boolean, cv?: string | null } }

export type GetDoctorQueryVariables = Exact<{
  doctorId: Scalars['String'];
}>;


export interface GetDoctorQuery { __typename?: 'Query', getDoctor: { __typename?: 'DoctorBasicData', status: boolean, doctor?: { __typename?: 'Doctor', profession?: string | null, description?: string | null, status: Status, created_at?: any | null, updated_at?: any | null, user?: { __typename?: 'User', first_name: string, last_name: string, profile_picture?: string | null, social_media?: Array<{ __typename?: 'Social_Media', link: string, status: Status, type: SocialMedia }> | null } | null } | null, curriculum?: { __typename?: 'File_DB', file_link?: string | null } | null } }

export type GetDoctorsFilterQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export interface GetDoctorsFilterQuery { __typename?: 'Query', getDoctorFilter: Array<{ __typename?: 'Doctor', id?: string | null, profession?: string | null, user?: { __typename?: 'User', first_name: string, profile_picture?: string | null, social_media?: Array<{ __typename?: 'Social_Media', link: string, status: Status, type: SocialMedia }> | null } | null }> }

export type GetDoctorsByNameQueryVariables = Exact<{
  name: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type GetDoctorsByStatusQueryVariables = Exact<{
  status: Status;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;



export interface GetDoctorsByNameQuery { __typename?: 'Query', getDoctorsByName: Array<{ __typename?: 'Doctor', profession?: string | null, id?: string | null, user?: { __typename?: 'User', first_name: string, last_name: string, profile_picture?: string | null, social_media?: Array<{ __typename?: 'Social_Media', link: string, status: Status, type: SocialMedia }> | null } | null }> }

export interface GetDoctorsByStatusQuery {
  __typename?: 'Query';
  getDoctorByStatus: Array<{
    __typename?: 'Doctor';
    profession?: string | null;
    id?: string | null;
    user?: {
      __typename?: 'User';
      first_name: string;
      last_name: string;
      profile_picture?: string | null;
      social_media?: Array<{
        __typename?: 'Social_Media';
        link: string;
        status: Status;
        type: SocialMedia;
      }> | null;
    } | null;
  }>;
}


export type GetMyAdjudicatedQueryVariables = Exact<Record<string, never>>;


export interface GetMyAdjudicatedQuery { __typename?: 'Query', getMyAdjudicated: Array<{ __typename?: 'Adjudicated', id: string, quotas_number?: number | null, quotas_paid?: number | null, total_price?: number | null, start_date_payment?: any | null, end_date_payment?: any | null, comments?: string | null, status?: Status | null, adjudicated_status?: Adjudicated_Status | null, created_at?: any | null, updated_at?: any | null, doctor?: { __typename?: 'Doctor', id?: string | null, user?: { __typename?: 'User', first_name: string } | null } | null, surgery?: { __typename?: 'Surgery', name: string, id: string } | null }> }

export type GetMySurgeriesQueryVariables = Exact<Record<string, never>>;


export interface GetMySurgeriesQuery { __typename?: 'Query', getMySurgeries: Array<{ __typename?: 'Surgery', id: string, status: Status, name: string, type: SurgeryTypes, category: SurgeryCategories, amount: number }> }

export type GetSurgerieByIdQueryVariables = Exact<{
  getSurgerieByIdId: Scalars['String'];
}>;


export interface GetSurgerieByIdQuery { __typename?: 'Query', getSurgerieById: { __typename?: 'Surgery', id: string, name: string, amount: number, status: Status, description?: string | null, type: SurgeryTypes, category: SurgeryCategories, file_banner?: { __typename?: 'File_DB', file_link?: string | null } | null } }

export type GetUserDataQueryVariables = Exact<Record<string, never>>;


export interface GetUserDataQuery { __typename?: 'Query', getUserData: { __typename?: 'UserDataResponseSingInUp', user: { __typename?: 'User', id: string, email?: string | null, phone_number?: string | null, first_name: string, last_name: string, birth_date?: any | null, identification_document?: string | null, gender: Gender, profile_picture?: string | null, role: Role, status: Status, last_access?: any | null, created_at: any, updated_at: any, deleted_at?: any | null, doctor?: { __typename?: 'Doctor', id?: string | null } | null, social_media?: Array<{ __typename?: 'Social_Media', link: string, type: SocialMedia }> | null } } }

export type HandleGoogleSignInUpMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export interface HandleGoogleSignInUpMutation { __typename?: 'Mutation', handleGoogleSignInUp: boolean }

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  phoneEmail: Scalars['String'];
}>;


export interface LoginMutation { __typename?: 'Mutation', login: { __typename?: 'UserDataResponseSingInUp', token: string, user: { __typename?: 'User', id: string, email?: string | null, phone_number?: string | null, first_name: string, last_name: string, birth_date?: any | null, identification_document?: string | null, gender: Gender, profile_picture?: string | null, role: Role, status: Status, last_access?: any | null, created_at: any, updated_at: any, deleted_at?: any | null, doctor?: { __typename?: 'Doctor', id?: string | null } | null, social_media?: Array<{ __typename?: 'Social_Media', link: string, type: SocialMedia }> | null } } }

export type LoginWithGoogleTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export interface LoginWithGoogleTokenMutation { __typename?: 'Mutation', loginWithGoogleToken: { __typename?: 'UserDataResponseSingInUp', token: string, user: { __typename?: 'User', id: string, email?: string | null, phone_number?: string | null, first_name: string, last_name: string, birth_date?: any | null, identification_document?: string | null, gender: Gender, profile_picture?: string | null, role: Role, status: Status, last_access?: any | null, created_at: any, updated_at: any, deleted_at?: any | null, doctor?: { __typename?: 'Doctor', id?: string | null } | null, social_media?: Array<{ __typename?: 'Social_Media', link: string, type: SocialMedia }> | null } } }

export type PaymentUpdateAdjudicatedMutationVariables = Exact<{
  quotasNumber: Scalars['Float'];
  adjudicatedId: Scalars['String'];
}>;


export interface PaymentUpdateAdjudicatedMutation { __typename?: 'Mutation', paymentUpdateAdjudicated: boolean }

export type PingQueryVariables = Exact<Record<string, never>>;


export interface PingQuery { __typename?: 'Query', ping: string }

export type RegisterUserMutationVariables = Exact<{
  gender: Scalars['String'];
  birthDate: Scalars['String'];
  password: Scalars['String'];
  phoneEmail: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
}>;


export interface RegisterUserMutation { __typename?: 'Mutation', registerUser: { __typename?: 'UserDataResponseSingInUp', token: string, user: { __typename?: 'User', id: string, email?: string | null, phone_number?: string | null, first_name: string, last_name: string, birth_date?: any | null, identification_document?: string | null, gender: Gender, profile_picture?: string | null, role: Role, status: Status, last_access?: any | null, created_at: any, updated_at: any, deleted_at?: any | null } } }

export type SaveCurriculumVitaeDataBaseMutationVariables = Exact<{
  curriculumLocation: Scalars['String'];
  curriculumKey: Scalars['String'];
  fileType: Scalars['String'];
}>;


export interface SaveCurriculumVitaeDataBaseMutation { __typename?: 'Mutation', saveCurriculumVitaeDataBase: boolean }

export type SaveImageUserS3MutationVariables = Exact<{
  profileImageKey: Scalars['String'];
  profileImageLocation: Scalars['String'];
}>;


export interface SaveImageUserS3Mutation { __typename?: 'Mutation', saveImageUserS3: boolean }

export type SubscribeSurgerieMutationVariables = Exact<{
  surgerieId: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  documentIdentification: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  coments?: InputMaybe<Scalars['String']>;
}>;


export interface SubscribeSurgerieMutation { __typename?: 'Mutation', subscribeSurgerie: boolean }

export type UpdateAccountSettingsMutationVariables = Exact<{
  birthDate: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
}>;


export interface UpdateAccountSettingsMutation { __typename?: 'Mutation', updateAccountSettings: boolean }

export type UpdateInfoDoctorMutationVariables = Exact<{
  description: Scalars['String'];
  status: Scalars['String'];
  profession: Scalars['String'];
}>;


export interface UpdateInfoDoctorMutation { __typename?: 'Mutation', updateInfoDoctor: { __typename?: 'Doctor', profession?: string | null, description?: string | null, status: Status, updated_at?: any | null } }

export type UpdateProfileSettingsMutationVariables = Exact<{
  socialMedia: SocialMediaInput[] | SocialMediaInput;
  gender: Scalars['String'];
  identificationDocument: Scalars['String'];
}>;


export interface UpdateProfileSettingsMutation { __typename?: 'Mutation', updateProfileSettings: boolean }

export type UpdateSurgerieMutationVariables = Exact<{
  surgery: SurgeryInput;
}>;


export interface UpdateSurgerieMutation { __typename?: 'Mutation', updateSurgerie: boolean }

export type UpdateUserProfileImageMutationVariables = Exact<{
  profileImage: Scalars['String'];
}>;


export interface UpdateUserProfileImageMutation { __typename?: 'Mutation', updateUserProfileImage: { __typename?: 'UpdateProfileImageResponse', status: boolean, profile_picture?: string | null } }

export type VerifyAdjudicatedMutationVariables = Exact<{
  adjudicatedId: Scalars['String'];
}>;


export interface VerifyAdjudicatedMutation { __typename?: 'Mutation', verifyAdjudicated: boolean }


export const CreateNewApplicantDoctorDocument = gql`
    mutation CreateNewApplicantDoctor($specialty: String!, $registrationNumber: String!, $phone: String!, $email: String!, $name: String!) {
  createNewApplicantDoctor(
    specialty: $specialty
    registration_number: $registrationNumber
    phone: $phone
    email: $email
    name: $name
  )
}
    `;
export type CreateNewApplicantDoctorMutationFn = Apollo.MutationFunction<CreateNewApplicantDoctorMutation, CreateNewApplicantDoctorMutationVariables>;

/**
 * __useCreateNewApplicantDoctorMutation__
 *
 * To run a mutation, you first call `useCreateNewApplicantDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewApplicantDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewApplicantDoctorMutation, { data, loading, error }] = useCreateNewApplicantDoctorMutation({
 *   variables: {
 *      specialty: // value for 'specialty'
 *      registrationNumber: // value for 'registrationNumber'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateNewApplicantDoctorMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewApplicantDoctorMutation, CreateNewApplicantDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewApplicantDoctorMutation, CreateNewApplicantDoctorMutationVariables>(CreateNewApplicantDoctorDocument, options);
      }
export type CreateNewApplicantDoctorMutationHookResult = ReturnType<typeof useCreateNewApplicantDoctorMutation>;
export type CreateNewApplicantDoctorMutationResult = Apollo.MutationResult<CreateNewApplicantDoctorMutation>;
export type CreateNewApplicantDoctorMutationOptions = Apollo.BaseMutationOptions<CreateNewApplicantDoctorMutation, CreateNewApplicantDoctorMutationVariables>;
export const CreateNewDoctorDocument = gql`
    mutation CreateNewDoctor {
  createNewDoctor {
    id
    description
    status
    created_at
  }
}
    `;
export type CreateNewDoctorMutationFn = Apollo.MutationFunction<CreateNewDoctorMutation, CreateNewDoctorMutationVariables>;

/**
 * __useCreateNewDoctorMutation__
 *
 * To run a mutation, you first call `useCreateNewDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewDoctorMutation, { data, loading, error }] = useCreateNewDoctorMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateNewDoctorMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewDoctorMutation, CreateNewDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewDoctorMutation, CreateNewDoctorMutationVariables>(CreateNewDoctorDocument, options);
      }
export type CreateNewDoctorMutationHookResult = ReturnType<typeof useCreateNewDoctorMutation>;
export type CreateNewDoctorMutationResult = Apollo.MutationResult<CreateNewDoctorMutation>;
export type CreateNewDoctorMutationOptions = Apollo.BaseMutationOptions<CreateNewDoctorMutation, CreateNewDoctorMutationVariables>;
export const CreateNewSurgerieDocument = gql`
    mutation CreateNewSurgerie($surgery: SurgeryInput!) {
  createNewSurgerie(surgery: $surgery)
}
    `;
export type CreateNewSurgerieMutationFn = Apollo.MutationFunction<CreateNewSurgerieMutation, CreateNewSurgerieMutationVariables>;

/**
 * __useCreateNewSurgerieMutation__
 *
 * To run a mutation, you first call `useCreateNewSurgerieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewSurgerieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewSurgerieMutation, { data, loading, error }] = useCreateNewSurgerieMutation({
 *   variables: {
 *      surgery: // value for 'surgery'
 *   },
 * });
 */
export function useCreateNewSurgerieMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewSurgerieMutation, CreateNewSurgerieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewSurgerieMutation, CreateNewSurgerieMutationVariables>(CreateNewSurgerieDocument, options);
      }
export type CreateNewSurgerieMutationHookResult = ReturnType<typeof useCreateNewSurgerieMutation>;
export type CreateNewSurgerieMutationResult = Apollo.MutationResult<CreateNewSurgerieMutation>;
export type CreateNewSurgerieMutationOptions = Apollo.BaseMutationOptions<CreateNewSurgerieMutation, CreateNewSurgerieMutationVariables>;
export const DeleteSurgeriesDocument = gql`
    mutation DeleteSurgeries($surgeriesId: [String!]!) {
  deleteSurgeries(surgeriesId: $surgeriesId)
}
    `;
export type DeleteSurgeriesMutationFn = Apollo.MutationFunction<DeleteSurgeriesMutation, DeleteSurgeriesMutationVariables>;

/**
 * __useDeleteSurgeriesMutation__
 *
 * To run a mutation, you first call `useDeleteSurgeriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSurgeriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSurgeriesMutation, { data, loading, error }] = useDeleteSurgeriesMutation({
 *   variables: {
 *      surgeriesId: // value for 'surgeriesId'
 *   },
 * });
 */
export function useDeleteSurgeriesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSurgeriesMutation, DeleteSurgeriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSurgeriesMutation, DeleteSurgeriesMutationVariables>(DeleteSurgeriesDocument, options);
      }
export type DeleteSurgeriesMutationHookResult = ReturnType<typeof useDeleteSurgeriesMutation>;
export type DeleteSurgeriesMutationResult = Apollo.MutationResult<DeleteSurgeriesMutation>;
export type DeleteSurgeriesMutationOptions = Apollo.BaseMutationOptions<DeleteSurgeriesMutation, DeleteSurgeriesMutationVariables>;
export const GeneratePresignedUrlCurriculumDoctorDocument = gql`
    mutation generatePresignedUrlCurriculumDoctor($fileType: String!) {
  generatePresignedUrlCurriculumDoctor(file_type: $fileType) {
    status
    key
    url
  }
}
    `;
export type GeneratePresignedUrlCurriculumDoctorMutationFn = Apollo.MutationFunction<GeneratePresignedUrlCurriculumDoctorMutation, GeneratePresignedUrlCurriculumDoctorMutationVariables>;

/**
 * __useGeneratePresignedUrlCurriculumDoctorMutation__
 *
 * To run a mutation, you first call `useGeneratePresignedUrlCurriculumDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePresignedUrlCurriculumDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePresignedUrlCurriculumDoctorMutation, { data, loading, error }] = useGeneratePresignedUrlCurriculumDoctorMutation({
 *   variables: {
 *      fileType: // value for 'fileType'
 *   },
 * });
 */
export function useGeneratePresignedUrlCurriculumDoctorMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePresignedUrlCurriculumDoctorMutation, GeneratePresignedUrlCurriculumDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePresignedUrlCurriculumDoctorMutation, GeneratePresignedUrlCurriculumDoctorMutationVariables>(GeneratePresignedUrlCurriculumDoctorDocument, options);
      }
export type GeneratePresignedUrlCurriculumDoctorMutationHookResult = ReturnType<typeof useGeneratePresignedUrlCurriculumDoctorMutation>;
export type GeneratePresignedUrlCurriculumDoctorMutationResult = Apollo.MutationResult<GeneratePresignedUrlCurriculumDoctorMutation>;
export type GeneratePresignedUrlCurriculumDoctorMutationOptions = Apollo.BaseMutationOptions<GeneratePresignedUrlCurriculumDoctorMutation, GeneratePresignedUrlCurriculumDoctorMutationVariables>;
export const GeneratePresignedUrlSurgeryImageDocument = gql`
    mutation GeneratePresignedUrlSurgeryImage($fileType: String!) {
  generatePresignedUrlSurgeryImage(file_type: $fileType) {
    status
    url
    key
  }
}
    `;
export type GeneratePresignedUrlSurgeryImageMutationFn = Apollo.MutationFunction<GeneratePresignedUrlSurgeryImageMutation, GeneratePresignedUrlSurgeryImageMutationVariables>;

/**
 * __useGeneratePresignedUrlSurgeryImageMutation__
 *
 * To run a mutation, you first call `useGeneratePresignedUrlSurgeryImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePresignedUrlSurgeryImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePresignedUrlSurgeryImageMutation, { data, loading, error }] = useGeneratePresignedUrlSurgeryImageMutation({
 *   variables: {
 *      fileType: // value for 'fileType'
 *   },
 * });
 */
export function useGeneratePresignedUrlSurgeryImageMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePresignedUrlSurgeryImageMutation, GeneratePresignedUrlSurgeryImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePresignedUrlSurgeryImageMutation, GeneratePresignedUrlSurgeryImageMutationVariables>(GeneratePresignedUrlSurgeryImageDocument, options);
      }
export type GeneratePresignedUrlSurgeryImageMutationHookResult = ReturnType<typeof useGeneratePresignedUrlSurgeryImageMutation>;
export type GeneratePresignedUrlSurgeryImageMutationResult = Apollo.MutationResult<GeneratePresignedUrlSurgeryImageMutation>;
export type GeneratePresignedUrlSurgeryImageMutationOptions = Apollo.BaseMutationOptions<GeneratePresignedUrlSurgeryImageMutation, GeneratePresignedUrlSurgeryImageMutationVariables>;
export const GeneratePresignedUrlUserImageDocument = gql`
    mutation generatePresignedUrlUserImage($fileType: String!) {
  generatePresignedUrlUserImage(file_type: $fileType) {
    status
    key
    url
  }
}
    `;
export type GeneratePresignedUrlUserImageMutationFn = Apollo.MutationFunction<GeneratePresignedUrlUserImageMutation, GeneratePresignedUrlUserImageMutationVariables>;

/**
 * __useGeneratePresignedUrlUserImageMutation__
 *
 * To run a mutation, you first call `useGeneratePresignedUrlUserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePresignedUrlUserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePresignedUrlUserImageMutation, { data, loading, error }] = useGeneratePresignedUrlUserImageMutation({
 *   variables: {
 *      fileType: // value for 'fileType'
 *   },
 * });
 */
export function useGeneratePresignedUrlUserImageMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePresignedUrlUserImageMutation, GeneratePresignedUrlUserImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePresignedUrlUserImageMutation, GeneratePresignedUrlUserImageMutationVariables>(GeneratePresignedUrlUserImageDocument, options);
      }
export type GeneratePresignedUrlUserImageMutationHookResult = ReturnType<typeof useGeneratePresignedUrlUserImageMutation>;
export type GeneratePresignedUrlUserImageMutationResult = Apollo.MutationResult<GeneratePresignedUrlUserImageMutation>;
export type GeneratePresignedUrlUserImageMutationOptions = Apollo.BaseMutationOptions<GeneratePresignedUrlUserImageMutation, GeneratePresignedUrlUserImageMutationVariables>;
export const GetAdjudicatedByIdDocument = gql`
    query GetAdjudicatedById($adjudicatedId: String!) {
  getAdjudicatedById(adjudicatedId: $adjudicatedId) {
    id
    comments
    doctor {
      id
      user {
        first_name
      }
    }
    surgery {
      name
      type
      description
      category
      amount
      status
    }
    user {
      first_name
      id
      last_name
    }
  }
}
    `;

/**
 * __useGetAdjudicatedByIdQuery__
 *
 * To run a query within a React component, call `useGetAdjudicatedByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdjudicatedByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdjudicatedByIdQuery({
 *   variables: {
 *      adjudicatedId: // value for 'adjudicatedId'
 *   },
 * });
 */
export function useGetAdjudicatedByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdjudicatedByIdQuery, GetAdjudicatedByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdjudicatedByIdQuery, GetAdjudicatedByIdQueryVariables>(GetAdjudicatedByIdDocument, options);
      }
export function useGetAdjudicatedByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdjudicatedByIdQuery, GetAdjudicatedByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdjudicatedByIdQuery, GetAdjudicatedByIdQueryVariables>(GetAdjudicatedByIdDocument, options);
        }
export type GetAdjudicatedByIdQueryHookResult = ReturnType<typeof useGetAdjudicatedByIdQuery>;
export type GetAdjudicatedByIdLazyQueryHookResult = ReturnType<typeof useGetAdjudicatedByIdLazyQuery>;
export type GetAdjudicatedByIdQueryResult = Apollo.QueryResult<GetAdjudicatedByIdQuery, GetAdjudicatedByIdQueryVariables>;
export function refetchGetAdjudicatedByIdQuery(variables: GetAdjudicatedByIdQueryVariables) {
      return { query: GetAdjudicatedByIdDocument, variables }
    }
export const GetAdjudicatedByMonthAndYearDocument = gql`
    query GetAdjudicatedByMonthAndYear($year: Float!, $month: Float!, $limit: Float, $offset: Float) {
  getAdjudicatedByMonthAndYear(
    year: $year
    month: $month
    limit: $limit
    offset: $offset
  ) {
    quotas_number
    quotas_paid
    quotas_paid
    total_price
    start_date_payment
    end_date_payment
    user {
      first_name
      last_name
    }
    surgery {
      name
    }
    locality {
      name
    }
  }
}
    `;

/**
 * __useGetAdjudicatedByMonthAndYearQuery__
 *
 * To run a query within a React component, call `useGetAdjudicatedByMonthAndYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdjudicatedByMonthAndYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdjudicatedByMonthAndYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetAdjudicatedByMonthAndYearQuery(baseOptions: Apollo.QueryHookOptions<GetAdjudicatedByMonthAndYearQuery, GetAdjudicatedByMonthAndYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdjudicatedByMonthAndYearQuery, GetAdjudicatedByMonthAndYearQueryVariables>(GetAdjudicatedByMonthAndYearDocument, options);
      }
export function useGetAdjudicatedByMonthAndYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdjudicatedByMonthAndYearQuery, GetAdjudicatedByMonthAndYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdjudicatedByMonthAndYearQuery, GetAdjudicatedByMonthAndYearQueryVariables>(GetAdjudicatedByMonthAndYearDocument, options);
        }
export type GetAdjudicatedByMonthAndYearQueryHookResult = ReturnType<typeof useGetAdjudicatedByMonthAndYearQuery>;
export type GetAdjudicatedByMonthAndYearLazyQueryHookResult = ReturnType<typeof useGetAdjudicatedByMonthAndYearLazyQuery>;
export type GetAdjudicatedByMonthAndYearQueryResult = Apollo.QueryResult<GetAdjudicatedByMonthAndYearQuery, GetAdjudicatedByMonthAndYearQueryVariables>;
export function refetchGetAdjudicatedByMonthAndYearQuery(variables: GetAdjudicatedByMonthAndYearQueryVariables) {
      return { query: GetAdjudicatedByMonthAndYearDocument, variables }
    }
export const GetAdjudicatedListDoctorDocument = gql`
    query GetAdjudicatedListDoctor {
  getAdjudicatedListDoctor {
    id
    status
    user {
      id
      first_name
      last_name
    }
    total_price
    adjudicated_status
  }
}
    `;

/**
 * __useGetAdjudicatedListDoctorQuery__
 *
 * To run a query within a React component, call `useGetAdjudicatedListDoctorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdjudicatedListDoctorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdjudicatedListDoctorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdjudicatedListDoctorQuery(baseOptions?: Apollo.QueryHookOptions<GetAdjudicatedListDoctorQuery, GetAdjudicatedListDoctorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdjudicatedListDoctorQuery, GetAdjudicatedListDoctorQueryVariables>(GetAdjudicatedListDoctorDocument, options);
      }
export function useGetAdjudicatedListDoctorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdjudicatedListDoctorQuery, GetAdjudicatedListDoctorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdjudicatedListDoctorQuery, GetAdjudicatedListDoctorQueryVariables>(GetAdjudicatedListDoctorDocument, options);
        }
export type GetAdjudicatedListDoctorQueryHookResult = ReturnType<typeof useGetAdjudicatedListDoctorQuery>;
export type GetAdjudicatedListDoctorLazyQueryHookResult = ReturnType<typeof useGetAdjudicatedListDoctorLazyQuery>;
export type GetAdjudicatedListDoctorQueryResult = Apollo.QueryResult<GetAdjudicatedListDoctorQuery, GetAdjudicatedListDoctorQueryVariables>;
export function refetchGetAdjudicatedListDoctorQuery(variables?: GetAdjudicatedListDoctorQueryVariables) {
      return { query: GetAdjudicatedListDoctorDocument, variables }
    }
export const GetAllSurgeriesWithValuesDocument = gql`
    query GetAllSurgeriesWithValues($offset: Float, $limit: Float) {
  getAllSurgeriesWithValues(offset: $offset, limit: $limit) {
    name
    description
    rating
    type
    id
    category
    amount
    status
    file_banner {
      file_link
    }
      doctors {
      id
      doctor {
        provincia
        user {
          first_name
          last_name
        }
        id
      }
    }
  }
}
    `;

/**
 * __useGetAllSurgeriesWithValuesQuery__
 *
 * To run a query within a React component, call `useGetAllSurgeriesWithValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSurgeriesWithValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSurgeriesWithValuesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetAllSurgeriesWithValuesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSurgeriesWithValuesQuery, GetAllSurgeriesWithValuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSurgeriesWithValuesQuery, GetAllSurgeriesWithValuesQueryVariables>(GetAllSurgeriesWithValuesDocument, options);
      }
export function useGetAllSurgeriesWithValuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSurgeriesWithValuesQuery, GetAllSurgeriesWithValuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSurgeriesWithValuesQuery, GetAllSurgeriesWithValuesQueryVariables>(GetAllSurgeriesWithValuesDocument, options);
        }
export type GetAllSurgeriesWithValuesQueryHookResult = ReturnType<typeof useGetAllSurgeriesWithValuesQuery>;
export type GetAllSurgeriesWithValuesLazyQueryHookResult = ReturnType<typeof useGetAllSurgeriesWithValuesLazyQuery>;
export type GetAllSurgeriesWithValuesQueryResult = Apollo.QueryResult<GetAllSurgeriesWithValuesQuery, GetAllSurgeriesWithValuesQueryVariables>;
export function refetchGetAllSurgeriesWithValuesQuery(variables?: GetAllSurgeriesWithValuesQueryVariables) {
      return { query: GetAllSurgeriesWithValuesDocument, variables }
    }
export const GetCvFileDocument = gql`
    mutation getCvFile($userId: String!) {
  getCvFile(user_id: $userId) {
    status
    cv
  }
}
    `;
export type GetCvFileMutationFn = Apollo.MutationFunction<GetCvFileMutation, GetCvFileMutationVariables>;

/**
 * __useGetCvFileMutation__
 *
 * To run a mutation, you first call `useGetCvFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetCvFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getCvFileMutation, { data, loading, error }] = useGetCvFileMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCvFileMutation(baseOptions?: Apollo.MutationHookOptions<GetCvFileMutation, GetCvFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetCvFileMutation, GetCvFileMutationVariables>(GetCvFileDocument, options);
      }
export type GetCvFileMutationHookResult = ReturnType<typeof useGetCvFileMutation>;
export type GetCvFileMutationResult = Apollo.MutationResult<GetCvFileMutation>;
export type GetCvFileMutationOptions = Apollo.BaseMutationOptions<GetCvFileMutation, GetCvFileMutationVariables>;
export const GetDoctorDocument = gql`
    query getDoctor($doctorId: String!) {
  getDoctor(doctorId: $doctorId) {
    status
    doctor {
      profession
      description
      status
      created_at
      updated_at
      user {
        first_name
        last_name
        profile_picture
        social_media {
          link
          status
          type
        }
      }
    }
    curriculum {
      file_link
    }
  }
}
    `;

/**
 * __useGetDoctorQuery__
 *
 * To run a query within a React component, call `useGetDoctorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoctorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoctorQuery({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *   },
 * });
 */
export function useGetDoctorQuery(baseOptions: Apollo.QueryHookOptions<GetDoctorQuery, GetDoctorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDoctorQuery, GetDoctorQueryVariables>(GetDoctorDocument, options);
      }
export function useGetDoctorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDoctorQuery, GetDoctorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDoctorQuery, GetDoctorQueryVariables>(GetDoctorDocument, options);
        }
export type GetDoctorQueryHookResult = ReturnType<typeof useGetDoctorQuery>;
export type GetDoctorLazyQueryHookResult = ReturnType<typeof useGetDoctorLazyQuery>;
export type GetDoctorQueryResult = Apollo.QueryResult<GetDoctorQuery, GetDoctorQueryVariables>;
export function refetchGetDoctorQuery(variables: GetDoctorQueryVariables) {
      return { query: GetDoctorDocument, variables }
    }
export const GetDoctorsFilterDocument = gql`
    query GetDoctorsFilter($offset: Int, $limit: Int) {
  getDoctorFilter(offset: $offset, limit: $limit) {
    id
    profession
    user {
      first_name
      profile_picture
      social_media {
        link
        status
        type
      }
    }
  }
}
    `;

/**
 * __useGetDoctorsFilterQuery__
 *
 * To run a query within a React component, call `useGetDoctorsFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoctorsFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoctorsFilterQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetDoctorsFilterQuery(baseOptions?: Apollo.QueryHookOptions<GetDoctorsFilterQuery, GetDoctorsFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDoctorsFilterQuery, GetDoctorsFilterQueryVariables>(GetDoctorsFilterDocument, options);
      }
export function useGetDoctorsFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDoctorsFilterQuery, GetDoctorsFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDoctorsFilterQuery, GetDoctorsFilterQueryVariables>(GetDoctorsFilterDocument, options);
        }
export type GetDoctorsFilterQueryHookResult = ReturnType<typeof useGetDoctorsFilterQuery>;
export type GetDoctorsFilterLazyQueryHookResult = ReturnType<typeof useGetDoctorsFilterLazyQuery>;
export type GetDoctorsFilterQueryResult = Apollo.QueryResult<GetDoctorsFilterQuery, GetDoctorsFilterQueryVariables>;
export function refetchGetDoctorsFilterQuery(variables?: GetDoctorsFilterQueryVariables) {
      return { query: GetDoctorsFilterDocument, variables }
    }
export const GetDoctorsByNameDocument = gql`
    query GetDoctorsByName($name: String!, $offset: Int, $limit: Int) {
  getDoctorsByName(name: $name, offset: $offset, limit: $limit) {
    profession
    id
    user {
      first_name
      last_name
      profile_picture
      social_media {
        link
        status
        type
      }
    }
  }
}
    `;

    export const GetDoctorsByStatusDocument = gql`
  query GetDoctorsByStatus($status: Status!, $limit: Int, $offset: Int) {
    getDoctorsByStatus(status: $status, limit: $limit, offset: $offset) {
      profession
      id
      user {
        first_name
        last_name
        profile_picture
        social_media {
          link
          status
          type
        }
      }
    }
  }
`;



/**
 * __useGetDoctorsByNameQuery__
 *
 * To run a query within a React component, call `useGetDoctorsByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoctorsByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoctorsByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetDoctorsByNameQuery(baseOptions: Apollo.QueryHookOptions<GetDoctorsByNameQuery, GetDoctorsByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDoctorsByNameQuery, GetDoctorsByNameQueryVariables>(GetDoctorsByNameDocument, options);
      }
export function useGetDoctorsByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDoctorsByNameQuery, GetDoctorsByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDoctorsByNameQuery, GetDoctorsByNameQueryVariables>(GetDoctorsByNameDocument, options);
        }

        export function useGetDoctorsByStatusQuery(
          baseOptions: Apollo.QueryHookOptions<GetDoctorsByStatusQuery, GetDoctorsByStatusQueryVariables>
        ) {
          const options = { ...defaultOptions, ...baseOptions };
          return Apollo.useQuery<GetDoctorsByStatusQuery, GetDoctorsByStatusQueryVariables>(
            GetDoctorsByStatusDocument,
            options
          );
        }
        
        export function useGetDoctorsByStatusLazyQuery(
          baseOptions?: Apollo.LazyQueryHookOptions<GetDoctorsByStatusQuery, GetDoctorsByStatusQueryVariables>
        ) {
          const options = { ...defaultOptions, ...baseOptions };
          return Apollo.useLazyQuery<GetDoctorsByStatusQuery, GetDoctorsByStatusQueryVariables>(
            GetDoctorsByStatusDocument,
            options
          );
        }
        
export type GetDoctorsByNameQueryHookResult = ReturnType<typeof useGetDoctorsByNameQuery>;
export type GetDoctorsByNameLazyQueryHookResult = ReturnType<typeof useGetDoctorsByNameLazyQuery>;
export type GetDoctorsByNameQueryResult = Apollo.QueryResult<GetDoctorsByNameQuery, GetDoctorsByNameQueryVariables>;
export function refetchGetDoctorsByNameQuery(variables: GetDoctorsByNameQueryVariables) {
      return { query: GetDoctorsByNameDocument, variables }
    }
export const GetMyAdjudicatedDocument = gql`
    query GetMyAdjudicated {
  getMyAdjudicated {
    id
    quotas_number
    quotas_paid
    quotas_paid
    total_price
    start_date_payment
    end_date_payment
    comments
    status
    doctor {
      id
      user {
        first_name
      }
    }
    surgery {
      name
      id
    }
    adjudicated_status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetMyAdjudicatedQuery__
 *
 * To run a query within a React component, call `useGetMyAdjudicatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAdjudicatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAdjudicatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAdjudicatedQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAdjudicatedQuery, GetMyAdjudicatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAdjudicatedQuery, GetMyAdjudicatedQueryVariables>(GetMyAdjudicatedDocument, options);
      }
export function useGetMyAdjudicatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAdjudicatedQuery, GetMyAdjudicatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAdjudicatedQuery, GetMyAdjudicatedQueryVariables>(GetMyAdjudicatedDocument, options);
        }
export type GetMyAdjudicatedQueryHookResult = ReturnType<typeof useGetMyAdjudicatedQuery>;
export type GetMyAdjudicatedLazyQueryHookResult = ReturnType<typeof useGetMyAdjudicatedLazyQuery>;
export type GetMyAdjudicatedQueryResult = Apollo.QueryResult<GetMyAdjudicatedQuery, GetMyAdjudicatedQueryVariables>;
export function refetchGetMyAdjudicatedQuery(variables?: GetMyAdjudicatedQueryVariables) {
      return { query: GetMyAdjudicatedDocument, variables }
    }
export const GetMySurgeriesDocument = gql`
    query GetMySurgeries {
  getMySurgeries {
    id
    status
    name
    type
    category
    amount
  }
}
    `;

/**
 * __useGetMySurgeriesQuery__
 *
 * To run a query within a React component, call `useGetMySurgeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySurgeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySurgeriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySurgeriesQuery(baseOptions?: Apollo.QueryHookOptions<GetMySurgeriesQuery, GetMySurgeriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMySurgeriesQuery, GetMySurgeriesQueryVariables>(GetMySurgeriesDocument, options);
      }
export function useGetMySurgeriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMySurgeriesQuery, GetMySurgeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMySurgeriesQuery, GetMySurgeriesQueryVariables>(GetMySurgeriesDocument, options);
        }
export type GetMySurgeriesQueryHookResult = ReturnType<typeof useGetMySurgeriesQuery>;
export type GetMySurgeriesLazyQueryHookResult = ReturnType<typeof useGetMySurgeriesLazyQuery>;
export type GetMySurgeriesQueryResult = Apollo.QueryResult<GetMySurgeriesQuery, GetMySurgeriesQueryVariables>;
export function refetchGetMySurgeriesQuery(variables?: GetMySurgeriesQueryVariables) {
      return { query: GetMySurgeriesDocument, variables }
    }
export const GetSurgerieByIdDocument = gql`
    query GetSurgerieById($getSurgerieByIdId: String!) {
  getSurgerieById(id: $getSurgerieByIdId) {
    id
    name
    amount
    status
    description
    type
    category
    file_banner {
      file_link
    }
  }
}
    `;

/**
 * __useGetSurgerieByIdQuery__
 *
 * To run a query within a React component, call `useGetSurgerieByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurgerieByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurgerieByIdQuery({
 *   variables: {
 *      getSurgerieByIdId: // value for 'getSurgerieByIdId'
 *   },
 * });
 */
export function useGetSurgerieByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSurgerieByIdQuery, GetSurgerieByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurgerieByIdQuery, GetSurgerieByIdQueryVariables>(GetSurgerieByIdDocument, options);
      }
export function useGetSurgerieByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurgerieByIdQuery, GetSurgerieByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurgerieByIdQuery, GetSurgerieByIdQueryVariables>(GetSurgerieByIdDocument, options);
        }
export type GetSurgerieByIdQueryHookResult = ReturnType<typeof useGetSurgerieByIdQuery>;
export type GetSurgerieByIdLazyQueryHookResult = ReturnType<typeof useGetSurgerieByIdLazyQuery>;
export type GetSurgerieByIdQueryResult = Apollo.QueryResult<GetSurgerieByIdQuery, GetSurgerieByIdQueryVariables>;
export function refetchGetSurgerieByIdQuery(variables: GetSurgerieByIdQueryVariables) {
      return { query: GetSurgerieByIdDocument, variables }
    }
export const GetUserDataDocument = gql`
    query GetUserData {
  getUserData {
    user {
      id
      email
      phone_number
      first_name
      last_name
      birth_date
      identification_document
      gender
      profile_picture
      role
      status
      last_access
      created_at
      updated_at
      deleted_at
      doctor {
        id
      }
      social_media {
        link
        type
      }
    }
  }
}
    `;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export function refetchGetUserDataQuery(variables?: GetUserDataQueryVariables) {
      return { query: GetUserDataDocument, variables }
    }
export const HandleGoogleSignInUpDocument = gql`
    mutation HandleGoogleSignInUp($token: String!) {
  handleGoogleSignInUp(token: $token)
}
    `;
export type HandleGoogleSignInUpMutationFn = Apollo.MutationFunction<HandleGoogleSignInUpMutation, HandleGoogleSignInUpMutationVariables>;

/**
 * __useHandleGoogleSignInUpMutation__
 *
 * To run a mutation, you first call `useHandleGoogleSignInUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleGoogleSignInUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleGoogleSignInUpMutation, { data, loading, error }] = useHandleGoogleSignInUpMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useHandleGoogleSignInUpMutation(baseOptions?: Apollo.MutationHookOptions<HandleGoogleSignInUpMutation, HandleGoogleSignInUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleGoogleSignInUpMutation, HandleGoogleSignInUpMutationVariables>(HandleGoogleSignInUpDocument, options);
      }
export type HandleGoogleSignInUpMutationHookResult = ReturnType<typeof useHandleGoogleSignInUpMutation>;
export type HandleGoogleSignInUpMutationResult = Apollo.MutationResult<HandleGoogleSignInUpMutation>;
export type HandleGoogleSignInUpMutationOptions = Apollo.BaseMutationOptions<HandleGoogleSignInUpMutation, HandleGoogleSignInUpMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $phoneEmail: String!) {
  login(password: $password, phone_email: $phoneEmail) {
    user {
      id
      email
      phone_number
      first_name
      last_name
      birth_date
      identification_document
      gender
      profile_picture
      role
      status
      last_access
      created_at
      updated_at
      deleted_at
      doctor {
        id
      }
      social_media {
        link
        type
      }
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      phoneEmail: // value for 'phoneEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LoginWithGoogleTokenDocument = gql`
    mutation LoginWithGoogleToken($token: String!) {
  loginWithGoogleToken(token: $token) {
    user {
      id
      email
      phone_number
      first_name
      last_name
      birth_date
      identification_document
      gender
      profile_picture
      role
      status
      last_access
      created_at
      updated_at
      deleted_at
      doctor {
        id
      }
      social_media {
        link
        type
      }
    }
    token
  }
}
    `;
export type LoginWithGoogleTokenMutationFn = Apollo.MutationFunction<LoginWithGoogleTokenMutation, LoginWithGoogleTokenMutationVariables>;

/**
 * __useLoginWithGoogleTokenMutation__
 *
 * To run a mutation, you first call `useLoginWithGoogleTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithGoogleTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithGoogleTokenMutation, { data, loading, error }] = useLoginWithGoogleTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginWithGoogleTokenMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithGoogleTokenMutation, LoginWithGoogleTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithGoogleTokenMutation, LoginWithGoogleTokenMutationVariables>(LoginWithGoogleTokenDocument, options);
      }
export type LoginWithGoogleTokenMutationHookResult = ReturnType<typeof useLoginWithGoogleTokenMutation>;
export type LoginWithGoogleTokenMutationResult = Apollo.MutationResult<LoginWithGoogleTokenMutation>;
export type LoginWithGoogleTokenMutationOptions = Apollo.BaseMutationOptions<LoginWithGoogleTokenMutation, LoginWithGoogleTokenMutationVariables>;
export const PaymentUpdateAdjudicatedDocument = gql`
    mutation PaymentUpdateAdjudicated($quotasNumber: Float!, $adjudicatedId: String!) {
  paymentUpdateAdjudicated(
    quotas_number: $quotasNumber
    adjudicatedId: $adjudicatedId
  )
}
    `;
export type PaymentUpdateAdjudicatedMutationFn = Apollo.MutationFunction<PaymentUpdateAdjudicatedMutation, PaymentUpdateAdjudicatedMutationVariables>;

/**
 * __usePaymentUpdateAdjudicatedMutation__
 *
 * To run a mutation, you first call `usePaymentUpdateAdjudicatedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentUpdateAdjudicatedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentUpdateAdjudicatedMutation, { data, loading, error }] = usePaymentUpdateAdjudicatedMutation({
 *   variables: {
 *      quotasNumber: // value for 'quotasNumber'
 *      adjudicatedId: // value for 'adjudicatedId'
 *   },
 * });
 */
export function usePaymentUpdateAdjudicatedMutation(baseOptions?: Apollo.MutationHookOptions<PaymentUpdateAdjudicatedMutation, PaymentUpdateAdjudicatedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentUpdateAdjudicatedMutation, PaymentUpdateAdjudicatedMutationVariables>(PaymentUpdateAdjudicatedDocument, options);
      }
export type PaymentUpdateAdjudicatedMutationHookResult = ReturnType<typeof usePaymentUpdateAdjudicatedMutation>;
export type PaymentUpdateAdjudicatedMutationResult = Apollo.MutationResult<PaymentUpdateAdjudicatedMutation>;
export type PaymentUpdateAdjudicatedMutationOptions = Apollo.BaseMutationOptions<PaymentUpdateAdjudicatedMutation, PaymentUpdateAdjudicatedMutationVariables>;
export const PingDocument = gql`
    query Ping {
  ping
}
    `;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
      }
export function usePingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, options);
        }
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;
export function refetchPingQuery(variables?: PingQueryVariables) {
      return { query: PingDocument, variables }
    }
export const RegisterUserDocument = gql`
    mutation RegisterUser($gender: String!, $birthDate: String!, $password: String!, $phoneEmail: String!, $lastName: String!, $firstName: String!) {
  registerUser(
    gender: $gender
    birth_date: $birthDate
    password: $password
    phone_email: $phoneEmail
    last_name: $lastName
    first_name: $firstName
  ) {
    user {
      id
      email
      phone_number
      first_name
      last_name
      birth_date
      identification_document
      gender
      profile_picture
      role
      status
      last_access
      created_at
      updated_at
      deleted_at
    }
    token
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      gender: // value for 'gender'
 *      birthDate: // value for 'birthDate'
 *      password: // value for 'password'
 *      phoneEmail: // value for 'phoneEmail'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const SaveCurriculumVitaeDataBaseDocument = gql`
    mutation saveCurriculumVitaeDataBase($curriculumLocation: String!, $curriculumKey: String!, $fileType: String!) {
  saveCurriculumVitaeDataBase(
    curriculumLocation: $curriculumLocation
    curriculumKey: $curriculumKey
    file_type: $fileType
  )
}
    `;
export type SaveCurriculumVitaeDataBaseMutationFn = Apollo.MutationFunction<SaveCurriculumVitaeDataBaseMutation, SaveCurriculumVitaeDataBaseMutationVariables>;

/**
 * __useSaveCurriculumVitaeDataBaseMutation__
 *
 * To run a mutation, you first call `useSaveCurriculumVitaeDataBaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCurriculumVitaeDataBaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCurriculumVitaeDataBaseMutation, { data, loading, error }] = useSaveCurriculumVitaeDataBaseMutation({
 *   variables: {
 *      curriculumLocation: // value for 'curriculumLocation'
 *      curriculumKey: // value for 'curriculumKey'
 *      fileType: // value for 'fileType'
 *   },
 * });
 */
export function useSaveCurriculumVitaeDataBaseMutation(baseOptions?: Apollo.MutationHookOptions<SaveCurriculumVitaeDataBaseMutation, SaveCurriculumVitaeDataBaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveCurriculumVitaeDataBaseMutation, SaveCurriculumVitaeDataBaseMutationVariables>(SaveCurriculumVitaeDataBaseDocument, options);
      }
export type SaveCurriculumVitaeDataBaseMutationHookResult = ReturnType<typeof useSaveCurriculumVitaeDataBaseMutation>;
export type SaveCurriculumVitaeDataBaseMutationResult = Apollo.MutationResult<SaveCurriculumVitaeDataBaseMutation>;
export type SaveCurriculumVitaeDataBaseMutationOptions = Apollo.BaseMutationOptions<SaveCurriculumVitaeDataBaseMutation, SaveCurriculumVitaeDataBaseMutationVariables>;
export const SaveImageUserS3Document = gql`
    mutation SaveImageUserS3($profileImageKey: String!, $profileImageLocation: String!) {
  saveImageUserS3(
    profileImageKey: $profileImageKey
    profileImageLocation: $profileImageLocation
  )
}
    `;
export type SaveImageUserS3MutationFn = Apollo.MutationFunction<SaveImageUserS3Mutation, SaveImageUserS3MutationVariables>;

/**
 * __useSaveImageUserS3Mutation__
 *
 * To run a mutation, you first call `useSaveImageUserS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveImageUserS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveImageUserS3Mutation, { data, loading, error }] = useSaveImageUserS3Mutation({
 *   variables: {
 *      profileImageKey: // value for 'profileImageKey'
 *      profileImageLocation: // value for 'profileImageLocation'
 *   },
 * });
 */
export function useSaveImageUserS3Mutation(baseOptions?: Apollo.MutationHookOptions<SaveImageUserS3Mutation, SaveImageUserS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveImageUserS3Mutation, SaveImageUserS3MutationVariables>(SaveImageUserS3Document, options);
      }
export type SaveImageUserS3MutationHookResult = ReturnType<typeof useSaveImageUserS3Mutation>;
export type SaveImageUserS3MutationResult = Apollo.MutationResult<SaveImageUserS3Mutation>;
export type SaveImageUserS3MutationOptions = Apollo.BaseMutationOptions<SaveImageUserS3Mutation, SaveImageUserS3MutationVariables>;
export const SubscribeSurgerieDocument = gql`
    mutation SubscribeSurgerie($surgerieId: String!, $phone: String!, $email: String!, $documentIdentification: String!, $lastName: String!, $firstName: String!, $coments: String) {
  subscribeSurgerie(
    surgerieId: $surgerieId
    phone: $phone
    email: $email
    document_identification: $documentIdentification
    last_name: $lastName
    first_name: $firstName
    coments: $coments
  )
}
    `;
export type SubscribeSurgerieMutationFn = Apollo.MutationFunction<SubscribeSurgerieMutation, SubscribeSurgerieMutationVariables>;

/**
 * __useSubscribeSurgerieMutation__
 *
 * To run a mutation, you first call `useSubscribeSurgerieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeSurgerieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeSurgerieMutation, { data, loading, error }] = useSubscribeSurgerieMutation({
 *   variables: {
 *      surgerieId: // value for 'surgerieId'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      documentIdentification: // value for 'documentIdentification'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *      coments: // value for 'coments'
 *   },
 * });
 */
export function useSubscribeSurgerieMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeSurgerieMutation, SubscribeSurgerieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeSurgerieMutation, SubscribeSurgerieMutationVariables>(SubscribeSurgerieDocument, options);
      }
export type SubscribeSurgerieMutationHookResult = ReturnType<typeof useSubscribeSurgerieMutation>;
export type SubscribeSurgerieMutationResult = Apollo.MutationResult<SubscribeSurgerieMutation>;
export type SubscribeSurgerieMutationOptions = Apollo.BaseMutationOptions<SubscribeSurgerieMutation, SubscribeSurgerieMutationVariables>;
export const UpdateAccountSettingsDocument = gql`
    mutation UpdateAccountSettings($birthDate: String!, $phone: String!, $email: String!, $lastName: String!, $firstName: String!) {
  updateAccountSettings(
    birth_date: $birthDate
    phone: $phone
    email: $email
    last_name: $lastName
    first_name: $firstName
  )
}
    `;
export type UpdateAccountSettingsMutationFn = Apollo.MutationFunction<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>;

/**
 * __useUpdateAccountSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAccountSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountSettingsMutation, { data, loading, error }] = useUpdateAccountSettingsMutation({
 *   variables: {
 *      birthDate: // value for 'birthDate'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *   },
 * });
 */
export function useUpdateAccountSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>(UpdateAccountSettingsDocument, options);
      }
export type UpdateAccountSettingsMutationHookResult = ReturnType<typeof useUpdateAccountSettingsMutation>;
export type UpdateAccountSettingsMutationResult = Apollo.MutationResult<UpdateAccountSettingsMutation>;
export type UpdateAccountSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>;
export const UpdateInfoDoctorDocument = gql`
    mutation UpdateInfoDoctor($description: String!, $status: String!, $profession: String!) {
  updateInfoDoctor(
    description: $description
    status: $status
    profession: $profession
  ) {
    profession
    description
    status
    updated_at
  }
}
    `;
export type UpdateInfoDoctorMutationFn = Apollo.MutationFunction<UpdateInfoDoctorMutation, UpdateInfoDoctorMutationVariables>;

/**
 * __useUpdateInfoDoctorMutation__
 *
 * To run a mutation, you first call `useUpdateInfoDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInfoDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInfoDoctorMutation, { data, loading, error }] = useUpdateInfoDoctorMutation({
 *   variables: {
 *      description: // value for 'description'
 *      status: // value for 'status'
 *      profession: // value for 'profession'
 *   },
 * });
 */
export function useUpdateInfoDoctorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInfoDoctorMutation, UpdateInfoDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInfoDoctorMutation, UpdateInfoDoctorMutationVariables>(UpdateInfoDoctorDocument, options);
      }
export type UpdateInfoDoctorMutationHookResult = ReturnType<typeof useUpdateInfoDoctorMutation>;
export type UpdateInfoDoctorMutationResult = Apollo.MutationResult<UpdateInfoDoctorMutation>;
export type UpdateInfoDoctorMutationOptions = Apollo.BaseMutationOptions<UpdateInfoDoctorMutation, UpdateInfoDoctorMutationVariables>;
export const UpdateProfileSettingsDocument = gql`
    mutation UpdateProfileSettings($socialMedia: [SocialMediaInput!]!, $gender: String!, $identificationDocument: String!) {
  updateProfileSettings(
    social_media: $socialMedia
    gender: $gender
    identification_document: $identificationDocument
  )
}
    `;
export type UpdateProfileSettingsMutationFn = Apollo.MutationFunction<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>;

/**
 * __useUpdateProfileSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateProfileSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileSettingsMutation, { data, loading, error }] = useUpdateProfileSettingsMutation({
 *   variables: {
 *      socialMedia: // value for 'socialMedia'
 *      gender: // value for 'gender'
 *      identificationDocument: // value for 'identificationDocument'
 *   },
 * });
 */
export function useUpdateProfileSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>(UpdateProfileSettingsDocument, options);
      }
export type UpdateProfileSettingsMutationHookResult = ReturnType<typeof useUpdateProfileSettingsMutation>;
export type UpdateProfileSettingsMutationResult = Apollo.MutationResult<UpdateProfileSettingsMutation>;
export type UpdateProfileSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateProfileSettingsMutation, UpdateProfileSettingsMutationVariables>;
export const UpdateSurgerieDocument = gql`
    mutation UpdateSurgerie($surgery: SurgeryInput!) {
  updateSurgerie(surgery: $surgery)
}
    `;
export type UpdateSurgerieMutationFn = Apollo.MutationFunction<UpdateSurgerieMutation, UpdateSurgerieMutationVariables>;

/**
 * __useUpdateSurgerieMutation__
 *
 * To run a mutation, you first call `useUpdateSurgerieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurgerieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSurgerieMutation, { data, loading, error }] = useUpdateSurgerieMutation({
 *   variables: {
 *      surgery: // value for 'surgery'
 *   },
 * });
 */
export function useUpdateSurgerieMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSurgerieMutation, UpdateSurgerieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSurgerieMutation, UpdateSurgerieMutationVariables>(UpdateSurgerieDocument, options);
      }
export type UpdateSurgerieMutationHookResult = ReturnType<typeof useUpdateSurgerieMutation>;
export type UpdateSurgerieMutationResult = Apollo.MutationResult<UpdateSurgerieMutation>;
export type UpdateSurgerieMutationOptions = Apollo.BaseMutationOptions<UpdateSurgerieMutation, UpdateSurgerieMutationVariables>;
export const UpdateUserProfileImageDocument = gql`
    mutation UpdateUserProfileImage($profileImage: String!) {
  updateUserProfileImage(profile_image: $profileImage) {
    status
    profile_picture
  }
}
    `;
export type UpdateUserProfileImageMutationFn = Apollo.MutationFunction<UpdateUserProfileImageMutation, UpdateUserProfileImageMutationVariables>;

/**
 * __useUpdateUserProfileImageMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileImageMutation, { data, loading, error }] = useUpdateUserProfileImageMutation({
 *   variables: {
 *      profileImage: // value for 'profileImage'
 *   },
 * });
 */
export function useUpdateUserProfileImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileImageMutation, UpdateUserProfileImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileImageMutation, UpdateUserProfileImageMutationVariables>(UpdateUserProfileImageDocument, options);
      }
export type UpdateUserProfileImageMutationHookResult = ReturnType<typeof useUpdateUserProfileImageMutation>;
export type UpdateUserProfileImageMutationResult = Apollo.MutationResult<UpdateUserProfileImageMutation>;
export type UpdateUserProfileImageMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileImageMutation, UpdateUserProfileImageMutationVariables>;
export const VerifyAdjudicatedDocument = gql`
    mutation VerifyAdjudicated($adjudicatedId: String!) {
  verifyAdjudicated(adjudicatedId: $adjudicatedId)
}
    `;
export type VerifyAdjudicatedMutationFn = Apollo.MutationFunction<VerifyAdjudicatedMutation, VerifyAdjudicatedMutationVariables>;

/**
 * __useVerifyAdjudicatedMutation__
 *
 * To run a mutation, you first call `useVerifyAdjudicatedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAdjudicatedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAdjudicatedMutation, { data, loading, error }] = useVerifyAdjudicatedMutation({
 *   variables: {
 *      adjudicatedId: // value for 'adjudicatedId'
 *   },
 * });
 */
export function useVerifyAdjudicatedMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAdjudicatedMutation, VerifyAdjudicatedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAdjudicatedMutation, VerifyAdjudicatedMutationVariables>(VerifyAdjudicatedDocument, options);
      }
export type VerifyAdjudicatedMutationHookResult = ReturnType<typeof useVerifyAdjudicatedMutation>;
export type VerifyAdjudicatedMutationResult = Apollo.MutationResult<VerifyAdjudicatedMutation>;
export type VerifyAdjudicatedMutationOptions = Apollo.BaseMutationOptions<VerifyAdjudicatedMutation, VerifyAdjudicatedMutationVariables>;