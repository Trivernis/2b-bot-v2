const {src, dest, watch, series, task} = require('gulp');
const ts = require('gulp-typescript');
const del = require('delete');

function clearDist(cb) {
    del('dist/*', cb);
}

function compileTypescript() {
    let tsProject = ts.createProject('tsconfig.json');
    let tsResult = tsProject.src().pipe(tsProject());
    return tsResult
        .pipe(dest('dist'));
}

function moveRemaining() {
    return src(['src/**/*', '!src/**/*.ts', '!src/**/*.sass', '!src/**/*.js'])
        .pipe(dest('dist'));
}

task('default', series(clearDist, compileTypescript, moveRemaining));
task('watch', () => {
    watch('src/public/stylesheets/sass/**/*.sass');
    watch('**/*.js');
    watch('**/*.ts', compileTypescript);
});
