

using Backend.BusinessLogic.Models.Settings.ImageManagment;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace Backend.BusinessLogic.Services.ImageClouddinary
{

    
    public class ManageImageService : IManageImageService
    {
        public CloudinarySettings _cloudinarySettings { get; }

        public ManageImageService(IOptions<CloudinarySettings> cloudinarySettings)
        {
            _cloudinarySettings = cloudinarySettings.Value;

        }

        public async Task<ImageResponse> UploadImage(ImageData imageStream)
        {
            // validate account 
            Account account = new Account(
                _cloudinarySettings.CloudName,
                _cloudinarySettings.ApiKey,
                _cloudinarySettings.ApiSecret
            );

            Cloudinary cloudinary = new Cloudinary(account);

            ImageUploadParams uploadImage = new ImageUploadParams()
            {
                File = new FileDescription(imageStream.ImageName, imageStream.ImageStream)
            };

            // upload image
            var uploadResult = await cloudinary.UploadAsync(uploadImage);

            if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("No se pudo guardar la imagen");
            }

            return new ImageResponse
            {
                ImagePublicId = uploadResult.PublicId,
                ImageUrl = uploadResult.Url.ToString()
            };
        }
    }
}
