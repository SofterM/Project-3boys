// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiActivity, FiCalendar, FiArrowRight, FiArrowLeft, FiTarget, FiShield } from 'react-icons/fi';

const RegisterPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // ข้อมูลส่วนตัว
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // ข้อมูลร่างกาย
    gender: '',
    birthDate: '',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    
    // ข้อมูลเพิ่มเติม
    goal: '',
    foodAllergies: '',
    dietaryPreferences: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        dietaryPreferences: [...formData.dietaryPreferences, name]
      });
    } else {
      setFormData({
        ...formData,
        dietaryPreferences: formData.dietaryPreferences.filter(item => item !== name)
      });
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ข้อมูลที่ส่ง:', formData);
    // ในอนาคตจะส่งข้อมูลไปยัง API
    
    // จำลองการลงทะเบียนสำเร็จ
    router.push('/form');
  };

  // ตัวเลือกระดับกิจกรรมทางกาย
  const activityOptions = [
    { value: 'sedentary', label: 'นั่งทำงานเป็นส่วนใหญ่ ไม่ค่อยได้ออกกำลังกาย' },
    { value: 'light', label: 'ออกกำลังกายเบาๆ (1-2 วัน/สัปดาห์)' },
    { value: 'moderate', label: 'ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์)' },
    { value: 'active', label: 'ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)' },
    { value: 'very_active', label: 'ออกกำลังกายหนักมาก (ฝึกซ้อมเป็นประจำ)' }
  ];

  // ตัวเลือกเป้าหมาย
  const goalOptions = [
    { value: 'weight_loss', label: 'ลดน้ำหนัก' },
    { value: 'maintain', label: 'รักษาน้ำหนัก' },
    { value: 'weight_gain', label: 'เพิ่มน้ำหนัก' },
    { value: 'muscle_gain', label: 'เพิ่มกล้ามเนื้อ' },
    { value: 'health', label: 'สุขภาพดีขึ้น' }
  ];

  // ตัวเลือกความชอบอาหาร
  const dietaryPreferenceOptions = [
    { value: 'vegetarian', label: 'มังสวิรัติ' },
    { value: 'vegan', label: 'วีแกน' },
    { value: 'pescatarian', label: 'ทานเนื้อปลา ไม่ทานเนื้อสัตว์อื่น' },
    { value: 'low_carb', label: 'ลดคาร์โบไฮเดรต' },
    { value: 'keto', label: 'คีโตเจนิค' },
    { value: 'paleo', label: 'พาลีโอ' },
    { value: 'gluten_free', label: 'ปลอดกลูเตน' },
    { value: 'dairy_free', label: 'ไม่ทานผลิตภัณฑ์นม' }
  ];

  // แสดงความคืบหน้าการกรอกข้อมูล
  const renderProgress = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`relative flex flex-col items-center ${currentStep >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`rounded-full transition duration-300 ease-in-out h-16 w-16 flex items-center justify-center ${
              currentStep >= 1 ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200'
            }`}>
              <FiUser size={24} className={currentStep >= 1 ? 'text-white' : ''} />
            </div>
            <div className="text-base font-semibold mt-2">ข้อมูลบัญชี</div>
          </div>
          
          <div className={`grow border-t-2 transition duration-300 ease-in-out mt-8 ${currentStep >= 2 ? 'border-teal-500' : 'border-gray-200'}`} />
          
          <div className={`relative flex flex-col items-center ${currentStep >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`rounded-full transition duration-300 ease-in-out h-16 w-16 flex items-center justify-center ${
              currentStep >= 2 ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200'
            }`}>
              <FiActivity size={24} className={currentStep >= 2 ? 'text-white' : ''} />
            </div>
            <div className="text-base font-semibold mt-2">ข้อมูลร่างกาย</div>
          </div>
          
          <div className={`grow border-t-2 transition duration-300 ease-in-out mt-8 ${currentStep >= 3 ? 'border-teal-500' : 'border-gray-200'}`} />
          
          <div className={`relative flex flex-col items-center ${currentStep >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`rounded-full transition duration-300 ease-in-out h-16 w-16 flex items-center justify-center ${
              currentStep >= 3 ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200'
            }`}>
              <FiTarget size={24} className={currentStep >= 3 ? 'text-white' : ''} />
            </div>
            <div className="text-base font-semibold mt-2">เป้าหมาย</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      {/* ลวดลายพื้นหลัง */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-green-200 to-teal-200 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-teal-200 to-green-200 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ระบบบันทึกโภชนาการ</h1>
          <p className="text-xl text-gray-800">สมัครสมาชิกเพื่อเริ่มต้นติดตามการทานอาหารและสุขภาพของคุณ</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-gray-100">
          <div className="px-8 py-10">
            {renderProgress()}
            
            <form onSubmit={handleSubmit}>
              {/* ขั้นตอนที่ 1: ข้อมูลบัญชี */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiUser className="mr-3 text-teal-600" /> ข้อมูลบัญชีผู้ใช้
                  </h2>
                  
                  <div>
                    <label htmlFor="fullName" className="block text-base font-medium text-gray-900 mb-2">
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiUser className="text-teal-600 text-xl" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        placeholder="ชื่อ นามสกุล"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-2">
                      อีเมล <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiMail className="text-teal-600 text-xl" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-base font-medium text-gray-900 mb-2">
                      รหัสผ่าน <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiLock className="text-teal-600 text-xl" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
                        minLength={8}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-900 mb-2">
                      ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiLock className="text-teal-600 text-xl" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        placeholder="ยืนยันรหัสผ่าน"
                        required
                      />
                    </div>
                    {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <FiShield className="mr-2" /> รหัสผ่านไม่ตรงกัน
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.fullName || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
                      className="flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      ถัดไป <FiArrowRight className="ml-2 text-xl" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* ขั้นตอนที่ 2: ข้อมูลร่างกาย */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiActivity className="mr-3 text-teal-600" /> ข้อมูลร่างกาย
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="gender" className="block text-base font-medium text-gray-900 mb-2">
                        เพศ <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        required
                      >
                        <option value="">เลือกเพศ</option>
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="birthDate" className="block text-base font-medium text-gray-900 mb-2">
                        วันเกิด <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="height" className="block text-base font-medium text-gray-900 mb-2">
                        ส่วนสูง (ซม.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        min="100"
                        max="220"
                        className="block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        placeholder="เช่น 165"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="weight" className="block text-base font-medium text-gray-900 mb-2">
                        น้ำหนัก (กก.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        min="30"
                        max="200"
                        step="0.1"
                        className="block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                        placeholder="เช่น 65.5"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="activityLevel" className="block text-base font-medium text-gray-900 mb-2">
                      ระดับกิจกรรมทางกาย <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="activityLevel"
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                      required
                    >
                      {activityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-8 py-4 border-2 border-gray-300 text-gray-800 text-lg font-medium rounded-xl shadow-sm hover:bg-gray-50 hover:shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <FiArrowLeft className="mr-2 text-xl" /> ย้อนกลับ
                    </button>
                    
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.gender || !formData.birthDate || !formData.height || !formData.weight}
                      className="flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      ถัดไป <FiArrowRight className="ml-2 text-xl" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* ขั้นตอนที่ 3: เป้าหมายและความชอบ */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiTarget className="mr-3 text-teal-600" /> เป้าหมายและความชอบ
                  </h2>
                  
                  <div>
                    <label htmlFor="goal" className="block text-base font-medium text-gray-900 mb-2">
                      เป้าหมายของคุณ <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                      required
                    >
                      <option value="">เลือกเป้าหมาย</option>
                      {goalOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="foodAllergies" className="block text-base font-medium text-gray-900 mb-2">
                      อาหารที่แพ้ (ถ้ามี)
                    </label>
                    <textarea
                      id="foodAllergies"
                      name="foodAllergies"
                      value={formData.foodAllergies}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                      placeholder="ระบุอาหารที่คุณแพ้ เช่น ถั่ว กุ้ง นม ไข่"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">
                      ความชอบในการรับประทานอาหาร (เลือกได้หลายข้อ)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mt-2 p-6 bg-gray-50 rounded-xl border border-gray-100">
                      {dietaryPreferenceOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={option.value}
                            name={option.value}
                            type="checkbox"
                            checked={formData.dietaryPreferences.includes(option.value)}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded transition duration-200"
                          />
                          <label htmlFor={option.value} className="ml-3 block text-base text-gray-900">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-8 py-4 border-2 border-gray-300 text-gray-800 text-lg font-medium rounded-xl shadow-sm hover:bg-gray-50 hover:shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <FiArrowLeft className="mr-2 text-xl" /> ย้อนกลับ
                    </button>
                    
                    <button
                      type="submit"
                      disabled={!formData.goal}
                      className="flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      ลงทะเบียน
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
          
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-base text-gray-800 text-center">
              มีบัญชีอยู่แล้ว? <Link href="/login" className="font-semibold text-teal-600 hover:text-teal-500 transition duration-200">เข้าสู่ระบบ</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;