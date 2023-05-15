using Backend.BusinessLogic.Features.OrderServices;
using Backend.BusinessLogic.Models.Request;
using Backend.BusinessLogic.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("buy", Name = "BuyOrder")]
        [ProducesResponseType(typeof(OrderResponse), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<OrderResponse>> AddShop([FromBody] OrderRequest request)
        {
            return Ok(await _orderService.RealizarCompra(request));
        }
    }
}
