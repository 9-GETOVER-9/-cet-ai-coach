#!/usr/bin/env bash
set -e

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DST="$HOME/.claude/skills"

echo ""
echo "=== CET Skills V1 安装 ==="
echo "源目录: $SRC"
echo "目标:   $DST"
echo ""

mkdir -p "$DST"
for s in cet cet-diagnose cet-writing cet-reading cet-listening cet-translation cet-vocab; do
  mkdir -p "$DST/$s"
  cp "$SRC/$s/SKILL.md" "$DST/$s/SKILL.md"
  echo "[完成] $s"
done

mkdir -p "$DST/cet-dashboard"
cp "$SRC/cet-dashboard/SKILL.md" "$DST/cet-dashboard/SKILL.md"
mkdir -p "$DST/cet-dashboard/dashboard"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --exclude='node_modules/' --exclude='dist/' --exclude='.git/' "$SRC/cet-dashboard/dashboard/" "$DST/cet-dashboard/dashboard/"
else
  cp -r "$SRC/cet-dashboard/dashboard/." "$DST/cet-dashboard/dashboard/"
fi
cp "$SRC/SCHEMA.md" "$DST/CET_SCHEMA.md"
echo "[完成] CET_SCHEMA.md"
echo "安装完成。运行 /cet 开始。"
