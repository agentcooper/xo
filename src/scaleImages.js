const scaleImages = (images, cellSize, margin = 5) =>
  images.map(image => {
    const { width, height } = image;

    const widthToHeight = width / height;

    return width >= height ?
        {
          original: image,
          width: cellSize - margin * 2,
          height: (cellSize - margin * 2) * widthToHeight
        }
        :
        {
          original: image,
          width: (cellSize - margin * 2) * widthToHeight,
          height: cellSize - margin * 2
        };
  });

export default scaleImages;
