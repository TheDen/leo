#!/bin/bash

cd images || exit

EXCLUDE=("leo-main.png" "favicon.ico" "loading.gif")

# Find already-numbered PNGs and determine next number
max_num=0
for file in leo-[0-9]*.png; do
  [[ -e "$file" ]] || continue # skip if glob doesn't match any files
  num=$(echo "$file" | ggrep -oP 'leo-\K[0-9]+')
  if ((num > max_num)); then
    max_num=$num
  fi
done

next_num=$((max_num + 1))

# Process unnumbered PNGs
for file in *.png; do
  # Skip excluded files
  [[ " ${EXCLUDE[*]} " =~ " $file " ]] && continue

  # Skip already-numbered files
  if [[ $file =~ ^leo-[0-9]+\.png$ ]]; then
    continue
  fi

  newname="leo-$next_num.png"
  echo "Renaming $file → $newname"
  mv "$file" "$newname"
  ((next_num++))
done
