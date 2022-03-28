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
        public string Size { get; set; }

        public string HomeAddress { get; set; }
        public string HomeCity { get; set; }
        public string HomeState { get; set; }
        
    }
}
