using HomeBuy.Data.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeBuy.Data
{
    public class HomeRepository : IHomeRepository
    {
        private readonly ILogger _logger;
        private readonly HomeBuyContext _ctx;

        public HomeRepository(HomeBuyContext ctx, ILogger<HomeRepository> logger)
        {
            _logger = logger;
            _ctx = ctx;
        }

        public IEnumerable<Home> GetAllProducts()
        {
            try
            {
                _logger.LogInformation("GetAll Products was called");
                return _ctx.Home
                        .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get all products: {ex}");
                return null;
            }
        }


    }


}
