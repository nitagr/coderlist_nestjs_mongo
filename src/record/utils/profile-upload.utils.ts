export const profileTypeFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const imageFileName = (req, file, callback) => {
  const name = file.originalname;
  callback(null, name);
};
