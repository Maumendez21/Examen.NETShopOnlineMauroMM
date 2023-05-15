using Backend.BusinessLogic.Models.Settings.ImageManagment;


namespace Backend.BusinessLogic.Services.ImageClouddinary
{
    public interface IManageImageService
    {
        Task<ImageResponse> UploadImage(ImageData imageStream);
    }
}
