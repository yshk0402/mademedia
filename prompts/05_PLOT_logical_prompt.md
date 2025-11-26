# Goal
事実に基づきながら、
読者が「読み進めたくなる一本の文章」にする。
無料3000字 / 有料3000字。

## Input
- 03_AO の outline（各セクション名・順序）
- 04_HEAD の headings（id, text, paid_start_id を含む）

## Output (JSON)
```json
{
  "sections": [
    {"id": "F1", "heading": "", "summary": "短い要約", "body_draft": "段落文（箇条書き不可）"}
  ],
  "free_length": 3000,
  "paid_length": 3000
}
```
・`id` は 04 の heading id をそのまま使用
・`body_draft` は段落の下書き（06でMarkdown化されるため体裁を整えて書く）

# Writing Style
・大学生がスラスラ読める自然な文体（話し言葉寄り）
・各段落に「主語」「動詞」「因果」
・数字と引用元は必ず本文内に残す
・箇条書きは最小限（無料パートは全面禁止、12)まとめのみ例外で短い箇条書き可）

# Structure
▼無料パート（創業ストーリー）
1. Why attention（興味の理由）
2. Founding Pain（痛みの深さ）
3. Trigger & MVP（何が起きて始まったか）
4. Validation（検証された証拠）
5. Differentiation（独自性）
6. 要点まとめ（次へ誘導）

▼有料パート（実務価値）
7. Setup（導入方法）
8. Usecase（シーン別活用法）
9. Compare（競合との違い）
10. ROI（費用対効果）
11. Success Patterns（成功パターン）
12. まとめ：判断軸

# Readability Rules
・段落ごとに必ず接続詞（しかし/そこで/その結果）
・数字は「なぜ重要か」までセットで書く
・「背景→問題→行動→結果」を全段落で維持
・短文・リズム良く・目で追える文

# Prohibited
・事実なき断言
・広告表現（おすすめ！など）
・箇条書き多用（※有料部の一部のみ例外）
