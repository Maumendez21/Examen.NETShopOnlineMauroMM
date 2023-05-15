using System.Net;
using Backend.BusinessLogic.Features.ProductsService.Vms;
using Backend.BusinessLogic.Features.ProductsServices;
using Backend.BusinessLogic.Models.Response;
using Backend.BusinessLogic.Models.Settings.ImageManagment;
using Backend.BusinessLogic.Services.ImageClouddinary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IProductService _productService;
        private readonly IManageImageService _manageImageService;

        public ProductController(IProductService productService, IManageImageService manageImageService)
        {
            _productService = productService;
            _manageImageService = manageImageService;
        }

        [AllowAnonymous]
        [HttpGet("list", Name = "GetProductList")]
        [ProducesResponseType(typeof(List<ProductVm>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<List<ProductVm>>> GetProductList()
        {
            return Ok(await _productService.GetProducts());
        }
        
        [HttpGet("listByShop/{id}", Name = "GetProductListByShop")]
        [ProducesResponseType(typeof(List<ProductVm>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<List<ProductVm>>> GetProductListByShop(int id)
        {
            return Ok(await _productService.GetProductsByShop(id));
        }

        [HttpPost("add", Name = "AddProduct")]
        [ProducesResponseType(typeof(ProductVm), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ProductVm>> AddProduct([FromForm] ProductVm product)
        {
            if (product.Image is not null)
            {
               ImageResponse resultImage = await _manageImageService.UploadImage(new ImageData
               {
                  ImageStream = product.Image!.OpenReadStream(),
                  ImageName = product.Image.Name
               }
               );

               product.UrlImage = resultImage.ImageUrl;
            }

            return Ok(await _productService.AddProduct(product));
        }

        [HttpPut("update", Name = "UpdateProduct")]
        [ProducesResponseType(typeof(ProductVm), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ProductVm>> UpdateProduct([FromForm] ProductVm product)
        {

            if (product.Image is not null)
            {
                ImageResponse resultImage = await _manageImageService.UploadImage(new ImageData
                {
                    ImageStream = product.Image!.OpenReadStream(),
                    ImageName = product.Image.Name
                }
                );

                product.UrlImage = resultImage.ImageUrl;
            }
            return Ok(await _productService.UpdateProduct(product));
        }

        [HttpDelete("delete/{id}", Name = "DeleteProduct")]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Response>> DeleteProduct(int id)
        {
            return Ok(await _productService.DeleteProduct(id));
        }
    }
}
