#!/bin/bash

(
  cd images
  echo '<div id="lightgallery">'
  for f in $(ls leo-*.webp | sort); do
    # skip if the file is called leo-main.webp
    if [ "$f" == "leo-main.webp" ]; then
      continue
    fi
    echo "  <a href=\"images/$f\">"
    echo "    <img src=\"images/$f\" loading=\"lazy\" alt=\"Leo\" />"
    echo "  </a>"
  done
  echo '</div>'
)
