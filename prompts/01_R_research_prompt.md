# 01_R_research_prompt.md — FACT-ONLY RESEARCH

## Mission
対象となる SaaS 企業に関する事実のみを収集する。
推測・補完・創作は禁止。  
出典（URL）が無い情報は採用不可。

---

## Research Target
- 創業者と創業プロセス
- プロダクトの誕生背景と市場課題
- ビジネスモデルと実績（数値）
- 競合比較、顧客証言、第三者評価

---

## Sources Rule
優先順位：
1. 公式情報（サイト / プレス / 投資家資料）
2. 創業者インタビュー（引用必須）
3. Crunchbase / PitchBook / LinkedIn
4. G2 / Capterra / TrustPilot（レビュー）

SNS / 個人ブログのみの情報は
- **信頼低**
- 「低」と明記した上で引用可（補助的に使用）

---

## Article Feasibility Check（事前審査）
収集後、下記 3軸にて “記事化するか否か” を判定：

| 軸 | Yesなら前進 | NoならSTOP |
|---|---|---|
| ストーリーの核 | 創業者の一次発言あり | 売り文句のみ |
| 証拠の厚み | 数値・顧客証言など複数 | 実績が無い |
| 社会的文脈 | 市場背景で価値が出る | 単なるツール解説 |

3つ中1以下 → **記事化禁止**  
2以上 → **次工程へ**

※AIが勝手に記事化しないようここで必ず判定

---

## Output Format（JSON）
```json
{
  "service": "",
  "company": "",
  "founders": [
    {
      "name": "",
      "bio_summary": "",
      "source": ""
    }
  ],
  "founded_year": "",
  "hq": "",
  "category": "",
  "product_summary": "",
  "pricing": "",
  "core_problem": {
    "statement": "",
    "source": ""
  },
  "kpi": [
    {
      "metric": "",
      "value": "",
      "year": "",
      "source": ""
    }
  ],
  "competition": [
    {
      "name": "",
      "url": "",
      "reason_compared": ""
    }
  ],
  "user_validation": [
    {
      "type": "customer_review|case_study",
      "detail": "",
      "source": ""
    }
  ],
  "market_background": {
    "insight": "",
    "source": ""
  },
  "sources": [
    {
      "url": "",
      "credibility": "high|medium|low",
      "note": ""
    }
  ],
  "feasibility": {
    "story_core": true|false,
    "proof_strength": true|false,
    "social_relevance": true|false,
    "decision": "publish|watch_only",
    "reason": ""
  }
}

```
## 禁止行為

- 「おそらく」「だろう」など推測語
- 創業者の心情の創作
- 実在しない数値
- 出典の無い “雰囲気情報”

## 評価ログ出力
最後に必ず、
記事化の判断理由を 人間が見て理解できる形で付記する。