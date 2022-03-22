using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeBuy.Data.Entities
{
    public class Home
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Floors { get; set; }
        public string Location { get; set; }

        public DateTime OrderDate { get; set; }

        public ICollection<OrderHome> additionalItems { get; set; }
        
    }
}
