import { changeImageUrlSize } from './generateUrl'

const thumbnailSize = 160

interface Image {
  imageUrl:any,
  thumbnailUrl: any,
  imageText: any,
  imageLabel: any,
}

const  generateImageConfig =(image:Image) => {
  return {
    imageUrl: image.imageUrl,
    thumbnailUrl: changeImageUrlSize(image.imageUrl, thumbnailSize),
    imageText: image.imageText,
    imageLabel: image.imageLabel,
  }
  
}

export default generateImageConfig