const path = require('path');

const getImage = async (req, res) => {
  const { image } = req.params;
  const imagePath = path.resolve(__dirname, '..', '..', '..', 'public', 'images', image);
  return res.status(200).sendFile(imagePath);
};

module.exports = {
  getImage,
};