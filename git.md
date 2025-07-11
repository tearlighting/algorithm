| 英语     | 日语例子                  |
| -------- | ------------------------- |
| feat     | feat: 新しい機能の追加    |
| fix      | fix: バグ修正             |
| refactor | refactor: コード整理      |
| chore    | chore: 設定ファイル調整   |
| docs     | docs: README 修正         |
| wip      | wip: ロールバックテスト中 |
| test     | test: テスト追加          |

feat: add ManualTransaction rollback glue

Add withRollback helper to wrap existing request functions.
Support patchTransaction for injecting rollback into the transaction stack.
This enables manual compensation in distributed flows.
