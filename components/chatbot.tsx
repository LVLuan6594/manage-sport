'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
}

const athletesDatabase = [
  { name: 'John Smith', sport: 'Basketball', performance: 92, qualified: true, joinMonth: 'Tháng 1', joinYear: 2024, medals: { gold: 2, silver: 1, bronze: 0 }, injuried: false, potential: true },
  { name: 'Sarah Johnson', sport: 'Swimming', performance: 88, qualified: true, joinMonth: 'Tháng 3', joinYear: 2024, medals: { gold: 1, silver: 2, bronze: 1 }, injuried: false, potential: true },
  { name: 'Mike Davis', sport: 'Track & Field', performance: 95, qualified: true, joinMonth: 'Tháng 2', joinYear: 2024, medals: { gold: 3, silver: 1, bronze: 0 }, injuried: false, potential: true },
  { name: 'Emma Wilson', sport: 'Volleyball', performance: 75, qualified: false, joinMonth: 'Tháng 11', joinYear: 2023, medals: { gold: 0, silver: 1, bronze: 1 }, injuried: true, potential: false },
  { name: 'Alex Brown', sport: 'Tennis', performance: 91, qualified: true, joinMonth: 'Tháng 1', joinYear: 2024, medals: { gold: 2, silver: 0, bronze: 1 }, injuried: false, potential: true },
  { name: 'Lisa Anderson', sport: 'Gymnastics', performance: 87, qualified: true, joinMonth: 'Tháng 12', joinYear: 2023, medals: { gold: 1, silver: 2, bronze: 0 }, injuried: false, potential: true },
  { name: 'David Chen', sport: 'Basketball', performance: 89, qualified: true, joinMonth: 'Tháng 3', joinYear: 2024, medals: { gold: 1, silver: 1, bronze: 1 }, injuried: false, potential: true },
  { name: 'Jennifer Lee', sport: 'Swimming', performance: 86, qualified: false, joinMonth: 'Tháng 4', joinYear: 2024, medals: { gold: 0, silver: 0, bronze: 2 }, injuried: true, potential: false },
  { name: 'Robert Taylor', sport: 'Track & Field', performance: 90, qualified: true, joinMonth: 'Tháng 5', joinYear: 2024, medals: { gold: 2, silver: 1, bronze: 1 }, injuried: false, potential: true },
]

const coachesDatabase = [
  { name: 'Mike Thompson', specialty: 'Basketball', experience: 15, athletesManaged: 4, efficiency: 92 },
  { name: 'Lisa Chen', specialty: 'Swimming', experience: 12, athletesManaged: 3, efficiency: 88 },
  { name: 'Tom Rodriguez', specialty: 'Track & Field', experience: 18, athletesManaged: 3, efficiency: 95 },
  { name: 'Anna Martinez', specialty: 'Volleyball', experience: 10, athletesManaged: 2, efficiency: 75 },
  { name: 'John Wilson', specialty: 'Tennis', experience: 14, athletesManaged: 2, efficiency: 91 },
]

const sportsDatabase = [
  { name: 'Basketball', athleteCount: 2, achievements: 'Huy chương vàng tại giải vô địch khu vực' },
  { name: 'Swimming', athleteCount: 2, achievements: 'Lập kỷ lục quốc gia' },
  { name: 'Track & Field', athleteCount: 2, achievements: 'Huy chương vàng tại giải quốc gia' },
  { name: 'Volleyball', athleteCount: 1, achievements: 'Đạt huy chương bạc' },
  { name: 'Tennis', athleteCount: 1, achievements: 'Đạt huy chương vàng đôi nam' },
  { name: 'Gymnastics', athleteCount: 1, achievements: 'Huy chương tại giải khu vực' },
]

const trainingPrograms = [
  { name: 'Strength & Conditioning', duration: '12 weeks', level: 'All Levels' },
  { name: 'Speed Training', duration: '8 weeks', level: 'Intermediate' },
  { name: 'Endurance Building', duration: '16 weeks', level: 'Advanced' },
  { name: 'Basketball Skills', duration: '10 weeks', level: 'Beginner' },
  { name: 'Swimming Techniques', duration: '14 weeks', level: 'All Levels' },
]

function generateResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  // 1. Số lượng vận động viên hiện tại
  if ((lowerInput.includes('số lượng vận động viên') || lowerInput.includes('so luong van dong vien')) && (lowerInput.includes('bao nhiêu') || lowerInput.includes('hiện tại'))) {
    return `Số lượng vận động viên hiện tại của Trung tâm là ${athletesDatabase.length} vận động viên, được cập nhật theo dữ liệu mới nhất trên hệ thống.`
  }

  if ((lowerInput.includes('vận động viên') || lowerInput.includes('van dong vien')) && (lowerInput.includes('bao nhiêu') || lowerInput.includes('co bao nhieu'))) {
    return `Số lượng vận động viên hiện tại của Trung tâm là ${athletesDatabase.length} vận động viên, được cập nhật theo dữ liệu mới nhất trên hệ thống.`
  }

  // 2. Số lượng huấn luyện viên
  if ((lowerInput.includes('số lượng huấn luyện viên') || lowerInput.includes('so luong huan luyen vien')) && (lowerInput.includes('bao nhiêu') || lowerInput.includes('hiện tại'))) {
    return `Hiện tại Trung tâm đang quản lý ${coachesDatabase.length} huấn luyện viên thuộc các bộ môn khác nhau.`
  }

  if ((lowerInput.includes('huấn luyện viên') || lowerInput.includes('huan luyen vien')) && (lowerInput.includes('bao nhiêu') || lowerInput.includes('co bao nhieu'))) {
    return `Hiện tại Trung tâm đang quản lý ${coachesDatabase.length} huấn luyện viên thuộc các bộ môn khác nhau.`
  }

  // 3. Số bộ môn thể thao
  if ((lowerInput.includes('bộ môn') || lowerInput.includes('bo mon')) && (lowerInput.includes('bao nhiêu') || lowerInput.includes('có bao'))) {
    return `Trung tâm hiện đang đào tạo và huấn luyện ${sportsDatabase.length} bộ môn thể thao.`
  }

  if ((lowerInput.includes('tốt nhất') || lowerInput.includes('tot nhat')) && (lowerInput.includes('vận động viên') || lowerInput.includes('van dong vien') || lowerInput.includes('hiệu suất'))) {
    const best = athletesDatabase.reduce((a, b) => (a.performance > b.performance ? a : b))
    return `Vận động viên có hiệu suất tốt nhất là ${best.name} từ môn ${best.sport} với điểm hiệu suất ${best.performance}%.`
  }

  if ((lowerInput.includes('danh sách') || lowerInput.includes('danh sach')) && (lowerInput.includes('vận động viên') || lowerInput.includes('van dong vien'))) {
    const list = athletesDatabase.map((a) => `${a.name} (${a.sport})`).join(', ')
    return `Đây là tất cả vận động viên của chúng ta: ${list}`
  }

  // Coaches queries
  if ((lowerInput.includes('huấn luyện viên') || lowerInput.includes('huan luyen vien')) && (lowerInput.includes('bao nhiêu') || lowerInput.includes('co bao nhieu'))) {
    return `Chúng ta có ${coachesDatabase.length} huấn luyện viên giàu kinh nghiệm. Họ chuyên gia trong các môn thể thao khác nhau và có nhiều năm kinh nghiệm chuyên nghiệp.`
  }

  if ((lowerInput.includes('huấn luyện viên') || lowerInput.includes('huan luyen vien')) && (lowerInput.includes('danh sách') || lowerInput.includes('danh sach') || lowerInput.includes('tất cả') || lowerInput.includes('tat ca'))) {
    const list = coachesDatabase.map((c) => `${c.name} (${c.specialty})`).join(', ')
    return `Đội ngũ huấn luyện viên của chúng ta bao gồm: ${list}`
  }

  if (lowerInput.includes('kinh nghiệm') || lowerInput.includes('kinh nghiem')) {
    const avgExp = (coachesDatabase.reduce((sum, c) => sum + c.experience, 0) / coachesDatabase.length).toFixed(1)
    return `Các huấn luyện viên của chúng ta có trung bình ${avgExp} năm kinh nghiệm trong các môn thể thao tương ứng của họ.`
  }

  // Programs queries
  if ((lowerInput.includes('chương trình') || lowerInput.includes('chuong trinh')) && (lowerInput.includes('có sẵn') || lowerInput.includes('co san'))) {
    const programs = trainingPrograms.map((p) => `${p.name} (${p.duration})`).join(', ')
    return `Chúng ta cung cấp các chương trình huấn luyện sau: ${programs}`
  }

  if (lowerInput.includes('chương trình') || lowerInput.includes('chuong trinh') || lowerInput.includes('tập luyện')) {
    return `Chúng ta có các chương trình huấn luyện khác nhau cho các mức kỹ năng và môn thể thao khác nhau. Các chương trình của chúng ta kéo dài từ 8 đến 16 tuần với huấn luyện tùy chỉnh. Bạn có muốn biết thêm về một môn thể thao hoặc chương trình cụ thể không?`
  }

  // Statistics queries
  if ((lowerInput.includes('tổng') || lowerInput.includes('tong')) || (lowerInput.includes('thống kê') || lowerInput.includes('thong ke'))) {
    return `Đây là thống kê hiện tại của chúng ta:
- Tổng Vận Động Viên: ${athletesDatabase.length}
- Tổng Huấn Luyện Viên: ${coachesDatabase.length}
- Chương Trình Huấn Luyện: ${trainingPrograms.length}
- Buổi Tập Đang Diễn Ra Tuần Này: 156`
  }

  // Qualified athletes queries
  if ((lowerInput.includes('đạt tiêu chuẩn') || lowerInput.includes('dat tieu chuan')) && (lowerInput.includes('quốc gia') || lowerInput.includes('quoc gia'))) {
    const qualified = athletesDatabase.filter((a) => a.qualified)
    const list = qualified.map((a) => `${a.name} (${a.sport})`).join(', ')
    return `Chúng ta có ${qualified.length} vận động viên đạt tiêu chuẩn đi thi quốc gia: ${list}`
  }

  // New athletes queries
  if ((lowerInput.includes('vận động viên mới') || lowerInput.includes('van dong vien moi')) && (lowerInput.includes('tháng') || lowerInput.includes('thang'))) {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    const newAthletes = athletesDatabase.filter((a) => {
      const joinMonthNum = parseInt(a.joinMonth.match(/\d+/)?.[0] || '0')
      return joinMonthNum === currentMonth && a.joinYear === currentYear
    })
    const count = newAthletes.length
    return `Trong tháng này, chúng ta có ${count} vận động viên mới nhập học. ${newAthletes.length > 0 ? `Họ là: ${newAthletes.map((a) => `${a.name} (${a.sport})`).join(', ')}` : 'Chưa có vận động viên mới nhập học.'}`
  }

  if ((lowerInput.includes('vận động viên mới') || lowerInput.includes('van dong vien moi')) && (lowerInput.includes('quý') || lowerInput.includes('quy'))) {
    const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3)
    const currentYear = new Date().getFullYear()
    const newAthletes = athletesDatabase.filter((a) => {
      const joinMonthNum = parseInt(a.joinMonth.match(/\d+/)?.[0] || '0')
      const joinQuarter = Math.ceil(joinMonthNum / 3)
      return joinQuarter === currentQuarter && a.joinYear === currentYear
    })
    return `Trong quý ${currentQuarter} năm nay, chúng ta có ${newAthletes.length} vận động viên mới nhập học. ${newAthletes.length > 0 ? `Họ là: ${newAthletes.map((a) => `${a.name} (${a.sport})`).join(', ')}` : 'Chưa có vận động viên mới.'}`
  }

  if ((lowerInput.includes('vận động viên mới') || lowerInput.includes('van dong vien moi')) && (lowerInput.includes('năm') || lowerInput.includes('nam'))) {
    const currentYear = new Date().getFullYear()
    const newAthletes = athletesDatabase.filter((a) => a.joinYear === currentYear)
    return `Năm nay, chúng ta đã nhập học ${newAthletes.length} vận động viên mới. Họ là: ${newAthletes.map((a) => `${a.name} (${a.sport})`).join(', ')}`
  }

  // Performance queries
  if ((lowerInput.includes('hiệu suất') || lowerInput.includes('hieu suat'))) {
    const avgPerf = (athletesDatabase.reduce((sum, a) => sum + a.performance, 0) / athletesDatabase.length).toFixed(1)
    return `Điểm hiệu suất trung bình trên tất cả vận động viên là ${avgPerf}%. Các vận động viên hàng đầu của chúng ta duy trì điểm số trên 90%.`
  }

  // 4. Bộ môn có vận động viên nhiều nhất
  if ((lowerInput.includes('bộ môn') || lowerInput.includes('bo mon')) && (lowerInput.includes('nhiều nhất') || lowerInput.includes('nhieu nhat'))) {
    const sportCounts: { [key: string]: number } = {}
    athletesDatabase.forEach((a) => {
      sportCounts[a.sport] = (sportCounts[a.sport] || 0) + 1
    })
    const maxSport = Object.entries(sportCounts).reduce((a, b) => (b[1] > a[1] ? b : a))
    return `Bộ môn có số lượng vận động viên nhiều nhất hiện nay là ${maxSport[0]} với ${maxSport[1]} vận động viên.`
  }

  // 5. Bộ môn có thành tích tốt nhất
  if ((lowerInput.includes('thành tích tốt nhất') || lowerInput.includes('thanh tich tot nhat'))) {
    const bestSport = sportsDatabase.reduce((a, b) => (Math.random() > 0.5 ? a : b))
    return `Trong năm nay, bộ môn ${bestSport.name} đạt thành tích nổi bật nhất với ${bestSport.achievements}.`
  }

  // 6. Tổng số huy chương
  if ((lowerInput.includes('tổng số huy chương') || lowerInput.includes('tong so huy chuong')) && (lowerInput.includes('năm') || lowerInput.includes('nam'))) {
    let totalGold = 0, totalSilver = 0, totalBronze = 0
    athletesDatabase.forEach((a) => {
      totalGold += a.medals.gold
      totalSilver += a.medals.silver
      totalBronze += a.medals.bronze
    })
    const total = totalGold + totalSilver + totalBronze
    return `Tổng số huy chương Trung tâm đạt được trong năm nay là ${total} huy chương, bao gồm: ${totalGold} huy chương vàng, ${totalSilver} huy chương bạc và ${totalBronze} huy chương đồng.`
  }

  // 7. Vận động viên đạt huy chương vàng
  if ((lowerInput.includes('huy chương vàng') || lowerInput.includes('huy chuong vang'))) {
    const goldMedalAthletes = athletesDatabase.filter((a) => a.medals.gold > 0)
    return `Hiện có ${goldMedalAthletes.length} vận động viên đã đạt huy chương vàng tại các giải đấu trong năm. Họ là: ${goldMedalAthletes.map((a) => a.name).join(', ')}.`
  }

  // 8. Danh sách vận động viên tiềm năng
  if ((lowerInput.includes('vận động viên tiềm năng') || lowerInput.includes('van dong vien tiem nang'))) {
    const potentialAthletes = athletesDatabase.filter((a) => a.potential && a.performance >= 87)
    return `Danh sách vận động viên tiềm năng hiện gồm: ${potentialAthletes.map((a) => `${a.name} (${a.sport}, ${a.performance}%)`).join(', ')} (dựa trên phân tích thành tích và dữ liệu huấn luyện).`
  }

  // 9. Huấn luyện viên phụ trách nhiều vận động viên nhất
  if ((lowerInput.includes('huấn luyện viên') || lowerInput.includes('huan luyen vien')) && (lowerInput.includes('nhiều') || lowerInput.includes('nhieu'))) {
    const topCoach = coachesDatabase.reduce((a, b) => (b.athletesManaged > a.athletesManaged ? b : a))
    return `Huấn luyện viên đang phụ trách nhiều vận động viên nhất là ${topCoach.name} với ${topCoach.athletesManaged} vận động viên.`
  }

  // 10. Tiến độ huấn luyện
  if ((lowerInput.includes('tiến độ') || lowerInput.includes('tien do')) && (lowerInput.includes('huấn luyện') || lowerInput.includes('huan luyen'))) {
    const avgPerf = (athletesDatabase.reduce((sum, a) => sum + a.performance, 0) / athletesDatabase.length).toFixed(1)
    return `Theo hệ thống, tiến độ huấn luyện chung đang đạt khoảng ${avgPerf}% so với kế hoạch đề ra.`
  }

  // 11. Vận động viên chấn thương
  if ((lowerInput.includes('chấn thương') || lowerInput.includes('chan thuong'))) {
    const injuredAthletes = athletesDatabase.filter((a) => a.injuried)
    return `Hiện tại có ${injuredAthletes.length} vận động viên đang trong quá trình điều trị hoặc phục hồi chấn thương: ${injuredAthletes.map((a) => a.name).join(', ')}.`
  }

  // 12. Kế hoạch thi đấu
  if ((lowerInput.includes('kế hoạch') || lowerInput.includes('ke hoach')) && (lowerInput.includes('thi đấu') || lowerInput.includes('thi dau'))) {
    return `Trong thời gian tới, Trung tâm sẽ tham gia các giải đấu như: Giải vô địch quốc gia, Đại hội thể thao toàn quốc, Giải khu vực Đông Nam Á theo lịch đã được phê duyệt.`
  }

  // 13. Tỷ lệ vận động viên đạt yêu cầu
  if ((lowerInput.includes('tỷ lệ') || lowerInput.includes('ty le')) && (lowerInput.includes('đạt yêu cầu') || lowerInput.includes('dat yeu cau'))) {
    const qualifiedCount = athletesDatabase.filter((a) => a.performance >= 85).length
    const percentage = ((qualifiedCount / athletesDatabase.length) * 100).toFixed(0)
    return `Tỷ lệ vận động viên đạt yêu cầu huấn luyện hiện tại là ${percentage}%.`
  }

  // 14. Vận động viên cải thiện tốt nhất
  if ((lowerInput.includes('phong độ') || lowerInput.includes('phong do')) || (lowerInput.includes('cải thiện') || lowerInput.includes('cai thien'))) {
    const bestImproving = athletesDatabase.reduce((a, b) => (b.performance > a.performance ? b : a))
    return `Vận động viên có phong độ cải thiện rõ rệt nhất gần đây là ${bestImproving.name} với hiệu suất ${bestImproving.performance}% theo phân tích dữ liệu AI.`
  }

  // 15. Đánh giá hiệu quả huấn luyện
  if ((lowerInput.includes('hiệu quả') || lowerInput.includes('hieu qua')) && (lowerInput.includes('huấn luyện') || lowerInput.includes('huan luyen'))) {
    return `Hệ thống đánh giá hiệu quả huấn luyện cho từng bộ môn dựa trên thành tích, tiến độ và chỉ số thể lực.`
  }

  // 16. Vận động viên chuẩn bị quốc gia
  if ((lowerInput.includes('chuẩn bị') || lowerInput.includes('chuan bi')) && (lowerInput.includes('quốc gia') || lowerInput.includes('quoc gia'))) {
    const preparedAthletes = athletesDatabase.filter((a) => a.qualified)
    return `Hiện có ${preparedAthletes.length} vận động viên đang được chuẩn bị để tham gia các giải đấu cấp quốc gia.`
  }

  // 17. Kế hoạch huấn luyện năm
  if ((lowerInput.includes('kế hoạch') || lowerInput.includes('ke hoach')) && (lowerInput.includes('năm') || lowerInput.includes('nam'))) {
    return `Kế hoạch huấn luyện năm nay đang được triển khai đúng tiến độ với một số điều chỉnh nhỏ theo thực tế.`
  }

  // 18. Bộ môn cần tăng cường
  if ((lowerInput.includes('tăng cường') || lowerInput.includes('tang cuong')) && (lowerInput.includes('đầu tư') || lowerInput.includes('dau tu'))) {
    const weakSport = sportsDatabase.reduce((a, b) => (b.athleteCount < a.athleteCount ? b : a))
    return `Theo phân tích dữ liệu, bộ môn ${weakSport.name} cần được ưu tiên tăng cường đầu tư để nâng cao thành tích.`
  }

  // 19. Đánh giá AI về tiềm năng
  if ((lowerInput.includes('đánh giá') || lowerInput.includes('danh gia')) && (lowerInput.includes('tiềm năng') || lowerInput.includes('tiem nang'))) {
    return `Hệ thống AI đánh giá Trung tâm có tiềm năng phát triển tốt, đặc biệt ở các bộ môn Track & Field, Swimming và Basketball.`
  }

  // 20. Đề xuất điều chỉnh giáo án
  if ((lowerInput.includes('đề xuất') || lowerInput.includes('de xuat')) && (lowerInput.includes('giáo án') || lowerInput.includes('giao an'))) {
    return `AI đề xuất điều chỉnh cường độ và nội dung giáo án cho một số vận động viên nhằm tối ưu hiệu quả.`
  }

  // 21. Tuyển sinh vận động viên
  if ((lowerInput.includes('tuyển sinh') || lowerInput.includes('tuyen sinh')) || (lowerInput.includes('vận động viên mới') || lowerInput.includes('van dong vien moi'))) {
    return `Công tác tuyển sinh vận động viên mới đang diễn ra theo đúng kế hoạch đã đề ra.`
  }

  // 22. Nhóm đào tạo trọng điểm
  if ((lowerInput.includes('nhóm đào tạo') || lowerInput.includes('nhom dao tao')) && (lowerInput.includes('trọng điểm') || lowerInput.includes('trong diem'))) {
    const focusAthletes = athletesDatabase.filter((a) => a.performance >= 88)
    return `Hiện có ${focusAthletes.length} vận động viên thuộc nhóm đào tạo trọng điểm của Trung tâm.`
  }

  // 23. So sánh kết quả tháng
  if ((lowerInput.includes('kết quả') || lowerInput.includes('ket qua')) && (lowerInput.includes('tháng') || lowerInput.includes('thang'))) {
    return `Kết quả huấn luyện tháng này có xu hướng tăng so với tháng trước, theo thống kê hệ thống.`
  }

  // 24. Huấn luyện viên hiệu suất cao
  if ((lowerInput.includes('huấn luyện viên') || lowerInput.includes('huan luyen vien')) && (lowerInput.includes('hiệu suất cao') || lowerInput.includes('hieu suat cao'))) {
    const bestCoach = coachesDatabase.reduce((a, b) => (b.efficiency > a.efficiency ? b : a))
    return `Huấn luyện viên có hiệu suất huấn luyện cao nhất hiện nay là ${bestCoach.name} (${bestCoach.specialty}) với ${bestCoach.efficiency}% theo dữ liệu đánh giá.`
  }

  // 25. Vận động viên được khen thưởng
  if ((lowerInput.includes('khen thưởng') || lowerInput.includes('khen thuong'))) {
    const awardAthletes = athletesDatabase.filter((a) => (a.medals.gold + a.medals.silver + a.medals.bronze) >= 2)
    return `Hiện có ${awardAthletes.length} vận động viên được đề xuất khen thưởng dựa trên thành tích đạt được.`
  }

  // 26. Cập nhật dữ liệu
  if ((lowerInput.includes('cập nhật') || lowerInput.includes('cap nhat')) && (lowerInput.includes('dữ liệu') || lowerInput.includes('du lieu'))) {
    return `Hầu hết các bộ môn đã cập nhật dữ liệu đầy đủ, chỉ còn một số ít đang hoàn thiện.`
  }

  // 27. Rủi ro
  if ((lowerInput.includes('rủi ro') || lowerInput.includes('rui ro')) && (lowerInput.includes('kế hoạch') || lowerInput.includes('ke hoach'))) {
    return `Một số rủi ro tiềm ẩn bao gồm chấn thương và lịch thi đấu thay đổi, đã được hệ thống cảnh báo.`
  }

  // 28. Vận động viên theo nhóm tuổi
  if ((lowerInput.includes('nhóm tuổi') || lowerInput.includes('nhom tuoi'))) {
    return `Hệ thống có thể thống kê số lượng vận động viên theo từng nhóm tuổi khi lãnh đạo yêu cầu.`
  }

  // 29. Dự báo thành tích
  if ((lowerInput.includes('dự báo') || lowerInput.includes('du bao')) && (lowerInput.includes('thành tích') || lowerInput.includes('thanh tich'))) {
    return `AI dự báo thành tích của Trung tâm có xu hướng tăng nếu duy trì kế hoạch huấn luyện hiện tại.`
  }

  // 30. Xuất báo cáo
  if ((lowerInput.includes('xuất') || lowerInput.includes('xuat')) && (lowerInput.includes('báo cáo') || lowerInput.includes('bao cao')) && (lowerInput.includes('word') || lowerInput.includes('excel'))) {
    return `Dạ có. Hệ thống đã sẵn sàng xuất báo cáo tổng hợp theo định dạng Word hoặc Excel.`
  }

  // Sports specific
  if (lowerInput.includes('bóng rổ') || lowerInput.includes('basketball')) {
    const basketballAthletes = athletesDatabase.filter((a) => a.sport.toLowerCase().includes('basketball'))
    return `Chúng ta có ${basketballAthletes.length} vận động viên bóng rổ. ${basketballAthletes[0]?.name} là vận động viên hàng đầu của chúng ta với hiệu suất ${basketballAthletes[0]?.performance}%.`
  }

  if (lowerInput.includes('bơi') || lowerInput.includes('swimming')) {
    const swimmers = athletesDatabase.filter((a) => a.sport.toLowerCase().includes('swimming'))
    return `Chúng ta có ${swimmers.length} vận động viên bơi trong hệ thống. Huấn luyện viên bơi Lisa Chen của chúng ta chuyên về các kỹ thuật bơi khác nhau và có 12 năm kinh nghiệm.`
  }

  // General greeting and help
  if (
    lowerInput.includes('xin chào') ||
    lowerInput.includes('xin chao') ||
    lowerInput.includes('hello') ||
    lowerInput.includes('hi') ||
    lowerInput.includes('hey')
  ) {
    return 'Xin chào! 👋 Tôi là Trợ Lý Quản Lý Thể Thao. Tôi có thể giúp bạn với thông tin về vận động viên, huấn luyện viên, chương trình huấn luyện và thống kê hiệu suất. Bạn muốn biết điều gì?'
  }

  if ((lowerInput.includes('giúp') || lowerInput.includes('giup')) || (lowerInput.includes('có thể') || lowerInput.includes('co the'))) {
    return `Tôi có thể giúp bạn với:
- Thông tin về vận động viên và hiệu suất của họ
- Chi tiết về nhân viên huấn luyện và kinh nghiệm của họ
- Các chương trình huấn luyện có sẵn
- Thống kê và xu hướng hiệu suất
- Thông tin theo từng môn thể thao
- Các truy vấn quản lý chung

Bạn muốn biết điều gì?`
  }

  // Default response
  return `Cảm ơn đã hỏi! Tôi tìm thấy điều này liên quan đến câu hỏi của bạn: Hệ thống quản lý thể thao của chúng ta giúp theo dõi ${athletesDatabase.length} vận động viên trên các học kỷ luật thể thao khác nhau, được quản lý bởi ${coachesDatabase.length} huấn luyện viên giàu kinh nghiệm. Có điều gì cụ thể bạn muốn biết không?`
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Xin chào! 👋 Tôi là Trợ Lý Quản Lý Thể Thao của bạn. Tôi có thể giúp bạn với thông tin về vận động viên, huấn luyện viên, chương trình huấn luyện và thống kê hiệu suất. Bạn muốn biết điều gì?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Hiển thị tin nhắn typing
    const typingMessage: Message = {
      id: (Date.now() + 0.5).toString(),
      role: 'assistant',
      content: 'Đang suy nghĩ...',
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    // Delay 2 giây để giả lập suy nghĩ
    setTimeout(() => {
      const response = generateResponse(input)
      setMessages((prev) => {
        // Xóa typing message và thêm response thật
        const filtered = prev.filter((msg) => !msg.isTyping)
        return [
          ...filtered,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response,
            timestamp: new Date(),
          },
        ]
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/30 flex flex-col">
      <CardHeader className="border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <CardTitle className="text-white">Trợ Lý Thể Thao</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-br-none'
                    : `bg-slate-700 text-slate-100 rounded-bl-none ${message.isTyping ? 'animate-pulse' : ''}`
                }`}
              >
                <p className={`text-sm whitespace-pre-wrap ${message.isTyping ? 'italic text-slate-300' : ''}`}>
                  {message.content}
                </p>
                <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex gap-2">
          <Input
            type="text"
            placeholder="Hỏi tôi về vận động viên, huấn luyện viên, chương trình..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
          >
            <Send size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
