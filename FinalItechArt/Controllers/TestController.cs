using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.DB.Models;

namespace FinalItechArt.Web.Controllers
{
    [Route("Test")]
    [ApiController]
    public class TestController : Controller
    {
        private RepositoryContext db;
        public TestController(RepositoryContext context)
        {
            db = context;
            
        }
        
        [HttpPost]
        public IActionResult Get([FromBody]Visit NewVisit)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);
            db.Clinics.ToList();
            return Ok(NewVisit);
        }



    }
}