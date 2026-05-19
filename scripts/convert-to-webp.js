const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const directories = [
  path.join(__dirname, "../public/OSC"),
  path.join(__dirname, "../public/blogs"),
  path.join(__dirname, "../public/experiences"),
];

async function convertPngToWebp() {
  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory does not exist: ${dir}`);
      continue;
    }

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase().endsWith(".png")) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, `${path.parse(file).name}.webp`);

        try {
          console.log(`Converting: ${inputPath} -> ${outputPath}`);
          await sharp(inputPath)
            .webp({ quality: 90 })
            .toFile(outputPath);
          
          // Delete the original PNG file
          fs.unlinkSync(inputPath);
          console.log(`Successfully converted and deleted original: ${file}`);
        } catch (error) {
          console.error(`Error converting file ${file}:`, error);
        }
      }
    }
  }
  console.log("🎉 Conversion finished!");
}

convertPngToWebp();
