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
                context.Database.EnsureCreated();
                // Look for any homes.
                if (!context.Home.Any())
                {

                    context.Home.AddRange(
                       new Home
                       {
                           Type = "Townhouse",
                           Floors = 2,
                           Size = "100sqft",
                           HomeAddress = "123 St ave",
                           HomeCity = "Dayton",
                           HomeState = "OHIO"
    }
                    );
                }
                context.SaveChanges();
            }
        }
    }
}
