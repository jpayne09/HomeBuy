﻿using HomeBuy.Data;
using HomeBuy.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeBuy.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]

    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly HomeBuyContext _ctx;

        public HomeController(HomeBuyContext ctx, ILogger<HomeController> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Home> Get()
        {
            _logger.LogInformation("Get all homes was called");
            return _ctx.Home
                .ToList();
        }

        [HttpGet("{id}")]
        public IEnumerable<Home> Get(int? id)
        {
            _logger.LogInformation("Get one home was called");
            return _ctx.Home
                    .Where(p => p.Id == id)
                    .ToList();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Home home)
        {
            _logger.LogInformation("PUT on home was called");
                try
                {
                //_ctx.Entry(home).State = EntityState.Modified;
                var entity = _ctx.Home.FirstOrDefault(p => p.Id == id);
                entity.Type = home.Type;
                entity.Floors = home.Floors;
                entity.HomeCity = home.HomeCity;
                entity.HomeState = home.HomeState;
                    await _ctx.SaveChangesAsync();
                return Ok(home);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!HomeExists(home.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
        }

        private bool HomeExists(int id)
        {
            return _ctx.Home.Any(e => e.Id == id);
        }
    }
}