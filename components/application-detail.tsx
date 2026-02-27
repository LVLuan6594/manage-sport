"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Application } from "../lib/types";
import { useApplication } from "../hooks/useApi";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "./ui/toast";

export default function ApplicationDetail() {
  const params = useParams();
  const idRaw = params.id;
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
  const router = useRouter();

  const { application, loading, error, notFound } = useApplication(id || undefined);
  const [appData, setAppData] = useState<Application | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  
  // keep local copy so we can update status
  useEffect(() => {
    if (application) setAppData(application);
  }, [application]);

  const handleBack = () => {
    router.push("/dashboard/applications");
  };

  const { toast } = useToast();

  const handleApprove = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setActionMessage('Hồ sơ đã được duyệt');
      setAppData(updated as Application);
    } catch (e: any) {
      setActionMessage('Không thể thay đổi trạng thái.');
    }
  };

  const handleCancelApprove = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'pending' }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setActionMessage('Đã hủy duyệt hồ sơ');
      setAppData(updated as Application);
    } catch (e: any) {
      setActionMessage('Không thể thay đổi trạng thái.');
    }
  };

  const confirmAction = (message: string, callback: () => void) => {
    const t = toast({
      title: message,
      action: (
        <ToastAction
          altText="Xác nhận hành động"
          onClick={() => {
            callback();
            t.dismiss();
          }}
        >
          Xác nhận
        </ToastAction>
      ),
    });
  };

  const handleReject = async () => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setActionMessage('Hồ sơ đã bị từ chối');
      setAppData(updated as Application);
    } catch (e: any) {
      setActionMessage('Không thể thay đổi trạng thái.');
    }
  };

  if (loading) {
    return <p className="p-8 text-center">Đang tải...</p>;
  }
  if (notFound) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Không tìm thấy hồ sơ với ID {id}</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }
  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>;
  }

  if (!appData) {
    return <p className="p-8 text-center">Không có dữ liệu hồ sơ.</p>;
  }

  const app = appData as Application;
  const avatarUrl = app?.avatarData
    ? app.avatarData
    : "https://via.placeholder.com/200?text=Avatar+Mờ+đị+nh";

  return (
    <div className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex items-center gap-6">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-48 h-48 object-cover rounded-lg border-2 border-blue-200"
          />
          <div>
            <h2 className="text-2xl font-bold">{app.fullName}</h2>
            <p className="text-sm text-gray-600">ID: {app.id}</p>
            <p className="text-sm text-gray-600">
              Ngày nộp: {new Date(app.createdAt).toLocaleString()}
            </p>
            <p className="mt-1">
              Trạng thái: 
              <span className={`font-semibold ${app.status === 'approved' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                {app.status === 'approved'
                  ? 'Đã duyệt'
                  : app.status === 'rejected'
                  ? 'Đã từ chối'
                  : 'Chưa duyệt'}
              </span>
            </p>
          </div>
        </div>

        {actionMessage && (
          <div className="text-green-700 bg-green-50 p-4 rounded border border-green-200">
            {actionMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section>
            <h3 className="font-semibold text-blue-900 mb-2">Thông tin cá nhân</h3>
            <dl className="space-y-2 text-sm text-gray-800">
              <div>
                <dt className="font-medium">Ngày sinh</dt>
                <dd>{app.dob || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Giới tính</dt>
                <dd>{app.gender || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">CCCD/CMND</dt>
                <dd>{app.idNumber || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Địa chỉ</dt>
                <dd>{app.address || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Số điện thoại</dt>
                <dd>{app.phone || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Email</dt>
                <dd>{app.email || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Trường/Đơn vị</dt>
                <dd>{app.school || '-'}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="font-semibold text-blue-900 mb-2">Thông tin tuyển sinh</h3>
            <dl className="space-y-2 text-sm text-gray-800">
              <div>
                <dt className="font-medium">Bộ môn</dt>
                <dd>{app.sport || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Hình thức đăng ký</dt>
                <dd>{app.registerType || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Thời gian mong muốn</dt>
                <dd>{app.trainingTime || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Chiều cao</dt>
                <dd>{app.height || '-'} cm</dd>
              </div>
              <div>
                <dt className="font-medium">Cân nặng</dt>
                <dd>{app.weight || '-'} kg</dd>
              </div>
            </dl>

            <h3 className="font-semibold text-blue-900 mt-4 mb-2">Mô tả bổ sung</h3>
            <dl className="space-y-2 text-sm text-gray-800">
              <div>
                <dt className="font-medium">Thành tích</dt>
                <dd>{app.achievements || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Kinh nghiệm</dt>
                <dd>{app.experience || '-'}</dd>
              </div>
              <div>
                <dt className="font-medium">Năng khiếu</dt>
                <dd>{app.talent || '-'}</dd>
              </div>
            </dl>

            <h3 className="font-semibold text-blue-900 mt-4 mb-2">Hồ sơ đính kèm</h3>
            <ul className="text-sm text-gray-800 space-y-1">
              <li>
                Avatar: {app.avatarName || 'Không có'}
              </li>
              <li>
                Giấy khám sức khỏe: {app.healthDocName || 'Không có'}
              </li>
              <li>
                CCCD/giấy khai sinh: {app.idDocName || 'Không có'}
              </li>
              <li>
                Giấy xác nhận: {app.confirmDocName || 'Không có'}
              </li>
            </ul>
          </section>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Quay lại danh sách
          </button>
          {app?.status === 'approved' ? (
            <button
              onClick={() => confirmAction('Bạn có chắc muốn hủy duyệt hồ sơ?', handleCancelApprove)}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Hủy duyệt
            </button>
          ) : (
            <button
              onClick={() => confirmAction('Bạn có chắc muốn duyệt hồ sơ?', handleApprove)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Duyệt hồ sơ
            </button>
          )}
          <button
            onClick={() => confirmAction('Bạn có chắc muốn từ chối hồ sơ?', handleReject)}
            disabled={app?.status === 'rejected'}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            Từ chối hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}
