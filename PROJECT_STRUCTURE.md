# Manage Sport - Project Structure Documentation

## 📁 Cấu Trúc Thư Mục

```
manage-sport/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── athletes/
│   │   ├── coaches/
│   │   ├── sports/
│   │   ├── training-plans/
│   │   ├── training-sessions/
│   │   └── applications/
│   ├── dashboard/                # Admin Dashboard
│   ├── coach/                    # Coach Dashboard
│   ├── profile/                  # Public Profiles
│   ├── login/                    # Authentication
│   ├── xet-tuyen/                # Recruitment Module
│   └── layout.tsx, page.tsx
│
├── components/                   # React Components
│   ├── ui/                       # Reusable UI Components (shadcn/ui)
│   ├── chatbot.tsx               # Chatbot Component
│   ├── sidebar.tsx               # Sidebar Navigation
│   ├── athlete-dialog.tsx        # Athlete Management Dialog
│   ├── coach-dialog.tsx          # Coach Management Dialog
│   └── ...
│
├── lib/                          # Utility Functions & Services
│   ├── types.ts                  # ✨ NEW: Centralized TypeScript Interfaces
│   ├── api-service.ts            # ✨ NEW: API Service Layer
│   ├── api-utils.ts              # ✨ NEW: API Route Utilities
│   ├── constants.ts              # ✨ NEW: Constants & Enums
│   ├── helpers.ts                # ✨ NEW: Helper Functions
│   ├── utils.ts                  # Existing utilities (cn function)
│   └── excel-parser.ts
│
├── hooks/                        # Custom React Hooks
│   ├── useApi.ts                 # ✨ NEW: Data Fetching Hooks
│   ├── use-toast.ts
│   └── use-mobile.ts
│
├── public/
│   ├── data/                     # JSON Data Files
│   │   ├── athletes.json
│   │   ├── coaches.json
│   │   ├── sports.json
│   │   ├── training-plans.json
│   │   ├── training-sessions.json
│   │   ├── training-criteria.json
│   │   └── applications.json
│   └── images/
│
├── styles/                       # Global Styles
├── components.json               # Shadcn/ui Config
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## 🎯 Khái Niệm Thiết Kế

### 1. **Layered Architecture** (Kiến trúc phân lớp)

```
UI Layer (Components)
    ↓
Hooks Layer (Data Fetching)
    ↓
Service Layer (API Calls)
    ↓
API Routes (Server)
    ↓
Data Files (JSON)
```

### 2. **Types - Centralized** (`lib/types.ts`)
```typescript
// ✅ Tất cả interfaces định nghĩa tại đây
// Dễ maintain, không duplicate định nghĩa
import { Athlete, Coach, Sport } from '@/lib/types'
```

### 3. **API Service** (`lib/api-service.ts`)
```typescript
// Single point for all API calls
// Dễ thay từ JSON sang backend API
const athletes = await apiService.getAthletes()
const plan = await apiService.createTrainingPlan(data)
```

### 4. **Custom Hooks** (`hooks/useApi.ts`)
```typescript
// Tái sử dụng data fetching logic
const { athletes, loading, error } = useAthletes()
const { athlete } = useAthlete(id)
const { coaches } = useCoaches()
```

### 5. **Constants** (`lib/constants.ts`)
```typescript
// Magic strings không còn nữa
// Dễ maintain khi thay đổi value
ROUTES.DASHBOARD
SPORTS.SWIMMING
USER_ROLES.COACH
```

## 🔄 Lợi Ích Của Cấu Trúc Này

### ✅ **Tái Sử Dụng Code**
```typescript
// Hooks dùng lại ở nhiều component
// Service layer dùng chung cho tất cả
// Types định nghĩa một lần, sử dụng mọi nơi
```

### ✅ **Dễ Mở Rộng**
```typescript
// Thêm môn thể thao mới?
// Thêm vào SPORTS trong constants.ts

// Thêm API mới?
// Thêm method vào ApiService

// Thêm page mới?
// Tái sử dụng hooks & service
```

### ✅ **Dễ Tích Hợp Backend**
```typescript
// Hiện tại: API routes đọc JSON local
// Sau này: Thay URL từ /api/athletes
//        thành https://backend.com/api/athletes

// Chỉ cần sửa ở api-service.ts
// Không cần sửa components!
```

### ✅ **Maintainability**
```typescript
// Bug ở data fetching? → Sửa useApi.ts
// Bug ở API call logic? → Sửa api-service.ts
// Type error? → Sửa lib/types.ts
// Magic string? → Kiểm tra lib/constants.ts
```

## 📝 Best Practices

### **Khi Tạo Component Mới:**
```typescript
// ❌ KHÔNG
const MyComponent = () => {
  const [athletes, setAthletes] = useState([])
  useEffect(() => {
    fetch('/api/athletes').then(...)
  }, [])
}

// ✅ ĐƯỢC
import { useAthletes } from '@/hooks/useApi'
const MyComponent = () => {
  const { athletes, loading } = useAthletes()
}
```

### **Khi Gọi API:**
```typescript
// ❌ KHÔNG
fetch('/api/athletes').then(res => res.json())

// ✅ ĐƯỢC
import { apiService } from '@/lib/api-service'
const athletes = await apiService.getAthletes()
```

### **Khi Dùng Types:**
```typescript
// ❌ KHÔNG
interface Athlete { ... }  // ở component

// ✅ ĐƯỢC
import { Athlete } from '@/lib/types'
```

### **Khi Dùng Constants:**
```typescript
// ❌ KHÔNG
if (role === 'admin') { ... }

// ✅ ĐƯỢC
import { USER_ROLES } from '@/lib/constants'
if (role === USER_ROLES.ADMIN) { ... }
```

## 🚀 Backend Integration Roadmap

### Phase 1: Hiện Tại (Local JSON)
```
Components → Hooks → ApiService → API Routes → JSON Files
```

### Phase 2: Backend Ready (Chỉ cần đổi API_BASE)
```
Components → Hooks → ApiService → Backend API (Node/Django/etc)

// Thay đổi:
const API_BASE = 'https://api.yourdomain.com'
```

### Phase 3: Advanced (Optional)
```
- Add authentication token management
- Add error retry logic
- Add request/response interceptors
- Add caching strategy
```

## 📚 File Reference

### `lib/types.ts`
- Định nghĩa tất cả interfaces
- Export dùng chung

### `lib/api-service.ts`
- Singleton class apiService
- Methods cho mỗi resource
- Error handling

### `lib/api-utils.ts`
- Helpers cho API routes
- CRUD operations
- Validation

### `lib/constants.ts`
- Routes, endpoints
- Enums (roles, sports, etc)
- Validation patterns

### `lib/helpers.ts`
- Format functions
- Validation utilities
- Statistics calculations

### `hooks/useApi.ts`
- Custom hooks for data fetching
- Error & loading states
- Refetch capabilities

## 🔒 Security Notes

- API routes hiện tại sử dụng local file system
- Backend integration cần thêm:
  - JWT authentication
  - CORS configuration
  - Rate limiting
  - Input validation

## 📞 Support

Cần thêm tính năng mới?
1. Thêm type vào `lib/types.ts`
2. Thêm API method vào `lib/api-service.ts`
3. Thêm hook vào `hooks/useApi.ts`
4. Sử dụng trong components

---

**Last Updated:** 2026-02-04
**Version:** 2.0 (Refactored)
