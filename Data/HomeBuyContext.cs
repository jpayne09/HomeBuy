using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HomeBuy.Data.Entities;

namespace HomeBuy.Data
{
    public class HomeBuyContext : DbContext
    {
        public HomeBuyContext (DbContextOptions<HomeBuyContext> options)
            : base(options)
        {
            
        }

        public DbSet<Home> Home { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderHome> OrderHome { get; set; }
    }
}
