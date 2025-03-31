// src/app/page.tsx
'use client';

import Link from 'next/link';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  const pages = [
    {
      title: 'หน้าลงทะเบียน',
      path: '/register',
      description: 'สำหรับสร้างบัญชีผู้ใช้ใหม่',
      status: 'เสร็จสิ้น',
      statusColor: 'bg-green-50 text-green-700 border-green-500',
    },
    {
      title: 'หน้าเข้าสู่ระบบ',
      path: '/login',
      description: 'สำหรับเข้าสู่ระบบผู้ใช้',
      status: 'เสร็จสิ้น',
      statusColor: 'bg-green-50 text-green-700 border-green-500',
    },
    {
      title: 'หน้าแบบฟอร์ม',
      path: '/form',
      description: 'สำหรับบันทึกข้อมูลโภชนาการ',
      status: 'กำลังพัฒนา',
      statusColor: 'bg-yellow-50 text-yellow-700 border-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* ลวดลายพื้นหลัง */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-green-200 to-teal-200 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-teal-200 to-green-200 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ระบบบันทึกโภชนาการ</h1>
          <p className="text-xl text-gray-800">รายงานความคืบหน้าการพัฒนา</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div
              key={page.path}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-lg transition duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{page.title}</h2>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${page.statusColor} border-l-4`}
                >
                  {page.status}
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{page.description}</p>
              
              <Link
                href={page.path}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-base font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
              >
                ดูหน้าเพจ
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiCheckCircle className="text-green-500 text-2xl mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">สถานะโดยรวม</h3>
                <p className="text-gray-600">พัฒนาเสร็จแล้ว 2/3 หน้า (66.67%)</p>
              </div>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2.5 rounded-full"
                style={{ width: '66.67%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;