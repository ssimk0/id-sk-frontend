'use strict'

const gulp = require('gulp')
const configPaths = require('../../config/paths.json')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const taskArguments = require('./task-arguments')
const filter = require('gulp-filter')
const fs = require('fs')
const yamlToJson = require('js-yaml')
const path = require('path')
const map = require('map-stream')
const rename = require('gulp-rename')

const copyFiles = (src, components, dist) => () => {
  const scssFiles = filter([src + '**/*.scss'], { restore: true })
  const yamlFiles = filter([components + '**/*.yaml'], { restore: true })

  return gulp.src([
    src + '**/*',
    '!**/.DS_Store',
    '!**/*.test.js',
    '!' + src + 'README.md', // Don't override the existing README in /package
    '!' + components + '**/__snapshots__/**',
    '!' + components + '**/__snapshots__/'
  ])
    .pipe(scssFiles)
    .pipe(postcss([
      autoprefixer
    ], { syntax: require('postcss-scss') }))
    .pipe(scssFiles.restore)
    .pipe(yamlFiles)
    .pipe(map(function (file, done) {
      const componentName = path.dirname(file.path).split(path.sep).slice(-1).toString()
      const componentPath = path.join(components, componentName, `${componentName}.yaml`)
      let yaml
      let json
      let paramsJson

      try {
        yaml = fs.readFileSync(componentPath, { encoding: 'utf8', json: true })
      } catch (e) {
        console.error('ENOENT: no such file or directory: ', componentPath)
      }

      if (yaml) {
        json = yamlToJson.safeLoad(yaml)
        paramsJson = json.params // We only want the 'params' data from component yaml

        if (paramsJson) {
          file.contents = Buffer.from(JSON.stringify(paramsJson, null, 4))
        } else {
          console.error(componentPath + ' is missing "params"')
        }
      }
      done(null, file)
    }))
    .pipe(rename(path => {
      path.basename = 'macro-options'
      path.extname = '.json'
    }))
    .pipe(yamlFiles.restore)
    .pipe(gulp.dest(taskArguments.destination + '/' + dist))
}

gulp.task('copy-files-govuk', copyFiles(configPaths.src, configPaths.components, 'govuk'))
gulp.task('copy-files-idsk', copyFiles(configPaths.idsk_src, configPaths.idsk_components, 'idsk'))
