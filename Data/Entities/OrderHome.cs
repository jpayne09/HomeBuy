
namespace HomeBuy.Data.Entities
{
    public class OrderHome
    {
        public int Id { get; set; }
        
        public Home Home { get; set; }

        public int HomeId { get; set; }

        public int Quantity { get; set; }

        public decimal HomePrice { get; set; }

        public Order Order { get; set; }
    }
}
