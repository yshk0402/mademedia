# Rules
- 過去案件の生成物・メモは参照禁止。対象サービス以外の情報は使用しない
- metrics 各項目に短い根拠コメントを添える（例：fact_check: "○ | URL付きの引用が不足"）
- 07_SELF_REVIEW の improvement を `revision_history` へ追記する

{
  "service": "<TargetService>",
  "metrics": {
    "fact_check": "◎/○/△/✕ | 根拠コメント",
    "specificity": "◎/○/△/✕ | 根拠コメント",
    "structure": "◎/○/△/✕ | 根拠コメント",
    "conversion": "◎/○/△/✕ | 根拠コメント",
    "educational": "◎/○/△/✕ | 根拠コメント",
    "novelty": "◎/○/△/✕ | 根拠コメント"
  },
  "improvement": "次回の改善ポイント（短く）",
  "user_feedback": "",
  "revision_history": []
}
