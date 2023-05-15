using AutoMapper;
using Backend.BusinessLogic.Features.OrderServices.Vms;
using Backend.BusinessLogic.Features.ProductsService.Vms;
using Backend.BusinessLogic.Features.ShopService.Vms;
using Backend.Data.Persistence;


namespace Backend.BusinessLogic.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Shop, ShopVm>().ReverseMap();
            CreateMap<Product, ProductVm>().ReverseMap();
            CreateMap<CartItem, CartItemVm>().ReverseMap();
        }
    }
}
