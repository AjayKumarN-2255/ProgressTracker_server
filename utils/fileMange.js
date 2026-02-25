const fs = require('fs');
const path = require('path');

function saveImageBuffer(imageFile, username) {

    const buffer = imageFile.buffer;
    const fileFormat = imageFile.mimetype;
    const ext = fileFormat.split('/')[1];


    const uploadDir = path.join(process.cwd(), 'uploads', 'profile');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const filename = `profile_${username}_${timestamp}.${ext}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    return {
        url: `/uploads/profile/${filename}`
    };
}

function deleteLocalImage(filePath) {
    if (!filePath) return;

    const dir = path.dirname(filePath);
    const baseName = path.parse(filePath).name;

    deleteLocalImageByName(baseName, dir);
}

function deleteLocalImageByName(baseName, dirPath) {

    const absDirPath = path.join(process.cwd(), dirPath);

    if (!fs.existsSync(absDirPath)) return;

    const files = fs.readdirSync(absDirPath);

    const fileToDelete = files.find(file => path.parse(file).name === baseName);

    if (fileToDelete) {
        fs.unlinkSync(path.join(absDirPath, fileToDelete));
    }
}


module.exports = {
    saveImageBuffer,
    deleteLocalImage
};
