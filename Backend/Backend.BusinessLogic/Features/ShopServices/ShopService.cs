using AutoMapper;
using Backend.BusinessLogic.Features.ShopService.Vms;
using Backend.BusinessLogic.Models.Response;
using Backend.Data.Persistence;
using Microsoft.EntityFrameworkCore;
using SHA3.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace Backend.BusinessLogic.Features.ShopServices
{
    public class ShopService : IShopService
    {
        private readonly ExamenShopOnlineContext _context;
        private readonly IMapper _mapper;

        public ShopService(ExamenShopOnlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ShopVm> AddShop(ShopVm shop)
        {
            Shop newShop = _mapper.Map<Shop>(shop);
            _context.Shop.Add(newShop);
            await _context.SaveChangesAsync();

            // Se crea un usuario para que la tienda pueda acceder y administrar sus productos
            // el email es el nombre de la tienda más @online.com
            // la contraseña es el nombre de la tienda sin espacios y en minusculas
            string emailShop= Regex.Replace(shop.NameShop!.ToLower()!, @"\s", "");
            string passEncript = sha3512(emailShop);

            User userShop = new User
            {
                Name = shop.NameShop,
                LastName = newShop.IdShop.ToString(),
                Email = emailShop + "@online.com",
                Address = shop.Address,
                Password = passEncript,
                ShopId = newShop.IdShop,
                RolId = 2
            };
            _context.User.Add(userShop);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShopVm>(newShop);
        }

        public async Task<Response> DeleteShop(int id)
        {
            Shop shop = await _context.Shop.FirstOrDefaultAsync(s => s.IdShop == id);
            bool products = await _context.Product.AnyAsync(p => p.ShopId == shop!.IdShop);
            if (products)return new Response { Ok = false, Message = "No se puede eliminar la tienda, tiene articulos en uso." };
            User user = await _context.User.FirstOrDefaultAsync(u => u.ShopId == id);
            if (shop == null) return new Response { Ok = false, Message = "No se encontro la tienda" };
            _context.User.Remove(user!);
            _context.Shop.Remove(shop);
            await _context.SaveChangesAsync();
            return new Response { Ok = true, Message = $"{shop.NameShop} Eliminada correctamente" };
        }

        public async Task<ShopVm> GetShopById(int id)
        {
            Shop shop = await (_context.Shop.FirstOrDefaultAsync(s => s.IdShop == id));
            if (shop is null) return new ShopVm { IdShop = 0 };
            return _mapper.Map<ShopVm>(shop);
        }

        public async Task<List<ShopVm>> GetShops()
        {
            List<Shop> shops = await (from s in _context.Shop select s).ToListAsync();
            return _mapper.Map<List<ShopVm>>(shops);
        }

        public async Task<ShopVm> UpdateShop(ShopVm shopUpdate)
        {
           Shop shop = _mapper.Map<Shop>(shopUpdate);
            _context.Shop.Update(shop);
            await _context.SaveChangesAsync();
            return _mapper.Map<ShopVm>(shop);
        }

        private string sha3512(string value)
        {
            StringBuilder stringBuilder = new StringBuilder();
            using (var shaAlg = Sha3.Sha3512())
            {
                byte[] hash = shaAlg.ComputeHash(Encoding.UTF8.GetBytes(value));

                for (int i = 0; i < hash.Length; i++)
                {
                    stringBuilder.Append(hash[i].ToString("x2"));
                }
            }
            return stringBuilder.ToString();
        }
    }
}
