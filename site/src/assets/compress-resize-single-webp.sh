#!/bin/bash

# Check if the input file exists
if [ ! -f "$1" ]; then
  echo "File not found: $1"
  exit 1
fi

# Specify the threshold for width and height
threshold="800"

# Get the dimensions of the image
dimensions=$(identify -format "%wx%h" "$1")
width=$(echo "$dimensions" | cut -d 'x' -f1)
height=$(echo "$dimensions" | cut -d 'x' -f2)

# Check if width and height match the desired dimensions (1080x1920)
if [[ $width -eq 1080 ]]; then
  # Compress the image without resizing in-place
  cwebp -m 6 -q 75 "$1" -o "$1"
elif [[ $width -gt $threshold || $height -gt $threshold ]]; then
  # Calculate the resize_height while maintaining aspect ratio
  resize_width="720"
  resize_height=$(echo "$height * $resize_width / $width" | bc)

  # Compress and resize the image in-place
  cwebp -m 6 -q 75 -resize $resize_width $resize_height "$1" -o "$1"
else
  # Compress the image without resizing in-place
  cwebp -m 6 -q 75 "$1" -o "$1"
fi
