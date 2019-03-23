export function transformImageToContainer(selector: string, containerHeight: number) {
  const images = document.querySelectorAll(`${selector}`) as any;

  images.forEach(image => {
    const height = image.height;

    image.style.transform = `translateY(-${(height - containerHeight) / 2}px)`;
  });
}
