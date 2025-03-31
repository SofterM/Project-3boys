"use client";

import React, { useState } from 'react';
import { FoodEntry, UserInfo } from '../types/foodRecord';

const FoodRecordForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'food'>('profile');
  const [selectedPerson, setSelectedPerson] = useState<string>('all');
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    gender: '',
    age: 0,
    weight: 0,
    height: 0,
    date: '',
  });

  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([{
    id: Date.now(),
    meal: '',
    time: '',
    foodItems: '',
    location: '',
    companions: '',
    mood: ''
  }]);

  const [quickMessages, setQuickMessages] = useState<string[]>([]);

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setUserInfo({
      ...userInfo,
      [name]: type === 'number' ? (value ? parseFloat(value) : 0) : value
    });
  };

  const handleEntryChange = (index: number, field: keyof FoodEntry, value: string) => {
    const updatedEntries = [...foodEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value
    };
    setFoodEntries(updatedEntries);
  };

  const addEntry = () => {
    setFoodEntries([
      ...foodEntries,
      {
        id: Date.now(),
        meal: '',
        time: '',
        foodItems: '',
        location: '',
        companions: '',
        mood: ''
      }
    ]);
  };

  const removeEntry = (id: number) => {
    if (foodEntries.length > 1) {
      setFoodEntries(foodEntries.filter(entry => entry.id !== id));
    }
  };

  const toggleQuickMessage = (message: string) => {
    if (quickMessages.includes(message)) {
      setQuickMessages(quickMessages.filter(m => m !== message));
    } else {
      setQuickMessages([...quickMessages, message]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User Info:', userInfo);
    console.log('Food Entries:', foodEntries);
    console.log('Quick Messages:', quickMessages);
    alert('บันทึกข้อมูลสำเร็จ!');
  };

  const personOptions = [
    { id: 'all', name: 'ทั้งหมด', color: 'bg-amber-50', icon: '🌈' },
    { id: 'kelly', name: 'Kelly', color: 'bg-green-50', letter: 'K' },
    { id: 'john', name: 'John', color: 'bg-sky-100', letter: 'J' },
    { id: 'peter', name: 'Peter', color: 'bg-pink-100', letter: 'P' }
  ];

  const quickMessageOptions = [
    { id: 'free', text: 'Are you free?', icon: '👋' },
    { id: 'job', text: 'A job for you', icon: '👉' },
    { id: 'fyi', text: 'FYI', icon: '⚡' },
    { id: 'help', text: 'Can you help with this?', icon: '👍' },
    { id: 'own', text: 'Write my own', icon: '✏️' }
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === 'profile' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          ข้อมูลส่วนตัว
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium ${
            activeTab === 'food' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('food')}
        >
          บันทึกอาหาร
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-center mb-4">ข้อมูลส่วนตัว</h2>
            
            {/* Person Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ผู้ใช้งาน
              </label>
              <div className="flex justify-between space-x-2">
                {personOptions.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    className={`flex flex-col items-center justify-center ${person.color} rounded-full w-16 h-16 p-2 ${
                      selectedPerson === person.id ? 'ring-2 ring-orange-400' : ''
                    }`}
                    onClick={() => setSelectedPerson(person.id)}
                  >
                    {person.icon ? (
                      <span className="text-2xl">{person.icon}</span>
                    ) : (
                      <span className="text-2xl font-bold text-green-500">{person.letter}</span>
                    )}
                    <span className="text-xs mt-1">{person.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อ
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="name"
                type="text"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                placeholder="กรุณากรอกชื่อ"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เพศ
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="gender"
                value={userInfo.gender}
                onChange={handleUserInfoChange}
              >
                <option value="">เลือกเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  อายุ (ปี)
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="age"
                  type="number"
                  min="0"
                  value={userInfo.age || ''}
                  onChange={handleUserInfoChange}
                  placeholder="อายุ"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  วันที่บันทึก
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="date"
                  type="date"
                  value={userInfo.date}
                  onChange={handleUserInfoChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  น้ำหนัก (กก.)
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="weight"
                  type="number"
                  step="0.1"
                  min="0"
                  value={userInfo.weight || ''}
                  onChange={handleUserInfoChange}
                  placeholder="น้ำหนัก"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ส่วนสูง (ซม.)
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="height"
                  type="number"
                  step="0.1"
                  min="0"
                  value={userInfo.height || ''}
                  onChange={handleUserInfoChange}
                  placeholder="ส่วนสูง"
                />
              </div>
            </div>
          </div>
        )}

        {/* Food Entries Tab */}
        {activeTab === 'food' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">บันทึกอาหาร</h2>
              <button
                type="button"
                onClick={addEntry}
                className="bg-blue-500 text-white py-1 px-3 rounded-full text-sm flex items-center"
              >
                <span className="mr-1">+</span> เพิ่ม
              </button>
            </div>
            
            <div className="space-y-6">
              {foodEntries.map((entry, index) => (
                <div key={entry.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">มื้อที่ {index + 1}</h3>
                    {foodEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        className="text-red-500 text-sm"
                      >
                        ลบ
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        มื้อ
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={entry.meal}
                        onChange={(e) => handleEntryChange(index, 'meal', e.target.value)}
                      >
                        <option value="">เลือกมื้อ</option>
                        <option value="เช้า">เช้า</option>
                        <option value="กลางวัน">กลางวัน</option>
                        <option value="เย็น">เย็น</option>
                        <option value="ว่าง">ว่าง</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        เวลา
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="time"
                        value={entry.time}
                        onChange={(e) => handleEntryChange(index, 'time', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm text-gray-700 mb-1">
                      อาหารที่รับประทาน
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      value={entry.foodItems}
                      onChange={(e) => handleEntryChange(index, 'foodItems', e.target.value)}
                      placeholder="เช่น ข้าวผัดหมู 1 จาน, น้ำส้ม 1 แก้ว"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      สถานที่
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      value={entry.location}
                      onChange={(e) => handleEntryChange(index, 'location', e.target.value)}
                      placeholder="เช่น บ้าน, ร้านอาหาร"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Message Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ข้อความเพิ่มเติม
              </label>
              
              <div className="flex flex-wrap gap-2">
                {quickMessageOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`px-3 py-2 rounded-full text-sm flex items-center ${
                      quickMessages.includes(option.text)
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                    onClick={() => toggleQuickMessage(option.text)}
                  >
                    <span className="mr-1">{option.icon}</span> {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-full shadow-md transition-colors"
          >
            บันทึก {quickMessages.length > 0 ? `(${quickMessages.length})` : ''}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodRecordForm;