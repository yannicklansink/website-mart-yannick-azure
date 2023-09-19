const multer = require('multer');
const upload = multer();

module.exports = async function (context, req) {
  if (req.method === 'POST') {
    if (req.body.picture) {
      const base64 = req.body.picture;
      const buffer = Buffer.from(base64, 'base64');
      console.log('picture: ', buffer);
      // Now you have a Node.js Buffer object you can write to Azure Blob Storage, a database, etc.
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const licensePlate = req.body.licensePlate;

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('License Plate:', licensePlate);

    context.res.json({
      text: 'Data received',
    });
  } else if (req.method === 'GET') {
    context.res.json({
      text: 'Hello from the API',
    });
  }
};
