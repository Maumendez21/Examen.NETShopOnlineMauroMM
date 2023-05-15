using Backend.BusinessLogic.Features.ShopService.Vms;
using Microsoft.AspNetCore.Http;

namespace Backend.BusinessLogic.Features.ProductsService.Vms
{
    public class ProductVm
    {
        public int IdPorduct { get; set; }
        public string? NameProduct { get; set; }
        public string? Codigo { get; set; }
        public string? Descripcion { get; set; }
        public string? UrlImage { get; set; }
        public IFormFile? Image { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int ShopId { get; set; }
        public virtual ShopVm? Shop { get; set; }
    }
}
