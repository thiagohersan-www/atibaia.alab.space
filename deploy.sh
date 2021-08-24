#!/bin/bash

git submodule init
git submodule update

## 2016
pushd 2016.FATA
git pull origin master

if [ ! -d themes ]; then
  mkdir themes
  pushd themes
  git clone https://github.com/digitalcraftsman/hugo-creative-theme.git
  popd
fi

hugo -d public/2016
popd

## 2017
pushd 2017.FATA
git pull origin master
jekyll build --destination _site/2017
popd

## update submodules
git add 2016.FATA 2017.FATA
git commit -m "update submodules to their latest commit"
git push origin master
git checkout -- .

## create new branch and push
git checkout --orphan gh-pages
mv 2016.FATA/public/2016 .
mv 2017.FATA/_site/2017 .

rm -rf 2016.FATA 2017.FATA .gitmodules

git rm --cached -r .
git rm 2016.FATA 2017.FATA .gitmodules
git add CNAME index.html js
git add 2016
git add 2017
git commit -m "updates sites"
git push origin :gh-pages
git push -u origin gh-pages

## clean up local
git checkout -f master
git branch -D gh-pages
