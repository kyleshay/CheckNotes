# Check Notes GitHub Action

This action checks pull requests for the `Notes:` field to make building a CHANGELOG.md easier.

## Inputs

### `comment`

**Optional** If the action should leave a comment on the PR. Default `true`.

## Example (in .github/workflows)

```yaml
on:
  pull_request:
    types: [opened, edited]

jobs:
  notes_job:
    runs-on: ubuntu-latest
    name: "Check PR for Notes"
    steps:
      - name: "Read PR body description"
        id: check
        uses: kyleshay/gh-a@main
        with:
          comment: false
```

# Examples for good Notes

> taken from https://github.com/electron/clerk/blob/master/README.md

- **`commit -m` is for maintainers. `notes:` is for users.**
  Describe the change in user terms.

  ```diff
  - notes: Bump libcc to latest.
  - notes: Backport patch to fix Widget::OnSizeConstraintsChanged crash (3.0.x)
  + notes: Fixed crash in Widget::OnSizeConstraintsChanged.
  ```

- Omit notes for changes that users won't care about.

  ```diff
  - notes: only define WIN32_LEAN_AND_MEAN if not already defined
  + notes: no-notes
  ```

- For consistency in notes, use the past tense and capitalize and punctuate your notes.
  ```diff
  - notes: fix ipcRemote.sendSync regression introduced in a previous 3.0.0 beta
  + notes: Fixed ipcRemote.sendSync regression introduced in a previous 3.0.0 beta.
  - notes: remove upstream code that used private Mac APIs
  + notes: Removed upstream code that used private Mac APIs.
  ```
- Multi-line release notes

  ```md
  Notes:

  - Line 1
  - Line 2
  ```

**Your release bot overlords thank you.**
