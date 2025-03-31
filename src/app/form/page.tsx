// src/app/food-entry/page.tsx
'use client';

import { useState, useRef } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiCamera, 
  FiPlus, 
  FiMinus, 
  FiSearch,
  FiSave,
  FiList,
  FiX,
  FiInfo
} from 'react-icons/fi';
import Image from 'next/image';

// ข้อมูลจำลองของรายการอาหาร
interface FoodItem {
  id: string;
  name: string;
  category: string; // แป้ง, เนื้อสัตว์, ผัก, ผลไม้, นม, ไขมัน
  unit: string; // ทัพพี, ช้อนโต๊ะ, ช้อนชา, ถ้วยตวง, ฟอง, แก้ว
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

// ข้อมูลอาหารที่ถูกบันทึก
interface FoodEntry {
  id: string;
  foodId: string;
  quantity: number;
  mealType: string; // มื้อเช้า, มื้อกลางวัน, มื้อเย็น, มื้อว่าง
  foodName: string;
  unit: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

const mockFoodItems: FoodItem[] = [
  { id: '1', name: 'ข้าวเหนียว', category: 'แป้ง', unit: 'ทัพพี', calories: 160, carbs: 35, protein: 3, fat: 0.5 },
  { id: '2', name: 'ข้าวสวย', category: 'แป้ง', unit: 'ทัพพี', calories: 136, carbs: 30, protein: 2.5, fat: 0.3 },
  { id: '3', name: 'หมูสับ', category: 'เนื้อสัตว์', unit: 'ช้อนโต๊ะ', calories: 40, carbs: 0, protein: 6, fat: 2 },
  { id: '4', name: 'ไข่ต้ม', category: 'เนื้อสัตว์', unit: 'ฟอง', calories: 77, carbs: 0.6, protein: 6.3, fat: 5.3 },
  { id: '5', name: 'ผักคะน้า', category: 'ผัก', unit: 'ทัพพี', calories: 25, carbs: 3, protein: 2, fat: 0.2 },
  { id: '6', name: 'ส้ม', category: 'ผลไม้', unit: 'ผล', calories: 60, carbs: 15, protein: 1, fat: 0.1 },
  { id: '7', name: 'กล้วยหอม', category: 'ผลไม้', unit: 'ผล', calories: 105, carbs: 27, protein: 1.2, fat: 0.2 },
  { id: '8', name: 'นมสด', category: 'นม', unit: 'แก้ว', calories: 122, carbs: 12, protein: 8, fat: 4.8 },
  { id: '9', name: 'น้ำมันพืช', category: 'ไขมัน', unit: 'ช้อนชา', calories: 45, carbs: 0, protein: 0, fat: 5 },
  { id: '10', name: 'แอปเปิ้ล', category: 'ผลไม้', unit: 'ผล', calories: 72, carbs: 19, protein: 0.4, fat: 0.2 },
  { id: '11', name: 'เนื้อไก่', category: 'เนื้อสัตว์', unit: 'ช้อนโต๊ะ', calories: 35, carbs: 0, protein: 7, fat: 1 },
  { id: '12', name: 'ปลาทูนึ่ง', category: 'เนื้อสัตว์', unit: 'ตัว', calories: 160, carbs: 0, protein: 28, fat: 5 },
];

const FoodEntryPage = () => {
  const [date, setDate] = useState<string>(getCurrentDate());
  const [time, setTime] = useState<string>(getCurrentTime());
  const [mealType, setMealType] = useState<string>('breakfast');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  
  const beforeImageRef = useRef<HTMLInputElement>(null);
  const afterImageRef = useRef<HTMLInputElement>(null);

  // Helper functions
  function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 15);
  }

