using HomeBuy.Data.Entities;
using System.Collections.Generic;

namespace HomeBuy.Data
{
    public interface IHomeRepository
    {
        IEnumerable<Home> GetAllProducts();



    }
}