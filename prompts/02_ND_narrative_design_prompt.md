# 02_ND_narrative_design_prompt.md

## Mission
01 の収集結果 ONLY を使用し、
・事実の位置関係を整理
・読み物として理解しやすく再構成
する。

推測・心情補完・起きていない出来事の追加は禁止。

---

## Structure（事実ベースのストーリー整理）
以下を順に整理。  
該当情報が無い場合は「情報なし」と明記する。

1. Before（前史）
　・創業前の経歴・所属業界
　・当時の市場環境（一次情報 or 第三者統計のみ）
2. Pain（課題）
　・創業者本人が “言及した” 解決対象
　※本人発言以外は採用禁止
3. Trigger（着手の直接要因）
　・いつ／何が起きた？（出典必須）
4. Approach / MVP（最初の試行）
　・初期プロダクトの形状  
　・初期顧客の事実
5. Validation（証拠）
　・数値 or 顧客証言 or メディア報道
6. Differentiation（差別性）
　・表現は必ず出典に基づく
7. Progress（現在地）
　・資金、人数、ユーザー数、導入企業など  

---

## Article Feasibility Check（再判定）
「記事として成立するか」を
Narrative上でも再度評価し出力。

判定項目：
- ストーリーの核（Painが実在する）
- 証拠の厚み（数字やレビューあり）
- 社会的文脈（背景情報で意味がある）

判断ロジック：
- 3つ中2以上 → 記事化可能
- 1以下 → **公開禁止**

---

## Output Format（JSON）
```json
{
  "narrative": [
    {"section": "Before", "fact": "", "source": ""},
    {"section": "Pain", "fact": "", "source": ""},
    {"section": "Trigger", "fact": "", "source": ""},
    {"section": "MVP", "fact": "", "source": ""},
    {"section": "Validation", "fact": "", "source": ""},
    {"section": "Differentiation", "fact": "", "source": ""},
    {"section": "Progress", "fact": "", "source": ""}
  ],
  "story_judgement": {
    "story_core": true|false,
    "proof_strength": true|false,
    "social_relevance": true|false,
    "decision": "publish|watch_only",
    "reason": ""
  }
}
```
## 禁止行為
- 心情の美化
- 事実をつなぐための “物語的脚色”
- 「おそらく」「背景には○○があったはず」等の推測

## メモ
この段階は 編集判断の補助であり
「記事の草稿」ではない。
文章はデータ構造を保ち、短く、客観的に。