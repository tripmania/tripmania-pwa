export function transformImageToContainer(containerSelector: string, imageSelector: string): boolean[] {
  const containerHeight = (document.querySelector(containerSelector) as HTMLElement).offsetHeight;
  const containerWidth = (document.querySelector(containerSelector) as HTMLElement).offsetWidth;
  const images = [].slice.call(document.querySelectorAll(imageSelector));
  const imageLoads = new Array(images.length);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    image.onload = () => setTimeout(() => {
      const imageHeight = image.height;
      const imageWidth = image.width;
      const newImageHeight = imageHeight * (containerWidth / imageWidth);

      imageLoads[i] = true;

      image.style.transform = `translateY(-${(newImageHeight - containerHeight) / 2}px)`;
    }, 500);
  }

  return imageLoads;
}
