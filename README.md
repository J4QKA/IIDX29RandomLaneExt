# IIDX29RandomLaneExt

## 説明
beatmania ⅡDX29 CastHourで実装されたランダムレーンチケット所持画面に以下の機能を追加するChrome拡張機能です
- 簡易的な絞り込み機能の追加
- ソート機能の追加(レーン数字・有効期限) 昇順/降順
- レーン数値の色付け

個人的に利用するために作成したため、粗い部分があります。
それでも問題ない方のみご利用ください。

## 導入方法
appフォルダをローカルに保存し、Chromeの拡張機能として読み込んでください。

パッケージ化されていない拡張機能の読み込みになるため、具体的な手段は以下等を参照ください。
> 自作Chrome拡張機能をテストする方法 / けーちゃんのプログラム開発ノート
>
> https://note.affi-sapo-sv.com/chrome-extent-test.php

>ブラウザ(Chrome)拡張機能の追加方法 / コボットPortal
>
>https://platform.kobot.jp/support/solutions/articles/47001154126-%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6-chrome-%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD%E3%81%AE%E8%BF%BD%E5%8A%A0%E6%96%B9%E6%B3%95

## 機能説明
### 検索機能
1~7の数値とW(1357),B(246)で指定できます。

![検索gif](https://user-images.githubusercontent.com/36569264/140611886-6cfc483b-842d-4dec-a364-25eb72e28bf0.gif)

### ソート機能
「所持ランダムレーンチケット」列と「有効期限」列をクリックすると、降順・昇順に切り替わります。

![ソートgif](https://user-images.githubusercontent.com/36569264/140611917-5e69a750-335a-427b-9908-e2c38725bae5.gif)
