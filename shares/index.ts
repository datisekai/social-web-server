export const showInternal = (res, error) => {
  console.error(error);
  return res.status(500).json(error);
};

export const showNotFound = (res) => {
  return res.status(404).json("Không tìm thấy");
};

export const showMissing = (res) => {
  return res.status(400).json("Vui lòng nhập đầy đủ");
};

export const genarateAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${name}`;
