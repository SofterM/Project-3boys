// src/types/index.ts
export interface FoodRecordEntry {
    meal: string;
    time: string;
    foodItems: string;
    ingredients: string;
    quantity: string;
    location: string;
    companions: string;
    activity: string;
    mood: string;
  }
  
  export interface FoodRecord {
    name: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    date: string;
    isWeekday: boolean;
    entries: FoodRecordEntry[];
  }