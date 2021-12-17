const sass = require('sass');
const { promisify } = require('util');
const { writeFile } = require('fs');
const sassRenderPromise = promisify(sass.render);

// Compiles sass file into css
// Code courtesy of https://github.com/ChristianNally
module.exports = async function() {
  const styleResult = await sassRenderPromise({
    file: `${process.cwd()}/sass/styles.scss`,
    outFile: `${process.cwd()}/public/styles/styles.css`,
  });

  console.log('SASS files compiled successfully');
}