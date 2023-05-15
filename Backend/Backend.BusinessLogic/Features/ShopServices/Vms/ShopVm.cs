using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Features.ShopService.Vms
{
    public class ShopVm
    {
        public int IdShop { get; set; }
        public string? NameShop { get; set; }
        public string? Address { get; set; }
    }
}
