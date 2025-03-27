#!/bin/bash

(
  cd images

  shopt -s nullglob

  # Convert all HEIC and heic files to PNG
  for f in *.HEIC *.heic; do
    base="${f%.*}"
    convert "$f" -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 "$base.png"
  done

  # Convert all JPG, jpeg, JPG to PNG
  for f in *.jpg *.JPG *.jpeg; do
    base="${f%.*}"
    convert "$f" -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 "$base.png"
  done

)
