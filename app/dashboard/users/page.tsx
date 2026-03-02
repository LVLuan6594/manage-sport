"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AthleteAccount {
  id: number;
  name: string;
  sport: string;
  username: string;
  email?: string;
}

interface CoachAccount {
  id: string;
  name: string;
  specialty: string;
  username: string;
  email?: string;
}

export default function UsersPage() {
  const [athletes, setAthletes] = useState<AthleteAccount[]>([]);
  const [coaches, setCoaches] = useState<CoachAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { resetPassword, user: currentUser } = useAuth();

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <main className="flex-1 p-8">
        <p className="text-red-600 font-semibold">Không có quyền truy cập</p>
      </main>
    )
  }

  useEffect(() => {
    async function load() {
      try {
        const [aRes, cRes] = await Promise.all([
          fetch("/api/athletes"),
          fetch("/api/coaches"),
        ]);
        if (aRes.ok) {
          const data = await aRes.json();
          // map to account shape if necessary
          setAthletes(
            data.map((a: any) => ({
              id: a.id,
              name: a.fullName || a.name,
              sport: a.sport || "",
              username: a.username || a.phone || "",
              email: a.email || "",
            }))
          );
        }
        if (cRes.ok) {
          const data = await cRes.json();
          setCoaches(
            data.map((c: any) => ({
              id: c.id,
              name: c.name,
              specialty: c.specialty,
              username: c.username || c.name,
              email: c.email || "",
            }))
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleReset = (username: string) => {
    if (!currentUser || currentUser.role !== 'admin') {
      alert('Chỉ admin mới có quyền này')
      return
    }
    const newPass = resetPassword(username)
    if (newPass) {
      alert(`Mật khẩu mới cho ${username}: ${newPass}`)
    } else {
      alert('Không tìm thấy tài khoản')
    }
  }

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Quản Lý Tài Khoản Người Dùng</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tài khoản Vận Động Viên</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Môn</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              )}
              {!loading && athletes.map((a) => (
                <TableRow key={a.id} className="hover:bg-blue-50">
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{a.name?.[0] || 'A'}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.username}</TableCell>
                  <TableCell>{a.email || '-'}</TableCell>
                  <TableCell>{a.sport}</TableCell>
                  <TableCell className="text-gray-500">N/A</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tài khoản Huấn Luyện Viên</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Chuyên ngành</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading && coaches.map((c) => (
                <TableRow key={c.id} className="hover:bg-blue-50">
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{c.name?.[0] || 'C'}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.username}</TableCell>
                  <TableCell>{c.email || '-'}</TableCell>
                  <TableCell>{c.specialty}</TableCell>
                  <TableCell>
                    <button
                      className="text-sm text-blue-700 hover:underline"
                      onClick={() => handleReset(c.username)}
                    >
                      Cấp lại mật khẩu
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
