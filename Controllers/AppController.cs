using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeBuy.Controllers
{
    public class AppController : Controller
    {

        public AppController()
        {

        }
        // GET: HomeController
     
        public IActionResult Index()
        {
            return View();
        }
    }
}
