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

## 新規登録画面
- モーダル表示
- モーダルの中身作成
- 新規登録画面の作成
- アカウント登録画面の作成
・アイコン画像の非同期処理：イベントハンドラーを先に記述し、時間のかかる処理を後ろに書く

## プロフィール画面の作成
## ポートフォリオ投稿画面の作成
## ポートフォリオ詳細画面の作成

- APIを設計していないため、仮のデータを作成している

# ユーザー認証の実装
1. Firebaseの設定
2. ユーザーの認証状態を管理するためのコンテキストを作成
3. 既存のログインモーダルと新規登録画面を更新
4. AuthProviderでアプリケーションをラップ(App.js)
5. .envファイルを作成し、Firebase設定を追加:

## Firebaseの設定
・Client SDK（フロントエンド）とAdmin SDK（バックエンド）で用途が違う
Client SDKはユーザーがログインしているか否か
Admin SDKはユーザー情報をもとにAPIリクエストしている
・.gitignoreに.envファイルを追跡する

## ユーザーの認証状態を管理するためのコンテキストを作成(AuthContext.js)
- authとproviderを使って、ログイン機能の内部を実装
- useEffectを使って、ユーザーの認証状態を監視
- Contextを使って全てのページにユーザーの認証状態を渡す

## ログインモーダルを更新
- Googleログインとメールアドレスのログインの実装
※ エラー（メールアドレスのログイン時に、auth/invalid-credentialエラーが表示される）
⇨ そもそも新規アカウントがない状態なので、メールアドレスのログインはできない
⇨ 逆にGoogleログインは初回ログインでも、自動でアカウント作成できる
-ログインと未ログイン時のヘッダーのUIを変更
・AuthContextからCurrentUserを取得
・CurrentUserの有無で判断（Googleログインがきちんとできているかテストも可能）

## 新規登録画面の更新
- useAuthからサインアップ関数を取得して、新規登録画面のサインアップボタンをクリックしたときに呼び出す

## まとめ
① FirebaseでAuthenficationのAPIを取得
② firebase.jsで開発環境とfirebaseを繋げます
③ AuthContext.jsでログイン・ログアウト・サインアップの処理を設計
④ 同ファイルでContext（掲示板）とProvider（掲示板を見る人）を用意
⑤ Providerで全ページに認証機能を持たせる（ラッピング）
⑥ 認証処理が必要なページにて、useAuthをインポートすることで、掲示板の情報を利用できるようにする

# データベースの設計
1. モデル（設計図）を作成する
2. APIルート（操作方法）を作成する
3. サーバー設定（データベースに接続）を更新
4. テスト

## モデル（設計図）を作成する
- UserとPortfolioのモデルを作成
・なんの情報が必要なのかあらかじめ整理
・全データを保存すればいいというわけではない（いいね数まで管理すると重くなる）

## APIルート（操作方法）を作成する
・フロントエンドからどの部分でHTTPリクエストが必要か事前に把握する必要あり
・そのリクエストがCRUDのどれに当たるか？
- ポートフォリオ関連のAPIルートを作成
- ユーザー関連のAPIルートを作成

## サーバー設定（データベースに接続）を更新
・server.jsにルートを追加し、データベースに接続

## APIテスト
・Postmanを使用して、APIのテストを行う
POSTMAN:https://web.postman.co/workspace/My-Workspace~976f1657-3377-4cbc-8189-5fad55722855/request/41671149-481b604d-c0ac-4459-80a0-d5a38dc14ac7


### 使い方
① リクエストのコレクション作成
② 環境をローカルに設定
③ リクエスト方法とURLを入力し、Send

### テスト一覧
① ポートフォリオ一覧を取得（GET）
② 新規ポートフォリオを作成（POST）
※ ミドルウェアを無効化して、テスト用のデータで実施する必要あり
※ Authorization、Header,Bodyの設定が必要（テスト用のデータを入力）
③ 個別のポートフォリオの取得（GET）
④ エラーハンドリングテスト
・必須項目なしでPOST
・存在しないIDでGET

・ミドルウェアを設定してテストする必要もあり？（認証テスト）
⇨ プロパティ含め理解しておく！

### 認証トークンの仕組み
① ユーザーがログインすると、Firebase Authenticationがトークンを発行
② クライアントからトークンをAPIリクエストに含める（ポートフォリオ投稿やプロフィール更新など）
③ ミドルウェア（Firebase Admin SDKで）でトークンを検証し、ユーザーの認証状態を確認
④ 検証されたトークンからユーザー情報を取得し、MONGODBと紐付ける

# 画像アップロードの実装
① Firebase Storageの設定
② バックエンドのエンドポイント作成
③ フロントエンドの画像アップロード機能の実装
④ サーバー設定の更新