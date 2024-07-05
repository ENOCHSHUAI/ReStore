
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController: ControllerBase // Inherit ControllerBase
    {
        private readonly StoreContext context;
        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<Product>> GetProducts() 
        {
            var products = context.Products.ToList();
            return Ok(products);// Use Ok method to return the products
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
            {
                return NotFound(); // Return 404 if the product is not found
            }
            return Ok(product); // Use Ok method to return the product
        }

    }

}
