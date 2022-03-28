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

        public HomeRepository(ILogger<HomeRepository> logger)
        {
            _logger = logger;
        }
    }


}
