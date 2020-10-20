const fs = require('fs');
const { promisify } = require('util');

function readFile(path) {
  return promisify(fs.readFile)(path, 'utf8');
}

function writeFile(path, data) {
  return promisify(fs.writeFile)(path, data);
}

const schemaFilePaths = [
  'EN10168.schema.json',
  'e-CoC.schema.json',
  'ChemicalAnalysis.schema.json',
];

(async function (argv) {
  const version = argv[2];
  // const name = argv[3];
  await Promise.all(
    schemaFilePaths.map(async (filePath) => {
      const schema = JSON.parse(await readFile(filePath));
      const [schemaName] = filePath.split('.');
      schema.$id = `https://raw.githubusercontent.com/s1seven/schemas/${version}/${schemaName}.schema.json`;
      await writeFile(filePath, JSON.stringify(schema, null, 2));
    })
  );
})(process.argv);
