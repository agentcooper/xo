const promiseCache = {};

const getImages = (images, callback) =>
  Promise.all(
    images.map(src => {
      // cache side-effect
      promiseCache[src] = promiseCache[src] || new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;

        image.onload = () => resolve(image)
      });

      return promiseCache[src];
    })
  );

export default getImages;
