#!/bin/bash
set -eo pipefail

(
  cd images

  webp_cli="cwebp"
  if ! command -v "${webp_cli}" &> /dev/null; then
    echo "${webp_cli} is not installed"
    exit 1
  fi

  webp_quality=80

  export webp_quality
  export webp_cli

  find ./ -type f \( -name "*.png" \) -print0 |
    xargs -0 -n 1 -P "$(nproc)" bash -c '
      file="$0"
      out="${file%.*}.webp"
      "$webp_cli" -q "$webp_quality" "$file" -o "$out" || true
    '
)
