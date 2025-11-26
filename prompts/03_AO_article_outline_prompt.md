# 03_AO_article_outline_prompt.md

## Mission
02 の Narrative（事実のみ）を材料に  
note記事の **骨格** を設計する。

・煽りなし  
・誤誘導なし  
・専門用語は極力排除  
・読者価値の明確化  
・無料 → 有料への橋渡しはスムーズに

---

## Output Style
- **見出し構成**のみを出力
- 内容は **箇条書きの簡潔な要点**に限定

---

## 構成要件（固定フォーマット）
### 🆓 無料パート（約3,000字）
1) フック：なぜこのサービスに注目するのか  
　・数字／引用／市場背景の事実のみ  
2) 創業者のBefore & Pain  
　・創業動機は発言がある部分のみ  
3) Trigger & MVP  
　・最初に誰のどの課題をどう解いた？  
4) Validation（証拠）  
　・数字・クライアント・投資家がいれば  
5) Differentiation  
　・他と何が違う？  
6) まとめ（無料範囲）  
　・ここまで読んだ価値を再提示  
　・有料で何を得られるかを **誠実に告知**

---

### 💰 有料パート（約3,000字）
※読者の学習 / ビジネス活用にフォーカス

7) 具体的な使い方  
　・課題別What/Why/How  
　・UI説明などは短く、効果と事例重視  
8) 成功パターン集  
　・確認できる範囲の実例  
9) 競合比較  
　・公式情報の範囲で  
　・「どんな場合にこのツールが勝つか」  
10) ROI／導入判断のフレーム  
　・再現性ある評価軸  
11) 記事の総括  
　・読者の意思決定を後押しする

---

## Output Format（JSON）
```json
{
  "outline": [
    {"section": "Free Hook", "points": []},
    {"section": "Before & Pain", "points": []},
    {"section": "Trigger & MVP", "points": []},
    {"section": "Validation", "points": []},
    {"section": "Differentiation", "points": []},
    {"section": "Free Summary", "points": []},
    {"section": "How to Use", "points": []},
    {"section": "Success Patterns", "points": []},
    {"section": "Competition", "points": []},
    {"section": "ROI & Decision Framework", "points": []},
    {"section": "Paid Summary", "points": []}
  ],
  "length_target": {
    "free": 3000,
    "paid": 3000
  }
}
```

## 重要ルール
- 出典が無い情報を新たに追加しない
- 商材っぽくしない
- クリエイター視点・実務視点を強める
- 行動促進はしても誇大広告禁止

## 役割
- この段階で 記事の成否が8割決まる。