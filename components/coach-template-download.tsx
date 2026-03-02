'use client'

import { Button } from '@/components/ui/button'

export default function CoachTemplateDownload() {
  const downloadTemplate = () => {
    // Create CSV template
    const headers = ['Tên', 'Môn Thể Thao', 'Hiệu Suất', 'Huấn Luyện Viên', 'Năm Kinh Nghiệm', 'Chứng chỉ', 'Email']
    const sampleRow = ['Ví dụ', 'Bơi lội', '85', 'Nguyễn Văn 1', '5', 'Chứng chỉ A', 'coach@email.com']
    
    const csv = [headers, sampleRow].map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', 'coaches_template.csv')
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button 
      onClick={downloadTemplate}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      📥 Tải Biểu Mẫu
    </Button>
  )
}
