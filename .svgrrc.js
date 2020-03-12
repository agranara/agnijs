const path = require('path');
const fs = require('fs');

function template({ template }, opts, res) {
  const { imports, componentName, props, jsx, exports } = res;

  return template.ast`
    ${imports}
    const ${componentName} = (${props}) => ${jsx};
    ${exports}
  `;
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text) {
  return text.replace(/-/, '').toUpperCase();
}

function indexTemplate(files) {
  const prefix = 'Icon';
  const exportEntriesJs = [];
  const exportEntriesDTs = [];

  // this functiong called for each directory
  // so its safe using first index to get directory
  const folder = path.basename(path.dirname(files[0]));

  files.forEach(file => {
    const basename = path.basename(file, path.extname(file));
    const exportName = `${prefix}${toPascalCase(folder)}${basename}`;
    exportEntriesJs.push(`export { default as ${exportName} } from './${basename}';`);
    exportEntriesDTs.push(`export const ${exportName}: React.FC<React.SVGProps<SVGElement>>;`);
  });

  // save file index.d.ts before saving index.js
  const savedPath = path.join(path.dirname(files[0]), 'index.d.ts');

  if (fs.existsSync(savedPath)) fs.unlinkSync(savedPath);
  fs.writeFileSync(savedPath, `${exportEntriesDTs.join('\n')}\n`);
  return `${exportEntriesJs.join('\n')}\n`;
}

module.exports = {
  icon: true,
  expandProps: 'end',
  template,
  indexTemplate,
  prettierConfig: path.join(__dirname, '.prettierrc.json')
};
