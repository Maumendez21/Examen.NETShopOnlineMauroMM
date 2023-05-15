namespace Backend.BusinessLogic.Features.OrderServices.Vms
{
    public class CartItemVm
    {
        public int IdCartItem { get; set; }
        public int ProductId { get; set; }
        public int Amount { get; set; }
        public decimal? Price { get; set; }

    }
}