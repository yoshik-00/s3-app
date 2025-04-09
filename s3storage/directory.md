# backend

s3storage/
├── src/
│ ├── main/
│ │ ├── java/
│ │ │ └── com/
│ │ │ └── example/
│ │ │ └── s3storage/
│ │ │ ├── S3StorageApplication.java # アプリケーションのエントリーポイント
│ │ │ ├── config/
│ │ │ │ └── S3Config.java # AWS S3 の設定クラス
│ │ │ ├── controller/
│ │ │ │ └── StorageController.java # ファイル操作のコントローラー
│ │ │ ├── service/
│ │ │ │ └── S3Service.java # S3 操作を行うサービスクラス
│ │ │ └── model/ # 必要に応じてモデルクラスを配置
│ │ ├── resources/
│ │ │ ├── static/ # 静的リソース（CSS, JS, 画像など）
│ │ │ ├── templates/
│ │ │ │ └── index.html # Thymeleaf テンプレート
│ │ │ └── application.yml # アプリケーション設定ファイル
│ │ └── webapp/ # (必要に応じて) WAR デプロイ用ファイル
│ └── test/ # テストコード
│ └── java/
│ └── com/
│ └── example/
│ └── s3storage/
│ ├── S3StorageApplicationTests.java
│ └── service/
│ └── S3ServiceTest.java
├── .gitignore
├── mvnw
├── mvnw.cmd
├── pom.xml # Maven プロジェクト設定
└── README.md

# frontend

s3storage-frontend/
├── public/
│ ├── index.html
│ ├── favicon.ico
│ └── manifest.json
├── src/
│ ├── components/
│ │ ├── App.js # メインアプリケーションコンポーネント
│ │ ├── FileUpload.js # ファイルアップロードコンポーネント
│ │ ├── FileList.js # ファイル一覧コンポーネント
│ │ └── FileItem.js # 個別ファイル表示コンポーネント
│ ├── services/
│ │ └── api.js # バックエンド API 呼び出し
│ ├── styles/
│ │ ├── App.css
│ │ └── index.css
│ ├── utils/
│ │ └── fileHelper.js # ファイル処理ヘルパー関数
│ ├── index.js # エントリーポイント
│ └── setupTests.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

# extending

.vscode/
├── launch.json # デバッグ設定
├── settings.json # VSCode 設定
└── extensions.json # 推奨拡張機能設定

# docker

├── Dockerfile # アプリケーションの Dockerfile
├── docker-compose.yml # 開発環境用 Docker Compose 設定
└── .dockerignore

---

重要なファイルの役割

S3StorageApplication.java: アプリケーションの起動クラス
S3Config.java: AWS S3 クライアントの設定
S3Service.java: S3 との通信やファイル操作のロジック
StorageController.java: HTTP リクエストのハンドリング
application.yml: データベース接続、S3 設定などのアプリケーション設定

この構成により、関心の分離（Separation of Concerns）の原則に従ったクリーンなアーキテクチャが実現され、コードの保守性と拡張性が向上します。

---
