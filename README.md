# 環境構築とセットアップ

## node.jsの確認

## バックエンド
npm run dev でサーバー起動
開発環境：http://localhost:8000/

①express、mongodbのインストール
npm install express
npm install mongoose
npm install dotenv
npm install cors
npm install firebase-admin

② サーバーの設定 (server.js)
Expressサーバーを設定
package.jsonに開発用のスクリプトを更新
※ http://localhost:5000はすでに使われていたので、8000に変更

③ Firebase Adminの設定(firebase.js)
管理者がユーザー情報にアクセスするため

④ 認証ミドルウェア(auth.js)
ログインユーザーのみ許可される処理

## フロントエンド

① create-react-appでプロジェクトを作成

② 必要なパッケージのインストール
・React Router のインストール
npm install react-router-dom

・Material UI のインストール（必要なコアパッケージ）
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# UI構築
## 準備
- srcディレクトリの整理
- App.jsの作成
- Material UIのテーマを作成(theme.js)
- ファイルの整理

## ポートフォリオ一覧画面作成
- ヘッダー作成(Header.js)
- ポートフォリオ一覧画面作成(PortfolioList.js)
- ポートフォリオカード作成(PortfolioCard.js)
・Girdの仕様変更：Grid2へ変更（CssのエラーでMaterial UIの公式docを参照）





