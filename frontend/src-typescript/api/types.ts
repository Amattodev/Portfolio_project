// APIヘッダーの型定義
export type Headers = Record<string, string>;

// エラーレスポンスの型定義
export interface ErrorResponse {
  message: string;
  status?: number;
} 