  // Handle search
  const filteredFoodItems = mockFoodItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle food selection
  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setShowAddModal(false);
  };

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleQuantityIncrement = () => {
    setQuantity(prev => prev + 0.5);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 0.5) {
      setQuantity(prev => prev - 0.5);
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'before') {
          setBeforeImage(event.target?.result as string);
        } else {
          setAfterImage(event.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add food entry
  const handleAddFoodEntry = () => {
    if (selectedFood) {
      const newEntry: FoodEntry = {
        id: generateId(),
        foodId: selectedFood.id,
        quantity: quantity,
        mealType: mealType,
        foodName: selectedFood.name,
        unit: selectedFood.unit,
        calories: Math.round(selectedFood.calories * quantity),
        carbs: Math.round(selectedFood.carbs * quantity * 10) / 10,
        protein: Math.round(selectedFood.protein * quantity * 10) / 10,
        fat: Math.round(selectedFood.fat * quantity * 10) / 10
      };

      setFoodEntries([...foodEntries, newEntry]);
      setSelectedFood(null);
      setQuantity(1);
    }
  };

  // Remove food entry
  const handleRemoveFoodEntry = (id: string) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== id));
  };

  // Calculate total nutrition
  const totalNutrition = foodEntries.reduce(
    (acc, entry) => {
      return {
        calories: acc.calories + entry.calories,
        carbs: acc.carbs + entry.carbs,
        protein: acc.protein + entry.protein,
        fat: acc.fat + entry.fat
      };
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );

  // Save all entries
  const handleSaveEntries = () => {
    // Here you would send the data to your API
    console.log('บันทึกข้อมูล:', {
      date,
      time,
      mealType,
      foodEntries,
      beforeImage,
      afterImage,
      totalNutrition
    });
    
    // Show success message and reset form
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
    
    // Reset form (in production, you might want to wait for API response)
    setFoodEntries([]);
    setBeforeImage(null);
    setAfterImage(null);
    setSelectedFood(null);
    setQuantity(1);
    setTime(getCurrentTime());
  };

  // Meal type options
  const mealTypes = [
    { value: 'breakfast', label: 'มื้อเช้า' },
    { value: 'lunch', label: 'มื้อกลางวัน' },
    { value: 'dinner', label: 'มื้อเย็น' },
    { value: 'snack', label: 'มื้อว่าง' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      {/* ลวดลายพื้นหลัง */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-green-200 to-teal-200 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-teal-200 to-green-200 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">บันทึกการรับประทานอาหาร</h1>
          <p className="mt-2 text-xl text-gray-800">บันทึกข้อมูลโภชนาการประจำวัน</p>
        </div>
        
        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg text-green-700 flex items-center">
            <FiInfo className="mr-3 flex-shrink-0 text-xl" />
            <p className="text-base">บันทึกข้อมูลโภชนาการเรียบร้อยแล้ว</p>
          </div>
        )}
        
        {/* รายละเอียดมื้ออาหาร */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-gray-100 mb-6">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">รายละเอียดมื้ออาหาร</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="date" className="block text-base font-medium text-gray-900 mb-2">
                  วันที่
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiCalendar className="text-teal-600 text-xl" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-base font-medium text-gray-900 mb-2">
                  เวลา
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiClock className="text-teal-600 text-xl" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="mealType" className="block text-base font-medium text-gray-900 mb-2">
                ประเภทมื้ออาหาร
              </label>
              <select
                id="mealType"
                name="mealType"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                required
              >
                {mealTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* ส่วนอัปโหลดรูปภาพ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">
                  รูปภาพอาหารก่อนรับประทาน
                </label>
                <div className="mt-1 flex items-center">
                  {beforeImage ? (
                    <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden">
                      <Image 
                        src={beforeImage} 
                        alt="อาหารก่อนรับประทาน" 
                        fill 
                        style={{ objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => setBeforeImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => beforeImageRef.current?.click()}
                      className="w-full h-40 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-teal-500 bg-gray-50 hover:bg-gray-100 transition duration-200"
                    >
                      <FiCamera className="text-teal-600 text-2xl mb-2" />
                      <span className="text-gray-900">เลือกรูปภาพ</span>
                    </button>
                  )}
                  <input
                    ref={beforeImageRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, 'before')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">
                  รูปภาพอาหารหลังรับประทาน
                </label>
                <div className="mt-1 flex items-center">
                  {afterImage ? (
                    <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden">
                      <Image 
                        src={afterImage} 
                        alt="อาหารหลังรับประทาน" 
                        fill 
                        style={{ objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => setAfterImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => afterImageRef.current?.click()}
                      className="w-full h-40 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-teal-500 bg-gray-50 hover:bg-gray-100 transition duration-200"
                    >
                      <FiCamera className="text-teal-600 text-2xl mb-2" />
                      <span className="text-gray-900">เลือกรูปภาพ</span>
                    </button>
                  )}
                  <input
                    ref={afterImageRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, 'after')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* ส่วนเพิ่มรายการอาหาร */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-gray-100 mb-6">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">รายการอาหาร</h2>
            
            {/* Selected Food Display */}
            {selectedFood && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <h3 className="font-medium text-lg text-gray-900 mb-2">{selectedFood.name}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">แคลอรี่</span>
                    <p className="font-bold text-teal-600">{selectedFood.calories} กิโลแคลอรี่</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">คาร์โบไฮเดรต</span>
                    <p className="font-bold text-blue-600">{selectedFood.carbs} ก.</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">โปรตีน</span>
                    <p className="font-bold text-red-600">{selectedFood.protein} ก.</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">ไขมัน</span>
                    <p className="font-bold text-yellow-600">{selectedFood.fat} ก.</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-900 mb-1">
                      จำนวน ({selectedFood.unit})
                    </label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={handleQuantityDecrement}
                        className="p-2 bg-gray-200 rounded-l-lg text-gray-700 hover:bg-gray-300"
                      >
                        <FiMinus />
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        min="0.5"
                        step="0.5"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 text-center h-10 border-y-2 border-gray-200 focus:ring-0 focus:border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={handleQuantityIncrement}
                        className="p-2 bg-gray-200 rounded-r-lg text-gray-700 hover:bg-gray-300"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFood(null)}
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="button"
                      onClick={handleAddFoodEntry}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                      เพิ่มรายการ
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Add New Food Button */}
            {!selectedFood && (
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="w-full flex items-center justify-center px-6 py-4 mb-6 border-2 border-dashed border-gray-300 text-gray-700 rounded-xl hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition duration-200"
              >
                <FiPlus className="mr-2" /> เพิ่มรายการอาหาร
              </button>
            )}
            
            {/* Food Entries List */}
            {foodEntries.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-lg text-gray-900 mb-3">รายการอาหารที่บันทึก</h3>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-900">รายการ</th>
                        <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-900">จำนวน</th>
                        <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-900">แคลอรี่</th>
                        <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-900">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {foodEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{entry.foodName}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">
                            {entry.quantity} {entry.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center">{entry.calories}</td>
                          <td className="px-4 py-3 text-sm text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveFoodEntry(entry.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiX size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Nutrition Summary */}
            {foodEntries.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <h3 className="font-medium text-lg text-gray-900 mb-3">สรุปโภชนาการ</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">แคลอรี่ทั้งหมด</span>
                    <p className="font-bold text-xl text-teal-600">{totalNutrition.calories} กิโลแคลอรี่</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">คาร์โบไฮเดรต</span>
                    <p className="font-bold text-xl text-blue-600">{totalNutrition.carbs} ก.</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">โปรตีน</span>
                    <p className="font-bold text-xl text-red-600">{totalNutrition.protein} ก.</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">ไขมัน</span>
                    <p className="font-bold text-xl text-yellow-600">{totalNutrition.fat} ก.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveEntries}
              disabled={foodEntries.length === 0}
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <FiSave className="mr-2" /> บันทึกข้อมูลโภชนาการ
            </button>
          </div>
        </div>
      </div>
      
      {/* Food Selection Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">เลือกรายการอาหาร</h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Search Box */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400 text-xl" />
                  </div>
                  <input
                    type="text"
                    placeholder="ค้นหารายการอาหาร..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>
              
              {/* Food List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredFoodItems.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">ไม่พบรายการอาหารที่ค้นหา</div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {filteredFoodItems.map((food) => (
                      <div
                        key={food.id}
                        onClick={() => handleFoodSelect(food)}
                        className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 cursor-pointer transition duration-200"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{food.name}</h4>
                          <p className="text-sm text-gray-500">
                            {food.calories} แคลอรี่ / {food.unit}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500">{food.category}</span>
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mt-1">
                            {food.carbs}C / {food.protein}P / {food.fat}F
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodEntryPage;