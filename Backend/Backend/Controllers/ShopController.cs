using Backend.BusinessLogic.Features.ProductsService.Vms;
using Backend.BusinessLogic.Features.ShopService.Vms;
using Backend.BusinessLogic.Features.ShopServices;
using Backend.BusinessLogic.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {

        private readonly IShopService _shopService;

        public ShopController(IShopService shopService)
        {
            _shopService = shopService;
        }

        [HttpGet("list", Name = "GetShopList")]
        [ProducesResponseType(typeof(List<ShopVm>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<List<ShopVm>>> GetShopList()
        {
            return Ok(await _shopService.GetShops());
        }
        
        [HttpPost("add", Name = "AddShop")]
        [ProducesResponseType(typeof(ShopVm), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ShopVm>> AddShop([FromBody] ShopVm shop)
        {
            return Ok(await _shopService.AddShop(shop));
        }
        
        [HttpPut("update", Name = "UpdateShop")]
        [ProducesResponseType(typeof(ShopVm), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ShopVm>> UpdateShop([FromBody] ShopVm shop)
        {
            return Ok(await _shopService.UpdateShop(shop));
        }
        
        [HttpDelete("delete/{id}", Name = "DeleteShop")]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Response>> DeleteShop(int id)
        {
            return Ok(await _shopService.DeleteShop(id));
        }
    }
}
