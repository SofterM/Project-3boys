// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const LoginPage = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ตรวจสอบพารามิเตอร์ URL ด้วย JavaScript แทนการใช้ useSearchParams
  useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const registered = urlParams.get('registered');
      if (registered === 'true') {
        setSuccess('ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบด้วยข้อมูลที่ลงทะเบียนไว้');
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    
    try {
      setLoading(true);
      // จำลองการเรียก API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('ข้อมูลการเข้าสู่ระบบ:', formData);
      
      // นำทางไปยังหน้า dashboard หลังจากเข้าสู่ระบบสำเร็จ
      router.push('/dashboard');
    } catch (err) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      {/* องค์ประกอบพื้นหลัง */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-green-200 to-teal-200 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-teal-200 to-green-200 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ระบบบันทึกโภชนาการ</h1>
          <p className="text-xl text-gray-800">เข้าสู่ระบบเพื่อจัดการข้อมูลโภชนาการของคุณ</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg text-green-700 flex items-center">
                <FiCheckCircle className="mr-3 flex-shrink-0 text-xl" />
                <p className="text-base">{success}</p>
              </div>
            )}
            
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-red-700 flex items-center">
                <FiAlertCircle className="mr-3 flex-shrink-0 text-xl" />
                <p className="text-base">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-12 block w-full h-14 text-base rounded-xl border-2 border-gray-200 shadow-sm text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="รหัสผ่าน"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-3 block text-base text-gray-900">
                    จดจำฉัน
                  </label>
                </div>
                
                <div>
                  <Link href="/forgot-password" className="text-base font-medium text-teal-600 hover:text-teal-500">
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-base text-gray-800 text-center">
              ยังไม่มีบัญชี? <Link href="/register" className="font-semibold text-teal-600 hover:text-teal-500">ลงทะเบียน</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;