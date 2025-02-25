// ユーザー関連の型定義
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
}
  
  // ポートフォリオ関連の型定義
export interface Portfolio {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    githubUrl?: string;
    deployUrl?: string;
    user: User | string;
    likes: string[];
    createdAt: Date;
}
  
  // API レスポンスの型定義
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}