using HomeBuy.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeBuy.Data
{
    public class HomeSeeder
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new HomeBuyContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<HomeBuyContext>>()))
            {
                // Look for any movies.
                if (context.Home.Any())
                {
                    return;   // DB has been seeded
                }

                context.Home.AddRange(
                    new Home
                    {
                        Id = 1, 
                        Type = "Townhouse",
                        Floors = 2,
                        Location = "Maryland"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
