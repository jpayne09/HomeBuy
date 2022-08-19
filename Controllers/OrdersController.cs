using HomeBuy.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeBuy.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace HomeBuy.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]

    public class OrdersController : Controller
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly HomeBuyContext _ctx;
        public OrdersController(HomeBuyContext ctx, ILogger<OrdersController> logger)
        {
            _logger = logger;
            _ctx = ctx;
        }


        [HttpGet]
        public Order GetAllOrders()
        {
            _logger.LogInformation("Get All Orders was called");
            return _ctx.Order
              .Include(o => o.Items)
              .ThenInclude(i => i.Home)
              .FirstOrDefault();
              
        }

 
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Order order)
        {
            _logger.LogInformation("POST on home was called");
            try
            {
                 _logger.LogInformation("Post Request for order");
                _ctx.Add(order);
                await _ctx.SaveChangesAsync();
                return Ok(order);
            }
            catch (Exception ex)
            {

                _logger.LogError($"Failed to save a new order; {ex}");
                throw;
            }
        }
    }
}

