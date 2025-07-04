#!/usr/bin/env bash

cd $1;

find . -name "*.png" | parallel -eta cwebp {} -q 85 -alpha_q 100 -o {.}.webp;

mkdir pngs;

find . -maxdepth 1 -type f -name "*.png" -exec mv "{}" ./pngs/ \;


find . -name "*.jpg" | parallel -eta cwebp {} -q 85 -alpha_q 100 -o {.}.webp;

mkdir jpgs;

find . -maxdepth 1 -type f -name "*.jpg" -exec mv "{}" ./pngs/ \;

rm -r pngs;
rm -r jpgs;