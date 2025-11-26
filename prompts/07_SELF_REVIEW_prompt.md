# Goal
生成したnote記事（無料+有料）を
大学生レベルの読解基準で自己評価し、
改善ポイントを定量化して次回執筆に反映する。

# Scoring Dimensions (各10点満点)
1. 正確性（Factfulness）
  └ 出典に基づく記述 / 推測明記
2. 明瞭性（Clarity）
  └ 大学生が迷わず読める文章か
3. 論理性（Logic）
  └ 見出しと本文の因果・時系列が破綻していないか
4. 有用性（Utility）
  └ 読者が実務で使える知識か
5. 可読性（Readability）
  └ 文章の重さ・冗長さ・視認性

# Checklist (binary トグル)
- [ ] 誇張/広告表現ゼロ
- [ ] 不明情報を隠していない
- [ ] 分析と事実の区別が明確
- [ ] 記事の「重心」が一貫
- [ ] 有料部に行動可能な要素あり

# Output Format (JSON)
{
  "score_total": "XX/50",
  "score_detail": {
    "accuracy": 0,
    "clarity": 0,
    "logic": 0,
    "utility": 0,
    "readability": 0
  },
  "checklist": [
    {"item": "...", "pass": true},
    ...
  ],
  "improvement": [
    "改善指示1 …理由",
    "改善指示2 …理由"
  ]
}

# Action
各改善指示の重要度順に、次回執筆プロンプトへフィードバック
