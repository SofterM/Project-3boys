// src/types/foodRecord.ts

export interface FoodEntry {
    id: number;
    meal: string;
    time: string;
    foodItems: string;
    location: string;
    companions: string;
    mood: string;
  }
  
  export interface UserInfo {
    name: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    date: string;
  }