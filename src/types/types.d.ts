export interface JobListing {
  id: number;
  createdAt: Date;
  description: string;
  title: string;
  address: string;
  zipcode: number;
  organization: string;
  city: string;
  workHome: string;
  regionId: number;
  userId: number;
  jobCategoryId: number;
  workTypeId: number;
  region: JobCategory;
  workType: WorkType;
  jobCategory: JobCategory;
}

export interface JobCategory {
  id: number;
  name: string;
}

export interface WorkType {
  id: number;
  type: string;
}

export interface Fav {
  id: number;
  userId: number;
  jobListingId: number;
  jobListing: JobListing;
}

export interface JobListing {
  id: number;
  createdAt: Date;
  description: string;
  title: string;
  address: string;
  zipcode: number;
  organization: string;
  city: string;
  workHome: string;
  regionId: number;
  userId: number;
  jobCategoryId: number;
  workTypeId: number;
  region: JobCategory;
  workType: WorkType;
  jobCategory: JobCategory;
}

export interface JobCategory {
  id: number;
  name: string;
}

export interface WorkType {
  id: number;
  type: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryByID {
    id:          number;
    name:        string;
    jobListings: JobListing[];
}

export interface JobListing {
    id:            number;
    createdAt:     Date;
    description:   string;
    title:         string;
    address:       string;
    zipcode:       number;
    organization:  string;
    city:          string;
    workHome:      WorkHome;
    regionId:      number;
    userId:        number;
    jobCategoryId: number;
    workTypeId:    number;
    region:        JobCategory;
    workType:      WorkType;
    jobCategory:   JobCategory;
}

export interface JobCategory {
    id:   number;
    name: string;
}

export enum WorkHome {
    Hybrid = "Hybrid",
    OnSite = "On-site",
    Remote = "Remote",
}

export interface WorkType {
    id:   number;
    type: Type;
}

export enum Type {
    Deltid = "Deltid",
    Flex = "Flex",
}

export interface Article {
    id:        number;
    createdAt: Date;
    title:     string;
    content:   string;
    author:    string;
    imageUrl:  string;
}

export interface NewsletterSub {
    id:    number;
    email: string;
}

export interface Testimony {
    id:      number;
    name:    string;
    title:   string;
    content: string;
}

export interface Region {
    id:   number;
    name: string;
}

export interface User {
    id:           number;
    firstname:    string;
    lastname:     string;
    password:     string;
    email:        string;
    phone:        number;
    address:      string;
    city:         string;
    zipcode:      number;
    refreshToken: string;
}
