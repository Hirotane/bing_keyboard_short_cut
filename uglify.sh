#!/bin/bash

# Define variables for file paths
FILES=$(find . -type f -name "*.js")

# Loop through each file and compress it
for FILE in $FILES
do
  # Define variables for file names
  FILENAME=$(basename -- "$FILE")
  EXTENSION="${FILENAME##*.}"
  FILENAME="${FILENAME%.*}"

  # Only process JavaScript files
  if [ "$EXTENSION" == "js" ]; then
    # Compress the file and overwrite the original file
    uglifyjs "$FILE" -c -m -o "$FILE"
    echo "Compressed $FILENAME.$EXTENSION"
  fi
done
