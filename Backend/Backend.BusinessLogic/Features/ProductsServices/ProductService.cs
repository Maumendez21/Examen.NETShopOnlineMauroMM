
using AutoMapper;
using Backend.BusinessLogic.Features.ProductsService.Vms;
using Backend.BusinessLogic.Models.Response;
using Backend.Data.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Backend.BusinessLogic.Features.ProductsServices
{
    public class ProductService : IProductService
    {
        private readonly ExamenShopOnlineContext _context;
        private readonly IMapper _mapper;

        public ProductService(ExamenShopOnlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductVm> AddProduct(ProductVm product)
        {
            Product newProduct = new Product
            {
                NameProduct = product.NameProduct,
                Codigo = product.Codigo,
                Descripcion = product.Descripcion,
                Price = product.Price,
                Stock = product.Stock,
                UrlImage = product.UrlImage,
                ShopId = product.ShopId
            };

            _context.Product.Add(newProduct);
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductVm>(newProduct);
        }

        public async Task<Response> DeleteProduct(int id)
        {
            Product product = await _context.Product.FirstOrDefaultAsync(s => s.IdPorduct == id);
            if (product == null) return new Response { Ok = false, Message = "No se encontro la tienda" };
            _context.Product.Remove(product);
            await _context.SaveChangesAsync();
            return new Response { Ok = true, Message = $"{product.NameProduct} Eliminado correctamente" };
        
        }

        public async Task<ProductVm> GetProductById(int id)
        {
            Product product = await (_context.Product.FirstOrDefaultAsync(s => s.IdPorduct == id));
            if (product is null) return new ProductVm { IdPorduct = 0 };
            return _mapper.Map<ProductVm>(product);
        }

        public async Task<List<ProductVm>> GetProducts()
        {
            // List<Product> products = await (from s in _context.Product select s).ToListAsync();
            List<Product> products = await (from p in _context.Product 
                                        where p.Stock > 0
                                        select new Product{
                                            IdPorduct = p.IdPorduct,
                                            NameProduct = p.NameProduct,
                                            Codigo = p.Codigo,
                                            Descripcion = p.Descripcion,
                                            Price = p.Price,
                                            Stock = p.Stock,
                                            UrlImage = p.UrlImage,
                                            Shop = (from s in _context.Shop 
                                                where s.IdShop == p.ShopId select s).FirstOrDefault()
                                        }).ToListAsync();

            return _mapper.Map<List<ProductVm>>(products);
        }

        public async Task<List<ProductVm>> GetProductsByShop(int idShop)
        {
            List<Product> products = await (from s in _context.Product where s.ShopId == idShop select s).ToListAsync();
            return _mapper.Map<List<ProductVm>>(products);
        }

        public async Task<ProductVm> UpdateProduct(ProductVm productUpdate)
        {
            Product newProduct = new Product
            {
                IdPorduct = productUpdate.IdPorduct,
                NameProduct = productUpdate.NameProduct,
                Codigo = productUpdate.Codigo,
                Descripcion = productUpdate.Descripcion,
                Price = productUpdate.Price,
                Stock = productUpdate.Stock,
                UrlImage = productUpdate.UrlImage,
                ShopId = productUpdate.ShopId
            };
            _context.Product.Update(newProduct);
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductVm>(newProduct);
        }
    }
}
