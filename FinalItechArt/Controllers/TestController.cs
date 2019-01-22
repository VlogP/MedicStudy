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
using FinalltechArt.DB.Interfaces;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FinalItechArt.Web.Infrastructure;
using FinalltechArt.Service.Interfaces;


namespace FinalItechArt.Web.Controllers
{
    [Route("Test")]
    [ApiController]
    public class TestController : Controller
    {
        private IPatientRepository myrep;
        private IRegisterService db;
        public TestController(IRegisterService context,IPatientRepository myrep)
        {
           this.myrep = myrep;
           db = context;
            
        }
      
        [HttpPost]      
        public IActionResult Post([FromBody]Visit NewVisit)
        {

           // if (!ModelState.IsValid) return BadRequest(ModelState);
           // db.Clinics.ToList();

            return Ok(NewVisit);
       }
      

        [HttpGet]
        public IActionResult Get()
        {
            var x = myrep.GetAllResearcher("1111");
            return  Ok(x);
        }


        [Route("Test1")]
        [HttpGet]
        public IActionResult Get1()
        {

            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, "alex"),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "admin")
                };

            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);


            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(encodedJwt);
        }


    }
}