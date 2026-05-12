#!/usr/bin/env bash
# Cursor afterFileEdit hook — auto-sync env files to 1Password
#
# Fires after every Write tool call. Checks if the edited file is an env
# file (.env, .env.local, .upload.env) and if so, updates the matching
# Secure Note in the "Sweet Media Platform" 1Password vault.
#
# Requires: 1Password CLI (brew install 1password-cli) + op signin

set -euo pipefail

OP_VAULT="Sweet Media Platform"

# ─── Parse file path from hook stdin ─────────────────────────────────────────
INPUT=$(cat)

# afterFileEdit stdin includes the file path in the "path" field
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('path', '') or d.get('tool_input', {}).get('path', ''))
except Exception:
    print('')
" 2>/dev/null || true)

if [[ -z "$FILE_PATH" ]]; then
  echo '{}'
  exit 0
fi

# ─── Only handle env files ────────────────────────────────────────────────────
BASENAME=$(basename "$FILE_PATH")

case "$BASENAME" in
  .env.local | .upload.env | .env) ;;
  *) echo '{}'; exit 0 ;;
esac

# Skip if file doesn't exist (e.g. deletion)
if [[ ! -f "$FILE_PATH" ]]; then
  echo '{}'
  exit 0
fi

# ─── Determine 1Password item title ──────────────────────────────────────────
# Derive brand slug from path: apps/<slug>/<file> or repo root
if [[ "$FILE_PATH" == */apps/*/".env.local" ]] || [[ "$FILE_PATH" == */apps/*/".upload.env" ]]; then
  SLUG=$(echo "$FILE_PATH" | sed -E 's|.*/apps/([^/]+)/.*|\1|')
  TITLE="${SLUG} — ${BASENAME}"
elif [[ "$BASENAME" == ".env" ]]; then
  TITLE="platform — root .env"
else
  echo '{}'
  exit 0
fi

# ─── Check op CLI is available and signed in ─────────────────────────────────
if ! command -v op &>/dev/null; then
  # op not installed — silent skip (no noise for users without CLI)
  echo '{}'
  exit 0
fi

# Quick auth check — if not signed in, skip silently
if ! op account list &>/dev/null 2>&1; then
  echo '{}'
  exit 0
fi

# ─── Upsert the document in 1Password ────────────────────────────────────────
# Try to find existing item
EXISTING_ID=$(op document list --vault "$OP_VAULT" --format json 2>/dev/null \
  | python3 -c "
import sys, json
try:
    items = json.load(sys.stdin)
    title = sys.argv[1]
    match = next((i['id'] for i in items if i.get('title') == title), '')
    print(match)
except Exception:
    print('')
" "$TITLE" 2>/dev/null || true)

if [[ -n "$EXISTING_ID" ]]; then
  op document edit "$EXISTING_ID" "$FILE_PATH" --vault "$OP_VAULT" &>/dev/null && true
else
  op document create "$FILE_PATH" --title "$TITLE" --vault "$OP_VAULT" &>/dev/null && true
fi

# Always succeed — never block the file write
echo '{}'
exit 0
